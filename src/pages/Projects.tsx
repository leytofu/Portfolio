import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
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
        label={`${portfolio.projects.length} projects`}
        title="Things I've built"
        description="Side projects, experiments, and things I've shipped. Source code lives on GitHub."
      />

      <section className="relative border-b border-border px-6 py-14 sm:px-10 md:py-20">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
              filter === null
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(filter === tech ? null : tech)}
              className={`border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                filter === tech
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="label mt-10">No projects match this filter.</p>
        )}

        <Reveal delay={0.2} className="mt-12 border-t border-border pt-6">
          <a
            href="https://github.com/leytofu?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="label link-underline hover:text-foreground"
          >
            More experiments on GitHub →
          </a>
        </Reveal>
      </section>
    </>
  )
}
