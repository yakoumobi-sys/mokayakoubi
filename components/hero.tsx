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
          className={
            hasPhoto
              ? 'grid gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16'
              : ''
          }
        >
          <div>
            <p className="enter enter-1 eyebrow mb-7 sm:mb-10">
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
            /* Small square on mobile so the hero stays short, full column on
               desktop. Sits above the name on phones — the face is what people
               arriving from a Reel recognise first. */
            <div className="enter order-first lg:order-none">
              <div className="relative aspect-square w-28 overflow-hidden rounded-lg bg-surface sm:w-36 lg:w-full">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 160px, 45vw"
                  className="object-cover"
                />
              </div>
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
