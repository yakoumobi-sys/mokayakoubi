import { projects } from '@/config/site'
import type { Content } from '@/config/content'
import { FeaturedProject } from '@/components/featured-project'

export function Building({ t }: { t: Content }) {
  const items = projects.filter((project) => t.projects[project.id])
  if (!items.length) return null
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">01 / {t.building.eyebrow}</p>
          <h2 className="text-headline font-semibold">{t.building.title}</h2>
        </div>
        <div className="projects-grid">
          {items.map((project, index) => (
            <FeaturedProject
              key={project.id}
              project={project}
              copy={t.projects[project.id]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
