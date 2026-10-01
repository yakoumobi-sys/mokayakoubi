export const tracks = ['marque', 'equipe', 'studio'] as const
export type Track = (typeof tracks)[number]
export type Answers = Record<string, string>
export type Question = { key: string; title: string; hint: string; options: string[] }
export const funnel: Record<Track, { number: string; label: string; brand: string; title: string; description: string; cta: string; benefit: string; questions: Question[] }> = {
  marque: {
    number: '01', label: 'Lancer ma marque', brand: 'CARACTÈRE · TEXTILE',
    title: 'Ta marque commence par une première pièce.',
    description: 'Une idée de vêtement ? Construis ton point de départ, puis fais chiffrer ton premier échantillon avec notre équipe.',
    cta: 'Préparer mon lancement', benefit: 'Un plan concret, avant de produire.',
    questions: [
      { key: 'produit', title: 'Quelle pièce imagines-tu ?', hint: 'Concentre-toi sur le premier produit que tu veux lancer.', options: ['T-shirt', 'Hoodie', 'Ensemble', 'Je ne sais pas encore'] },
      { key: 'stade', title: 'Où en es-tu aujourd’hui ?', hint: 'Pas besoin d’avoir déjà une marque pour commencer.', options: ['J’ai une idée', 'J’ai un logo ou un design', 'Je vends déjà'] },
      { key: 'budget', title: 'Quel budget veux-tu étudier ?', hint: 'Il sert à orienter la discussion. Ce n’est ni un devis ni un engagement.', options: ['Moins de 30 000 DA', '30 000 à 80 000 DA', 'Plus de 80 000 DA', 'À définir ensemble'] },
      { key: 'delai', title: 'Quand aimerais-tu démarrer ?', hint: 'Le délai de fabrication sera confirmé avec ton devis.', options: ['Dès que possible', 'Dans un mois', 'Dans 2 à 3 mois', 'Je prépare mon projet'] },
    ],
  },
  equipe: {
    number: '02', label: 'Habiller mon équipe', brand: 'CARACTÈRE · ENTREPRISES',
    title: 'Une équipe. Une identité. Votre logo.',
    description: 'Choisis tes supports et prépare une demande de simulation et de devis adaptés à ton entreprise.',
    cta: 'Préparer ma simulation', benefit: 'Simulation et devis gratuits.',
    questions: [
      { key: 'produit', title: 'Quel support te faut-il ?', hint: 'Tu pourras préciser les autres articles dans ton message.', options: ['Polos', 'T-shirts', 'Tabliers ou gilets', 'Tote bags ou casquettes'] },
      { key: 'quantite', title: 'Combien de pièces envisages-tu ?', hint: 'Une estimation suffit pour préparer le devis.', options: ['1 à 9 pièces', '10 à 19 pièces', '20 à 49 pièces', '50 pièces et plus'] },
      { key: 'logo', title: 'Ton logo est-il prêt ?', hint: 'L’équipe te demandera le fichier après votre premier échange.', options: ['Oui, en fichier vectoriel ou PDF', 'Oui, en image', 'Pas encore'] },
      { key: 'delai', title: 'Pour quand en as-tu besoin ?', hint: 'Une urgence sera étudiée selon la quantité et la disponibilité.', options: ['Moins de 7 jours', 'Dans 2 à 4 semaines', 'Dans plus d’un mois', 'Date à définir'] },
    ],
  },
  studio: {
    number: '03', label: 'Créer mon contenu', brand: 'CARACTÈRE MEDIA · AÏN BENIAN',
    title: 'Viens avec une idée. Passe au tournage.',
    description: 'Podcast, Reels ou YouTube : prépare ta séance au studio et demande un créneau. Nous t’appellerons pour le confirmer.',
    cta: 'Préparer ma séance', benefit: 'Studio seul : 4 000 DA / heure.',
    questions: [
      { key: 'format', title: 'Que veux-tu tourner ?', hint: 'On prépare la séance autour de ton objectif principal.', options: ['Podcast / interview', 'Reels / vidéos verticales', 'Vidéo YouTube', 'Présentation de produit'] },
      { key: 'formule', title: 'De quel accompagnement as-tu besoin ?', hint: 'Le montage fait l’objet d’un devis personnalisé.', options: ['Studio seul · 4 000 DA / h', 'Studio + tournage · 6 000 DA / h', 'Prêt à publier · sur devis'] },
      { key: 'duree', title: 'Combien de temps prévois-tu ?', hint: 'La durée et les prestations seront validées lors de l’appel.', options: ['1 heure', '2 heures', '3 heures', 'À définir ensemble'] },
    ],
  },
}

