'use client'

import { allContent, type Locale } from '@/config/content'
import { localePath } from '@/lib/locale'
import { EVENTS, track } from '@/lib/analytics'

/**
 * EN · FR · ع — three characters, no flags, no dropdown.
 * Each language is a real page, so these are plain links: shareable,
 * indexable, and they work before any JavaScript runs.
 */
export function LanguageSwitcher({
  current,
  className = '',
  onNavigate,
}: {
  current: Locale
  className?: string
  onNavigate?: () => void
}) {
  const label = allContent.find((c) => c.locale === current)?.switcherLabel

  return (
    <nav aria-label={label} className={`flex items-center gap-0.5 ${className}`.trim()}>
      {allContent.map((entry) => {
        const active = entry.locale === current
        return (
          <a
            key={entry.locale}
            href={localePath(entry.locale)}
            hrefLang={entry.locale}
            lang={entry.locale}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              track(EVENTS.language, { to: entry.locale, from: current })
              onNavigate?.()
            }}
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2
                        text-[0.8125rem] leading-none transition-colors duration-200 ${
                          active
                            ? 'bg-surface font-medium text-ink'
                            : 'text-faint hover:text-ink'
                        }`}
          >
            {entry.label}
          </a>
        )
      })}
    </nav>
  )
}
