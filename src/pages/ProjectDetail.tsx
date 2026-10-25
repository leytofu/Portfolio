import { Link, useParams } from 'react-router-dom'
import { ProjectThumbnail } from '@/components/Thumbnails'
import { TechIcon } from '@/components/icons'
import { NotFound } from '@/pages/NotFound'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = portfolio.projects.find((item) => item.id === id)

  useDocumentTitle(project ? `${project.name} — ${portfolio.hero.name}` : 'Not found')

  if (!project) return <NotFound />

  const currentIndex = portfolio.projects.findIndex((item) => item.id === project.id)
  const nextProject =
    portfolio.projects.length > 1
      ? portfolio.projects[(currentIndex + 1) % portfolio.projects.length]
      : null

  return (
    <div className="container detail-page">
      <Link to="/projects" className="back-link">
        All projects
      </Link>

      <section className="detail-hero">
        <div className="detail-hero__copy">
          <p className="eyebrow">{project.period} — Case study</p>
          <h1 className="detail-hero__title">{project.name}</h1>
          <p className="detail-hero__tagline">{project.tagline}</p>

          <div className="tech-row">
            {project.tech.map((tech) => (
              <span key={tech} className="chip">
                <TechIcon name={tech} />
                {tech}
              </span>
            ))}
          </div>

          <div className="detail-hero__actions">
            <Link to="/projects" className="btn btn--ghost">
              All projects
            </Link>
          </div>
        </div>

        <div className="detail-hero__visual">
          <div className="detail-hero__glow" aria-hidden="true" />
          <ProjectThumbnail id={project.id} />
        </div>
      </section>

      <section className="detail-grid">
        <article className="bento detail-card">
          <p className="eyebrow">01 — Overview</p>
          <h2 className="detail-card__title">About the project</h2>
          <p className="detail-card__text">{project.description}</p>
          <div className="detail-meta">
            <div>
              <span className="mono-label">Year</span>
              <span className="detail-meta__value">{project.period}</span>
            </div>
            <div>
              <span className="mono-label">Stack</span>
              <span className="detail-meta__value">{project.tech.length} technologies</span>
            </div>
            <div>
              <span className="mono-label">Source</span>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="detail-meta__link"
              >
                GitHub
              </a>
            </div>
          </div>
        </article>

        <article className="bento detail-card">
          <p className="eyebrow">02 — Highlights</p>
          <h2 className="detail-card__title">What it does</h2>
          <ul className="feature-list">
            {project.points.map((point, index) => (
              <li key={point}>
                <span className="feature-list__num">{String(index + 1).padStart(2, '0')}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {nextProject && (
        <Link to={`/projects/${nextProject.id}`} className="next-project">
          <span className="eyebrow">Next project</span>
          <span className="next-project__name">
            {nextProject.name}
          </span>
        </Link>
      )}
    </div>
  )
}
