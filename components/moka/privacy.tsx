/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { MokaFrame } from '@/components/moka/site'

export function MokaPrivacyPage(){
 return <MokaFrame><main>
  <section className="mk-page-hero"><div className="mk-shell"><span className="mk-eyebrow">LEGAL / OCTOBRE 2026</span><h1 style={{marginTop:35}}>CONFIDENTIALITÉ<span style={{color:'#c9f17f'}}>.</span></h1><p>Comment ce site et DZ Founders Club traitent les informations que tu nous communiques.</p></div></section>
  <div className="mk-page-area"><div className="mk-shell" style={{maxWidth:900}}>
   <h2>QUI TRAITE LES DONNÉES ?</h2><p className="mk-page-copy">Le site Moka Yakoubi et le projet DZ Founders Club sont portés par Mohamed Yakoubi. Pour exercer tes droits ou poser une question : <a href="mailto:yakoumobi@gmail.com">yakoumobi@gmail.com</a>.</p>
   <h2>LES CANDIDATURES DU CLUB</h2><p className="mk-page-copy">Le formulaire demande ton nom, ta ville, tes coordonnées, ton activité, tes objectifs et la contribution que tu pourrais apporter. Ces informations servent à étudier ta candidature et à te recontacter à propos du club. La candidature est volontaire ; elle ne garantit pas une adhésion.</p>
   <h2>INSCRIPTIONS AUX CONTENUS GRATUITS</h2><p className="mk-page-copy">Si tu t’inscris volontairement à la liste MOKA, nous enregistrons ton adresse e-mail, l’origine du formulaire et ton consentement pour pouvoir t’envoyer nos nouveaux contenus. Tu peux demander ton retrait de la liste à tout moment via l’adresse de contact ci-dessus. Les PDF et vidéos restent accessibles sans inscription.</p>
   <h2>COLLABORATIONS ET BRIEFS</h2><p className="mk-page-copy">Les formulaires de contact peuvent demander tes coordonnées, ton organisation, le type de projet, ton message, ton budget indicatif et une date envisagée. Ces informations sont utilisées pour examiner ta demande et te répondre.</p>
   <h2>NOTIFICATIONS PAR E-MAIL</h2><p className="mk-page-copy">Pour éviter de manquer une candidature ou une demande, les informations transmises dans les formulaires peuvent être recopiées dans une file de notifications sécurisée et envoyées par e-mail à la personne chargée des demandes. L’envoi est assuré, lorsqu’il est configuré, par un prestataire de messagerie transactionnelle. Seules les informations renseignées volontairement sont transmises.</p>
   <h2>STOCKAGE ET DESTINATAIRES</h2><p className="mk-page-copy">Quand l'enregistrement fonctionne, la candidature est transmise au service de gestion configuré pour le site (base de données ou outil de traitement). Si tu choisis le secours par e-mail, ton logiciel de messagerie transmet les informations à l'adresse de contact. Les données sont accessibles aux personnes autorisées à gérer les candidatures et aux prestataires techniques nécessaires. Elles ne sont pas vendues.</p>
   <h2>DURÉE DE CONSERVATION ET DROITS</h2><p className="mk-page-copy">Les informations sont conservées pendant la sélection et le suivi nécessaires du projet, sous réserve des obligations légales. Tu peux demander l'accès, la rectification ou la suppression de tes données en écrivant à <a href="mailto:yakoumobi@gmail.com">yakoumobi@gmail.com</a>.</p>
   <h2>CONTENUS EXTERNES</h2><p className="mk-page-copy">Les liens Instagram et YouTube ouvrent leurs plateformes respectives, qui appliquent leurs propres politiques. Les images de prévisualisation YouTube peuvent être chargées depuis YouTube lorsque tu consultes nos ressources.</p>
   <p className="mk-page-copy" style={{marginTop:45}}><Link className="mk-text-link" href="/">← RETOUR À L'ACCUEIL</Link></p>
  </div></div>
 </main></MokaFrame>
}