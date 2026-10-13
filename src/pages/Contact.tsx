import { useState, type FormEvent } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

const SUBJECTS = ['Project Inquiry', 'Collaboration', 'Job Opportunity', 'Just Saying Hi'] as const

export default function Contact() {
  useDocumentTitle(`Contact — ${portfolio.hero.name}`)

  const [status, setStatus] = useState<FormStatus>('idle')
  const [touched, setTouched] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0] as string,
    message: '',
  })

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const nameValid = form.name.trim().length > 1
  const messageValid = form.message.trim().length > 4
  const isValid = nameValid && emailValid && messageValid

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (status === 'error') setStatus('idle')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!isValid || status === 'sending') {
      setStatus('error')
      return
    }
    setStatus('sending')

    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    const mailto = `mailto:${portfolio.hero.email}?subject=${encodeURIComponent(
      `[${form.subject}] ${form.name}`,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setStatus('sent')
  }

  const fieldError = (valid: boolean) =>
    touched && !valid ? ' contact-field__control--invalid' : ''

  return (
    <>
      <PageHeader
        label="GET IN TOUCH"
        title="Let's build something"
        description="Have a project in mind, a question, or want to collaborate? Drop a message or reach out through any channel below."
      />

      <div className="page page--compact contact-layout">
        {/* ================= Contact Form ================= */}
        <section className="contact-panel" aria-label="Contact form">
          <div className="contact-panel__chrome" aria-hidden="true">
            <span className="contact-panel__dot contact-panel__dot--r" />
            <span className="contact-panel__dot contact-panel__dot--y" />
            <span className="contact-panel__dot contact-panel__dot--g" />
            <span className="contact-panel__filename">message.json</span>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label className="contact-field" htmlFor="c-name">
                <span className="contact-field__label">
                  name<span className="contact-field__req">*</span>
                </span>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={`contact-field__control${fieldError(nameValid)}`}
                />
              </label>

              <label className="contact-field" htmlFor="c-email">
                <span className="contact-field__label">
                  email<span className="contact-field__req">*</span>
                </span>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@domain.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={`contact-field__control${fieldError(emailValid)}`}
                />
              </label>
            </div>

            <label className="contact-field" htmlFor="c-subject">
              <span className="contact-field__label">subject</span>
              <div className="contact-field__select">
                <select
                  id="c-subject"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  className="contact-field__control"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="contact-field__chevron" aria-hidden="true">
                  ⌄
                </span>
              </div>
            </label>

            <label className="contact-field" htmlFor="c-message">
              <span className="contact-field__label">
                message<span className="contact-field__req">*</span>
              </span>
              <textarea
                id="c-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, timeline, and goals…"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className={`contact-field__control contact-field__control--area${fieldError(
                  messageValid,
                )}`}
              />
            </label>

            <div className="contact-form__footer">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`contact-submit${status === 'sent' ? ' contact-submit--sent' : ''}`}
              >
                {status === 'sending'
                  ? 'Opening mail client…'
                  : status === 'sent'
                    ? 'Draft ready ✓'
                    : 'Send message →'}
              </button>

              <p className="contact-form__hint" role="status" aria-live="polite">
                {status === 'error' && touched && !isValid
                  ? 'Please complete the required fields with a valid email.'
                  : status === 'sent'
                    ? 'Your email client should open with a pre-filled draft.'
                    : 'Sends via your default mail app — no data stored.'}
              </p>
            </div>
          </form>
        </section>

        {/* ================= Sidebar ================= */}
        <aside className="contact-aside">
          {/* Direct email */}
          <section className="contact-card">
            <div className="contact-card__header">
              <span className="contact-card__label">Direct Email</span>
              <a href={`mailto:${portfolio.hero.email}`} className="contact-card__email">
                {portfolio.hero.email}
              </a>
            </div>

            {/* Contact Table */}
            <div className="contact-table">
              {portfolio.contacts.map((contact) => (
                <div key={contact.label} className="contact-row">
                  <span className="contact-row__label">{contact.label}</span>
                  <span className="contact-row__value">{contact.value}</span>
                  {contact.url ? (
                    <a
                      href={contact.url}
                      target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="contact-row__link"
                    >
                      Connect ↗
                    </a>
                  ) : (
                    <span className="contact-row__none">—</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Elsewhere Social Badges */}
          <section className="contact-socials">
            <div className="section-head">
              <span className="section-head__bar" />
              <h2 className="section-head__title section-head__title--md">Social Profiles</h2>
            </div>

            <div className="socials-row">
              {portfolio.socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-chip"
                >
                  <span className="social-chip__label">{social.label}</span>
                  <span className="social-chip__handle">{social.username}</span>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  )
}
