import { startHere } from '@/config/site'
import { Arrow } from '@/components/ui/arrow'
import { Reveal } from '@/components/ui/reveal'
import { PlaybookForm } from '@/components/playbook-form'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * The most important block after the hero. Inverted so the eye lands on it
 * on the way down the page.
 */
export function StartHere() {
  return (
    <section id="start" className="scroll-mt-16 bg-ink text-paper">
      <div className="shell section">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase text-white/60">
              {startHere.eyebrow}
            </p>
            <h2 className="mt-5 text-headline font-semibold balance">
              {startHere.title}
            </h2>
            <p className="mt-6 max-w-prose text-lede text-white/70 pretty">
              {startHere.description}
            </p>

            <div className="mt-10">
              {startHere.mode === 'link' && startHere.url ? (
                <TrackedLink
                  href={startHere.url}
                  event={EVENTS.playbook}
                  props={{ place: 'start_here', mode: 'link' }}
                  className="btn-invert w-full sm:w-auto"
                >
                  {startHere.cta}
                  <Arrow />
                </TrackedLink>
              ) : (
                <PlaybookForm />
              )}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="lg:pt-2">
              {startHere.topics.map((topic, index) => (
                <li
                  key={topic}
                  className="flex items-baseline gap-5 border-t border-white/12 py-4 last:border-b"
                >
                  <span className="text-[0.6875rem] tabular-nums text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9375rem] text-white/85">{topic}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
