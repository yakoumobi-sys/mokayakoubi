/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { ClubApplication } from '@/components/club/application'
import { ContactForm, NewsletterSignup } from '@/components/moka/forms'
import { MokaFrame, VideoCard, videos } from '@/components/moka/site'

function PageHero({ kicker, first, emphasis, description }: { kicker: string; first: string; emphasis: string; description: string }) {
  return <section className="mk-page-hero"><div className="mk-shell"><div className="mk-kicker"><span className="mk-dot" /> {kicker} / BY MOKA</div><h1>{first}<br/><em>{emphasis}</em></h1><p>{description}</p></div></section>
}

function FooterCTA({ title, text, href, label }: { title: string; text: string; href: string; label: string }) {
  return <section className="mk-club-mini"><h2>{title}</h2><p>{text}</p><Link className="mk-button" href={href}>{label} <span>↗</span></Link></section>
}

export function ResourcesPage() {
  return <MokaFrame><main>
    <PageHero kicker="FREE RESOURCES" first="LEARN IT." emphasis="BUILD IT." description="Pas besoin de payer pour commencer. Voici mes conférences et mes guides pratiques pour apprendre, lancer et développer une activité." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>001 / REGARDER</span><span>YOUTUBE · GRATUIT</span></div>
      <h2>MES CONFÉRENCES<br/><em>EN ACCÈS LIBRE.</em></h2>
      <p className="mk-page-copy">Ces deux vidéos viennent directement de ma chaîne YouTube. Ouvre celle qui t'intéresse, prends des notes et applique une idée dès aujourd'hui.</p>
      <div className="mk-videos">{videos.map((video,i)=><VideoCard key={video.id} video={video} number={String(i+1).padStart(2,'0')} />)}</div>
      <div style={{height:80}} />
      <div className="mk-section-top"><span>002 / TÉLÉCHARGER</span><span>GUIDES PDF · GRATUIT</span></div>
      <h2>LA THÉORIE NE<br/><em>SUFFIT PAS.</em></h2>
      <div className="mk-resource-grid">
        <article className="mk-resource-card"><span>GUIDE 01 / PDF</span><h3>THE MOKA PLAYBOOK.</h3><p>Un support de travail à lire, annoter et mettre en pratique.</p><a className="mk-text-link" href="/the-moka-playbook-fr.pdf" target="_blank" rel="noopener noreferrer">OUVRIR LE GUIDE ↗</a></article>
        <article className="mk-resource-card"><span>GUIDE 02 / PDF</span><h3>BUILD YOUR BRAND.</h3><p>Un guide pour réfléchir à ta marque et à ce que tu veux réellement construire.</p><a className="mk-text-link" href="/build-your-brand-caractere-fr.pdf" target="_blank" rel="noopener noreferrer">OUVRIR LE GUIDE ↗</a></article>
      </div>
      <FooterCTA title="DON'T LEARN ALONE." text="Tu veux rencontrer d'autres entrepreneurs, échanger et progresser dans un cercle de fondateurs ? Découvre le concept DZ Founders Club." href="/club" label="DÉCOUVRIR LE CLUB" />
    </div></section>
  </main></MokaFrame>
}

export function ProjectsPage() {
  return <MokaFrame><main>
    <PageHero kicker="WHAT I BUILD" first="PROOF OVER" emphasis="PROMISES." description="Je partage ce que je construis réellement. Mes projets ne sont pas des études de cas imaginaires : ce sont des aventures entrepreneuriales avec leurs défis et leurs apprentissages." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>001 / MY COMPANIES</span><span>MADE IN ALGERIA</span></div>
      <div className="mk-featured-project" style={{marginTop:40}}><div><span className="mk-eyebrow">ENTREPRENEURIAT · CONFECTION · PERSONNALISATION</span><h3>CARACTÈRE<span>.</span></h3><p>Une entreprise de textile personnalisé et de print on demand : de la création à la production, du client à la livraison. Une vraie équipe et de vrais défis.</p><a href="https://caracteredz.com" target="_blank" rel="noopener noreferrer" className="mk-text-link">VISITER CARACTÈRE ↗</a></div><div className="mk-featured-mark">C<span>.</span></div></div>
      <div className="mk-resource-grid">
        <article className="mk-resource-card"><span>PROJET / COMMUNAUTÉ</span><h3>DZ FOUNDERS CLUB.</h3><p>Rassembler des fondateurs autour de la formation, des échanges, du networking et de l'exécution.</p><Link href="/club" className="mk-text-link">DÉCOUVRIR LE PROJET ↗</Link></article>
        <article className="mk-resource-card"><span>PROJET / CRÉATION DE CONTENU</span><h3>MOKA.</h3><p>Une marque média personnelle pour partager mes idées, mes conférences et les coulisses de mon parcours d'entrepreneur.</p><a className="mk-text-link" href="https://www.instagram.com/mokayakoubi/" target="_blank" rel="noopener noreferrer">VOIR MES CONTENUS ↗</a></article>
      </div>
      <FooterCTA title="UNE IDÉE À CONSTRUIRE ?" text="Tu veux collaborer sur un projet ou proposer une opportunité intéressante ? Explique-moi ce que tu imagines." href="/partenariats" label="ME CONTACTER" />
    </div></section>
  </main></MokaFrame>
}

