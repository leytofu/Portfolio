import type { ReactNode } from 'react'
import { Cross } from '@/components/Cross'

interface SectionProps {
  id?: string
  label?: string
  title?: string
  children: ReactNode
  className?: string
}

export function Section({ id, label, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative border-b border-border ${className}`}>
      <Cross className="top-0 left-0" />
      <Cross className="top-0 right-0" />
      <div className="px-6 py-16 sm:px-10 md:py-24">
        {(label || title) && (
          <header className="mb-10 flex flex-col gap-3 md:mb-14">
            {label && <span className="label">{label}</span>}
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
