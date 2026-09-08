import { en } from './en'
import { fr } from './fr'
import { ar } from './ar'
import { DEFAULT_LOCALE, type Content, type Locale } from './types'

export * from './types'

export const content: Record<Locale, Content> = { en, fr, ar }

export function getContent(locale: Locale): Content {
  return content[locale] ?? content[DEFAULT_LOCALE]
}

/** Every locale, in the order the switcher shows them. */
export const allContent = [en, fr, ar]
