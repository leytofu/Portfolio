import { useEffect, useState } from 'react'

export const RESUME_PATH = '/resume.pdf'

/**
 * Checks whether public/resume.pdf exists by issuing a HEAD request.
 * Returns:
 *  - 'loading' while the check is in flight
 *  - 'ready'   when the PDF is present and reachable
 *  - 'missing' when the PDF could not be found (404 / network error)
 */
export function useResumeAvailable(): 'loading' | 'ready' | 'missing' {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading')

  useEffect(() => {
    let cancelled = false

    fetch(RESUME_PATH, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return
        // Some static dev servers return 200 for directory indexes, so also
        // guard against a non-PDF content type when the header is present.
        const type = res.headers.get('content-type')
        const looksLikePdf = !type || type.includes('pdf') || type.includes('octet-stream')
        setStatus(res.ok && looksLikePdf ? 'ready' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return status
}

/** Descriptive download filename derived from the site owner's name. */
export function resumeFileName(name: string): string {
  const safe = name.trim().replace(/\s+/g, '-')
  return safe ? `${safe}-Resume.pdf` : 'Resume.pdf'
}
