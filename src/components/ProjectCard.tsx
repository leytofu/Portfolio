import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  delay?: number
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col border border-border bg-card p-6 transition-colors duration-300 hover:border-foreground/40">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="absolute top-5 right-5 z-10 text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>

        <Link to={`/projects/${project.id}`} className="flex h-full flex-col">
          <span className="label">{project.period}</span>
          <h3 className="mt-3 font-mono text-lg font-medium tracking-tight">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {project.points.slice(0, 2).map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground"
              >
                <span aria-hidden="true" className="mt-1.5 h-px w-3 shrink-0 bg-border" />
                {point}
              </li>
            ))}
          </ul>
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="border border-border px-2 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  )
}
