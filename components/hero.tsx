import Image from 'next/image'
import { profile, socialLinks } from '@/config/site'
import type { Content } from '@/config/content'
import { localeHref } from '@/lib/locale'
import { Arrow } from '@/components/ui/arrow'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function Hero({ t }: { t: Content }) {
  return (
    <section id="top" className="hero-section">
      <div className="shell">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow enter">
              {profile.locationFlag} {t.profile.location}{' '}
              <span className="eyebrow-divider">/</span> {profile.name}
            </p>
            <h1 className="hero-title enter enter-1">
              {t.profile.tagline.map((line, index) => (
                <span key={line} className={index === 1 ? 'hero-outline' : ''}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-description enter enter-2">
              {t.profile.description}
            </p>
            <div className="hero-actions enter enter-3">
              <TrackedLink
                href={localeHref(t.locale, '#projects')}
                event={EVENTS.nav}
                props={{ label: 'hero_projects' }}
                className="btn-primary"
              >
                {t.hero.secondaryCta}
                <Arrow />
              </TrackedLink>
              <TrackedLink
                href={localeHref(t.locale, '#start')}
                event={EVENTS.startHere}
                props={{ place: 'hero' }}
                className="hero-text-link"
              >
                {t.nav.startCta}
                <span aria-hidden="true">↗</span>
              </TrackedLink>
            </div>
            <p className="hero-role">{t.profile.role}</p>
          </div>
          {profile.photo && (
            <div className="hero-portrait enter enter-2">
              <Image
                src={profile.photo}
                alt={profile.photoAlt}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="portrait-caption">
                <span dir="ltr">
                  MOKA
                  <br />
                  YAKOUBI<span className="accent-dot">.</span>
                </span>
                <span className="portrait-location">
                  {t.profile.location} {profile.locationFlag}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="hero-bottom">
          <span>{t.stats.note}</span>
          <div>
            {socialLinks
              .filter((link) => link.url)
              .map((link) => (
                <TrackedLink
                  key={link.id}
                  href={link.url}
                  event={EVENTS.social}
                  props={{ network: link.label, place: 'hero' }}
                >
                  {link.label}
                  <span aria-hidden="true"> ↗</span>
                </TrackedLink>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
