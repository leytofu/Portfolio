import { PageHeader } from '@/components/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { RESUME_PATH, resumeFileName, useResumeAvailable } from '@/hooks/useResumeAvailable'
import portfolio from '@/data/portfolio.json'

export default function Resume() {
  useDocumentTitle(`Resume — ${portfolio.hero.name}`)
  const status = useResumeAvailable()
  const fileName = resumeFileName(portfolio.hero.name)
  const ready = status === 'ready'

  return (
    <>
      <PageHeader
        label="RESUME"
        title="My Resume"
        description="Preview my resume below, or download a copy to read later."
      />

      <div className="page page--compact">
        {/* Toolbar */}
        <section className="resume-toolbar">
          <div className="resume-toolbar__actions">
            <a
              href={RESUME_PATH}
              download={fileName}
              className={`btn-primary ${ready ? '' : 'btn-primary--disabled'}`}
              aria-disabled={!ready}
              tabIndex={ready ? 0 : -1}
              onClick={(e) => {
                if (!ready) e.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </a>

            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className={`btn-secondary ${ready ? '' : 'btn-secondary--disabled'}`}
              aria-disabled={!ready}
              tabIndex={ready ? 0 : -1}
              onClick={(e) => {
                if (!ready) e.preventDefault()
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Open in New Tab</span>
            </a>
          </div>

          {ready && (
            <p className="resume-toolbar__hint">
              {fileName} · served from <code>/resume.pdf</code>
            </p>
          )}
        </section>

        {/* Viewer / fallback */}
        {status === 'loading' && (
          <div className="resume-frame-wrap">
            <div className="resume-loading" role="status" aria-live="polite">
              Loading resume…
            </div>
          </div>
        )}

        {ready && (
          <div className="resume-frame-wrap">
            {/* object > iframe fallback covers browsers that block embedded PDFs */}
            <object
              data={RESUME_PATH}
              type="application/pdf"
              className="resume-frame"
              aria-label={`${portfolio.hero.name} resume PDF`}
            >
              <iframe
                src={RESUME_PATH}
                title={`${portfolio.hero.name} resume PDF`}
                className="resume-frame"
              />
              <div className="resume-unsupported">
                <p>Your browser cannot display PDFs inline.</p>
                <p>
                  <a href={RESUME_PATH} download={fileName}>
                    Download the PDF
                  </a>{' '}
                  or{' '}
                  <a href={RESUME_PATH} target="_blank" rel="noreferrer">
                    open it in a new tab
                  </a>
                  .
                </p>
              </div>
            </object>
          </div>
        )}

        {status === 'missing' && (
          <div className="resume-missing">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="resume-missing__icon"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            <h2 className="resume-missing__title">Resume not added yet</h2>
            <p className="resume-missing__text">
              Download and preview actions are disabled because no resume file is present.
            </p>
            <div className="resume-missing__code">
              <p>To enable it, drop your PDF here:</p>
              <code>public/resume.pdf</code>
              <p className="resume-missing__note">
                Keep the same filename to swap in a newer version later — no code changes needed.
                See <code>public/README.md</code> for full instructions.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
