import type { Content } from './types'

/**
 * Le vocabulaire vient du Playbook lui-même (« Psychologie. Discipline.
 * Construire. ») et garde le tutoiement, comme dans le PDF.
 */
export const fr: Content = {
  locale: 'fr',
  dir: 'ltr',
  label: 'FR',
  switcherLabel: 'Langue',

  meta: {
    title: 'Moka Yakoubi — Ton prochain move commence ici.',
    description:
      'Lance ta marque de vêtements, habille ton équipe ou prépare ta séance au studio Caractère Media. Ton premier plan gratuit avec Moka Yakoubi, depuis l’Algérie.',
  },

  profile: {
    tagline: ['Construire.', 'Apprendre.', 'Transmettre.'],
    description: 'Entrepreneur, fondateur de Caractère. Je construis des entreprises depuis l’Algérie et je partage les leçons du terrain.',
    location: 'Algérie',
    role: 'Fondateur de Caractère & InvoiceDZ',
  },

  nav: {
    labels: {
      start: 'Commencer',
      projects: 'Projets',
      resources: 'Ressources',
      contact: 'Contact',
    },
    startCta: 'Mon prochain move',
    skip: 'Aller au contenu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  hero: {
    secondaryCta: 'Voir mes projets',
  },

  startHere: {
    eyebrow: 'Commence ici',
    title: 'The Moka Playbook',
    description:
      'Un recueil gratuit des idées sur lesquelles je reviens sans cesse — comment les gens pensent, comment rester discipliné, comment communiquer, comment vendre, et comment construire pour de vrai.',
    topics: [
      'Psychologie',
      'Discipline',
      'Communication',
      'Vente',
      'Construire des projets',
      'Comprendre les gens',
    ],
    cta: 'Obtiens-le gratuitement',
    fileCta: 'Télécharger le PDF',
    note: 'Édition 01 · PDF de 18 pages · Pas de spam, désinscription à tout moment.',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'toi@email.com',
    sending: 'Envoi…',
    done: 'C’est bon. Le voici.',
    delivered: 'Le voici.',
    errors: {
      invalid: 'Entre une adresse e-mail valide.',
      notOpen: 'Les inscriptions ne sont pas encore ouvertes. Réessaie bientôt.',
      generic: 'Une erreur est survenue. Réessaie.',
    },
  },

  projects: {
    caractere: {
      name: 'Caractère',
      description:
        'Lance ta marque de vêtements ou fais personnaliser tes tenues, sans gérer la complexité de la production.',
      status: 'En ligne',
      sectionTitle: 'Crée ta marque.',
      cta: 'Découvrir Caractère',
      primaryCta: 'Lancer ma marque de vêtements',
      guideCta: 'Obtenir le guide gratuit',
    },
    invoicedz: {
      name: 'InvoiceDZ',
      description:
        'Factures, devis et bons conformes pour l’Algérie — TVA, droit de timbre et montant en lettres calculés pour toi. Gratuit.',
      status: 'En ligne',
      sectionTitle: 'Gère ton activité.',
      cta: 'Découvrir InvoiceDZ',
    },
  },

  learn: {
    eyebrow: 'Ressources',
    title: 'Apprendre.',
    intro: 'Des ressources, des systèmes et des choses que j’utilise vraiment.',
    get: 'Obtenir',
    more: 'D’autres arrivent.',
  },

  resources: {
    'moka-playbook': {
      title: 'The Moka Playbook',
      description:
        '14 idées sur la psychologie, la discipline, la vente et la construction de projets. Édition 01.',
      price: 'Gratuit',
      type: 'playbook',
    },
    'build-your-brand': {
      title: 'Build Your Brand',
      description:
        'Comment lancer ta marque de vêtements sans gérer la production. 10 pages.',
      price: 'Gratuit',
      type: 'guide',
    },
  },

  building: {
    eyebrow: 'Projets',
    title: 'Ce que je construis.',
  },

  tools: {
    eyebrow: 'Outils',
    title: 'Ce que j’utilise.',
    subtitle: 'Les outils que je paie et que j’utilise chaque semaine.',
    disclosure: 'Certains de ces liens sont des liens affiliés.',
  },

  stats: {
    labels: {
      instagram: 'Instagram',
      views: 'Vues · 30 derniers jours',
    },
    note: 'Entreprendre. Créer. Faire avancer les choses.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Travailler avec moi.',
    cta: 'Me contacter',
    categories: [
      {
        title: 'Partenariats de marque',
        description: 'Pour les marques qui veulent collaborer sur du contenu.',
        subject: 'Partenariat de marque',
      },
      {
        title: 'Demandes business / projets',
        description: 'Pour les demandes professionnelles sérieuses.',
        subject: 'Demande business',
      },
      {
        title: 'Conférences / événements',
        description: 'Conférences, événements, podcasts.',
        subject: 'Conférence / événement',
      },
    ],
  },

  footer: {
    elsewhere: 'Ailleurs',
    projects: 'Projets',
    contact: 'Contact',
    email: 'E-mail',
  },
}
