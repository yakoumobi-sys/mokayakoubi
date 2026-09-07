import { resources } from '@/config/site'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * The shelf. Empty today, ready for guides, templates, playbooks and courses:
 * add an entry to `resources` in config/site.ts and it lands here.
 */
export function Learn() {
  const items = resources.filter((resource) => resource.published)

  return (
    <Section
      id="learn"
      eyebrow="Resources"
      title="Learn."
      intro="Resources, systems and things I actually use."
    >
      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((resource, index) => {
          const href = resource.url || resource.anchor || ''
          const body = (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{resource.type}</span>
                <span className="text-[0.8125rem] text-muted">{resource.price}</span>
              </div>
              <h3 className="mt-8 text-title font-semibold">{resource.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted pretty">
                {resource.description}
              </p>
              {href && (
                <span className="link-arrow mt-8">
                  Get it
                  <Arrow />
                </span>
              )}
            </>
          )

          return (
            <Reveal key={resource.id} delay={index * 60}>
              {href ? (
                <TrackedLink
                  href={href}
                  event={EVENTS.resource}
                  props={{ resource: resource.title }}
                  className="card h-full"
                >
                  {body}
                </TrackedLink>
              ) : (
                <div className="card h-full">{body}</div>
              )}
            </Reveal>
          )
        })}

        <Reveal delay={items.length * 60}>
          <div className="flex h-full min-h-[9rem] sm:min-h-[13rem] items-end rounded-lg border border-dashed border-line p-6 sm:p-8">
            <p className="text-[0.9375rem] text-faint">More coming.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