export function isTrack(value: string): value is Track { return tracks.includes(value as Track) }

export function recommendation(track: Track, answers: Answers): { title: string; steps: string[]; note: string } {
  if (track === 'marque') return {
    title: answers.stade === 'Je vends déjà' ? 'Prépare ta prochaine série.' : 'Commence petit. Valide une vraie pièce.',
    steps: [
      answers.produit === 'Je ne sais pas encore' ? 'Choisis une pièce et un public précis avec notre équipe.' : `Pars sur un ${answers.produit?.toLowerCase() || 'produit'}, avec un modèle et peu de variantes.`,
      answers.stade === 'J’ai une idée' ? 'Définis ton message, ton visuel et les personnes à qui tu veux vendre.' : 'Prépare ton logo ou ton design dans la meilleure qualité disponible.',
      'Fais chiffrer un échantillon. Vérifie la coupe, la matière et la personnalisation avant la série.',
      answers.budget === 'Moins de 30 000 DA' ? 'Préserve ton budget : valide l’intérêt de clients potentiels avant d’engager du stock.' : 'Détermine les quantités après validation du coût unitaire et de ton prix de vente.',
    ], note: 'Les quantités réalisables et le prix dépendent du modèle, de la personnalisation et des disponibilités. Un devis est nécessaire.',
  }
  if (track === 'equipe') return {
    title: 'Ton brief textile est prêt.',
    steps: [
      `Base de travail : ${answers.produit || 'supports à définir'} · ${answers.quantite || 'quantité à définir'}.`,
      answers.logo === 'Pas encore' ? 'Prépare le nom de ton entreprise et une référence visuelle pour expliquer le rendu souhaité.' : 'Prépare ton logo, les couleurs souhaitées et son emplacement sur le vêtement.',
      'L’équipe prépare une simulation et un devis selon le support et la personnalisation.',
      'Valide les tailles, le bon à tirer et le délai avant de lancer la fabrication.',
    ], note: 'La simulation et le devis sont gratuits. La production démarre après validation et selon les conditions du devis.',
  }
  const hours = Number.parseInt(answers.duree || '', 10)
  const rate = answers.formule?.startsWith('Studio seul') ? 4000 : answers.formule?.startsWith('Studio +') ? 6000 : null
  return {
    title: 'Ta séance commence avant le tournage.',
    steps: [
      `Objectif : ${answers.format || 'format à définir'}. Prépare le message que ton audience doit retenir.`,
      answers.format === 'Podcast / interview' ? 'Prépare 5 questions, une introduction et les informations sur ton invité.' : 'Prépare tes accroches, ton déroulé et les produits ou accessoires à filmer.',
      'Prévois tes tenues, tes références visuelles et les personnes présentes.',
      'Indique tes préférences de date. Notre équipe t’appelle pour confirmer le créneau et les prestations.',
    ], note: rate && Number.isFinite(hours) ? `Base estimative : ${(rate * hours).toLocaleString('fr-DZ')} DA pour ${hours} h. Hors prestations supplémentaires. Créneau et total à confirmer par téléphone.` : 'Le contenu de la prestation, sa durée et son prix seront définis avec toi. Aucun créneau n’est réservé automatiquement.',
  }
}
