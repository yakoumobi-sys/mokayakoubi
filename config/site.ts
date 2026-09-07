/* ============================================================================
 *  SITE CONFIGURATION — THE ONLY FILE YOU NEED TO EDIT
 * ============================================================================
 *
 *  Everything on the site (text, links, numbers, products, projects) lives
 *  here. Components never hardcode content.
 *
 *  ⚠️  ANYTHING MARKED  // TODO  IS EMPTY ON PURPOSE.
 *      Nothing was invented. Empty strings are handled gracefully:
 *      links with no URL are hidden, sections with no items are hidden.
 *      Fill them in and the site picks them up automatically.
 *
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 * 1. PROFILE
 * ------------------------------------------------------------------------ */

export const profile = {
  name: 'Moka Yakoubi',
  /** Used for SEO only (real name variant people search for). */
  alternateName: 'Mohammed Yakoubi',
  /** The three-line positioning statement in the hero. */
  tagline: ['Psychology.', 'Discipline.', 'Building things.'],
  /** One line under the tagline. Keep it short. */
  description: 'I build companies and share what I learn.',
  location: 'Algeria',
  locationFlag: '🇩🇿',
  countryCode: 'DZ',
  /** Short line used under the social proof and in SEO. */
  role: 'Founder of Caractère & InvoiceDZ',
  /**
   * Portrait photo (square works best). Leave '' and the hero falls back to
   * a clean typographic block — no placeholder face, no stock photo.
   */
  photo: '/moka.jpg',
  photoAlt: 'Moka Yakoubi',
} as const

/* ---------------------------------------------------------------------------
 * 2. SITE / SEO
 * ------------------------------------------------------------------------ */

export const site = {
  /** Canonical origin. Change to https://mokayakoubi.com when the domain moves. */
  url: 'https://mokayakoubi.vercel.app',
  title: 'Moka Yakoubi — Psychology. Discipline. Building things.',
  description:
    'Moka Yakoubi builds companies from Algeria — Caractère and InvoiceDZ — and shares what he learns about psychology, discipline and building things.',
  locale: 'en',
  keywords: [
    'Moka Yakoubi',
    'Mohammed Yakoubi',
    'entrepreneur Algeria',
    'Caractère',
    'InvoiceDZ',
  ],
} as const

/* ---------------------------------------------------------------------------
 * 3. SOCIAL LINKS
 *    TODO: paste your real profile URLs. Empty ones are hidden everywhere.
 * ------------------------------------------------------------------------ */

export type SocialLink = {
  id: string
  label: string
  /** Full URL, e.g. 'https://instagram.com/yourhandle'. Empty = hidden. */
  url: string
  /** Optional @handle shown next to the label. */
  handle?: string
  /** Show this one as the primary social link in the nav / hero. */
  primary?: boolean
}

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/mokayakoubi',
    handle: '@mokayakoubi',
    primary: true,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@mokayakoubi',
    handle: '@mokayakoubi',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    // Share link — swap it for the page's own URL if you have one.
    url: 'https://www.facebook.com/share/1aSE9keL4q/',
  },
  { id: 'youtube', label: 'YouTube', url: '' }, // TODO
  { id: 'linkedin', label: 'LinkedIn', url: '' }, // TODO
  { id: 'x', label: 'X', url: '' }, // TODO
]

/* ---------------------------------------------------------------------------
 * 4. START HERE — the #1 commercial priority of the site
 * ------------------------------------------------------------------------ */

export const startHere = {
  eyebrow: 'Start here',
  title: 'The Moka Playbook',
  description:
    'A free collection of the ideas I keep coming back to — how people think, how to stay disciplined, how to communicate, how to sell, and how to actually build things.',
  /** The bullet list shown next to the CTA. */
  topics: [
    'Psychology',
    'Discipline',
    'Communication',
    'Selling',
    'Building projects',
    'Understanding people',
  ],
  cta: 'Get it free',

  /**
   * HOW THE CTA WORKS — pick one mode.
   *
   *  'email' → shows the inline email field on the site. Submissions go to
   *            POST /api/subscribe, which stores them wherever you configure
   *            it (see lib/subscribers.ts + .env.example). Nothing is faked:
   *            if no provider is configured the API says so clearly.
   *
   *  'link'  → shows a button that opens `url` below. Use this the moment you
   *            have a Beehiiv / ConvertKit / Brevo / Notion / WhatsApp landing
   *            page. Just paste the URL and switch the mode.
   */
  mode: 'email' as 'email' | 'link',

  /** TODO (only needed if mode === 'link'). */
  url: '',

  /** Small reassurance line under the field. */
  note: 'No spam. Unsubscribe anytime.',
} as const

/* ---------------------------------------------------------------------------
 * 5. PROJECTS — "What I'm building"
 *    Also powers the Caractère and InvoiceDZ sections and the footer.
 * ------------------------------------------------------------------------ */

export type Project = {
  id: string
  name: string
  /** One or two sentences, no hype. */
  description: string
  /** TODO: the live site. Empty = the CTA button is hidden. */
  url: string
  /** Optional image in /public, e.g. '/caractere.jpg'. Empty = typographic card. */
  image: string
  /** Free text: 'Live', 'Building', 'Beta'… */
  status: string
  year: string
  /** Button label used in the dedicated section. */
  cta: string
  /** Show a dedicated full section for this project on the homepage. */
  featured: boolean
  /** Headline of the dedicated section. */
  sectionTitle?: string
  /** Extra CTA in the dedicated section (optional). */
  primaryCta?: string
}

