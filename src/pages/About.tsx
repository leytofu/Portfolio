import { ExperienceItem } from '@/components/ExperienceItem'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { SkillGrid } from '@/components/SkillGrid'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function About() {
  useDocumentTitle(`About — ${portfolio.hero.name}`)

  return (
    <>
      <PageHeader
        label="About"
        title={portfolio.hero.name}
        description={portfolio.hero.bio}
      />

      <Section label="01 / Experience" title="Where I've worked">
        <div className="border-b border-border">
          {portfolio.experience.map((item) => (
            <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
          ))}
        </div>
      </Section>

      <Section label="02 / Education" title="Background">
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
          {portfolio.education.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <div className="h-full bg-card p-6">
                <span className="label">{item.timeRange}</span>
                <h3 className="mt-3 font-medium tracking-tight">{item.title}</h3>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{item.school}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="03 / Skills" title="Toolbox">
        <SkillGrid categories={portfolio.skills} />
      </Section>

      <Section label="04 / By the numbers" title="At a glance">
        <div className="grid grid-cols-3 border-t border-border">
          {portfolio.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.07}
              className={`py-6 ${i > 0 ? 'border-l border-border pl-6' : 'pr-6'}`}
            >
              <p className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                {stat.value}
              </p>
              <p className="label mt-1">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
