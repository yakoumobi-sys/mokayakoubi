import Image from 'next/image'
import Link from 'next/link'

export const videos = [
  { id: 'zI1PW5HC3BM', label: 'CONFÉRENCE 01', title: 'Apprendre avec Moka', description: 'Une conférence à retrouver gratuitement sur YouTube.', url: 'https://youtu.be/zI1PW5HC3BM?si=CZGH5sWfz7TyHlcd' },
  { id: 'KoKkuErzN9c', label: 'CONFÉRENCE 02', title: 'Une autre façon de construire', description: 'Une deuxième intervention accessible gratuitement.', url: 'https://youtu.be/KoKkuErzN9c?si=RnmERS2HKpe8yjHH' }
] as const

export function VideoCard({ video, number }: { video: typeof videos[number], number: string }) {
  return <a className="mk-video" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`Regarder ${video.label} sur YouTube (nouvel onglet)`}>
    <div className="mk-video-cover" style={{ backgroundImage: `linear-gradient(180deg,transparent 20%,#0a0b0bd1 100%),url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}>
      <span className="mk-video-count">{number} / 02</span>
      <span className="mk-play" aria-hidden="true">▶</span>
      <span className="mk-video-cover-note">WATCH ON YOUTUBE ↗</span>
    </div>
    <div className="mk-video-meta"><div><span className="mk-eyebrow">{video.label} · GRATUIT</span><h3>{video.title}</h3><p>{video.description}</p></div><span className="mk-diagonal">↗</span></div>
  </a>
}

export function MokaHeader() {
  return <header className="mk-header">
    <div className="mk-shell mk-header-row">
      <Link className="mk-wordmark" href="/" aria-label="Moka Yakoubi - Accueil">MOKA<span>.</span></Link>
      <nav className="mk-nav" aria-label="Navigation principale">
        <Link href="/#about">Mon histoire</Link>
        <Link href="/ressources">Gratuit</Link>
        <Link href="/projets">Projets</Link>
        <Link href="/club">Le club</Link>
        <Link href="/conferences">Conférences</Link>
      </nav>
      <Link className="mk-header-cta" href="/partenariats">COLLABORER <span>↗</span></Link>
    </div>
  </header>
}

export function MokaFooter() {
  return <footer className="mk-footer">
    <div className="mk-shell">
      <div className="mk-footer-top"><div><Link href="/" className="mk-footer-wordmark">MOKA<span>.</span></Link><p>BUILD IT. SHARE IT. REPEAT.</p></div><div className="mk-footer-menu"><Link href="/ressources">Ressources</Link><Link href="/club">DZ Founders Club</Link><Link href="/projets">Mes projets</Link><Link href="/conferences">Speaking</Link><Link href="/partenariats">Partenariats</Link><Link href="/journal">Journal</Link></div></div>
      <div className="mk-footer-bottom"><span>© {new Date().getFullYear()} MOKA YAKOUBI · BUILT IN ALGERIA 🇩🇿</span><div><a href="https://instagram.com/mokayakoubi" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a><a href="mailto:yakoumobi@gmail.com">CONTACT ↗</a><Link href="/confidentialite">CONFIDENTIALITÉ</Link></div></div>
    </div>
  </footer>
}

export function MokaFrame({ children }: { children: React.ReactNode }) {
  return <div className="mk-site"><MokaHeader />{children}<MokaFooter /></div>
}

export function MokaHome() {
  return <MokaFrame>
    <main id="main-content">
      <section className="mk-hero" id="top"><div className="mk-shell mk-hero-grid">
        <div className="mk-hero-copy">
          <div className="mk-kicker"><span className="mk-dot" /> MOHAMED YAKOUBI <span className="mk-kicker-sep">/</span> ENTREPRENEUR · ALGÉRIE</div>
          <div className="mk-hero-core">
            <div className="mk-hero-small">FOUNDER. CREATOR. BUILDER.</div>
            <h1>I DON’T JUST<br/>TALK BUSINESS.<br/><em>I BUILD IT.</em></h1>
            <p>Je suis Moka. Je construis des entreprises, je partage ce que j’apprends sur le terrain et j’aide la prochaine génération à passer à l’action.</p>
            <div className="mk-actions"><Link className="mk-button mk-button-lime" href="/ressources">APPRENDRE GRATUITEMENT <span>↗</span></Link><Link className="mk-inline-link" href="/#about">DÉCOUVRIR MON HISTOIRE ↗</Link></div>
          </div>
          <div className="mk-hero-sign"><span>NO THEORY WITHOUT EXECUTION.</span><span>ALGIERS · DZ <b>✳</b></span></div>
        </div>
        <div className="mk-hero-portrait"><Image src="/moka.jpg" alt="Mohamed Yakoubi, entrepreneur et créateur Moka" fill priority sizes="(max-width: 860px) 100vw, 43vw" style={{objectFit:'cover',objectPosition:'center 25%'}}/><div className="mk-portrait-gradient"/><span className="mk-portrait-label">THE PERSON BEHIND THE PROJECTS / 01</span><span className="mk-portrait-name">MOKA<br/>YAKOUBI<span>.</span></span></div>
      </div></section>

      <div className="mk-ticker"><div className="mk-shell"><span>BUILD SOMETHING REAL.</span><span>◆</span><span>SHARE THE JOURNEY.</span><span>◆</span><span>MAKE IT MATTER.</span></div></div>

      <section id="about" className="mk-section mk-intro"><div className="mk-shell">
        <div className="mk-section-top"><span>001 / QUI JE SUIS</span><span>THE BUILDER’S MINDSET</span></div>
        <div className="mk-intro-layout"><h2>NOT ANOTHER<br/><em>BUSINESS GURU.</em><br/>A BUILDER.</h2><div className="mk-intro-aside"><p>Je m’appelle Mohamed Yakoubi. J’ai fondé <strong>Caractère</strong>, une entreprise algérienne de confection et personnalisation textile. Aujourd’hui, je documente l’aventure, les décisions, les erreurs et les systèmes qui font grandir une entreprise.</p><p>Mon objectif : rendre le business plus concret, plus accessible et donner envie de construire ici, en Algérie.</p><Link className="mk-text-link" href="/projets">DÉCOUVRIR CE QUE JE CONSTRUIS <span>↗</span></Link></div></div>
      </div></section>

      <section className="mk-section mk-pathways"><div className="mk-shell">
        <div className="mk-section-top"><span>002 / TON POINT DE DÉPART</span><span>CHOOSE YOUR NEXT MOVE</span></div>
        <h2 className="mk-section-title">DON’T JUST <em>SCROLL.</em><br/>START BUILDING.</h2>
        <div className="mk-path-grid">
          <Link href="/ressources" className="mk-path mk-path-feature"><span>01 / LEARN</span><div><span className="mk-path-symbol">↗</span><h3>LEARN<br/>FOR FREE.</h3><p>Conférences, méthodes et ressources gratuites pour commencer et progresser.</p></div><strong>ACCÉDER AUX RESSOURCES ↗</strong></Link>
          <Link href="/club" className="mk-path"><span>02 / CONNECT</span><div><span className="mk-path-symbol">◎</span><h3>FIND YOUR<br/>PEOPLE.</h3><p>Découvre DZ Founders Club, un cercle d’entrepreneurs ambitieux.</p></div><strong>DÉCOUVRIR LE CLUB ↗</strong></Link>
          <Link href="/partenariats" className="mk-path"><span>03 / COLLABORATE</span><div><span className="mk-path-symbol">✳</span><h3>BUILD<br/>TOGETHER.</h3><p>Marques, événements, conférences : imaginons quelque chose d’utile.</p></div><strong>TRAVAILLER AVEC MOKA ↗</strong></Link>
        </div>
      </div></section>

      <section className="mk-section mk-learn" id="learn"><div className="mk-shell">
        <div className="mk-section-top"><span>003 / CONTENU GRATUIT</span><span>REAL LESSONS. NO GATEKEEPING.</span></div>
        <div className="mk-learn-heading"><h2>KNOWLEDGE<br/><em>IS FOR SHARING.</em></h2><div><p>Des conférences complètes à regarder gratuitement. Pas de formulaire obligatoire, pas de paywall : tu cliques et tu apprends.</p><Link className="mk-text-link" href="/ressources">TOUTES LES RESSOURCES ↗</Link></div></div>
        <div className="mk-videos">{videos.map((video,i)=><VideoCard video={video} number={String(i+1).padStart(2,'0')} key={video.id}/>)}</div>
        <Link className="mk-guide-strip" href="/the-moka-playbook-fr.pdf" target="_blank"><span className="mk-guide-icon">↓</span><span><small>PDF GRATUIT · THE MOKA PLAYBOOK</small><strong>DES IDÉES À METTRE EN ACTION.</strong></span><span className="mk-guide-arrow">TÉLÉCHARGER ↗</span></Link>
      </div></section>

      <section className="mk-section mk-projects"><div className="mk-shell"><div className="mk-section-top"><span>004 / EN COURS DE CONSTRUCTION</span><span>BUILT, NOT JUST IMAGINED.</span></div><div className="mk-project-head"><h2>LESS TALK.<br/><em>MORE BUILDING.</em></h2><Link href="/projets" className="mk-text-link">TOUS MES PROJETS ↗</Link></div>
      <div className="mk-featured-project"><div><span className="mk-eyebrow">ENTREPRISE · MADE IN ALGERIA</span><h3>CARACTÈRE<span>.</span></h3><p>Confection, personnalisation textile, print on demand. Une entreprise, une équipe et une ambition : construire une référence algérienne.</p><a className="mk-text-link" href="https://caracteredz.com" target="_blank" rel="noopener noreferrer">DÉCOUVRIR CARACTÈRE ↗</a></div><div className="mk-featured-mark">C<span>.</span></div></div>
      </div></section>

      <section className="mk-club-banner"><div className="mk-shell mk-club-inner"><div><span className="mk-eyebrow">005 / DZ FOUNDERS CLUB</span><h2>THE RIGHT ROOM<br/><em>CHANGES EVERYTHING.</em></h2><p>Une communauté pensée pour les entrepreneurs qui veulent se rencontrer, apprendre et passer à l’action. Le cercle premium est en préparation.</p><Link className="mk-button mk-button-lime" href="/club">DÉCOUVRIR DZ FOUNDERS CLUB <span>↗</span></Link></div><div className="mk-club-art" aria-hidden="true"><span>DZ</span><strong>FOUNDERS<br/>CLUB.</strong></div></div></section>

      <section className="mk-section mk-final"><div className="mk-shell"><div className="mk-section-top"><span>006 / LA PROCHAINE ÉTAPE</span><span>OPPORTUNITIES / SPEAKING / BRAND DEALS</span></div><h2>GOT AN IDEA?<br/><em>LET’S BUILD IT.</em></h2><p>Tu représentes une marque, tu organises un événement ou tu souhaites créer un projet ensemble ? Parlons-en.</p><div className="mk-actions"><Link className="mk-button mk-button-dark" href="/partenariats">PROPOSER UNE COLLABORATION <span>↗</span></Link><Link className="mk-inline-link" href="/conferences">INVITER MOKA À UN ÉVÉNEMENT ↗</Link></div></div></section>
    </main>
  </MokaFrame>
}
