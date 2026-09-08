import { stats } from '@/config/site'
import type { Content } from '@/config/content'
import { Reveal } from '@/components/ui/reveal'

/**
 * Social proof, deliberately quiet and deliberately low on the page.
 * The numbers live in config/site.ts only — they change, the code doesn't.
 */
export function Proof({ t }: { t: Content }) {
  if (!stats.enabled || stats.items.length === 0) return null

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <dl className="flex flex-wrap gap-x-14 gap-y-8">
              {stats.items.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{t.stats.labels[stat.id]}</dt>
                  <dd
                    dir="ltr"
                    className="text-[clamp(2rem,6vw,2.75rem)] font-semibold leading-none tracking-[-0.035em] tabular-nums rtl:text-end"
                  >
                    {stat.value}
                  </dd>
                  <p className="mt-3 text-[0.8125rem] text-faint">
                    {t.stats.labels[stat.id]}
                  </p>
                </div>
              ))}
            </dl>

            {t.stats.note && (
              <p className="text-[0.9375rem] text-muted sm:text-end">{t.stats.note}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
