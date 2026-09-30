import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import portfolio from '@/data/portfolio.json'

export function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 sm:px-10">
        <Link to="/" className="font-mono text-sm font-medium tracking-tight">
          {portfolio.hero.name}
          <span className="text-muted-foreground">_</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {portfolio.navLinks.map((link) => {
            const active = pathname === link.url
            return (
              <Link
                key={link.id}
                to={link.url}
                className={`label transition-colors hover:text-foreground ${
                  active ? 'text-foreground' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center border border-border"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          {portfolio.navLinks.map((link) => {
            const active = pathname === link.url
            return (
              <Link
                key={link.id}
                to={link.url}
                onClick={() => setOpen(false)}
                className={`label block border-b border-border px-6 py-4 transition-colors hover:text-foreground ${
                  active ? 'text-foreground' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
