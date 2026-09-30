import { Link } from 'react-router-dom'
import { Cross } from '@/components/Cross'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('404 — Not found')

  return (
    <section className="grid-bg relative flex min-h-[60vh] flex-col items-center justify-center border-b border-border px-6 text-center">
      <Cross className="top-0 left-0" />
      <Cross className="top-0 right-0" />

      <span className="label">Error 404</span>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        ← Back home
      </Link>
    </section>
  )
}

export default NotFound
