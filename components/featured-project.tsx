import Image from 'next/image'
import type { Project } from '@/config/site'
import type { ProjectCopy } from '@/config/content'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * One layout, used for every featured company (Caractère, InvoiceDZ, and
 * whatever comes next). Buttons only appear once the project has a real URL
 * in config/site.ts — no dead links.
 */
export function FeaturedProject({
  project,
  copy,
  index,
}: {
  project: Project
  copy: ProjectCopy
  index: number
}) {
  const flipped = index % 2 === 1
  const hasLink = Boolean(project.url)

  return (
    <section className="section border-t border-line">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className={flipped ? 'lg:order-2' : ''}>
            <p className="eyebrow mb-5">{copy.name}</p>
            <h2 className="text-headline font-semibold balance">
              {copy.sectionTitle || copy.name}
            </h2>
            <p className="mt-6 max-w-prose text-lede text-muted pretty">
              {copy.description}
            </p>

            {hasLink && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {copy.primaryCta && (
                  <TrackedLink
                    href={project.url}
                    event={EVENTS.project}
                    props={{ project: project.id, cta: 'primary' }}
                    className="btn-primary w-full sm:w-auto"
                  >
                    {copy.primaryCta}
                    <Arrow />
                  </TrackedLink>
                )}
                <TrackedLink
                  href={project.url}
                  event={EVENTS.project}
                  props={{ project: project.id, cta: 'secondary' }}
                  className={
                    copy.primaryCta
                      ? 'btn-secondary w-full sm:w-auto'
                      : 'btn-primary w-full sm:w-auto'
                  }
                >
                  {copy.cta}
                  {!copy.primaryCta && <Arrow />}
                </TrackedLink>
              </div>
            )}
          </Reveal>

          <Reveal delay={60} className={flipped ? 'lg:order-1' : ''}>
            <Visual project={project} copy={copy} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** A photo when there is one, a typographic plate when there isn't. */
function Visual({ project, copy }: { project: Project; copy: ProjectCopy }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface sm:aspect-[4/3]">
        <Image
          src={project.image}
          alt={copy.name}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between rounded-lg border border-line bg-surface p-7 sm:aspect-[4/3] sm:p-10">
      <span className="eyebrow">{copy.status}</span>
      {/* Latin name inside an RTL page: the bidi algorithm keeps the letters
          in order, and inheriting the page direction keeps it aligned with the
          status and the year above and below it. */}
      <span className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">
        {copy.name}
      </span>
      <span className="text-[0.8125rem] text-faint">{project.year || ' '}</span>
    </div>
  )
}
