import Image from 'next/image'
import { ClubApplication } from '@/components/club/application'

const experience = [
  { n:'01', icon:'◇', eyebrow:'REAL CONVERSATIONS', title:'THE BOARDROOM', desc:'Deux sessions collectives par mois. Des problématiques concrètes, des décisions et des retours sans filtre.', tag:'MASTERMINDS' },
  { n:'02', icon:'◎', eyebrow:'REAL CONNECTIONS', title:'THE INNER CIRCLE', desc:'Des rencontres physiques à Alger pour bâtir des relations fortes entre personnes qui passent à l’action.', tag:'NETWORKING' },
  { n:'03', icon:'✳', eyebrow:'REAL KNOWLEDGE', title:'THE GROWTH LAB', desc:'Des ateliers et masterclasses sur la vente, le marketing, les systèmes, le leadership et la croissance.', tag:'LEARNING' },
  { n:'04', icon:'↗', eyebrow:'REAL EXECUTION', title:'THE 1% CHALLENGE', desc:'Un objectif à 90 jours. Des engagements mesurables. Un groupe qui t’aide à tenir tes promesses.', tag:'ACCOUNTABILITY' },
]
const faqs = [
  ['C’est quoi exactement le 1% CLUB ?', 'Un cercle privé d’entrepreneurs créé par MOKA, avec des rencontres, des sessions de travail et un programme d’exécution sur 90 jours. Le lancement de la première cohorte est en préparation.'],
  ['Faut-il déjà avoir une entreprise ?', 'Le club s’adresse en priorité aux personnes qui ont déjà commencé à construire une activité, même petite. Les candidatures sont évaluées sur le sérieux, l’engagement et la contribution possible au groupe.'],
  ['Pourquoi 30 membres ?', 'Nous prévoyons une première cohorte limitée à 30 membres pour préserver la qualité des échanges et permettre des rencontres utiles. Ce chiffre représente la capacité envisagée, pas des inscriptions déjà confirmées.'],
  ['Combien coûte l’adhésion ?', 'Les conditions de la cohorte fondatrice et le prix définitif seront communiqués aux candidats retenus avant tout engagement. Déposer sa candidature est gratuit.'],
  ['Est-ce que ma candidature garantit une place ?', 'Non. Chaque dossier est étudié selon l’adéquation avec le club et les places disponibles. Aucune adhésion ni aucun paiement ne sont effectués sur ce site.'],
  ['Où auront lieu les rencontres ?', 'Les rencontres physiques sont prévues à Alger. Certaines sessions pourront se tenir en ligne pour faciliter la participation. Les détails seront confirmés avant le lancement.']
]
function Arrow() { return <span aria-hidden="true">↗</span> }

