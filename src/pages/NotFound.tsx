import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('404 — Not found')

  return (
    <section className="notfound container">
      <div className="notfound__inner">
        <p className="eyebrow">Error 404</p>
        <p className="notfound__code grad-text" aria-hidden="true">
          404
        </p>
        <h1 className="notfound__title">Page not found</h1>
        <p className="notfound__desc">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn btn--primary">
          Back home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
