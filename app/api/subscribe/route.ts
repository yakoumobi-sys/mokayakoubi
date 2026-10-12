import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { subscribe } from '@/lib/subscribers'
import { notifySubmission } from '@/lib/notifications'
export const runtime='nodejs'
export const dynamic='force-dynamic'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({message:'Format non valide.'},{status:415})
  if (Number(request.headers.get('content-length')||0)>3000) return NextResponse.json({message:'Demande trop volumineuse.'},{status:413})
  let email='',source='site',consent=false
  try {
    const text=await request.text()
    if (text.length>3000) throw new Error('too long')
    const body=JSON.parse(text) as {email?:unknown;source?:unknown;consent?:unknown;website?:unknown}
    if (typeof body.website==='string' && body.website.trim()) return NextResponse.json({message:'Demande non valide.'},{status:400})
    email=typeof body.email==='string'?body.email.trim().toLowerCase():''
    source=typeof body.source==='string'?body.source.trim().slice(0,80):'site'
    consent=body.consent===true
  } catch { return NextResponse.json({message:'Demande non valide.'},{status:400}) }
  if (!email || email.length>254 || !EMAIL_PATTERN.test(email)) return NextResponse.json({message:'Saisis une adresse e-mail valide.'},{status:400})
  if (!consent) return NextResponse.json({message:'Accepte de recevoir les ressources et informations par e-mail.'},{status:400})
  try {
    const result=await subscribe(email,source)
    if(!result.ok) return NextResponse.json({message:'Inscription temporairement indisponible.'},{status:503})
    if(!result.alreadySubscribed) {
      const id=createHash('sha256').update(email).digest('hex').slice(0,32)
      const notice=await notifySubmission({
        kind:'newsletter',reference:id,
        subject:'[MOKA] Nouvel inscrit aux ressources gratuites',
        replyTo:email,
        fields:{'Inscription':'Ressources / newsletter MOKA','E-mail':email,'Origine':source,'Consentement':'Oui','Enregistré le':new Date().toISOString()}
      })
      return NextResponse.json({ok:true,message:'Inscription enregistrée.',notification:notice==='unavailable'?'delayed':notice})
    }
    return NextResponse.json({ok:true,message:'Tu es déjà inscrit.'})
  } catch(error) {
    console.error('[subscribe]',error instanceof Error?error.message:'unknown')
    return NextResponse.json({message:'Inscription temporairement indisponible.'},{status:502})
  }
}
