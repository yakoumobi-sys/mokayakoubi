import { getSupabaseAdmin } from '@/lib/supabase'

/** Private, server-side alert pipeline. No tokens or PII are ever sent to the browser. */
export type NotificationKind = 'club' | 'newsletter' | 'contact' | 'project'
type Fields = Record<string, unknown>
type SubmitEvent = { kind: NotificationKind; reference: string; subject: string; fields: Fields; replyTo?: string }
type EmailState = 'sent' | 'queued' | 'unavailable'
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] || c))
const format = (value: unknown): string => {
  if (value === null || value === undefined) return 'Non renseigné'
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}
const clean = (data: Fields): Fields => Object.fromEntries(Object.entries(data).filter(([key]) => !['website', 'honeypot', 'token'].includes(key)))
const toPlainText = (data: Fields) => Object.entries(data).map(([label,value])=>label+' : '+format(value)).join('\n\n')
const toHtml = (data: Fields) => '<h2 style="font-family:Arial,sans-serif">Nouvelle demande sur MOKA</h2><table style="border-collapse:collapse;width:100%;font:14px Arial,sans-serif">'+Object.entries(data).map(([key,value])=>'<tr><th style="border:1px solid #ddd;padding:12px;text-align:left;vertical-align:top;background:#f4f6ef;width:30%">'+escapeHtml(key)+'</th><td style="border:1px solid #ddd;padding:12px;white-space:pre-wrap">'+escapeHtml(format(value))+'</td></tr>').join('')+'</table>'

export function isNotificationConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFICATION_FROM_EMAIL)
}

/** Always enqueue in Supabase. Then try an immediate mail; a daily cron retries failures. */
export async function notifySubmission(event: SubmitEvent): Promise<EmailState> {
  const db = getSupabaseAdmin()
  if (!db) {
    console.error('[notifications] Cannot queue: Supabase admin missing')
    return 'unavailable'
  }
  const eventKey = event.kind+':'+event.reference
  const {error} = await db.from('notification_outbox').upsert({
    event_key:eventKey,
    event_type:event.kind,
    subject:event.subject.slice(0,250),
    fields:clean(event.fields),
    reply_to:event.replyTo && validEmail(event.replyTo)?event.replyTo:null,
  },{onConflict:'event_key',ignoreDuplicates:true})
  if (error) {
    console.error('[notifications] Cannot queue:',error.message)
    return 'unavailable'
  }
  if (!isNotificationConfigured()) return 'queued'
  const {data, error:readError} = await db.from('notification_outbox').select('id,status').eq('event_key',eventKey).single()
  if (readError || !data) return 'queued'
  if (data.status === 'sent') return 'sent'
  return sendQueuedNotification(data.id)
}

/** Claim atomically, avoiding duplicate workers and keeping the original payload. */
export async function sendQueuedNotification(id:string): Promise<EmailState> {
  const db = getSupabaseAdmin()
  if (!db || !isNotificationConfigured()) return 'queued'
  const {data:row,error:claimError} = await db.from('notification_outbox')
    .update({status:'sending',next_attempt_at:new Date(Date.now()+15*60_000).toISOString()})
    .eq('id',id).eq('status','pending')
    .lte('next_attempt_at',new Date().toISOString())
    .select('id,event_key,subject,fields,reply_to,attempts').maybeSingle()
  if (claimError || !row) return 'queued'

  let errorMessage = ''
  try {
    const subject = String(row.subject)
    const destination = process.env.NOTIFICATION_TO_EMAIL || 'yakoumobi@gmail.com'
    const from = process.env.NOTIFICATION_FROM_EMAIL!
    if (!validEmail(destination) || !validEmail(from.replace(/^[^<]*</,'').replace(/>$/,''))) throw new Error('Invalid sender/recipient email config')
    const response = await fetch('https://api.resend.com/emails',{
      method:'POST',redirect:'error',
      headers:{
        'Authorization':'Bearer '+process.env.RESEND_API_KEY!,
        'Content-Type':'application/json',
        'Idempotency-Key':String(row.event_key),
      },
      body:JSON.stringify({
        from,
        to:[destination],
        subject,
        text:toPlainText(row.fields as Fields),
        html:toHtml(row.fields as Fields),
        ...(row.reply_to&&validEmail(row.reply_to)?{reply_to:row.reply_to}:{}),
      }),
      signal:AbortSignal.timeout(12000),
    })
    if (!response.ok) {
      errorMessage = 'Email API returned HTTP '+response.status
      throw new Error(errorMessage)
    }
    const {error:updateError} = await db.from('notification_outbox').update({
      status:'sent',sent_at:new Date().toISOString(),attempts:Number(row.attempts)+1,last_error:null,
    }).eq('id',id).eq('status','sending')
    if (updateError) throw new Error('Could not confirm sent status')
    return 'sent'
  } catch(err) {
    errorMessage = errorMessage || (err instanceof Error?err.message:'Unknown email error')
    const attempts=Number(row.attempts)+1
    const minutes = Math.min(1440, 5*Math.pow(2,Math.min(8,attempts-1)))
    const next = new Date(Date.now()+minutes*60_000).toISOString()
    console.error('[notifications] Email send failed',row.event_key,errorMessage)
    await db.from('notification_outbox').update({
      status:'pending',attempts,next_attempt_at:next,last_error:errorMessage.slice(0,300),
    }).eq('id',id).eq('status','sending')
    return 'queued'
  }
}

export async function retryQueuedNotifications(limit=25) {
  const db=getSupabaseAdmin()
  if (!db || !isNotificationConfigured()) return {configured:false,processed:0,sent:0}
  // Recover jobs interrupted while sending. Resend's idempotency key prevents duplicate emails.
  await db.from('notification_outbox').update({status:'pending'})
    .eq('status','sending').lt('next_attempt_at',new Date().toISOString())
  const {data,error}=await db.from('notification_outbox').select('id')
    .eq('status','pending').lte('next_attempt_at',new Date().toISOString())
    .order('created_at',{ascending:true}).limit(limit)
  if (error) throw error
  let sent=0
  for(const row of data||[]) if(await sendQueuedNotification(row.id)==='sent') sent++
  return {configured:true,processed:(data||[]).length,sent}
}