export function ConferencesPage() {
  return <MokaFrame><main>
    <PageHero kicker="SPEAKING & EVENTS" first="IDEAS THAT" emphasis="MOVE PEOPLE." description="Des conférences ancrées dans l'expérience du terrain : entreprendre, construire une marque, faire du contenu et transformer son attention en action." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>001 / INTERVENTIONS</span><span>WATCH & LEARN</span></div>
      <h2>REGARDER<br/><em>LES CONFÉRENCES.</em></h2>
      <div className="mk-videos">{videos.map((video,i)=><VideoCard key={video.id} video={video} number={String(i+1).padStart(2,'0')}/>)}</div>
      <div style={{height:80}} />
      <div className="mk-section-top"><span>002 / MES SUJETS</span><span>ENTREPRENEURIAT · MARKETING · CONTENT</span></div>
      <div className="mk-offer-grid">
        <article className="mk-offer"><span>01 / BRANDING</span><h3>DE ZÉRO À UNE MARQUE QUI VEND.</h3><p>Positionnement, différenciation, produit, création de demande et vente.</p></article>
        <article className="mk-offer"><span>02 / SOCIAL MEDIA</span><h3>THE VIRALITY FORMULA.</h3><p>Comprendre l'attention, écrire un hook, retenir et convertir une audience.</p></article>
        <article className="mk-offer"><span>03 / BUSINESS</span><h3>BUILD IN PUBLIC.</h3><p>Les leçons du terrain : entreprendre, prendre des décisions et construire une équipe.</p></article>
      </div>
      <FooterCTA title="BOOK MOKA TO SPEAK." text="Conférence, panel, séminaire, workshop ou événement de marque. Contacte-moi avec la date, le lieu, le public et le sujet envisagé." href="/partenariats" label="PROPOSER UN ÉVÉNEMENT" />
    </div></section>
  </main></MokaFrame>
}

export function PartnershipsPage() {
  return <MokaFrame><main>
    <PageHero kicker="BRANDS / EVENTS / PARTNERSHIPS" first="LET'S MAKE" emphasis="AN IMPACT." description="Collaborations avec les marques, prises de parole, création de contenu et projets entrepreneuriaux. Je privilégie les partenariats cohérents avec ce que je construis et avec mon audience." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>001 / COMMENT COLLABORER</span><span>REAL VALUE FIRST.</span></div>
      <div className="mk-offer-grid">
        <article className="mk-offer"><span>01 / PARTNERSHIP</span><h3>BRAND DEALS.</h3><p>Contenu sponsorisé, ambassadeur, campagnes créatives et partenariats long terme.</p></article>
        <article className="mk-offer"><span>02 / EVENT</span><h3>SPEAKING.</h3><p>Conférences, panels, workshops, séminaires et rencontres professionnelles.</p></article>
        <article className="mk-offer"><span>03 / BUSINESS</span><h3>BUILD TOGETHER.</h3><p>Projets communs, opportunités entrepreneuriales et collaborations créatives.</p></article>
      </div>
      <div className="mk-section-top"><span>002 / CONTACT</span><span>SEND YOUR BRIEF</span></div>
      <h2>HAVE SOMETHING<br/><em>IN MIND?</em></h2>
      <p className="mk-page-copy">Pour une réponse utile, précise la marque ou l'organisation, les objectifs, le calendrier, le budget indicatif et les livrables souhaités. Je n'affiche pas de chiffres d'audience non vérifiés : un media kit à jour peut être préparé pour les partenaires sérieux.</p>
      <ContactForm />
      <a className="mk-big-link" href="https://www.instagram.com/mokayakoubi/" target="_blank" rel="noopener noreferrer"><span>RETROUVER MOKA SUR INSTAGRAM</span><span>↗</span></a>
    </div></section>
  </main></MokaFrame>
}

