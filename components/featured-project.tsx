import Image from 'next/image'
import type { Project } from '@/config/site'
import type { ProjectCopy } from '@/config/content'
import { Arrow } from '@/components/ui/arrow'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function FeaturedProject({
  project,
  copy,
  index,
}: {
  project: Project
  copy: ProjectCopy
  index: number
}) {
  return (
    <article className="project-card">
      <div
        className={`project-visual ${index % 2 ? 'project-visual-light' : ''}`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={copy.name}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <>
            <div className="project-visual-top">
              <span>0{index + 1}</span>
              <span>{copy.status}</span>
            </div>
            <p className="project-wordmark" dir="ltr">
              {copy.name}
              <span className="accent-dot">.</span>
            </p>
            <div className="project-visual-bottom">
              <span>{copy.sectionTitle}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </>
        )}
      </div>
      <div className="project-details">
        <h3>{copy.sectionTitle || copy.name}</h3>
        <p>{copy.description}</p>
        <div className="project-links">
          {project.url && (
            <TrackedLink
              href={project.url}
              event={EVENTS.project}
              props={{ project: project.id, cta: 'primary' }}
              className="link-arrow"
            >
              {copy.primaryCta || copy.cta}
              <Arrow />
            </TrackedLink>
          )}
          {project.guide && copy.guideCta && (
            <TrackedLink
              href={project.guide}
              download
              event={EVENTS.guideDownload}
              props={{ project: project.id, place: 'section' }}
              className="project-guide"
            >
              {copy.guideCta}
              <span aria-hidden="true"> ↓</span>
            </TrackedLink>
          )}
        </div>
      </div>
    </article>
  )
}
