import { useState, type FormEvent } from 'react'
import { PageIntro } from '@/components/PageIntro'
import { Reveal } from '@/components/Reveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useAvailability } from '@/hooks/useAvailability'
import portfolio from '@/data/portfolio.json'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

const SUBJECTS = ['Project Inquiry', 'Collaboration', 'Job Opportunity', 'Just Saying Hi'] as const

export default function Contact() {
  useDocumentTitle(`Contact — ${portfolio.hero.name}`)

  const [status, setStatus] = useState<FormStatus>('idle')
  const availability = useAvailability()
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0] as string,
    message: '',
    website: '',
  })

  const emailValid = form.email.trim().length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(form.email.trim())
  const nameValid = form.name.trim().length > 1 && form.name.trim().length <= 100 && !/[\r\n]/.test(form.name)
  const messageValid = form.message.trim().length > 4 && form.message.trim().length <= 5000
  const isValid = nameValid && emailValid && messageValid

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (status === 'error' || status === 'sent') setStatus('idle')
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (status === 'sending') return
    setTouched(true)
    setError('')
    if (!isValid) {
      setStatus('error')
      return
    }
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(20_000),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.success !== true) {
        throw new Error(typeof result?.error === 'string' ? result.error : 'Could not send your message. Please try again or use the direct email link.')
      }
      setStatus('sent')
      setTouched(false)
      setForm({ name: '', email: '', subject: SUBJECTS[0], message: '', website: '' })
    } catch (cause) {
      setStatus('error')
      setError(cause instanceof Error && cause.name !== 'TimeoutError'
        ? cause.message
        : 'The request timed out. Please try again later or use the direct email link.')
    }
  }

  const fieldError = (valid: boolean) => (touched && !valid ? ' is-invalid' : '')

  return (
    <>
      <PageIntro
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build
            <br />
            <span className="grad-text">something.</span>
          </>
        }
        description="Have a project in mind, a question, or want to collaborate? Drop a message or reach out through any channel below."
        aside={
          <div className="intro-meta">
            <div className="intro-meta__row">
              <span className="mono-label">Email</span>
              <span className="intro-meta__truncate">{portfolio.hero.email}</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Response</span>
              <span>Within 24 hours</span>
            </div>
            <div className="intro-meta__row">
              <span className="mono-label">Status</span>
              <span className={`intro-meta__status${availability.isOffDuty ? ' is-off-duty' : ''}`} role="status" aria-live="polite">{availability.label}</span>
            </div>
          </div>
        }
      />

      <section className="section section--tight container contact-layout">
        <Reveal className="contact-form-wrap">
          <section className="bento contact-card" aria-label="Contact form">
            <div className="contact-card__head">
              <div>
                <p className="eyebrow">01 — Message</p>
                <h2 className="bento__title">Tell me what you&apos;re working on.</h2>
              </div>
              <span className={`chip chip--sm${availability.isOffDuty ? ' is-off-duty' : ''}`} role="status" aria-live="polite" title={portfolio.availability.scheduleNote}>
                <span className="pulse-dot" aria-hidden="true" />
                {availability.label}
              </span>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div hidden aria-hidden="true">
                <label htmlFor="c-website">Website</label>
                <input id="c-website" name="website" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={(event) => update('website', event.target.value)} />
              </div>
              <fieldset disabled={status === 'sending'} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: 'contents' }}>
                <div className="contact-form__row">
                  <label className="field" htmlFor="c-name">
                    <span className="field__label">
                      Name<span className="field__req">*</span>
                    </span>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      aria-invalid={touched && !nameValid}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(event) => update('name', event.target.value)}
                      className={`field__control${fieldError(nameValid)}`}
                    />
                  </label>

                  <label className="field" htmlFor="c-email">
                    <span className="field__label">
                      Email<span className="field__req">*</span>
                    </span>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      aria-invalid={touched && !emailValid}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) => update('email', event.target.value)}
                      className={`field__control${fieldError(emailValid)}`}
                    />
                  </label>
                </div>

                <label className="field" htmlFor="c-subject">
                  <span className="field__label">Subject</span>
                  <div className="field__select-wrap">
                    <select
                      id="c-subject"
                      name="subject"
                      value={form.subject}
                      onChange={(event) => update('subject', event.target.value)}
                      className="field__control field__control--select"
                    >
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="field__chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </label>

                <label className="field" htmlFor="c-message">
                  <span className="field__label">
                    Message<span className="field__req">*</span>
                  </span>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    required
                    maxLength={5000}
                    aria-invalid={touched && !messageValid}
                    placeholder="Tell me about your project, timeline, and goals…"
                    value={form.message}
                    onChange={(event) => update('message', event.target.value)}
                    className={`field__control field__control--area${fieldError(messageValid)}`}
                  />
                </label>

                <div className="contact-form__footer">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'sent'}
                    className={`btn btn--primary${status === 'sent' ? ' is-sent' : ''}`}
                  >
                    {status === 'sending'
                      ? 'Sending…'
                      : status === 'sent'
                        ? 'Message sent ✓'
                        : 'Send message'}
                    {status === 'idle' && (
                      <span className="btn__arrow" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </button>

                  <p className="contact-form__hint" role="status" aria-live="polite">
                    {status === 'error' && error
                      ? error
                      : status === 'error' && touched && !isValid
                      ? 'Please complete the required fields with a valid email.'
                      : status === 'sent'
                        ? 'Thanks! Your message has been submitted successfully.'
                        : 'Your message is sent directly to my inbox.'}
                  </p>
                </div>
              </fieldset>
            </form>
          </section>
        </Reveal>

        <aside className="contact-aside">
          <Reveal>
            <article className="bento contact-email-card">
              <p className="eyebrow">Direct email</p>
              <a href={`mailto:${portfolio.hero.email}`} className="contact-email">
                {portfolio.hero.email}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="bento__text">
                The fastest way to reach me. I usually reply within a day.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="bento contact-links-card">
              <p className="eyebrow">Elsewhere</p>
              <ul className="contact-links">
                {portfolio.socialMedia.map((social) => {
                  const external = !social.url.startsWith('mailto:')
                  return (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                      >
                        <span className="contact-links__label">{social.label}</span>
                        <span className="contact-links__value">{social.username}</span>
                        <span className="contact-links__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className={`bento contact-note${availability.isOffDuty ? ' is-off-duty' : ''}`}>
              <span className="pulse-dot" aria-hidden="true" />
              <div>
                <p className="contact-note__title">{availability.label} · {portfolio.hero.status}</p>
                <p className="contact-note__text">
                  Based in the Philippines · Open to internships, junior roles, and collaborations.
                </p>
                <p className="contact-note__text">{portfolio.availability.scheduleNote}</p>
              </div>
            </article>
          </Reveal>
        </aside>
      </section>
    </>
  )
}
