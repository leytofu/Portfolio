import { Link, useParams } from 'react-router-dom'
import { Cross } from '@/components/Cross'
import { NotFound } from '@/pages/NotFound'
import { Reveal } from '@/components/Reveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = portfolio.projects.find((p) => p.id === id)

  useDocumentTitle(project ? `${project.name} — ${portfolio.hero.name}` : 'Not found')

  if (!project) return <NotFound />

  return (
    <>
      <section className="grid-bg relative border-b border-border">
        <Cross className="top-0 left-0" />
        <Cross className="top-0 right-0" />

        <div className="px-6 pt-16 pb-14 sm:px-10 md:pt-20">
          <Link to="/projects" className="label link-underline hover:text-foreground">
            ← All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="label">{project.period}</span>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground sm:text-lg">
                {project.tagline}
              </p>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              View source ↗
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="border border-border px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-border px-6 py-14 sm:px-10 md:py-20">
        <Cross className="top-0 left-0" />
        <Cross className="top-0 right-0" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-14">
          <span className="label">Overview</span>
          <div className="max-w-3xl">
            <Reveal>
              <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </Reveal>

            <ul className="mt-10 flex flex-col">
              {project.points.map((point, i) => (
                <Reveal key={point} delay={i * 0.06}>
                  <li className="flex gap-4 border-t border-border py-4 text-sm leading-relaxed">
                    <span className="label shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{point}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <Link
                to="/contact"
                className="label link-underline mt-10 inline-block hover:text-foreground"
              >
                Discuss a similar project →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
