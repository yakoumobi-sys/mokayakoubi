import { contact } from '@/config/site'
import type { Content } from '@/config/content'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function Contact({ t }: { t: Content }) {
  return (
    <section id="contact" className="section contact-section">
      <div className="shell">
        <p className="eyebrow">04 / {t.contact.eyebrow}</p>
        <h2>
          {t.contact.title}
          <span aria-hidden="true">↗</span>
        </h2>
        <div className="contact-grid">
          {t.contact.categories.map((category, index) => (
            <TrackedLink
              key={category.title}
              href={
                contact.formUrl ||
                `mailto:${contact.email}?subject=${encodeURIComponent(category.subject)}`
              }
              external={false}
              event={EVENTS.contact}
              props={{ category: index }}
              className="contact-card"
            >
              <span className="contact-number">0{index + 1}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="link-arrow">
                {t.contact.cta}
                <span aria-hidden="true">↗</span>
              </span>
            </TrackedLink>
          ))}
        </div>
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="contact-email">
            {contact.email}
          </a>
        )}
      </div>
    </section>
  )
}
