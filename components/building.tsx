import { projects } from '@/config/site'
import type { Content } from '@/config/content'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * The index of everything Moka is building. Numbered, editorial, no cards.
 */
export function Building({ t }: { t: Content }) {
  const items = projects
    .filter((project) => t.projects[project.id])
    .map((project) => ({ ...project, copy: t.projects[project.id] }))

  if (items.length === 0) return null

  return (
    <Section id="projects" eyebrow={t.building.eyebrow} title={t.building.title}>
      <ul className="mt-12 sm:mt-16">
        {items.map((project, index) => (
          <Reveal as="li" key={project.id} delay={index * 60}>
            <div className="grid gap-4 border-t border-line py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-8 sm:py-10">
              <span className="font-serif text-[1.375rem] leading-none text-faint tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-title font-semibold">{project.copy.name}</h3>
                  <span className="text-[0.75rem] uppercase tracking-[0.14em] text-faint">
                    {[project.copy.status, project.year].filter(Boolean).join(' · ')}
                  </span>
                </div>
                <p className="mt-3 max-w-prose text-[0.9375rem] text-muted pretty">
                  {project.copy.description}
                </p>
              </div>

              {project.url && (
                <TrackedLink
                  href={project.url}
                  event={EVENTS.project}
                  props={{ project: project.id, cta: 'index' }}
                  className="link-arrow"
                >
                  {project.copy.cta}
                  <Arrow />
                </TrackedLink>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="hairline" />
    </Section>
  )
}
