import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { validateLead } from '@/lib/leads-validation'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const json = (data: object, status: number) => NextResponse.json(data, {status, headers: {'Cache-Control':'no-store'}})
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (origin && origin !== request.nextUrl.origin) return json({ok:false,message:'Origine de la demande invalide.'},403)
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ok:false,message:'Format de demande invalide.'},415)
  if (Number(request.headers.get('content-length') || 0) > 16000) return json({ok:false,message:'La demande est trop volumineuse.'},413)
  let lead
  try {
    // Bound the body while streaming, including requests without Content-Length.
    const reader = request.body?.getReader()
    if (!reader) return json({ok:false,message:'Demande vide.'},400)
    const chunks: Uint8Array[] = []; let length = 0
    while (true) { const {value,done} = await reader.read(); if (done) break; length += value.length; if (length > 16000) { await reader.cancel(); return json({ok:false,message:'La demande est trop volumineuse.'},413) } chunks.push(value) }
    lead = validateLead(JSON.parse(Buffer.concat(chunks).toString('utf8')))
  } catch (error) { return json({ok:false,message:error instanceof SyntaxError ? 'Demande invalide.' : error instanceof Error ? error.message : 'Vérifie les champs.'},400) }
  const payload = { id:lead.requestId, track:lead.track, answers:lead.answers, name:lead.name, phone:lead.phone || null, email:lead.email || null, channel:lead.channel, details:lead.details, preferred_date:lead.date || null, attribution:lead.attribution, consent_at:new Date().toISOString(), consent_version:'project-contact-v1', status:'new' }
  try {
    // Use one durable destination. Never return success without its acknowledgement.
    if (process.env.LEADS_WEBHOOK_URL) {
      const target = new URL(process.env.LEADS_WEBHOOK_URL)
      if (target.protocol !== 'https:' && !(process.env.NODE_ENV === 'development' && ['localhost','127.0.0.1'].includes(target.hostname))) throw new Error('Invalid webhook configuration')
      const response = await fetch(target, { method:'POST', redirect:'error', headers:{'Content-Type':'application/json','Idempotency-Key':lead.requestId,...(process.env.LEADS_WEBHOOK_TOKEN ? {Authorization:`Bearer ${process.env.LEADS_WEBHOOK_TOKEN}`} : {})}, body:JSON.stringify(payload), signal:AbortSignal.timeout(10000) })
      if (!response.ok) throw new Error('Webhook rejected request')
    } else {
      const db = getSupabaseAdmin()
      if (!db) return json({ok:false,message:'L’enregistrement en ligne est momentanément indisponible. Ton brief reste disponible ci-dessus.'},503)
      // Duplicate retries acknowledge the same request without changing its content or status.
      const {error} = await db.from('project_leads').upsert(payload,{onConflict:'id',ignoreDuplicates:true}).abortSignal(AbortSignal.timeout(10000))
      if (error) throw new Error('Lead storage unavailable')
    }
    return json({ok:true,reference:`MOKA-${lead.requestId.slice(0,8).toUpperCase()}`},201)
  } catch {
    console.error('[leads] persistence unavailable')
    return json({ok:false,message:'L’enregistrement n’a pas pu être confirmé. Réessaie ou envoie ton brief par e-mail.'},502)
  }
}
