import { Link, useParams } from 'react-router-dom'
import { ProjectThumbnail } from '@/components/Thumbnails'
import { TechIcon } from '@/components/icons'
import { NotFound } from '@/pages/NotFound'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = portfolio.projects.find((p) => p.id === id)

  useDocumentTitle(project ? `${project.name} — ${portfolio.hero.name}` : 'Not found')

  if (!project) return <NotFound />

  return (
    <div className="page page--compact">
      {/* Back Link */}
      <div>
        <Link to="/projects" className="back-link">
          <span>← All Projects</span>
        </Link>
      </div>

      {/* Header Banner */}
      <section className="detail-hero">
        <div className="detail-hero__content">
          <span className="detail-hero__period">{project.period} PROJECT</span>
          <h1 className="detail-hero__title">{project.name}</h1>
          <p className="detail-hero__tagline">{project.tagline}</p>

          <div className="tech-row">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip">
                <TechIcon name={t} />
                {t}
              </span>
            ))}
          </div>

          <div className="detail-hero__cta">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn-github"
            >
              <span>View Source on GitHub</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div className="detail-hero__thumb">
          <ProjectThumbnail id={project.id} />
        </div>
      </section>

      {/* Overview & Key Highlights */}
      <section className="detail-body">
        <div className="detail-body__overview">
          <div className="section-head">
            <span className="section-head__bar" />
            <h2 className="section-head__title section-head__title--md">Project Overview</h2>
          </div>
          <p>{project.description}</p>
        </div>

        <div className="detail-body__features">
          <h3>Key Features & Implementation Points</h3>
          <ul className="feature-grid">
            {project.points.map((point, i) => (
              <li key={point}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
