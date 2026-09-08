import { affiliateTools } from '@/config/site'
import type { Content } from '@/config/content'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * Affiliate shelf. Hidden until `affiliateTools.enabled` is true AND there is
 * at least one real item — nothing is placeholdered here.
 */
export function Tools({ t }: { t: Content }) {
  if (!affiliateTools.enabled || affiliateTools.items.length === 0) return null

  const categories = Array.from(new Set(affiliateTools.items.map((tool) => tool.category)))

  return (
    <Section id="tools" eyebrow={t.tools.eyebrow} title={t.tools.title} intro={t.tools.subtitle}>
      <div className="mt-12 space-y-12 sm:mt-16">
        {categories.map((category) => (
          <Reveal key={category}>
            <p className="eyebrow border-t border-line pt-5">{category}</p>
            <ul className="mt-2">
              {affiliateTools.items
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <li
                    key={tool.name}
                    className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
                  >
                    {tool.url ? (
                      <TrackedLink
                        href={tool.url}
                        event={EVENTS.resource}
                        props={{ tool: tool.name, category }}
                        className="link-arrow"
                      >
                        {tool.name}
                      </TrackedLink>
                    ) : (
                      <span className="text-[0.9375rem] font-medium">{tool.name}</span>
                    )}
                    <span className="text-[0.9375rem] text-muted pretty">
                      {tool.description}
                    </span>
                  </li>
                ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {t.tools.disclosure && (
        <p className="mt-8 text-[0.8125rem] text-faint">{t.tools.disclosure}</p>
      )}
    </Section>
  )
}
