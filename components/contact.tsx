import { contact } from '@/config/site'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/** Builds a mailto with a prefilled subject, or points at a form if you set one. */
function contactHref(subject?: string) {
  if (contact.formUrl) return contact.formUrl
  if (!contact.email) return ''
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${contact.email}${query}`
}

export function Contact() {
  const generalHref = contactHref()

  return (
    <Section id="contact" eyebrow="Contact" title={contact.title}>
      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:mt-16 sm:grid-cols-3">
        {contact.categories.map((category, index) => {
          const href = contactHref(category.subject)
          const inner = (
            <>
              <h3 className="text-[1.0625rem] font-semibold">{category.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted pretty">
                {category.description}
              </p>
              {href && (
                <span className="link-arrow mt-8">
                  {contact.cta}
                  <Arrow />
                </span>
              )}
            </>
          )

          return (
            <Reveal key={category.title} delay={index * 60} className="bg-paper">
              {href ? (
                <TrackedLink
                  href={href}
                  external={false}
                  event={EVENTS.contact}
                  props={{ category: category.title }}
                  className="flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface sm:p-8"
                >
                  {inner}
                </TrackedLink>
              ) : (
                <div className="flex h-full flex-col p-6 sm:p-8">{inner}</div>
              )}
            </Reveal>
          )
        })}
      </div>

      {generalHref && (
        <Reveal className="mt-10">
          <TrackedLink
            href={generalHref}
            external={false}
            event={EVENTS.contact}
            props={{ category: 'general' }}
            className="btn-primary w-full sm:w-auto"
          >
            {contact.cta}
            <Arrow />
          </TrackedLink>
        </Reveal>
      )}
    </Section>
  )
}
