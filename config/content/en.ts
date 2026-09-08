import type { Content } from './types'

export const en: Content = {
  locale: 'en',
  dir: 'ltr',
  label: 'EN',
  switcherLabel: 'Language',

  meta: {
    title: 'Moka Yakoubi — Psychology. Discipline. Building things.',
    description:
      'Moka Yakoubi builds companies from Algeria — Caractère and InvoiceDZ — and shares what he learns about psychology, discipline and building things.',
  },

  profile: {
    tagline: ['Psychology.', 'Discipline.', 'Building things.'],
    description: 'I build companies and share what I learn.',
    location: 'Algeria',
    role: 'Founder of Caractère & InvoiceDZ',
  },

  nav: {
    labels: {
      start: 'Start',
      projects: 'Projects',
      resources: 'Resources',
      contact: 'Contact',
    },
    startCta: 'Start here',
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    secondaryCta: 'Explore my projects',
  },

  startHere: {
    eyebrow: 'Start here',
    title: 'The Moka Playbook',
    description:
      'A free collection of the ideas I keep coming back to — how people think, how to stay disciplined, how to communicate, how to sell, and how to actually build things.',
    topics: [
      'Psychology',
      'Discipline',
      'Communication',
      'Selling',
      'Building projects',
      'Understanding people',
    ],
    cta: 'Get it free',
    fileCta: 'Download the PDF',
    note: 'Edition 01 · 18-page PDF, in French · No spam, unsubscribe anytime.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@email.com',
    sending: 'Sending…',
    done: "You're in. Here it is.",
    delivered: 'Here it is.',
    errors: {
      invalid: 'Please enter a valid email address.',
      notOpen: 'Signups are not open yet. Try again shortly.',
      generic: 'Something went wrong. Please try again.',
    },
  },

  projects: {
    caractere: {
      name: 'Caractère',
      description:
        'Start a clothing brand or create custom apparel without dealing with production complexity.',
      status: 'Live',
      sectionTitle: 'Build your brand.',
      cta: 'Discover Caractère',
      primaryCta: 'Start a clothing brand',
    },
    invoicedz: {
      name: 'InvoiceDZ',
      description:
        'Invoices, quotes and delivery notes built for Algeria — VAT, stamp duty and amounts in words handled for you. Free.',
      status: 'Live',
      sectionTitle: 'Run your business.',
      cta: 'Discover InvoiceDZ',
    },
  },

  learn: {
    eyebrow: 'Resources',
    title: 'Learn.',
    intro: 'Resources, systems and things I actually use.',
    get: 'Get it',
    more: 'More coming.',
  },

  resources: {
    'moka-playbook': {
      title: 'The Moka Playbook',
      description:
        '14 ideas on psychology, discipline, selling and building things. Edition 01, in French.',
      price: 'Free',
      type: 'playbook',
    },
  },

  building: {
    eyebrow: 'Projects',
    title: "What I'm building.",
  },

  tools: {
    eyebrow: 'Stack',
    title: 'Things I use.',
    subtitle: 'Tools I actually pay for and use every week.',
    disclosure: 'Some of these are affiliate links.',
  },

  stats: {
    labels: {
      instagram: 'Instagram',
      views: 'Views · last 30 days',
    },
    note: 'Founder of Caractère & InvoiceDZ',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Work with me.',
    cta: 'Get in touch',
    categories: [
      {
        title: 'Brand partnerships',
        description: 'For brands who want to collaborate on content.',
        subject: 'Brand partnership',
      },
      {
        title: 'Business / project inquiries',
        description: 'For serious professional requests.',
        subject: 'Business inquiry',
      },
      {
        title: 'Speaking / events',
        description: 'Conferences, events, podcasts.',
        subject: 'Speaking / event',
      },
    ],
  },

  footer: {
    elsewhere: 'Elsewhere',
    projects: 'Projects',
    contact: 'Contact',
    email: 'Email',
  },
}
