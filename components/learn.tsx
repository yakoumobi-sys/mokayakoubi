import { resources } from '@/config/site'
import type { Content } from '@/config/content'
import { localeHref } from '@/lib/locale'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function Learn({ t }: { t: Content }) {
  const items = resources.filter(
    (resource) => resource.published && t.resources[resource.id],
  )
  return (
    <section id="learn" className="section resources-section">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">03 / {t.learn.eyebrow}</p>
          <div>
            <h2 className="text-headline font-semibold">{t.learn.title}</h2>
            <p className="section-intro">{t.learn.intro}</p>
          </div>
        </div>
        <div className="resources-list">
          {items.map((resource, index) => {
            const copy = t.resources[resource.id]
            const target =
              resource.url || resource.file || resource.anchor || ''
            const href = target.startsWith('#')
              ? localeHref(t.locale, target)
              : target
            const isFile = !resource.url && Boolean(resource.file)
            const body = (
              <>
                <span
                  className={`resource-number resource-number-${index}`}
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <div className="resource-copy">
                  <div className="resource-meta">
                    <span>{copy.type}</span>
                    <span>{copy.price}</span>
                  </div>
                  <h3>{copy.title}</h3>
                  <p>{copy.description}</p>
                </div>
                <span className="resource-action">
                  {t.learn.get}
                  <span aria-hidden="true">{isFile ? '↓' : '↗'}</span>
                </span>
              </>
            )
            return href ? (
              <TrackedLink
                key={resource.id}
                href={href}
                download={isFile}
                event={isFile ? EVENTS.guideDownload : EVENTS.resource}
                props={{ resource: resource.id }}
                className="resource-row"
              >
                {body}
              </TrackedLink>
            ) : (
              <div key={resource.id} className="resource-row">
                {body}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
