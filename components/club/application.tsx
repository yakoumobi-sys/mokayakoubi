'use client'
import { useMemo, useState, type FormEvent } from 'react'

type FormValues = { name:string; email:string; phone:string; city:string; stage:string; business:string; goal:string; contribution:string; instagram:string; website:string; consent:boolean }
const empty: FormValues = { name:'', email:'', phone:'', city:'', stage:'', business:'', goal:'', contribution:'', instagram:'', website:'', consent:false }

export function ClubApplication() {
  const [data, setData] = useState<FormValues>(empty)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')
  const [failed, setFailed] = useState(false)
  const edit = (key: keyof FormValues, value: string|boolean) => setData(v=>({ ...v, [key]:value }))
  const emailFallback = useMemo(() => {
    const text = [
      'CANDIDATURE — 1% CLUB',
      'Nom : '+data.name,
      'Email : '+data.email,
      'WhatsApp : '+data.phone,
      'Ville : '+data.city,
      'Stade : '+data.stage,
      'Activité : '+data.business,
      'Objectif : '+data.goal,
      'Contribution : '+data.contribution,
      'Instagram : '+data.instagram,
      'Consentement à être recontacté : '+(data.consent ? 'Oui' : 'Non'),
    ].join('\n')
    return 'mailto:yakoumobi@gmail.com?subject='+encodeURIComponent('Candidature 1% CLUB — '+data.name)+'&body='+encodeURIComponent(text)
  },[data])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(''); setFailed(false)
    if (!data.consent) { setError('Ton accord est nécessaire pour recevoir une réponse.'); return }
    setBusy(true)
    try {
      const response=await fetch('/api/club/apply',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...data, requestId:crypto.randomUUID() }),
      })
      const answer = await response.json()
      if (!response.ok || !answer.ok) throw new Error(answer.message || 'Impossible de confirmer la candidature.')
      setReference(answer.reference)
    } catch (e) {
      setFailed(true)
      setError(e instanceof Error ? e.message : 'Le formulaire ne répond pas. Réessaie plus tard.')
    } finally { setBusy(false) }
  }

  if (reference) return <div className="oc-form oc-form-success" role="status"><span className="oc-success-sign">✓</span><span className="oc-form-label">APPLICATION RECEIVED</span><h3>TON PREMIER<br />MOVE EST FAIT.</h3><p>Ta candidature a bien été enregistrée. Si ton profil correspond à la première cohorte, l’équipe te contactera.</p><div className="oc-reference">RÉFÉRENCE : {reference}</div><p className="oc-fine-print">Ce message confirme la réception, pas l’admission au club.</p><a href="#top" className="oc-link-reset">RETOUR À L’ACCUEIL ↑</a></div>

  return <form className="oc-form" onSubmit={submit}>
    <div className="oc-form-head"><span>FOUNDING 30</span><span>01 — APPLICATION</span></div>
    <h3>LET’S GET<br /><em>TO KNOW YOU.</em></h3>
    <p className="oc-form-subtitle">Quelques questions, 3 minutes environ. Pas de paiement. Pas de promesses : simplement une première rencontre.</p>
    <div className="oc-form-fields">
      <div className="oc-field-grid">
        <label>TON NOM COMPLET <span>*</span><input required maxLength={100} autoComplete="name" placeholder="Nom et prénom" value={data.name} onChange={e=>edit('name',e.target.value)}/></label>
        <label>TA VILLE <span>*</span><input required maxLength={80} autoComplete="address-level2" placeholder="Alger, Oran..." value={data.city} onChange={e=>edit('city',e.target.value)}/></label>
      </div>
      <div className="oc-field-grid">
        <label>TON E-MAIL <span>*</span><input type="email" required maxLength={254} autoComplete="email" placeholder="toi@entreprise.com" value={data.email} onChange={e=>edit('email',e.target.value)}/></label>
        <label>WHATSAPP <span>*</span><input type="tel" required maxLength={32} autoComplete="tel" placeholder="+213 5XX XX XX XX" value={data.phone} onChange={e=>edit('phone',e.target.value)}/></label>
      </div>
      <label>OÙ EN ES-TU ? <span>*</span><select required value={data.stage} onChange={e=>edit('stage',e.target.value)}><option value="">Choisis ton stade</option><option value="Entreprise en activité">J’ai une entreprise en activité</option><option value="Projet lancé / premières ventes">J’ai lancé un projet / mes premières ventes</option><option value="Projet en préparation">Je prépare activement mon lancement</option></select></label>
      <label>QU’EST-CE QUE TU CONSTRUIS ? <span>*</span><textarea required minLength={15} maxLength={1200} rows={3} placeholder="Ton activité, tes clients, ce que tu fais aujourd'hui..." value={data.business} onChange={e=>edit('business',e.target.value)}/></label>
      <label>TON OBJECTIF POUR LES 90 PROCHAINS JOURS ? <span>*</span><textarea required minLength={15} maxLength={1200} rows={3} placeholder="Un objectif réel et précis." value={data.goal} onChange={e=>edit('goal',e.target.value)}/></label>
      <label>QU’EST-CE QUE TU PEUX APPORTER AU CERCLE ? <span>*</span><textarea required minLength={15} maxLength={1200} rows={3} placeholder="Expérience, compétences, contacts, entraide..." value={data.contribution} onChange={e=>edit('contribution',e.target.value)}/></label>
      <label>INSTAGRAM OU LINKEDIN <span className="oc-optional">(FACULTATIF)</span><input maxLength={200} placeholder="@tonprofil ou lien" value={data.instagram} onChange={e=>edit('instagram',e.target.value)}/></label>
      <div className="oc-honeypot" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={data.website} onChange={e=>edit('website',e.target.value)}/></label></div>
      <label className="oc-check"><input type="checkbox" required checked={data.consent} onChange={e=>edit('consent',e.target.checked)}/><span>J’accepte que mes informations soient utilisées pour étudier ma candidature et me recontacter. <a href="/confidentialite" target="_blank" rel="noopener noreferrer">Confidentialité ↗</a></span></label>
    </div>
    {error && <div role="alert" className="oc-form-error">{error}{failed && <p>Tu peux aussi transmettre ta candidature via ton application e-mail.</p>}</div>}
    {failed && data.consent && <a className="oc-fallback" href={emailFallback}>OU ENVOYER MA CANDIDATURE PAR E-MAIL ↗</a>}
    <button className="oc-form-submit" type="submit" disabled={busy}>{busy?'ENREGISTREMENT...':'ENVOYER MA CANDIDATURE'}<span aria-hidden="true">{busy?'…':'↗'}</span></button>
    <p className="oc-fine-print">Une candidature ne garantit pas une place. Aucun paiement n’est demandé ici.</p>
  </form>
}