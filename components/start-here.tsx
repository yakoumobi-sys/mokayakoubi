import { startHere } from '@/config/site'
import type { Content } from '@/config/content'
import { Arrow } from '@/components/ui/arrow'
import { PlaybookForm } from '@/components/playbook-form'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function StartHere({ t }: { t: Content }) {
  return (
    <section id="start" className="playbook-section">
      <div className="shell playbook-layout">
        <div className="playbook-intro">
          <p className="eyebrow">02 / {t.startHere.eyebrow}</p>
          <h2>
            {t.startHere.title}
            <span className="accent-dot">.</span>
          </h2>
          <p>{t.startHere.description}</p>
          <div className="playbook-form">
            {startHere.mode === 'link' && startHere.url ? (
              <TrackedLink
                href={startHere.url}
                event={EVENTS.playbook}
                className="btn-invert"
              >
                {t.startHere.cta}
                <Arrow />
              </TrackedLink>
            ) : (
              <PlaybookForm t={t} />
            )}
          </div>
        </div>
        <div className="playbook-topics">
          <span className="edition-label">THE MOKA PLAYBOOK — 01</span>
          <ol>
            {t.startHere.topics.map((topic, index) => (
              <li key={topic}>
                <span>0{index + 1}</span>
                {topic}
              </li>
            ))}
          </ol>
          <span className="playbook-signature" dir="ltr">
            Moka.
          </span>
        </div>
      </div>
    </section>
  )
}
