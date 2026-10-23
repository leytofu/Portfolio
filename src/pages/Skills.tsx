import { Link } from 'react-router-dom'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Reveal'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function Skills() {
  useDocumentTitle(`Skills — ${portfolio.hero.name}`)

  return (
    <>
      <PageIntro
        eyebrow="Skills & stack"
        title={
          <>
            The
            <br />
            <span className="grad-text">toolkit.</span>
          </>
        }
        description="Core technologies, frameworks, and tools I use to design, build, and ship modern web and mobile applications."
        aside={
          <div className="intro-meta">
            <div className="intro-meta__row">
              <span className="mono-label">Core tech</span>
              <span>{String(portfolio.coreTech.length).padStart(2, '0')}</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Categories</span>
              <span>{String(portfolio.skills.length).padStart(2, '0')}</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Focus</span>
              <span>Web · Mobile App</span>
            </div>
          </div>
        }
      />

      <section className="section section--tight container">
        <div className="bento-grid">
          <Reveal className="col-12">
            <article className="bento bento--primary-stack">
              <div className="bento__head">
                <p className="eyebrow">01 — Primary stack</p>
                <span className="mono-label">{portfolio.coreTech.length} technologies</span>
              </div>
              <h2 className="bento__title">
                Technologies I reach for when I need to ship.
              </h2>
              <div className="tech-grid">
                {portfolio.coreTech.map((tech) => (
                  <div className="tech-tile" key={tech.name}>
                    <span className="tech-tile__icon">
                      <TechIcon name={tech.name} />
                    </span>
                    <span className="tech-tile__name">{tech.name}</span>
                    <span className="tech-tile__type">{tech.type}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {portfolio.skills.map((group, index) => (
            <Reveal className="col-4" key={group.category} delay={index * 0.05}>
              <article className="bento bento--skill-group">
                <p className="eyebrow">
                  {String(index + 2).padStart(2, '0')} — {group.category}
                </p>
                <h3 className="bento__title">{group.category}</h3>
                <ul className="skill-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="skill-list__icon">
                        <TechIcon name={item} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal className="col-7">
            <article className="bento bento--stats">
              <div className="bento__head">
                <p className="eyebrow">05 — At a glance</p>
              </div>
              <div className="stats">
                {portfolio.stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <span className="stat__value">{stat.value}</span>
                    <span className="stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <p className="bento__footnote">
                Currently deepening my knowledge in systems design and local AI.
              </p>
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento bento--cta">
              <p className="eyebrow">Keep exploring</p>
              <h3 className="bento__title">See how these tools come together.</h3>
              <p className="bento__text">
                A closer look at the projects where I put this stack to work.
              </p>
              <Link to="/projects" className="btn btn--primary btn--sm">
                View projects
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
