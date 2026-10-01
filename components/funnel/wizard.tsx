'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { funnel, recommendation, type Answers, type Track } from '@/config/funnel'
import { contact } from '@/config/site'
import { EVENTS, track as trackEvent } from '@/lib/analytics'

export function FunnelWizard({ track }: { track: Track }) {
  const config = funnel[track]
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState(0)
  const [showContact, setShowContact] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [reference, setReference] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [channel, setChannel] = useState('Téléphone')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [requestId, setRequestId] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const mounted = useRef(false)
  const complete = step >= config.questions.length
  const question = config.questions[step]
  const plan = recommendation(track, answers)

  useEffect(() => { setRequestId(crypto.randomUUID()); trackEvent(EVENTS.funnelStart, { track, place: 'wizard' }) }, [track])
  useEffect(() => {
    if (mounted.current) heading.current?.focus()
    else mounted.current = true
    if (complete) trackEvent(EVENTS.funnelResult, { track })
  }, [step, complete, track])

  function planText() {
    return `TON PROCHAIN MOVE — ${config.label}\n\nTON BRIEF\n${config.questions.map(q => `${q.title} ${answers[q.key] || 'À définir'}`).join('\n')}\n\n${plan.title}\n${plan.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n${plan.note}\n\nContact : ${contact.email}\nhttps://mokayakoubi.vercel.app/projet/${track}\n`
  }
  function downloadPlan() {
    const url = URL.createObjectURL(new Blob(['\ufeff' + planText()], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = `mon-plan-${track}-moka.txt`; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    trackEvent(EVENTS.funnelDownload, { track })
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending' || state === 'success') return
    setState('sending'); setMessage('')
    const body = `${planText()}\nPrénom : ${name}\nContact : ${channel}\nTéléphone : ${phone}\nE-mail : ${email}\nDate souhaitée : ${date || 'À définir'}\nPrécisions : ${details}`
    setEmailBody(body)
    const params = new URLSearchParams(window.location.search)
    const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].map(key => [key, params.get(key)?.slice(0,120) || '']))
    try {
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, track, answers, name, phone, email, channel, details, date, consent, website, attribution }),
        signal: AbortSignal.timeout(20000),
      })
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.message || 'La demande n’a pas pu être enregistrée.')
      setReference(result.reference); setState('success'); trackEvent(EVENTS.funnelLead, { track })
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error && error.name !== 'TimeoutError' ? error.message : 'L’envoi n’a pas pu être confirmé. Réessaie ou transmets ton brief par e-mail.')
    }
  }

  return <main id="main-content" className="move-wizard shell">
    <a className="move-back" href="/#start">← Tous les projets</a>
    <div className="move-wizard-layout"><aside><p className="move-kicker">{config.brand}</p><h1>{config.title}</h1><p>{config.description}</p><div className="move-aside-note"><span>↗</span><p>{config.benefit}<br />Tu gardes la main à chaque étape.</p></div><a href="/confidentialite" className="move-small">Tes données restent liées à ta demande.</a></aside>
      <section className="move-panel" aria-label="Préparation de ton projet">
        <div className="move-progress-label"><span>{complete ? 'TON PLAN EST PRÊT' : `QUESTION ${step + 1} SUR ${config.questions.length}`}</span><span>{complete ? '100' : Math.round(step / config.questions.length * 100)} %</span></div>
        <div className="move-progress" role="progressbar" aria-label="Avancement du questionnaire" aria-valuemin={0} aria-valuemax={config.questions.length} aria-valuenow={Math.min(step, config.questions.length)}><span style={{width: `${step / config.questions.length * 100}%`}} /></div>
        {!complete ? <>
          <h2 ref={heading} tabIndex={-1}>{question.title}</h2><p className="move-panel-hint">{question.hint}</p>
          <fieldset className="move-options"><legend className="sr-only">{question.title}</legend>{question.options.map(option => <label key={option} className={answers[question.key] === option ? 'selected' : ''}><input type="radio" name={question.key} value={option} checked={answers[question.key] === option} onChange={() => setAnswers(prev => ({ ...prev, [question.key]: option }))} /><span>{option}</span><span className="move-radio" aria-hidden="true" /></label>)}</fieldset>
          <div className="move-step-actions"><button type="button" className="move-back" onClick={() => setStep(step-1)} disabled={step === 0}>← Retour</button><button className="move-button" disabled={!answers[question.key]} onClick={() => { setStep(step+1); trackEvent(EVENTS.funnelStep, { track, step: step+1 }) }}>{step === config.questions.length - 1 ? 'Voir mon plan' : 'Continuer'} <span aria-hidden="true">→</span></button></div>
          <p className="move-small">Pas de coordonnées à fournir pour découvrir ton plan.</p>
        </> : <>
          <h2 ref={heading} tabIndex={-1}>{plan.title}</h2>
          <ol className="move-plan">{plan.steps.map((s,i)=><li key={s}><span>0{i+1}</span><p>{s}</p></li>)}</ol><p className="move-estimate">{plan.note}</p>
          <div className="move-plan-tools"><button onClick={downloadPlan}>↓ Télécharger mon plan</button><button onClick={() => window.print()}>Imprimer / PDF ↗</button>{state !== 'success' && <button onClick={() => {setStep(0);setShowContact(false);setState('idle');setRequestId(crypto.randomUUID())}}>Modifier mes réponses</button>}</div>
          {!showContact && <div className="move-next"><h3>Et si on le concrétisait ?</h3><p>{track === 'studio' ? 'Propose un créneau. L’équipe te rappelle pour le confirmer.' : 'Transmets ce brief à notre équipe pour préparer la suite.'}</p><button className="move-button" onClick={()=>{setShowContact(true);trackEvent(EVENTS.funnelContact,{track})}}>{track === 'marque' ? 'Faire chiffrer mon projet' : track === 'equipe' ? 'Demander ma simulation' : 'Demander un créneau'} <span aria-hidden="true">↗</span></button></div>}
          {showContact && (state === 'success' ? <div className="move-success" role="status"><span>✓</span><h3>Ta demande est enregistrée.</h3><p>Référence : {reference}. Notre équipe reprendra ton brief et te contactera via le canal choisi.</p><p>{track === 'studio' ? 'Ton créneau sera confirmé par téléphone. Cette demande ne constitue pas une réservation.' : 'Ton devis et le délai restent à confirmer avec l’équipe.'}</p><a href="/">Retour à l’accueil →</a></div> : <form className="move-contact-form" onSubmit={submit}>
            <h3>On fait connaissance ?</h3><p className="move-panel-hint">Ton brief est déjà prêt. Il reste à savoir comment te joindre.</p>
            <label>Ton prénom<input name="name" autoComplete="given-name" required minLength={2} maxLength={80} value={name} onChange={e=>setName(e.target.value)} /></label>
            <label>Comment préfères-tu être contacté ?<select value={channel} onChange={e=>setChannel(e.target.value)}><option>Téléphone</option><option>WhatsApp</option><option>E-mail</option></select></label>
            <label>{channel === 'E-mail' ? 'Téléphone (facultatif)' : 'Ton numéro de téléphone'}<input name="phone" type="tel" autoComplete="tel" placeholder="0550 00 00 00" required={channel !== 'E-mail'} maxLength={30} minLength={8} value={phone} onChange={e=>setPhone(e.target.value)} /></label>
            <label>{channel === 'E-mail' ? 'Ton adresse e-mail' : 'E-mail (facultatif)'}<input name="email" type="email" autoComplete="email" required={channel === 'E-mail'} maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} /></label>
            {track === 'studio' && <label>Date souhaitée (facultative)<input type="date" min={new Intl.DateTimeFormat('en-CA', {timeZone:'Africa/Algiers'}).format(new Date())} value={date} onChange={e=>setDate(e.target.value)} /><small>Une préférence uniquement, à confirmer avec l’équipe.</small></label>}
            <label>Une précision ? (facultatif)<textarea rows={3} maxLength={1200} placeholder={track === 'studio' ? 'Horaire préféré, nombre de personnes…' : 'Nom de l’entreprise, couleurs, besoin particulier…'} value={details} onChange={e=>setDetails(e.target.value)} /></label>
            <div className="move-honeypot" aria-hidden="true"><label>Site web<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} /></label></div>
            <label className="move-consent"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} /><span>J’accepte que l’équipe utilise ces informations pour traiter ma demande et me recontacter. <a href="/confidentialite" target="_blank" rel="noreferrer">Confidentialité</a>.</span></label>
            <button type="submit" className="move-button" disabled={state === 'sending'}>{state === 'sending' ? 'Envoi en cours…' : 'Transmettre ma demande'} <span aria-hidden="true">↗</span></button>
            {state === 'error' && <div className="move-error" role="alert"><p>{message}</p><p>Tu peux aussi ouvrir un e-mail contenant ton brief, puis l’envoyer toi-même.</p><a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Mon prochain move — ${config.label}`)}&body=${encodeURIComponent(emailBody)}`}>Ouvrir mon e-mail prérempli ↗</a><p className="move-small">Destinataire : {contact.email}</p></div>}
          </form>)}
        </>}
      </section>
    </div><noscript>Le questionnaire nécessite JavaScript. Pour préparer ton projet, écris à {contact.email}.</noscript>
  </main>
}
