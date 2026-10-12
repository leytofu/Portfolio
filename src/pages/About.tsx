import { ExperienceItem } from '@/components/ExperienceItem'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { AboutAvatar } from '@/components/Thumbnails'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function About() {
  useDocumentTitle(`About — ${portfolio.hero.name}`)

  return (
    <>
      <PageHeader
        label="ABOUT ME"
        title={portfolio.hero.name}
        description={portfolio.hero.about || portfolio.hero.bio}
      />

      <div className="page page--compact">
        {/* Intro Card — avatar, about text, facts */}
        <Section label="00 / INTRODUCTION" title="A bit about me">
          <div className="card about-card">
            <AboutAvatar />
            <div className="about-card__text">
              <p>{portfolio.hero.about}</p>
              <ul className="about-facts">
                <li>
                  <span className="emoji">🎓</span>
                  <span>{portfolio.hero.school}</span>
                </li>
                <li>
                  <span className="emoji">📍</span>
                  <span>{portfolio.hero.location}</span>
                </li>
                <li>
                  <span className="status-dot">
                    <span className="status-dot__ping" />
                    <span className="status-dot__core" />
                  </span>
                  <span className="status-text">{portfolio.hero.status}</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section label="01 / EXPERIENCE" title="Where I've worked & built">
          <div className="card exp-card">
            {portfolio.experience.map((item) => (
              <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section label="02 / EDUCATION" title="Background">
          <div className="edu-grid">
            {portfolio.education.map((item) => (
              <div key={item.title} className="card edu-card">
                <span className="edu-card__time">{item.timeRange}</span>
                <h3 className="edu-card__title">{item.title}</h3>
                <p className="edu-card__school">{item.school}</p>
                <p className="edu-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills Categories */}
        <Section label="03 / SKILLS & TOOLBOX" title="Technologies & Frameworks">
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
        <Section label="04 / AT A GLANCE" title="By the numbers">
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