export const projects: Project[] = [
  {
    id: 'caractere',
    name: 'Caractère',
    description:
      'Start a clothing brand or create custom apparel without dealing with production complexity.',
    url: '', // TODO: the Caractère site (caracterede.com?) — unverified, left empty
    image: '', // TODO: optional visual in /public
    status: 'Live',
    year: '',  // TODO: e.g. '2023'
    cta: 'Discover Caractère',
    featured: true,
    sectionTitle: 'Build your brand.',
    primaryCta: 'Start a clothing brand',
  },
  {
    id: 'invoicedz',
    name: 'InvoiceDZ',
    // Taken from the product itself. Social handle: @invoicedz.
    description:
      'Invoices, quotes and delivery notes built for Algeria — VAT, stamp duty and amounts in words handled for you. Free.',
    url: 'https://invoice-dz.vercel.app',
    image: '',
    status: 'Live',
    year: '', // TODO
    cta: 'Discover InvoiceDZ',
    featured: true,
    sectionTitle: 'Run your business.',
  },
  // Add more projects here — they appear in "What I'm building" automatically.
]

/* ---------------------------------------------------------------------------
 * 6. LEARN — digital products / resources
 *    Add an entry and it shows up in the grid. No entries = "More coming."
 * ------------------------------------------------------------------------ */

export type Resource = {
  id: string
  title: string
  description: string
  /** 'Free', '5,000 DA', 'Coming soon'… */
  price: string
  /** TODO: where it lives (external URL). Empty falls back to `anchor`. */
  url: string
  /** Internal fallback, e.g. '#start' to send people to the signup block. */
  anchor?: string
  /** guide | template | playbook | course | tool */
  type: string
  /** false hides it from the grid (useful for drafts). */
  published: boolean
}

export const resources: Resource[] = [
  {
    id: 'moka-playbook',
    title: 'The Moka Playbook',
    description: 'Psychology, discipline, communication, selling, building.',
    price: 'Free',
    url: '', // until it has its own page, the card points at the signup below
    anchor: '#start',
    type: 'playbook',
    published: true,
  },
]

/* ---------------------------------------------------------------------------
 * 7. THINGS I USE — affiliate section (hidden until you turn it on)
 * ------------------------------------------------------------------------ */

export type Tool = {
  name: string
  /** software | AI | content | business | hardware | books */
  category: string
  description: string
  /** TODO: affiliate or plain link. */
  url: string
}

export const affiliateTools = {
  /**
   * Set to true once `items` below has real entries.
   * The whole section stays out of the DOM while this is false.
   */
  enabled: false,
  title: 'Things I use.',
  subtitle: 'Tools I actually pay for and use every week.',
  /** Shown once, discreetly, if any link is an affiliate link. */
  disclosure: 'Some of these are affiliate links.',
  items: [] as Tool[],
}

/* ---------------------------------------------------------------------------
 * 8. SOCIAL PROOF — numbers change, keep them here only
 * ------------------------------------------------------------------------ */

export const stats = {
  enabled: true,
  items: [
    { value: '220K+', label: 'Instagram' },
    { value: '8.8M', label: 'Views · last 30 days' },
  ],
  /** Optional third line, e.g. profile.role. Set to '' to hide. */
  note: profile.role,
}

/* ---------------------------------------------------------------------------
 * 9. WORK WITH ME
 * ------------------------------------------------------------------------ */

export const contact = {
  title: 'Work with me.',
  /** Main address — everything on this page goes here. */
  email: 'yakoumobi@gmail.com',
  /**
   * Optional second address shown in the footer under its own label.
   * Set `email: ''` to hide it.
   */
  altEmail: { label: 'Caractère', email: 'contact@caracterede.com' },
  /** Optional: a form URL (Tally, Typeform…). If set, it replaces mailto. */
  formUrl: '', // TODO (optional)
  cta: 'Get in touch',
  categories: [
    {
      title: 'Brand partnerships',
      description: 'For brands who want to collaborate on content.',
      /** Prefills the email subject. */
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
}

/* ---------------------------------------------------------------------------
 * 10. NAVIGATION
 * ------------------------------------------------------------------------ */

export const navigation = [
  { label: 'Start', href: '#start' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resources', href: '#learn' },
  { label: 'Contact', href: '#contact' },
]

/* ---------------------------------------------------------------------------
 * 11. ANALYTICS
 *     Pick ONE provider. See lib/analytics.ts.
 *     'none' | 'plausible' | 'ga' | 'posthog' | 'meta'
 * ------------------------------------------------------------------------ */

export const analytics = {
  provider: 'none' as 'none' | 'plausible' | 'ga' | 'posthog' | 'meta',
  /**
   * Plausible → your domain, e.g. 'mokayakoubi.com'
   * GA        → 'G-XXXXXXXXXX'
   * PostHog   → 'phc_xxxxxxxx'
   * Meta      → your pixel id
   */
  id: '', // TODO (only when you pick a provider)
  /** PostHog only. */
  posthogHost: 'https://eu.i.posthog.com',
}
