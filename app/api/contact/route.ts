import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { notifySubmission } from '@/lib/notifications'
export const runtime='nodejs'
export const dynamic='force-dynamic'
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const types=['Partenariat de marque','Conférence / événement','Projet business','Autre']
function reply(obj:object,status:number){return NextResponse.json(obj,{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(request:NextRequest){
  if(request.headers.get('origin')&&request.headers.get('origin')!==request.nextUrl.origin)return reply({message:'Origine non valide.'},403)
  if(!request.headers.get('content-type')?.includes('application/json'))return reply({message:'Format non valide.'},415)
  if(Number(request.headers.get('content-length')||0)>10000)return reply({message:'Demande trop volumineuse.'},413)
  let raw:Record<string,unknown>
  try {
    const text=await request.text()
    if(text.length>10000)throw new Error('Too large')
    raw=JSON.parse(text)
    if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('Bad request')
  } catch{return reply({message:'Demande non valide.'},400)}
  const str=(key:string,max:number)=>typeof raw[key]==='string'&&(raw[key] as string).length<=max?(raw[key] as string).trim():''
  if(str('website',200))return reply({message:'Demande non valide.'},400)
  const id=str('requestId',36), name=str('name',100),email=str('email',254).toLowerCase(),
    phone=str('phone',32),organization=str('organization',160),type=str('type',60),
    message=str('message',3500),budget=str('budget',160),eventDate=str('eventDate',40)
  if(!uuid.test(id)||name.length<2||!emailRe.test(email)||!types.includes(type)||message.length<20||raw.consent!==true)return reply({message:'Vérifie les informations obligatoires.'},400)
  const db=getSupabaseAdmin()
  if(!db)return reply({message:'Enregistrement momentanément indisponible. Écris-nous par e-mail.'},503)
  const date=new Date().toISOString()
  const {error}=await db.from('contact_requests').upsert({id,name,email,phone:phone||null,organization:organization||null,type,message,budget:budget||null,event_date:eventDate||null,consent_at:date},{onConflict:'id',ignoreDuplicates:true})
  if(error){console.error('[contact] Storage unavailable',error.message);return reply({message:'Impossible d’enregistrer la proposition. Réessaie.'},502)}
  const notice=await notifySubmission({
    kind:'contact',reference:id,replyTo:email,
    subject:'[MOKA] '+type+' — '+name,
    fields:{'Type de demande':type,'Référence':id,'Nom':name,'E-mail':email,
      'Téléphone / WhatsApp':phone||'Non renseigné','Marque / organisation':organization||'Non renseigné',
      'Message et objectifs':message,'Budget estimé':budget||'Non renseigné',
      'Date souhaitée':eventDate||'Non renseignée','Consentement':'Oui','Date de consentement':date}
  })
  return reply({ok:true,reference:'MOKA-'+id.slice(0,8).toUpperCase(),notification:notice==='unavailable'?'delayed':notice},201)
}
