import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useIntroActive } from '@/components/IntroContext'
import { ProfilePortrait } from '@/components/ProfilePortrait'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { SocialLinks } from '@/components/SocialLinks'
import { TechIcon } from '@/components/icons'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useAvailability } from '@/hooks/useAvailability'
import portfolio from '@/data/portfolio.json'

const location = portfolio.hero.location.replace(/^Based in\s+/i, '')

const marqueeTech = [
  ...new Set([
    ...portfolio.coreTech.map((tech) => tech.name),
    ...portfolio.skills.flatMap((group) => group.items),
  ]),
]

export default function Home() {
  useDocumentTitle(`${portfolio.hero.name} — ${portfolio.hero.role}`)

  const initials = `${portfolio.hero.firstName?.[0] ?? ''}${portfolio.hero.lastName?.[0] ?? ''}`.toUpperCase()

  const introActive = useIntroActive()
  const availability = useAvailability()
  const [introReveal, setIntroReveal] = useState(false)
  const wasIntroActive = useRef(introActive)

  useLayoutEffect(() => {
    if (wasIntroActive.current && !introActive) setIntroReveal(true)
    wasIntroActive.current = introActive
  }, [introActive])

  const featuredProjects = portfolio.featured
    .map((id) => portfolio.projects.find((project) => project.id === id))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))

  return (
    <>
      <section className={`hero${introReveal ? ' hero--intro-reveal' : ''}`}>
        <div className="container hero__grid">
          <div className="hero__copy">
            <Reveal>
              <div className="hero__top">
                <span className={`status-pill${availability.isOffDuty ? ' is-off-duty' : ''}`} title={portfolio.availability.scheduleNote}>
                  <span className="pulse-dot" aria-hidden="true" />
                  {portfolio.hero.status}
                  <span aria-hidden="true">·</span>
                  <span role="status" aria-live="polite">{availability.label}</span>
                </span>
                <span className="hero__top-note">Portfolio · 2026</span>
              </div>

              <h1 className="hero__title">
                <span className="hero__title-line">{portfolio.hero.firstName}</span>
                <span className="hero__title-line grad-text">{portfolio.hero.lastName}</span>
              </h1>

              <p className="hero__role">
                {portfolio.hero.role}
              </p>

              <p className="hero__lede">{portfolio.hero.bio}</p>

              <div className="hero__actions">
                <Link to="/projects" className="btn btn--primary">
                  View projects
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <a href={`mailto:${portfolio.hero.email}`} className="btn btn--ghost">
                  Get in touch
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>

              <div className="hero__social-row">
                <SocialLinks />
                <span className="hero__social-note">Find me online</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero__visual" delay={0.12}>
            <div className="portrait-frame">
              <span className="portrait-frame__plate" aria-hidden="true" />
              <div className="portrait-frame__glow" aria-hidden="true" />
              <span className="portrait-frame__caption">01 — Profile</span>
              <svg className="portrait-frame__bolt" viewBox="0 0 64 96" aria-hidden="true">
                <defs>
                  <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                  <linearGradient id="boltGradLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="50%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
                <path
                  d="M38 5 15 47h12l-5 44 28-53H37l1-33Z"
                  fill="none"
                  stroke="url(#boltGrad)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="portrait-frame__media">
                <ProfilePortrait alt={`${portfolio.hero.name} portrait`} initials={initials} />
                <span className="portrait-frame__grain" aria-hidden="true" />
                <div className="portrait-frame__meta">
                  <div>
                    <span className="mono-label">Focus</span>
                    <span className="portrait-frame__value">Web · Mobile App</span>
                  </div>
                  <div>
                    <span className="mono-label">Studying</span>
                    <span className="portrait-frame__value">BSIT · 4th year</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {marqueeTech.map((tech) => (
                <span className="marquee__item" key={`${copy}-${tech}`}>
                  {tech}
                  <span className="marquee__star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">
              Recent projects<span className="grad-text">.</span>
            </h2>
          </div>
          <Link to="/projects" className="text-link">
            All projects <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="bento-grid">
          <Reveal className="col-7">
            <article className="bento bento--about">
              <div className="bento__head">
                <p className="eyebrow">01 — About</p>
                <span className="mono-label">A little context</span>
              </div>
              <h3 className="bento__title">
                A developer focused on clean interfaces and dependable systems.
              </h3>
              <p className="bento__text">{portfolio.hero.about}</p>
              <Link to="/about" className="text-link">
                More about me <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento bento--stats">
              <div className="bento__head">
                <p className="eyebrow">02 — At a glance</p>
              </div>
              <div className="stats">
                {portfolio.stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <span className="stat__value">{stat.value}</span>
                    <span className="stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <p className="bento__footnote">Always learning. Always shipping.</p>
            </article>
          </Reveal>

          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.id}
              className={index === 0 ? 'col-7' : 'col-5'}
              delay={index * 0.05}
            >
              <ProjectCard project={project} index={index} featured={index === 0} />
            </Reveal>
          ))}

          <Reveal className="col-7">
            <article className="bento bento--stack">
              <div className="bento__head">
                <p className="eyebrow">03 — Toolkit</p>
                <span className="mono-label">What I build with</span>
              </div>
              <h3 className="bento__title">Tools I reach for</h3>
              <div className="stack-chips">
                {portfolio.coreTech.map((tech) => (
                  <span className="chip" key={tech.name}>
                    <TechIcon name={tech.name} />
                    {tech.name}
                  </span>
                ))}
              </div>
              <Link to="/skills" className="text-link">
                Full toolkit <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </Reveal>

          <Reveal className="col-7">
            <article className="bento bento--now">
              <div className="bento__head">
                <p className="eyebrow">04 — Currently</p>
                <span className="mono-label">Open to work</span>
              </div>
              <h3 className="bento__title">
                Finishing my IT degree while building real products.
              </h3>
              <div className="now-grid">
                <div>
                  <span className="mono-label">Studying</span>
                  <span className="now-grid__value">BSIT · TMC</span>
                </div>
                <div>
                  <span className="mono-label">Graduating</span>
                  <span className="now-grid__value">2027</span>
                </div>
                <div>
                  <span className="mono-label">Location</span>
                  <span className="now-grid__value">{location}</span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="col-5" delay={0.06}>
            <article className="bento bento--cta">
              <p className="eyebrow">05 — Contact</p>
              <h3 className="bento__title">Have an idea? Let&apos;s make it real.</h3>
              <p className="bento__text">
                Open to internships, junior roles, and thoughtful collaborations.
              </p>
              <a href={`mailto:${portfolio.hero.email}`} className="btn btn--primary btn--sm">
                Say hello
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
