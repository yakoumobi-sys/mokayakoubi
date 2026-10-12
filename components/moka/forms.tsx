'use client'
/* eslint-disable react/no-unescaped-entities */
import { useState, type FormEvent } from 'react'

export function NewsletterSignup({source='site'}:{source?:string}){
 const [email,setEmail]=useState('')
 const [consent,setConsent]=useState(false)
 const [website,setWebsite]=useState('')
 const [busy,setBusy]=useState(false)
 const [feedback,setFeedback]=useState('')
 const [success,setSuccess]=useState(false)
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();setBusy(true);setFeedback('')
   try{
     const r=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,consent,website,source})})
     const data=await r.json()
     if(!r.ok||!data.ok)throw new Error(data.message||'Impossible de confirmer l’inscription.')
     setSuccess(true);setFeedback(data.message)
   }catch(err){setFeedback(err instanceof Error?err.message:'Le formulaire est temporairement indisponible.')}
   finally{setBusy(false)}
 }
 return <div className="mk-signup">
   <span className="mk-eyebrow">FREE UPDATES / BUILD BETTER</span>
   <h3>DES IDÉES DANS <em>TA BOÎTE MAIL.</em></h3>
   <p>Reçois les nouveaux contenus et ressources MOKA. Inscription gratuite, désinscription sur demande.</p>
   {success?<p role="status" className="mk-form-success">{feedback}</p>:
   <form onSubmit={submit}>
     <div className="mk-signup-row"><label className="mk-sr-only" htmlFor={'mk-email-'+source}>Ton adresse e-mail</label><input id={'mk-email-'+source} type="email" required maxLength={254} autoComplete="email" placeholder="ton@email.com" value={email} onChange={e=>setEmail(e.target.value)}/><button disabled={busy||!consent} type="submit">{busy?'ENVOI…':'S’INSCRIRE ↗'}</button></div>
     <label className="mk-form-consent"><input type="checkbox" checked={consent} required onChange={e=>setConsent(e.target.checked)}/> J’accepte de recevoir les nouveaux contenus de MOKA par e-mail. <a href="/confidentialite">Confidentialité</a>.</label>
     <div className="mk-form-honeypot" aria-hidden="true"><label>Website<input value={website} tabIndex={-1} autoComplete="off" onChange={e=>setWebsite(e.target.value)}/></label></div>
     {feedback&&<p className="mk-form-error" role="alert">{feedback}</p>}
   </form>}
 </div>
}

type ContactValues={name:string;email:string;phone:string;organization:string;type:string;message:string;budget:string;eventDate:string;website:string;consent:boolean}
const initial:ContactValues={name:'',email:'',phone:'',organization:'',type:'',message:'',budget:'',eventDate:'',website:'',consent:false}
export function ContactForm(){
 const [values,setValues]=useState<ContactValues>(initial)
 const [busy,setBusy]=useState(false)
 const [reference,setReference]=useState('')
 const [error,setError]=useState('')
 const set=(field:keyof ContactValues,value:string|boolean)=>setValues(v=>({...v,[field]:value}))
 const mailto='mailto:yakoumobi@gmail.com?subject='+encodeURIComponent('Partenariat / Conférence — '+values.name)+'&body='+encodeURIComponent(Object.entries(values).filter(([k])=>!['consent','website'].includes(k)).map(([k,v])=>k+': '+v).join('\n'))
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();setBusy(true);setError('')
   try{
     const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,requestId:crypto.randomUUID()})})
     const result=await response.json()
     if(!response.ok||!result.ok)throw new Error(result.message||'Impossible de confirmer la demande.')
     setReference(result.reference)
   }catch(err){setError(err instanceof Error?err.message:'Formulaire indisponible.')}
   finally{setBusy(false)}
 }
 if(reference)return <div className="mk-contact-success" role="status"><span>✓</span><h3>DEMANDE ENREGISTRÉE.</h3><p>Merci ! Ta proposition a été enregistrée sous la référence <strong>{reference}</strong>. Nous reviendrons vers toi si elle correspond aux projets en cours.</p></div>
 return <form className="mk-contact-form" onSubmit={submit}>
   <div className="mk-contact-grid"><label>TON NOM *<input value={values.name} onChange={e=>set('name',e.target.value)} required minLength={2} maxLength={100} autoComplete="name" placeholder="Nom et prénom"/></label><label>E-MAIL *<input value={values.email} onChange={e=>set('email',e.target.value)} type="email" required maxLength={254} autoComplete="email" placeholder="email@entreprise.com"/></label></div>
   <div className="mk-contact-grid"><label>WHATSAPP / TÉLÉPHONE<input value={values.phone} onChange={e=>set('phone',e.target.value)} maxLength={32} autoComplete="tel" placeholder="+213…"/></label><label>MARQUE / ORGANISATION<input value={values.organization} onChange={e=>set('organization',e.target.value)} maxLength={160} placeholder="Nom de l'entreprise"/></label></div>
   <label>TYPE DE COLLABORATION *<select required value={values.type} onChange={e=>set('type',e.target.value)}><option value="">Choisir une catégorie</option><option>Partenariat de marque</option><option>Conférence / événement</option><option>Projet business</option><option>Autre</option></select></label>
   <label>DÉCRIS TON PROJET *<textarea required minLength={20} maxLength={3500} rows={6} value={values.message} onChange={e=>set('message',e.target.value)} placeholder="Les objectifs, le public, les livrables, les informations importantes…"/></label>
   <div className="mk-contact-grid"><label>BUDGET INDICATIF<input maxLength={160} value={values.budget} onChange={e=>set('budget',e.target.value)} placeholder="Budget ou fourchette"/></label><label>DATE SOUHAITÉE<input maxLength={40} value={values.eventDate} onChange={e=>set('eventDate',e.target.value)} placeholder="Ex. 15 novembre 2026"/></label></div>
   <div className="mk-form-honeypot" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={values.website} onChange={e=>set('website',e.target.value)}/></label></div>
   <label className="mk-form-consent"><input type="checkbox" required checked={values.consent} onChange={e=>set('consent',e.target.checked)}/> J’accepte l’utilisation de ces informations pour étudier ma demande et me recontacter. <a href="/confidentialite">Confidentialité ↗</a></label>
   {error&&<div role="alert" className="mk-form-error">{error}<p>Si nécessaire, <a href={mailto}>envoie ton brief directement par e-mail ↗</a>.</p></div>}
   <button type="submit" className="mk-contact-submit" disabled={busy}>{busy?'ENREGISTREMENT…':'ENVOYER MA PROPOSITION ↗'}</button>
 </form>
}
