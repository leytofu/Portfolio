import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  label?: string
  title?: string
  children: ReactNode
}

export function Section({ id, label, title, children }: SectionProps) {
  return (
    <section id={id} className="section-block">
      {(label || title) && (
        <header className="section-head">
          <span className="section-head__bar" />
          <div className="section-head__text">
            {label && <span className="section-head__label">{label}</span>}
            {title && <h2 className="section-head__title">{title}</h2>}
          </div>
        </header>
      )}
      {children}
    </section>
  )
}
