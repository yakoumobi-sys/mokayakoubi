import { resources } from '@/config/site'
import type { Content } from '@/config/content'
import { localeHref } from '@/lib/locale'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * The shelf. Add an entry to `resources` in config/site.ts plus its copy in
 * every file under config/content/ and it lands here.
 */
export function Learn({ t }: { t: Content }) {
  const items = resources
    .filter((resource) => resource.published && t.resources[resource.id])
    .map((resource) => ({ ...resource, copy: t.resources[resource.id] }))

  return (
    <Section id="learn" eyebrow={t.learn.eyebrow} title={t.learn.title} intro={t.learn.intro}>
      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((resource, index) => {
          const target = resource.url || resource.anchor || ''
          const href = target.startsWith('#') ? localeHref(t.locale, target) : target
          const body = (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{resource.copy.type}</span>
                <span className="text-[0.8125rem] text-muted">{resource.copy.price}</span>
              </div>
              <h3 className="mt-8 text-title font-semibold">{resource.copy.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted pretty">
                {resource.copy.description}
              </p>
              {href && (
                <span className="link-arrow mt-8">
                  {t.learn.get}
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
                  props={{ resource: resource.id }}
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
          <div className="flex h-full min-h-[9rem] items-end rounded-lg border border-dashed border-line p-6 sm:min-h-[13rem] sm:p-8">
            <p className="text-[0.9375rem] text-faint">{t.learn.more}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
