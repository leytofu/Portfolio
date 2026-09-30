import { Cross } from '@/components/Cross'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="grid-bg relative border-b border-border">
      <Cross className="top-0 left-0" />
      <Cross className="top-0 right-0" />
      <div className="px-6 pt-20 pb-14 sm:px-10 md:pt-28 md:pb-16">
        <span className="label">{label}</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-balance text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
