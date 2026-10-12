import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function Skills() {
  useDocumentTitle(`Skills — ${portfolio.hero.name}`)

  return (
    <>
      <PageHeader
        label="SKILLS & TECH STACK"
        title="Technologies & Tools"
        description="Core technologies, frameworks, and tools I use to design, build, and ship modern web applications and AI systems."
      />

      <div className="page page--compact">
        {/* Core Tech Badges */}
        <Section label="01 / CORE TECHNOLOGIES" title="Primary Stack">
          <div className="skills-grid">
            {portfolio.coreTech.map((tech) => (
              <div key={tech.name} className="skill-badge">
                <div className="skill-badge__icon">
                  <TechIcon name={tech.name} />
                </div>
                <span className="skill-badge__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills by Category */}
        <Section label="02 / BY CATEGORY" title="Skills Breakdown">
          <div className="skills-categories">
            {portfolio.skills.map((group) => (
              <div key={group.category} className="card skill-cat-card">
                <h3 className="skill-cat-card__title">{group.category}</h3>
                <ul className="skill-cat-card__list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechIcon name={item} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <Section label="03 / AT A GLANCE" title="By the numbers">
          <div className="stats-card">
            {portfolio.stats.map((stat) => (
              <div key={stat.label} className="stat">
                <p className="stat__value">{stat.value}</p>
                <p className="stat__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
