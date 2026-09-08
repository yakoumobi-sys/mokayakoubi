import { contact, profile, projects, socialLinks } from '@/config/site'
import type { Content } from '@/config/content'
import { LanguageSwitcher } from '@/components/language-switcher'
import { TrackedLink } from '@/components/ui/tracked-link'
import { EVENTS } from '@/lib/analytics'

export function Footer({ t }: { t: Content }) {
  const year = new Date().getFullYear()
  const socials = socialLinks.filter((link) => link.url)
  const linkedProjects = projects.filter(
    (project) => project.url && t.projects[project.id]
  )

  return (
    <footer className="border-t border-line py-14 sm:py-16">
      <div className="shell">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between sm:gap-16">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
              {profile.name}
            </p>
            <p className="mt-2 text-[0.9375rem] text-muted">
              {t.profile.location} {profile.locationFlag}
            </p>
            <LanguageSwitcher current={t.locale} className="-ms-2 mt-5" />
          </div>

          <div className="flex gap-14 sm:gap-20">
            {socials.length > 0 && (
              <nav aria-label={t.footer.elsewhere}>
                <p className="eyebrow mb-5">{t.footer.elsewhere}</p>
                <ul className="space-y-2.5">
                  {socials.map((link) => (
                    <li key={link.id}>
                      <TrackedLink
                        href={link.url}
                        event={EVENTS.social}
                        props={{ network: link.label, place: 'footer' }}
                        className="text-[0.9375rem] link-muted"
                      >
                        {link.label}
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {linkedProjects.length > 0 && (
              <nav aria-label={t.footer.projects}>
                <p className="eyebrow mb-5">{t.footer.projects}</p>
                <ul className="space-y-2.5">
                  {linkedProjects.map((project) => (
                    <li key={project.id}>
                      <TrackedLink
                        href={project.url}
                        event={EVENTS.project}
                        props={{ project: project.id, cta: 'footer' }}
                        className="text-[0.9375rem] link-muted"
                      >
                        {t.projects[project.id].name}
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {contact.email && (
              <nav aria-label={t.footer.contact}>
                <p className="eyebrow mb-5">{t.footer.contact}</p>
                <ul className="space-y-2.5">
                  <li>
                    <TrackedLink
                      href={`mailto:${contact.email}`}
                      external={false}
                      event={EVENTS.contact}
                      props={{ category: 'footer' }}
                      className="text-[0.9375rem] link-muted"
                    >
                      {t.footer.email}
                    </TrackedLink>
                  </li>
                  {contact.altEmail.email && (
                    <li>
                      <TrackedLink
                        href={`mailto:${contact.altEmail.email}`}
                        external={false}
                        event={EVENTS.contact}
                        props={{ category: contact.altEmail.label }}
                        className="text-[0.9375rem] link-muted"
                      >
                        {contact.altEmail.label}
                      </TrackedLink>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>

        <p dir="ltr" className="mt-14 text-[0.8125rem] text-faint rtl:text-end">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
