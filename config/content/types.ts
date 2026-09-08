/* ============================================================================
 *  CONTENT TYPES
 *  Every string on the site lives in config/content/<locale>.ts.
 *  Structure, URLs and numbers live in config/site.ts.
 * ========================================================================= */

export const LOCALES = ['en', 'fr', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export type ProjectCopy = {
  name: string
  description: string
  /** 'Live', 'Building'… */
  status: string
  /** Headline of the project's own section. */
  sectionTitle?: string
  cta: string
  primaryCta?: string
  /** Label of the free-guide button, when the project has a `guide` PDF. */
  guideCta?: string
}

export type ResourceCopy = {
  title: string
  description: string
  /** 'Free', 'Coming soon', a price… */
  price: string
  /** playbook, guide, template… */
  type: string
}

export type Content = {
  locale: Locale
  /** Text direction of the whole page. */
  dir: 'ltr' | 'rtl'
  /** How this language names itself in the switcher. */
  label: string
  /** Accessible name for the switcher itself. */
  switcherLabel: string

  meta: {
    title: string
    description: string
  }

  profile: {
    /** The three display lines. */
    tagline: string[]
    description: string
    location: string
    role: string
  }

  nav: {
    /** Keyed by the ids in `navigation` (config/site.ts). */
    labels: Record<string, string>
    startCta: string
    skip: string
    openMenu: string
    closeMenu: string
  }

  hero: {
    secondaryCta: string
  }

  startHere: {
    eyebrow: string
    title: string
    description: string
    topics: string[]
    cta: string
    fileCta: string
    note: string
    emailLabel: string
    emailPlaceholder: string
    sending: string
    /** Confirmation when the address was stored. */
    done: string
    /** Confirmation when it wasn't, but the file is handed over anyway. */
    delivered: string
    errors: {
      invalid: string
      notOpen: string
      generic: string
    }
  }

  /** Keyed by project id. */
  projects: Record<string, ProjectCopy>

  learn: {
    eyebrow: string
    title: string
    intro: string
    get: string
    more: string
  }

  /** Keyed by resource id. */
  resources: Record<string, ResourceCopy>

  building: {
    eyebrow: string
    title: string
  }

  tools: {
    eyebrow: string
    title: string
    subtitle: string
    disclosure: string
  }

  stats: {
    /** Keyed by stat id. */
    labels: Record<string, string>
    note: string
  }

  contact: {
    eyebrow: string
    title: string
    cta: string
    categories: {
      title: string
      description: string
      /** Prefills the email subject. */
      subject: string
    }[]
  }

  footer: {
    elsewhere: string
    projects: string
    contact: string
    email: string
  }
}
