'use client'

import { useEffect, useState } from 'react'
import { navigation, profile, socialLinks, startHere } from '@/config/site'
import { EVENTS, track } from '@/lib/analytics'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const primarySocial = socialLinks.find((link) => link.primary && link.url)

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
    track(EVENTS.nav, { label })
    setOpen(false)
  }

  return (
    <>
      <a
        href="#start"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-paper/95 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/80'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between" aria-label="Main">
          <a
            href="#top"
            onClick={() => go('logo')}
            className="text-[0.9375rem] font-semibold tracking-[-0.02em]"
          >
            Moka
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => go(item.label)}
                className="text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {primarySocial && (
              <a
                href={primarySocial.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(EVENTS.social, { network: primarySocial.label, place: 'nav' })}
                className="text-[0.875rem] text-muted transition-colors duration-200 hover:text-ink"
              >
                {primarySocial.label}
              </a>
            )}
            <a
              href="#start"
              onClick={() => track(EVENTS.startHere, { place: 'nav' })}
              className="btn-primary h-10 min-h-0 px-5 text-[0.8125rem]"
            >
              {startHere.eyebrow}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ease-out ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
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
              <li key={item.href} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => go(item.label)}
                  className="flex items-baseline gap-4 py-5 text-title font-semibold"
                >
                  <span className="text-eyebrow font-medium text-faint">
                    0{index + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-6">
            <a
              href="#start"
              onClick={() => {
                track(EVENTS.startHere, { place: 'mobile_menu' })
                setOpen(false)
              }}
              className="btn-primary w-full"
            >
              {startHere.eyebrow}
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
                    onClick={() => track(EVENTS.social, { network: link.label, place: 'mobile_menu' })}
                    className="text-sm link-muted"
                  >
                    {link.label}
                  </a>
                ))}
            </div>
            <p className="text-sm text-faint">
              {profile.location} {profile.locationFlag}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
