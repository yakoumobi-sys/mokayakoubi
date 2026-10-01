import { DEFAULT_LOCALE, type Locale } from '@/config/content'

/**
 * URL shape: French lives at '/', the others at '/en' and '/ar'.
 * The Instagram bio URL stays the same while French becomes the primary language.
 */
export function localePath(locale: Locale, path = ''): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return `${prefix}/${path}`.replace(/\/+$/, '') || '/'
}

/** Anchors have to carry the locale prefix too, or they jump to the wrong page. */
export function localeHref(locale: Locale, href: string): string {
  if (href.startsWith('#')) return `${localePath(locale)}${href}`.replace('//#', '/#')
  return localePath(locale, href.replace(/^\//, ''))
}
