import { Link } from 'react-router-dom'
import { HeroLaptop } from '@/components/HeroLaptop'
import { ProfilePortrait } from '@/components/ProfilePortrait'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { RESUME_PATH, resumeFileName, useResumeAvailable } from '@/hooks/useResumeAvailable'
import portfolio from '@/data/portfolio.json'

export default function Home() {
  useDocumentTitle(`${portfolio.hero.name} — Portfolio`)
  const resumeStatus = useResumeAvailable()
  const resumeReady = resumeStatus === 'ready'

  const initials = `${portfolio.hero.firstName?.[0] ?? ''}${portfolio.hero.lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div className="page home-page">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        {/* Left Column Text Content */}
        <div className="hero__content">
          <div>
            <p className="hero__hello">Hello, I'm</p>
            <h1 className="hero__title">
              {portfolio.hero.firstName}{' '}
              <span className="ln">{portfolio.hero.lastName}</span>
            </h1>
            <h2 className="hero__subtitle">{portfolio.hero.role}</h2>
          </div>

          <p className="hero__bio">{portfolio.hero.bio}</p>

          {/* Action CTAs */}
          <div className="hero__ctas">
            <Link to="/projects" className="btn-primary">
              <span>View My Projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link to="/contact" className="btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Resume download — only shown once public/resume.pdf exists */}
          {resumeReady && (
            <a
              href={RESUME_PATH}
              download={resumeFileName(portfolio.hero.name)}
              className="hero__resume-link"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
              <span className="hero__resume-link__hint">PDF</span>
            </a>
          )}

          {/* Social Row */}
          <div className="hero__socials">
            <a
              href="https://github.com/leytofu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href={`mailto:${portfolio.hero.email}`} aria-label="Email" className="social-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Portrait (primary) + Laptop accent (preserved) */}
        <div className="hero__visual">
          <div className="hero__portrait">
            <ProfilePortrait
              alt={`${portfolio.hero.name} portrait`}
              initials={initials}
            />

            {/* Small availability pill tucked under the portrait */}
            <div className="hero__portrait-badge">
              <span className="hero__portrait-badge__dot" aria-hidden="true" />
              <span>{portfolio.hero.status}</span>
            </div>
          </div>

          <div className="hero__laptop">
            <HeroLaptop />
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS BAND ================= */}
      <section className="home-highlights">
        <div className="home-highlights__stats">
          <div className="stats-card home-highlights__stats-card">
            {portfolio.stats.map((stat) => (
              <div key={stat.label} className="stat">
                <p className="stat__value">{stat.value}</p>
                <p className="stat__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="home-highlights__cta">
          <p className="home-highlights__text">
            {portfolio.hero.about}
          </p>
          <div className="home-highlights__links">
            <Link to="/about" className="btn-secondary">
              <span>More About Me</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/skills" className="btn-secondary">
              <span>My Skills</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
