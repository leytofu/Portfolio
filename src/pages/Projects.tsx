import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { ProjectThumbnail } from '@/components/Thumbnails'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function Projects() {
  useDocumentTitle(`Projects — ${portfolio.hero.name}`)

  const allTech = [...new Set(portfolio.projects.flatMap((p) => p.tech))]
  const [filter, setFilter] = useState<string | null>(null)

  const visible = filter
    ? portfolio.projects.filter((p) => p.tech.includes(filter))
    : portfolio.projects

  return (
    <>
      <PageHeader
        label={`${portfolio.projects.length} PROJECTS`}
        title="Things I've built"
        description="Side projects, experiments, and things I've shipped. Source code lives on GitHub."
      />

      <div className="page page--compact">
        {/* Tech Filters */}
        <section className="projects-section">
          <div className="filter-row" role="group" aria-label="Filter by technology">
            <button
              type="button"
              onClick={() => setFilter(null)}
              className={`filter-btn ${filter === null ? 'filter-btn--active' : ''}`}
            >
              All
            </button>
            {allTech.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setFilter(filter === tech ? null : tech)}
                className={`filter-btn ${filter === tech ? 'filter-btn--active' : ''}`}
              >
                <TechIcon name={tech} />
                {tech}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="projects-grid projects-grid--auto">
            {visible.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__thumb">
                  <ProjectThumbnail id={project.id} />
                </div>

                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span className="project-card__period">{project.period}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      title={`${project.name} on GitHub`}
                      className="project-card__gh"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  </div>

                  <h3 className="project-card__title">{project.name}</h3>

                  {project.techStack && (
                    <div className="project-card__stack">
                      <span className="dot" />
                      <span>{project.techStack}</span>
                    </div>
                  )}

                  <p className="project-card__tagline">{project.tagline}</p>

                  <ul className="project-card__points">
                    {project.points.slice(0, 2).map((point) => (
                      <li key={point}>
                        <span className="dash" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="project-card__tags">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  <Link to={`/projects/${project.id}`} className="project-card__link">
                    <span>View Project</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && <p className="empty-msg">No projects match this filter.</p>}

          <div className="footer-link">
            <a
              href="https://github.com/leytofu?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="footer-link__anchor"
            >
              More experiments on GitHub →
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
