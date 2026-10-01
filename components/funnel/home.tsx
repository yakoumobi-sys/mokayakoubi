import Image from 'next/image'
import { funnel, tracks } from '@/config/funnel'
import { contact, profile } from '@/config/site'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function FunnelHome() {
  return <main id="main-content" className="move-home">
    <section id="top" className="move-hero shell">
      <div className="move-hero-copy">
        <p className="move-kicker"><span className="move-status" /> DE L’IDÉE AU TERRAIN · ALGÉRIE</p>
        <h1>Ton prochain<br />move commence<br /><span>ici.</span><span className="move-star" aria-hidden="true">↗</span></h1>
        <p className="move-intro">Une marque à lancer. Une équipe à habiller.<br className="hidden sm:block" /> Du contenu à créer. On passe à l’action ?</p>
        <a className="move-button" href="#start">Je choisis mon projet <span aria-hidden="true">↗</span></a>
        <p className="move-small">Un premier plan gratuit. Une équipe pour la suite.</p>
      </div>
      <div className="move-portrait">
        <Image src={profile.photo} alt="Moka Yakoubi, fondateur de Caractère" fill priority sizes="(max-width: 760px) 100vw, 45vw" className="object-cover" />
        <span className="move-portrait-tag">LE FONDATEUR, SUR LE TERRAIN.</span>
        <div className="move-portrait-caption"><span>Moka<br />Yakoubi<span className="move-lime">.</span></span><p>Entrepreneur.<br />Fondateur de Caractère.</p></div>
      </div>
    </section>
    <div className="shell"><div className="move-proof"><p><strong>Une idée devient concrète<br />quand tu fais le premier pas.</strong></p><div><strong>01</strong><span>Choisis ton objectif</span></div><div><strong>02</strong><span>Prépare ton plan</span></div><div><strong>03</strong><span>Échange avec l’équipe</span></div></div></div>
    <section id="start" className="shell move-section">
      <div className="move-section-heading"><p className="move-kicker">TON PROCHAIN MOVE</p><div><h2>Qu’est-ce que tu veux<br /><em>concrétiser ?</em></h2><p>Trois chemins. Un point de départ : ton projet.</p></div></div>
      <div className="move-cards">{tracks.map(id => { const item = funnel[id]; return <TrackedLink key={id} href={`/projet/${id}`} event={EVENTS.funnelStart} props={{ track: id, place: 'home' }} className={`move-card move-card-${id}`}>
        <div className="move-card-top"><span>{item.brand}</span><span>{item.number} /</span></div>
        <div className="move-art" aria-hidden="true">{id === 'marque' ? <div className="move-shirt"><span>YOUR<br />BRAND<span>®</span></span></div> : id === 'equipe' ? <div className="move-team"><div>VOTRE<br />LOGO</div><div>VOTRE<br />LOGO</div><div>VOTRE<br />LOGO</div></div> : <div className="move-sound"><span className="move-rec">● REC</span><div>{[22,48,70,40,92,62,100,50,78,38,62,26].map((height,i)=><i key={i} style={{height}} />)}</div></div>}</div>
        <div className="move-card-copy"><h3>{item.label}</h3><p>{item.benefit}</p><span className="move-card-link">{item.cta}<span aria-hidden="true">↗</span></span></div>
      </TrackedLink> })}</div>
    </section>
    <section id="projects" className="move-dark"><div className="shell move-manifesto"><div><p className="move-kicker">MOINS D’HÉSITATION. PLUS D’ACTION.</p><h2>Tu n’as pas besoin<br />d’avoir tout prévu.<br /><em>Juste de commencer.</em></h2></div><div className="move-process"><article><span>01</span><div><h3>Tu nous parles de ton idée.</h3><p>Quelques questions simples pour comprendre ton besoin, ton budget ou tes délais.</p></div></article><article><span>02</span><div><h3>Tu repars avec un plan.</h3><p>Une recommandation utile et téléchargeable, sans obligation de laisser tes coordonnées.</p></div></article><article><span>03</span><div><h3>On prépare la suite ensemble.</h3><p>Échantillon, simulation ou séance au studio : une personne reprend ton brief avec toi.</p></div></article></div></div></section>
    <section id="learn" className="shell move-section"><div className="move-section-heading"><p className="move-kicker">À GARDER SOUS LA MAIN</p><div><h2>De quoi avancer.<br /><em>Même dès aujourd’hui.</em></h2></div></div><div className="move-resources">
      <a href="/build-your-brand-caractere-fr.pdf" download><span className="move-book">C.</span><div><small>GUIDE GRATUIT · PDF</small><h3>Lancer ta marque avec Caractère</h3><p>Une ressource pour préparer ton projet textile.</p></div><span aria-label="Télécharger">↓</span></a>
      <a href="/the-moka-playbook-fr.pdf" download><span className="move-book move-book-light">M.</span><div><small>GUIDE GRATUIT · PDF</small><h3>The Moka Playbook</h3><p>Psychologie, discipline, communication et business.</p></div><span aria-label="Télécharger">↓</span></a>
    </div></section>
    <section className="shell move-faq"><div><p className="move-kicker">AVANT DE TE LANCER</p><h2>Les bonnes<br />questions.</h2></div><div>{[
      ['Est-ce que le plan est gratuit ?', 'Oui. Réponds aux questions et consulte ton plan sans laisser tes coordonnées. Tu peux ensuite demander à être recontacté pour un devis ou une séance.'],
      ['Je n’ai pas encore de logo. Je peux commencer ?', 'Oui. Indique simplement où tu en es. Ton premier échange permettra de préciser le produit, le visuel et les fichiers à préparer.'],
      ['Puis-je commander une seule pièce ?', 'La personnalisation est possible à partir d’une pièce selon le support disponible. Les séries confectionnées sur mesure sont étudiées sur devis.'],
      ['La demande studio réserve-t-elle mon créneau ?', 'Non. Ta date est une préférence. Notre équipe t’appelle pour vérifier les disponibilités et confirmer la réservation.'],
      ['Qui va me répondre ?', 'L’équipe concernée reprend les informations de ton brief pour discuter de ton projet. Moka ne répond pas personnellement à chaque demande.'],
    ].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <section id="contact" className="move-contact"><div className="shell"><p className="move-kicker">UNE AUTRE IDÉE EN TÊTE ?</p><h2>Parlons-en<span>↗</span></h2><p>Partenariat, conférence ou collaboration : explique-moi ton projet.</p><a href={`mailto:${contact.email}`}>{contact.email}</a></div></section>
    <footer className="shell move-footer"><a className="nav-wordmark" href="/">moka.</a><p>Construit avec caractère. Depuis l’Algérie.</p><div><a href="https://www.instagram.com/mokayakoubi" target="_blank" rel="noreferrer">Instagram ↗</a><a href="/confidentialite">Confidentialité</a></div></footer>
  </main>
}
