'use client'

import { useEffect, useState } from 'react'
import { navigation, socialLinks } from '@/config/site'
import type { Content } from '@/config/content'
import { localeHref } from '@/lib/locale'
import { LanguageSwitcher } from '@/components/language-switcher'
import { EVENTS, track } from '@/lib/analytics'

export function Nav({ t }: { t: Content }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const primarySocial = socialLinks.find((link) => link.primary && link.url)
  const href = (target: string) => localeHref(t.locale, target)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (label: string) => {
    track(EVENTS.nav, { label, locale: t.locale })
    setOpen(false)
  }

  return (
    <>
      <a
        href={href('#start')}
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        {t.nav.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-paper/95 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/80'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
          <a
            href={href('#top')}
            onClick={() => go('logo')}
            className="shrink-0 text-[0.9375rem] font-semibold tracking-[-0.02em]"
          >
            Moka
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={href(item.href)}
                onClick={() => go(item.id)}
                className="text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                {t.nav.labels[item.id]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher current={t.locale} />

            {primarySocial && (
              <a
                href={primarySocial.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track(EVENTS.social, { network: primarySocial.label, place: 'nav' })
                }
                className="hidden text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink lg:inline"
              >
                {primarySocial.label}
              </a>
            )}

            <a
              href={href('#start')}
              onClick={() => track(EVENTS.startHere, { place: 'nav' })}
              className="btn-primary hidden h-10 min-h-0 px-5 text-[0.8125rem] md:inline-flex"
            >
              {t.nav.startCta}
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="-me-2 flex h-11 w-11 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute start-0 block h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute start-0 block h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full sheet, nothing fancy, fast to read and tap. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-paper pt-16 md:hidden"
      >
        <div className="shell flex h-[calc(100dvh-4rem)] flex-col justify-between py-10">
          <ul className="space-y-1">
            {navigation.map((item, index) => (
              <li key={item.id} className="border-b border-line">
                <a
                  href={href(item.href)}
                  onClick={() => go(item.id)}
                  className="flex items-baseline gap-4 py-5 text-title font-semibold"
                >
                  <span className="text-eyebrow font-medium text-faint">0{index + 1}</span>
                  {t.nav.labels[item.id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-6">
            <a
              href={href('#start')}
              onClick={() => {
                track(EVENTS.startHere, { place: 'mobile_menu' })
                setOpen(false)
              }}
              className="btn-primary w-full"
            >
              {t.nav.startCta}
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks
                .filter((link) => link.url)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track(EVENTS.social, { network: link.label, place: 'mobile_menu' })
                    }
                    className="text-sm link-muted"
                  >
                    {link.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
