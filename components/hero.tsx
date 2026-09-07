import Image from 'next/image'
import { profile, startHere } from '@/config/site'
import { Arrow } from '@/components/ui/arrow'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

/**
 * First view. Three seconds to say who this is and where to click.
 * Rendered on the server — the LCP text ships in the HTML.
 */
export function Hero() {
  const hasPhoto = Boolean(profile.photo)

  return (
    <section id="top" className="relative pt-28 sm:pt-36 lg:pt-44">
      <div className="shell">
        <div
          className={`grid items-end gap-10 lg:gap-16 ${
            hasPhoto ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''
          }`}
        >
          <div>
            <p className="enter enter-1 eyebrow mb-8 sm:mb-10">
              {profile.locationFlag} {profile.location}
            </p>

            <h1 className="enter enter-2">
              <span className="block text-[0.9375rem] font-medium tracking-[-0.01em] text-muted">
                {profile.name}
              </span>
              <span className="mt-4 block text-display font-semibold">
                {profile.tagline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </h1>

            <p className="enter enter-3 mt-7 max-w-prose text-lede text-muted pretty sm:mt-8">
              {profile.description}
            </p>

            <div className="enter enter-4 mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <TrackedLink
                href="#start"
                event={EVENTS.startHere}
                props={{ place: 'hero' }}
                className="btn-primary w-full sm:w-auto"
              >
                {startHere.eyebrow}
                <Arrow />
              </TrackedLink>

              <TrackedLink
                href="#projects"
                event={EVENTS.nav}
                props={{ label: 'Explore my projects' }}
                className="btn-secondary w-full sm:w-auto"
              >
                Explore my projects
              </TrackedLink>
            </div>
          </div>

          {hasPhoto && (
            <div className="enter enter-3 relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface">
              <Image
                src={profile.photo}
                alt={profile.photoAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Quiet editorial footer to the hero. */}
        <div className="enter enter-4 mt-16 border-t border-line pt-5 sm:mt-24">
          <p className="text-[0.8125rem] text-faint">{profile.role}</p>
        </div>
      </div>
    </section>
  )
}
