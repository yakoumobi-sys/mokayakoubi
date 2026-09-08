/* ============================================================================
 *  SITE CONFIGURATION — STRUCTURE, LINKS AND NUMBERS
 * ============================================================================
 *
 *  This file holds everything that does NOT change with the language:
 *  URLs, images, numbers, which sections are on, analytics.
 *
 *  ➜ All the WORDS live in config/content/en.ts, fr.ts and ar.ts.
 *
 *  ⚠️  ANYTHING MARKED  // TODO  IS EMPTY ON PURPOSE.
 *      Nothing was invented. Empty links are hidden everywhere, empty
 *      sections are not rendered. Fill them in and the site picks them up.
 *
 * ========================================================================= */

/* ---------------------------------------------------------------------------
 * 1. PROFILE (language-independent bits)
 * ------------------------------------------------------------------------ */

export const profile = {
  name: 'Moka Yakoubi',
  /** Used for SEO only (real name variant people search for). */
  alternateName: 'Mohammed Yakoubi',
  locationFlag: '🇩🇿',
  countryCode: 'DZ',
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
 *    Empty ones are hidden everywhere.
 * ------------------------------------------------------------------------ */

export type SocialLink = {
  id: string
  label: string
  /** Full URL. Empty = hidden. */
  url: string
  handle?: string
  /** Shown as the single social link in the desktop nav. */
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
 *    Wording lives in config/content/*. This is how the CTA behaves.
 * ------------------------------------------------------------------------ */

export const startHere = {
  /**
   *  'email' → inline field, posting to /api/subscribe (see lib/subscribers.ts)
   *  'link'  → a button opening `url` below (Beehiiv, ConvertKit, Brevo, a
   *            WhatsApp link, a Notion page…). Paste the URL, flip the mode.
   */
  mode: 'email' as 'email' | 'link',

  /** TODO (only needed if mode === 'link'). */
  url: '',

  /**
   * The file handed over after signup. Sits in /public.
   * Empty = the form just confirms the signup with no download.
   */
  file: '/the-moka-playbook-fr.pdf',

  /**
   * What happens when the email cannot be stored (no provider configured,
   * or the provider rejects the write — see .env.example):
   *   true  → hand over the file anyway, so the main CTA never looks broken
   *   false → show the error and withhold the file
   */
  deliverIfStorageFails: true,
} as const

/* ---------------------------------------------------------------------------
 * 5. PROJECTS
 *    Names and descriptions are per-language, keyed by `id` in
 *    config/content/*. Here: where they point and how they are shown.
 * ------------------------------------------------------------------------ */

export type Project = {
  id: string
  /** TODO where empty: the live site. Empty = CTA buttons are hidden. */
  url: string
  /** Optional image in /public, e.g. '/caractere.jpg'. Empty = typographic plate. */
  image: string
  year: string
  /** Show a dedicated full section for this project on the homepage. */
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'caractere',
    // Production domain of the caractere-store project (also reachable at
    // caracterestore.com and mycaractere.xyz).
    url: 'https://caracteredz.com',
    image: '', // TODO: optional visual in /public
    year: '', // TODO: e.g. '2023'
    featured: true,
  },
  {
    id: 'invoicedz',
    url: 'https://invoice-dz.vercel.app',
    image: '',
    year: '', // TODO
    featured: true,
  },
  // Add a project here, then add its copy to every file in config/content/.
]

/* ---------------------------------------------------------------------------
 * 6. LEARN — digital products / resources
 * ------------------------------------------------------------------------ */

export type Resource = {
  id: string
  /** TODO: where it lives (external URL). Empty falls back to `anchor`. */
  url: string
  /** Internal fallback, e.g. '#start' to send people to the signup block. */
  anchor?: string
  /** false hides it from the grid (useful for drafts). */
  published: boolean
}

export const resources: Resource[] = [
  {
    id: 'moka-playbook',
    url: '', // until it has its own page, the card points at the signup below
    anchor: '#start',
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
  /** Not translated — write it in the language you care about most. */
  description: string
  /** TODO: affiliate or plain link. */
  url: string
}

export const affiliateTools = {
  /** The whole section stays out of the DOM while this is false. */
  enabled: false,
  items: [] as Tool[],
}

/* ---------------------------------------------------------------------------
 * 8. SOCIAL PROOF — numbers change, keep them here only
 * ------------------------------------------------------------------------ */

export const stats = {
  enabled: true,
  /** `id` matches the labels in config/content/*. */
  items: [
    { id: 'instagram', value: '220K+' },
    { id: 'views', value: '8.8M' },
  ],
}

/* ---------------------------------------------------------------------------
 * 9. CONTACT
 * ------------------------------------------------------------------------ */

export const contact = {
  /** Main address — everything on this page goes here. */
  email: 'yakoumobi@gmail.com',
  // NOTE: caracterede.com does not resolve — the Caractère domain is
  // caracteredz.com. Confirm the exact address before relying on this link.
  altEmail: { label: 'Caractère', email: 'contact@caracterede.com' },
  /** Optional: a form URL (Tally, Typeform…). If set, it replaces mailto. */
  formUrl: '', // TODO (optional)
}

/* ---------------------------------------------------------------------------
 * 10. NAVIGATION — `id` matches the labels in config/content/*
 * ------------------------------------------------------------------------ */

export const navigation = [
  { id: 'start', href: '#start' },
  { id: 'projects', href: '#projects' },
  { id: 'resources', href: '#learn' },
  { id: 'contact', href: '#contact' },
]

/* ---------------------------------------------------------------------------
 * 11. ANALYTICS
 *     Pick ONE provider. See lib/analytics.ts.
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
  posthogHost: 'https://eu.i.posthog.com',
}
