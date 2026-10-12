import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { notifySubmission } from '@/lib/notifications'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const reply = (data: object, status: number) => NextResponse.json(data, {status, headers:{'Cache-Control':'no-store'}})
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const stages = new Set(['Entreprise en activité','Projet lancé / premières ventes','Projet en préparation'])

export async function POST(req: NextRequest) {
  if (req.headers.get('origin') && req.headers.get('origin') !== req.nextUrl.origin) return reply({ok:false,message:'Origine non autorisée.'},403)
  if (!req.headers.get('content-type')?.includes('application/json')) return reply({ok:false,message:'Format non pris en charge.'},415)
  if (Number(req.headers.get('content-length') || 0) > 12000) return reply({ok:false,message:'Formulaire trop volumineux.'},413)
  let raw: Record<string,unknown>
  try {
    const reader=req.body?.getReader()
    if (!reader) return reply({ok:false,message:'Formulaire vide.'},400)
    const parts:Uint8Array[]=[]; let size=0
    while (true) { const {done,value}=await reader.read(); if (done) break; size+=value.length; if (size>12000) { await reader.cancel(); return reply({ok:false,message:'Formulaire trop volumineux.'},413) } parts.push(value) }
    raw=JSON.parse(Buffer.concat(parts).toString('utf8'))
    if (!raw || typeof raw!=='object' || Array.isArray(raw)) throw new Error('Formulaire invalide.')
  } catch { return reply({ok:false,message:'Formulaire invalide.'},400) }
  const field=(key:string,max:number) => { const value=raw[key]; return typeof value==='string' && value.length<=max ? value.trim() : '' }
  const id=field('requestId',36),name=field('name',100),email=field('email',254).toLowerCase(),phone=field('phone',32),city=field('city',80)
  const stage=field('stage',80),business=field('business',1200),goal=field('goal',1200),contribution=field('contribution',1200),instagram=field('instagram',200)
  if (field('website',200)) return reply({ok:false,message:'Demande non valide.'},400)
  if (!uuid.test(id)||name.length<3||!emailRe.test(email)||phone.replace(/\D/g,'').length<8||!city||!stages.has(stage)||business.length<15||goal.length<15||contribution.length<15||raw.consent!==true) return reply({ok:false,message:'Vérifie les champs requis et ton accord.'},400)
  const payload={id,name,email,phone,city,stage,business,goal,contribution,instagram:instagram||null,consent_at:new Date().toISOString(),consent_version:'club-application-v1',status:'new'}
  try {
    if (process.env.CLUB_APPLICATION_WEBHOOK_URL) {
      const url=new URL(process.env.CLUB_APPLICATION_WEBHOOK_URL)
      if (url.protocol!=='https:') throw new Error('Webhook invalide')
      const r=await fetch(url,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json','Idempotency-Key':id,...(process.env.CLUB_APPLICATION_WEBHOOK_TOKEN?{Authorization:'Bearer '+process.env.CLUB_APPLICATION_WEBHOOK_TOKEN}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)})
      if (!r.ok) throw new Error('Webhook failed')
    } else {
      // The publishable key is intentionally public. Database RLS grants anon INSERT only;
      // anonymous users can never read, edit, or delete applications.
      const db=getSupabaseAdmin() || createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hhlqwtwecywuowtshxtu.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Gg3W1N39qWhcnRa6aJ7jxQ_OKIbSf4p',
        {auth:{persistSession:false,autoRefreshToken:false}}
      )
      const {error}=await db.from('club_applications').insert(payload).abortSignal(AbortSignal.timeout(10000))
      if (error && error.code !== '23505') throw error
    }
    // A validated and stored application generates a complete private notification.
    const notice=await notifySubmission({
      kind:'club',reference:id,
      subject:'[DZ FOUNDERS CLUB] Nouvelle candidature — '+name,
      replyTo:email,
      fields:{
        'Type':'Candidature DZ Founders Club',
        'Référence':id,'Nom complet':name,'E-mail':email,'WhatsApp':phone,
        'Ville':city,'Situation entrepreneuriale':stage,'Activité / entreprise':business,
        'Objectif 90 jours':goal,'Contribution au club':contribution,
        'Instagram / LinkedIn':instagram||'Non renseigné',
        'Consentement':'Oui','Date de consentement':payload.consent_at,
      }
    })
    return reply({ok:true,reference:'DZFC-'+id.slice(0,8).toUpperCase(),notification:notice==='unavailable'?'delayed':notice},201)
  } catch(e) {
    console.error('[club/apply] Storage failed',e instanceof Error?e.message:'unknown')
    return reply({ok:false,message:'Impossible de confirmer l’enregistrement pour le moment. Réessaie ou utilise l’envoi par e-mail.'},502)
  }
}