import { Link } from 'react-router-dom'
import { PageIntro } from '@/components/PageIntro'
import { ProfilePortrait } from '@/components/ProfilePortrait'
import { Reveal } from '@/components/Reveal'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function About() {
  useDocumentTitle(`About — ${portfolio.hero.name}`)

  const initials = `${portfolio.hero.firstName?.[0] ?? ''}${portfolio.hero.lastName?.[0] ?? ''}`.toUpperCase()
  const location = portfolio.hero.location.replace(/^Based in\s+/i, '')

  return (
    <>
      <PageIntro
        eyebrow="About me"
        title={
          <>
            The person behind
            <br />
            <span className="grad-text">the code.</span>
          </>
        }
        description="A student, builder, and relentless problem solver. Here is a little more about how I got here and what I care about."
        aside={
          <div className="intro-meta">
            <div className="intro-meta__row">
              <span className="mono-label">Based in</span>
              <span>{location}</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Studying</span>
              <span>BSIT · 4th year</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Status</span>
              <span className="intro-meta__status">{portfolio.hero.status}</span>
            </div>
          </div>
        }
      />

      <section className="section section--tight container">
        <div className="bento-grid">
          <Reveal className="col-7">
            <article className="bento bento--about">
              <div className="bento__head">
                <p className="eyebrow">01 — About</p>
                <span className="mono-label">Introduction</span>
              </div>
              <h2 className="bento__title">Curious by default, builder by habit.</h2>
              <p className="bento__text">{portfolio.hero.about}</p>
              <p className="about-note">
                <span className="mono-label">Currently</span>
                Deepening my knowledge in systems design, API architecture, and local AI.
              </p>
              <div className="fact-grid">
                <div className="fact">
                  <span className="mono-label">Education</span>
                  <span className="fact__value">{portfolio.hero.school}</span>
                </div>
                <div className="fact">
                  <span className="mono-label">Location</span>
                  <span className="fact__value">{location}</span>
                </div>
                <div className="fact">
                  <span className="mono-label">Focus</span>
                  <span className="fact__value">Full-stack web & local AI</span>
                </div>
                <div className="fact">
                  <span className="mono-label">Status</span>
                  <span className="fact__value fact__value--status">
                    <span className="pulse-dot" aria-hidden="true" />
                    {portfolio.hero.status}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento about-portrait-card">
              <div className="about-portrait">
                <ProfilePortrait alt={`${portfolio.hero.name} portrait`} initials={initials} />
              </div>
              <div className="about-portrait__caption">
                <span className="about-portrait__name">
                  {portfolio.hero.firstName} {portfolio.hero.lastName}
                </span>
                <span className="mono-label">{portfolio.hero.role}</span>
              </div>
            </article>
          </Reveal>

          <Reveal className="col-7">
            <article className="bento bento--experience">
              <div className="bento__head">
                <p className="eyebrow">02 — Experience</p>
                <span className="mono-label">2024 — Present</span>
              </div>
              <h2 className="bento__title">Where I&apos;ve built</h2>

              {portfolio.experience.map((item) => (
                <div className="timeline" key={`${item.company}-${item.period}`}>
                  <div className="timeline__meta">
                    <span className="mono-label">{item.period}</span>
                    {item.tag && <span className="chip chip--sm">{item.tag}</span>}
                  </div>
                  <h3 className="timeline__role">{item.role}</h3>
                  <p className="timeline__company">
                    {item.company} — {item.location}
                  </p>
                  <ul className="timeline__points">
                    {item.points.map((point) => (
                      <li key={point}>
                        <span className="timeline__bullet" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento bento--education">
              <p className="eyebrow">03 — Education</p>
              <h2 className="bento__title">Background</h2>

              {portfolio.education.map((item) => (
                <div className="education" key={item.title}>
                  <span className="chip chip--sm">{item.timeRange}</span>
                  <h3 className="education__title">{item.title}</h3>
                  <p className="education__school">{item.school}</p>
                  <p className="bento__text">{item.description}</p>
                </div>
              ))}
            </article>
          </Reveal>

          <Reveal className="col-7">
            <article className="bento bento--stats">
              <div className="bento__head">
                <p className="eyebrow">04 — At a glance</p>
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
                Building in public, learning out loud, and shipping one project at a time.
              </p>
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento bento--stack">
              <p className="eyebrow">05 — Toolbox</p>
              <h3 className="bento__title">Always adding to the kit.</h3>
              <div className="stack-chips">
                {portfolio.coreTech.slice(0, 6).map((tech) => (
                  <span className="chip" key={tech.name}>
                    <TechIcon name={tech.name} />
                    {tech.name}
                  </span>
                ))}
              </div>
              <Link to="/skills" className="text-link">
                See the full stack <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
