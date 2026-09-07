import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/reveal'

/**
 * Every section on the page uses this: same rhythm, same eyebrow, same
 * heading treatment. Consistency is what makes it read as expensive.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  bordered = true,
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children?: ReactNode
  /** hairline separator at the top of the section */
  bordered?: boolean
  className?: string
}) {
  return (
    <section
      id={id}
      className={`section scroll-mt-16 ${bordered ? 'border-t border-line' : ''} ${className}`.trim()}
    >
      <div className="shell">
        {(eyebrow || title || intro) && (
          <Reveal className="max-w-prose">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && (
              <h2 className="text-headline font-semibold balance">{title}</h2>
            )}
            {intro && (
              <p className="mt-5 text-lede text-muted pretty">{intro}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
