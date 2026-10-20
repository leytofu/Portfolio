import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'

interface PageIntroProps {
  eyebrow: string
  title: ReactNode
  description?: string
  aside?: ReactNode
}

export function PageIntro({ eyebrow, title, description, aside }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="container page-intro__inner">
        <Reveal className="page-intro__copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-intro__title">{title}</h1>
          {description && <p className="page-intro__desc">{description}</p>}
        </Reveal>
        {aside && (
          <Reveal className="page-intro__aside" delay={0.12}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  )
}
