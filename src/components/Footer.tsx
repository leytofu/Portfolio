import { Link } from 'react-router-dom'
import { Cross } from '@/components/Cross'
import portfolio from '@/data/portfolio.json'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10 sm:px-10">
      <Cross className="top-0 left-0" />
      <Cross className="top-0 right-0" />
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm">
            {portfolio.hero.name}
            <span className="text-muted-foreground">_</span>
          </span>
          <span className="label">Built with React.</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {portfolio.footer.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="label link-underline hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.url}
                className="label link-underline hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <p className="label">© {YEAR}</p>
      </div>
    </footer>
  )
}
