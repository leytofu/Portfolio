import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PageIntro } from '@/components/PageIntro'
import { ProjectCard } from '@/components/ProjectCard'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

/** Collapse versioned labels (e.g. "Laravel 12") into a single filter option. */
function canonicalTech(tech: string) {
  return tech.startsWith('Laravel') ? 'Laravel' : tech
}

export default function Projects() {
  useDocumentTitle(`Projects — ${portfolio.hero.name}`)

  const reduceMotion = useReducedMotion()
  const allTech = [
    ...new Set(portfolio.projects.flatMap((project) => project.tech.map(canonicalTech))),
  ]
  const [filter, setFilter] = useState<string | null>(null)

  const visible = filter
    ? portfolio.projects.filter((project) =>
        project.tech.map(canonicalTech).includes(filter),
      )
    : portfolio.projects

  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve
            <br />
            <span className="grad-text">built.</span>
          </>
        }
        description="Side projects, experiments, and things I've shipped. Each one started as a problem worth solving."
        aside={
          <div className="intro-meta">
            <div className="intro-meta__row">
              <span className="mono-label">Projects</span>
              <span>{String(portfolio.projects.length).padStart(2, '0')}</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Focus</span>
              <span>Web · Mobile App</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Year</span>
              <span>2026</span>
            </div>
          </div>
        }
      />

      <section className="section section--tight container">
        <div className="filter-bar" role="group" aria-label="Filter projects by technology">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`filter-chip${filter === null ? ' is-active' : ''}`}
            aria-pressed={filter === null}
          >
            All
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(filter === tech ? null : tech)}
              className={`filter-chip${filter === tech ? ' is-active' : ''}`}
              aria-pressed={filter === tech}
            >
              <TechIcon name={tech} />
              {tech}
            </button>
          ))}
        </div>

        <div className="projects-bento">
          {visible.map((project, index) => {
            const isWide = visible.length !== 2 && index === 0
            return (
              <motion.div
                key={project.id}
                className={isWide ? 'project-item--wide' : undefined}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  wide={isWide}
                  featured={isWide}
                />
              </motion.div>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="empty-state">No projects match this filter yet.</p>
        )}

        <div className="section-foot">
          <p className="section-foot__text">More experiments live on GitHub.</p>
          <a
            href="https://github.com/leytofu?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Browse repositories
          </a>
        </div>
      </section>
    </>
  )
}
