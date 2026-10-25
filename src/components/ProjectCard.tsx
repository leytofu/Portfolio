import { Link } from 'react-router-dom'
import { ProjectThumbnail } from '@/components/Thumbnails'
import { TechIcon } from '@/components/icons'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index?: number
  featured?: boolean
  wide?: boolean
}

export function ProjectCard({ project, index, featured = false, wide = false }: ProjectCardProps) {
  const className = [
    'project-tile',
    featured ? 'project-tile--featured' : '',
    wide ? 'project-tile--wide' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      <Link to={`/projects/${project.id}`} className="project-tile__hit">
        <div className="project-tile__art" aria-hidden="true">
          <ProjectThumbnail id={project.id} />
          <span className="project-tile__art-veil" />
        </div>

        <div className="project-tile__body">
          <div className="project-tile__meta">
            <span className="project-tile__period">{project.period}</span>
            {typeof index === 'number' && (
              <span className="project-tile__num">{String(index + 1).padStart(2, '0')}</span>
            )}
          </div>

          <h3 className="project-tile__title">{project.name}</h3>
          <p className="project-tile__tagline">{project.tagline}</p>

          <div className="project-tile__footer">
            <div className="project-tile__tech">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="chip chip--sm">
                  <TechIcon name={tech} />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