export function ClubSite() {
  return <div className="oc-site" id="top">
    <header className="oc-header">
      <div className="oc-shell oc-header-inner">
        <a className="oc-logo" href="#top" aria-label="1% Club — Accueil"><span className="oc-logo-numeral">1%</span><span className="oc-logo-word">CLUB<span className="oc-dot">.</span></span></a>
        <nav className="oc-nav" aria-label="Navigation principale">
          <a href="#vision">La vision</a><a href="#experience">L’expérience</a><a href="#programme">Le programme</a><a href="#fondateur">Le fondateur</a>
        </nav>
        <a className="oc-nav-cta" href="#apply">Candidater <Arrow /></a>
      </div>
    </header>

    <main id="main-content">
      <section className="oc-hero" aria-labelledby="hero-heading">
        <div className="oc-hero-grid oc-shell">
          <div className="oc-hero-main">
            <div className="oc-overline"><span className="oc-live-dot" /> PRIVATE FOUNDERS CIRCLE <span className="oc-overline-sep">/</span> ALGIERS, DZ</div>
            <div className="oc-hero-copy">
              <p className="oc-hero-small">YOU WERE NOT MADE TO FIT IN.</p>
              <h1 id="hero-heading">BUILT<br />FOR THE<br /><em>1%.</em></h1>
              <div className="oc-hero-bottom">
                <p>Un cercle privé pour ceux qui refusent de rester spectateurs. <strong>Construis. Connecte-toi. Élève ton niveau.</strong></p>
                <a href="#apply" className="oc-button oc-button-light">REJOINDRE LA LISTE DES CANDIDATS <Arrow /></a>
              </div>
            </div>
            <div className="oc-hero-proof"><span>FOUNDED BY <b>MOKA YAKOUBI</b></span><span>EST. 2026 <span aria-hidden="true">✳</span> ALGERIA</span></div>
          </div>
          <div className="oc-hero-image">
            <Image src="/moka.jpg" fill priority alt="Portrait de Moka Yakoubi, fondateur du 1% CLUB" sizes="(max-width: 820px) 100vw, 42vw" style={{objectFit:'cover',objectPosition:'center 28%'}} />
            <div className="oc-image-shade" />
            <div className="oc-image-index">01 / THE FOUNDER</div>
            <div className="oc-image-sign"><span>DIFFERENT THINKING.</span><strong>DIFFERENT RESULTS.</strong></div>
            <div className="oc-image-stamp" aria-hidden="true">1%</div>
          </div>
        </div>
        <div className="oc-hero-floor oc-shell"><span>SCROLL TO EXPLORE</span><span>↓</span><span>LESS TALK. MORE BUILDING.</span></div>
      </section>

      <section id="vision" className="oc-manifesto">
        <div className="oc-shell oc-manifesto-inner">
          <div className="oc-section-kicker"><span>001 — THE MANIFESTO</span><span>WE BELIEVE IN BUILDERS.</span></div>
          <h2>THE WORLD IS FULL OF<br /><span>PEOPLE WHO TALK.</span><br /><em>WE BUILD.</em></h2>
          <div className="oc-manifesto-bottom"><p>Le talent ne suffit pas. La motivation non plus. Ce qui change une trajectoire, c’est l’exécution, l’entourage et les décisions prises quand personne ne regarde.</p><p>Le 1% CLUB rassemble des fondateurs qui veulent avancer plus vite, ensemble. Sans poudre aux yeux. Sans promesse de richesse facile.</p></div>
        </div>
      </section>

      <section className="oc-stats" aria-label="Le concept en chiffres">
        <div className="oc-shell oc-stats-grid">
          <div><strong>30</strong><p>PLACES MAXIMUM ENVISAGÉES<br />POUR LA COHORTE FONDATRICE</p></div>
          <div><strong>90<span>J</span></strong><p>UN CYCLE POUR<br />PASSER À L’ACTION</p></div>
          <div><strong>01<span>%</span></strong><p>UNE MENTALITÉ.<br />PAS UN TITRE.</p></div>
        </div>
      </section>

      <section id="experience" className="oc-experience oc-shell">
        <div className="oc-section-kicker"><span>002 — THE EXPERIENCE</span><span>NOT ANOTHER NETWORKING GROUP</span></div>
        <div className="oc-section-heading"><h2>NOT JUST A CLUB.<br /><em>AN ADVANTAGE.</em></h2><p>Les bonnes personnes. Les bonnes conversations. Les bons systèmes pour transformer ton ambition en décisions concrètes.</p></div>
        <div className="oc-feature-grid">
          {experience.map(item=><article className="oc-feature" key={item.n}>
            <div className="oc-feature-top"><span>{item.n} / 04</span><span className="oc-feature-icon">{item.icon}</span></div>
            <div className="oc-feature-info"><span className="oc-feature-eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.desc}</p></div>
            <div className="oc-feature-bottom"><span>{item.tag}</span><span>↗</span></div>
          </article>)}
        </div>
      </section>

      <section id="programme" className="oc-program">
        <div className="oc-shell">
          <div className="oc-section-kicker"><span>003 — THE PROCESS</span><span>THE FIRST 90 DAYS</span></div>
          <div className="oc-program-top"><h2>NO MORE<br /><em>ONE DAY.</em><br />DAY ONE.</h2><p>Un cadre de 90 jours pour structurer ta progression. Chaque mois a un objectif, chaque session doit créer une action.</p></div>
          <div className="oc-timeline">
            <article><span className="oc-timeline-label">MONTH 01 / CLARITY</span><strong>01</strong><h3>KNOW YOUR GAME.</h3><p>Identifier tes véritables leviers, poser un objectif et définir les priorités qui comptent.</p></article>
            <article><span className="oc-timeline-label">MONTH 02 / EXECUTION</span><strong>02</strong><h3>DO THE WORK.</h3><p>Tester, vendre, structurer et résoudre les obstacles avec le retour du groupe.</p></article>
            <article><span className="oc-timeline-label">MONTH 03 / MOMENTUM</span><strong>03</strong><h3>BUILD WHAT LASTS.</h3><p>Mesurer le chemin parcouru, consolider les systèmes et préparer le prochain cycle.</p></article>
          </div>
          <div className="oc-program-note"><span className="oc-note-star">✳</span><p>Le programme sera finalisé avec les membres fondateurs. Nous ne promettons aucun résultat financier garanti : nous construisons un environnement favorable à l’action.</p></div>
        </div>
      </section>

      <section className="oc-fit oc-shell" id="selection">
        <div className="oc-section-kicker"><span>004 — WHO BELONGS HERE</span><span>THE RIGHT ROOM CHANGES EVERYTHING</span></div>
        <div className="oc-fit-grid">
          <div className="oc-fit-left"><h2>THIS IS<br />FOR THE<br /><em>BUILDERS.</em></h2><p>Pas besoin d’un million sur ton compte. Tu dois simplement avoir commencé et être prêt à contribuer.</p></div>
          <div className="oc-fit-list">
            <div><span className="oc-fit-symbol">+</span><span>Tu as lancé un projet ou une activité, même à petite échelle.</span></div>
            <div><span className="oc-fit-symbol">+</span><span>Tu veux être entouré de personnes qui passent à l’exécution.</span></div>
            <div><span className="oc-fit-symbol">+</span><span>Tu acceptes de partager tes erreurs et d’apprendre des autres.</span></div>
            <div><span className="oc-fit-symbol">+</span><span>Tu respectes la confidentialité, le temps et la parole donnée.</span></div>
            <div className="oc-fit-no"><span className="oc-fit-symbol">−</span><span>Pas pour ceux qui cherchent un raccourci ou un statut à afficher.</span></div>
          </div>
        </div>
      </section>

      <section id="fondateur" className="oc-founder">
        <div className="oc-shell oc-founder-grid">
          <div className="oc-founder-image"><Image src="/moka.jpg" fill alt="Moka, entrepreneur et fondateur de Caractère" sizes="(max-width: 820px) 100vw, 44vw" style={{objectFit:'cover',objectPosition:'center 25%'}}/><span className="oc-founder-caption">MOKA YAKOUBI / ALGIERS</span></div>
          <div className="oc-founder-copy"><div className="oc-section-kicker"><span>005 — THE FOUNDER</span><span>BUILT IN ALGERIA</span></div><h2>BUILT BY<br />A <em>BUILDER.</em></h2><p>Je suis Mohamed Yakoubi, MOKA. Entrepreneur et fondateur de Caractère.</p><p>J’ai appris une chose en construisant une entreprise : les personnes avec qui tu échanges, les questions qu’elles te posent et les standards qu’elles te poussent à adopter peuvent changer ton niveau.</p><p>J’ai envie de créer ce cercle ici, en Algérie. Un endroit pour construire plus grand, ensemble.</p><div className="oc-founder-sign">— MOKA</div><a href="https://www.instagram.com/mokayakoubi" target="_blank" rel="noopener noreferrer" className="oc-founder-link">DÉCOUVRIR @MOKAYAKOUBI <Arrow /></a></div>
        </div>
      </section>

      <section className="oc-membership oc-shell">
        <div className="oc-section-kicker"><span>006 — THE FOUNDING COHORT</span><span>APPLICATION-BASED MEMBERSHIP</span></div>
        <div className="oc-membership-grid">
          <div><h2>THE<br />FOUNDING <em>30.</em></h2><p>Une première cohorte pensée pour créer de vraies connexions plutôt qu’une grande liste de noms.</p></div>
          <div className="oc-membership-card"><span className="oc-member-top">FOUNDING MEMBER / 2026</span><div className="oc-card-mark">1%<span>CLUB.</span></div><div className="oc-card-bottom"><span>BUILD DIFFERENT.</span><span>BY MOKA ↗</span></div></div>
          <div className="oc-membership-includes"><span>LE CERCLE EN PRÉPARATION</span><p>Rencontres privées à Alger</p><p>Sessions de travail entre fondateurs</p><p>Intervenants et masterclasses</p><p>Challenge d’exécution sur 90 jours</p><p>Accès sur candidature uniquement</p></div>
        </div>
      </section>

      <section className="oc-faq oc-shell" id="faq">
        <div className="oc-section-kicker"><span>007 — QUESTIONS</span><span>GOOD TO KNOW</span></div>
        <div className="oc-faq-grid"><h2>NO<br /><em>GUESSWORK.</em></h2><div className="oc-faq-items">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section id="apply" className="oc-apply">
        <div className="oc-shell oc-apply-grid">
          <div className="oc-apply-intro"><div className="oc-section-kicker"><span>008 — YOUR NEXT MOVE</span></div><p className="oc-apply-index">APPLICATION / FOUNDING MEMBERS</p><h2>YOUR<br />MOVE<span>.</span></h2><p>Les premières candidatures nous aideront à former un groupe de fondateurs compatibles et ambitieux. Dis-nous ce que tu construis et ce que tu peux apporter.</p><div className="oc-apply-footer-note"><span className="oc-live-dot"/> CANDIDATURE GRATUITE · AUCUN PAIEMENT</div></div>
          <ClubApplication />
        </div>
      </section>
    </main>

    <footer className="oc-footer"><div className="oc-shell"><div className="oc-footer-top"><a className="oc-logo" href="#top"><span className="oc-logo-numeral">1%</span><span className="oc-logo-word">CLUB<span className="oc-dot">.</span></span></a><span>BUILT IN ALGERIA. BUILT DIFFERENT.</span></div><div className="oc-footer-bottom"><span>© {new Date().getFullYear()} 1% CLUB BY MOKA</span><div><a href="https://www.instagram.com/mokayakoubi" rel="noopener noreferrer" target="_blank">INSTAGRAM ↗</a><a href="/confidentialite">CONFIDENTIALITÉ</a><a href="mailto:yakoumobi@gmail.com">CONTACT</a></div><a href="#top" className="oc-back-top">BACK TO TOP ↑</a></div></div></footer>
  </div>
}