interface PageHeaderProps {
  label: string
  title: string
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header__inner">
        <div className="page-header__label">
          <span className="page-header__bar" />
          <span>{label}</span>
        </div>
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
      </div>
    </section>
  )
}
