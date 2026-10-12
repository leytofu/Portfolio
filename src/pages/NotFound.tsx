import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('404 — Not found')

  return (
    <section className="notfound">
      <span className="notfound__code">Error 404</span>
      <h1 className="notfound__title">Page not found</h1>
      <p className="notfound__desc">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="notfound__btn">
        <span>← Back home</span>
      </Link>
    </section>
  )
}

export default NotFound
