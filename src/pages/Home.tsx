import { Link } from 'react-router-dom'
import { Cross } from '@/components/Cross'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { SkillGrid } from '@/components/SkillGrid'
import { Terminal } from '@/components/Terminal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

const YEAR = new Date().getFullYear()

export default function Home() {
  useDocumentTitle(`${portfolio.hero.name} — Portfolio`)

  const featuredProjects = portfolio.featured
    .map((id) => portfolio.projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <>
      <section className="grid-bg relative border-b border-border">
        <Cross className="top-0 left-0" />
        <Cross className="top-0 right-0" />

        <div className="px-6 pt-20 pb-16 sm:px-10 md:pt-28 md:pb-20">
          <Reveal>
            <span className="label">Portfolio — {YEAR}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              {portfolio.hero.name}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 font-mono text-sm text-muted-foreground">
              {portfolio.hero.role} <span aria-hidden="true">·</span> {portfolio.hero.location}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {portfolio.hero.bio}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                View projects →
              </Link>
              <Link
                to="/contact"
                className="border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-14 max-w-2xl">
            <Terminal />
          </Reveal>

          <div className="mt-14 grid grid-cols-3 border-t border-border">
            {portfolio.stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={0.35 + i * 0.07}
                className={`py-6 ${i > 0 ? 'border-l border-border pl-6' : 'pr-6'}`}
              >
                <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                  {stat.value}
                </p>
                <p className="label mt-1">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section id="work" label="01 / Selected work" title="Featured projects">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link
            to="/projects"
            className="label link-underline mt-8 inline-block hover:text-foreground"
          >
            All projects →
          </Link>
        </Reveal>
      </Section>

      <Section id="skills" label="02 / Skills" title="What I work with">
        <SkillGrid categories={portfolio.skills} />
      </Section>

      <Section label="03 / Contact" title="Let's build something">
        <Reveal>
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Have a project in mind, or just want to talk code? My inbox is open — I usually
            reply within a day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${portfolio.hero.email}`}
              className="border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Email me
            </a>
            <Link
              to="/contact"
              className="border border-border px-5 py-2.5 text-sm transition-colors hover:border-foreground"
            >
              Other ways to reach me
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
