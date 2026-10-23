import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import portfolio from '@/data/portfolio.json'

const GITHUB = 'https://github.com/leytofu'
const LINKEDIN = 'https://linkedin.com/in/charlie-boyles'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 7 8.1 5.3a2 2 0 0 0 2.2 0L21 7" />
    </svg>
  )
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="site" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link
            to="/"
            className="brand"
            aria-label={`${portfolio.hero.firstName} ${portfolio.hero.lastName} — home`}
          >
            <span className="brand__mark" aria-hidden="true">
              {portfolio.hero.firstName?.[0]}
              {portfolio.hero.lastName?.[0]}
            </span>
            <span className="brand__text">
              <span className="brand__name">
                {portfolio.hero.firstName} {portfolio.hero.lastName}
              </span>
              <span className="brand__role">{portfolio.hero.role}</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {portfolio.navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.url}
                end={link.url === '/'}
                className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle />

            <Link to="/contact" className="btn btn--primary btn--sm nav-cta">
              Let&apos;s talk
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>

            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__line" />
              <span className="menu-toggle__line" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' is-open' : ''}`} id="mobile-menu">
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {portfolio.navLinks.map((link, index) => (
            <NavLink
              key={link.id}
              to={link.url}
              end={link.url === '/'}
              className={({ isActive }) =>
                `mobile-menu__link${isActive ? ' is-active' : ''}`
              }
              style={{ transitionDelay: `${index * 35}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-menu__index">0{index + 1}</span>
              {link.label}
              <span className="mobile-menu__arrow" aria-hidden="true">
                ↗
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a href={`mailto:${portfolio.hero.email}`} className="mobile-menu__email">
            {portfolio.hero.email}
          </a>
          <div className="socials">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${portfolio.hero.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </div>
        </div>
      </div>

      <main id="main" className="site-main">
        {children}
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta">
            <div className="footer-cta__copy">
              <p className="eyebrow">Next step</p>
              <h2 className="footer-cta__title">
                Have an idea?
                <br />
                <span className="grad-text">Let&apos;s build it.</span>
              </h2>
            </div>
            <div className="footer-cta__actions">
              <a href={`mailto:${portfolio.hero.email}`} className="btn btn--primary">
                Say hello
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a href={`mailto:${portfolio.hero.email}`} className="footer-cta__email">
                {portfolio.hero.email}
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-bottom__copy">
              © {year} {portfolio.hero.firstName} {portfolio.hero.lastName}
            </p>
            <div className="footer-bottom__socials socials">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${portfolio.hero.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </div>
            <a href="#top" className="footer-bottom__top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