const notes = [
  { n: '01', id:'marque', title:'LES GENS N’ACHÈTENT PAS UN LOGO.', intro:'Ils achètent ce qu’une marque représente à leurs yeux.', body:'Une identité ne se résume pas à un nom imprimé sur un produit. Elle est construite par un positionnement, une promesse crédible, la répétition d’un message et une expérience cohérente. Avant de vendre, demande-toi : à qui je parle, quel problème je résous et pourquoi on devrait me choisir ?' },
  { n: '02', id:'attention', title:'L’ATTENTION NE SUFFIT PAS.', intro:'Des millions de vues ne garantissent aucune commande.', body:'Ton contenu doit attirer les bonnes personnes, leur donner une raison de te faire confiance et les aider à passer à l’action. Un bon hook capte l’attention ; une démonstration concrète la mérite ; un appel à l’action clair transforme l’intérêt en prochaine étape.' },
  { n: '03', id:'execution', title:'UNE IDÉE N’EST PAS UN BUSINESS.', intro:'C’est l’exécution qui révèle ce qui fonctionne.', body:'Teste petit, parle à tes clients, note tes chiffres, livre ton premier produit et améliore-le grâce aux retours. Produire beaucoup avant de prouver la demande est un risque. Progresser par des cycles courts vaut mieux que repousser indéfiniment le lancement parfait.' }
]
export function JournalPage() {
  return <MokaFrame><main>
    <PageHero kicker="THE BUILDER'S JOURNAL" first="LESS THEORY." emphasis="MORE FIELD NOTES." description="De courtes idées que j'aurais aimé entendre plus tôt. Branding, contenu et entrepreneuriat. Pas de formule magique : des principes à tester." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>NOTES DU FONDATEUR</span><span>READ · THINK · EXECUTE</span></div>
      {notes.map(note=><article key={note.id} id={note.id} style={{borderBottom:'1px solid #343e32',padding:'55px 0',scrollMarginTop:100}}>
        <span className="mk-eyebrow">FIELD NOTE / {note.n}</span><h2 style={{margin:'16px 0 15px'}}>{note.title}</h2><p className="mk-page-copy" style={{fontSize:20,color:'#e2e9dc',marginBottom:15}}>{note.intro}</p><p className="mk-page-copy">{note.body}</p>
      </article>)}
      <FooterCTA title="MAINTENANT, À TOI." text="Retrouve mes conférences gratuites pour passer de l'idée à l'action." href="/ressources" label="REGARDER LES CONFÉRENCES" />
    </div></section>
  </main></MokaFrame>
}

export function ClubPage() {
  return <MokaFrame><main>
    <PageHero kicker="PREMIUM COMMUNITY / ALGERIA" first="DZ FOUNDERS" emphasis="CLUB." description="Un cercle d'entrepreneurs qui construisent. Des relations solides, de l'apprentissage, des conversations sans filtre et de vraies occasions de passer à l'action. Lancement en préparation." />
    <section className="mk-page-area"><div className="mk-shell">
      <div className="mk-section-top"><span>001 / THE EXPERIENCE</span><span>BUILD WITH THE RIGHT PEOPLE</span></div>
      <h2>NOT JUST A COMMUNITY.<br/><em>AN ADVANTAGE.</em></h2>
      <p className="mk-page-copy">DZ Founders Club est conçu comme un club privé de fondateurs, avec une offre éducative et des expériences premium. Les formats ci-dessous sont envisagés pour le lancement ; leur calendrier et leurs modalités seront annoncés après validation.</p>
      <div className="mk-offer-grid">
        <article className="mk-offer"><span>01 / CONNECT</span><h3>FOUNDERS DINNERS.</h3><p>Dîners privés, rencontres et networking avec d'autres entrepreneurs.</p></article>
        <article className="mk-offer"><span>02 / LEARN</span><h3>MASTERCLASSES.</h3><p>Formations et ateliers animés par des fondateurs et des intervenants invités.</p></article>
        <article className="mk-offer"><span>03 / TALK</span><h3>FOUNDER CALLS.</h3><p>Calls collectifs, questions-réponses et échanges autour des vrais blocages.</p></article>
        <article className="mk-offer"><span>04 / EXPERIENCE</span><h3>PRIVATE EVENTS.</h3><p>Conférences, séminaires et événements pensés pour les bâtisseurs.</p></article>
        <article className="mk-offer"><span>05 / GROW</span><h3>KNOWLEDGE LIBRARY.</h3><p>Accès à des formations et ressources sélectionnées, avec des offres à définir.</p></article>
        <article className="mk-offer"><span>06 / EXECUTE</span><h3>ACCOUNTABILITY.</h3><p>Des échanges qui débouchent sur des décisions et des actions concrètes.</p></article>
      </div>
      <div className="mk-section-top" id="candidature"><span>002 / CANDIDATURE</span><span>FOUNDERS FIRST.</span></div>
      <h2>YOUR NEXT<br/><em>MOVE STARTS HERE.</em></h2>
      <p className="mk-page-copy" style={{marginBottom:30}}>Dépose ton intérêt à rejoindre le cercle fondateur. La candidature est gratuite et ne garantit pas une admission. Aucun paiement ne sera demandé avant la communication des modalités et tarifs définitifs.</p>
      <div className="mk-club-form"><ClubApplication /></div>
      <div style={{marginTop:40}}><a className="mk-text-link" href="https://www.instagram.com/dzfoundersclub/" target="_blank" rel="noopener noreferrer">SUIVRE @DZFOUNDERSCLUB SUR INSTAGRAM ↗</a></div>
    </div></section>
  </main></MokaFrame>
}
