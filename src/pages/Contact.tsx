import { PageHeader } from '@/components/PageHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function Contact() {
  useDocumentTitle(`Contact — ${portfolio.hero.name}`)

  return (
    <>
      <PageHeader
        label="GET IN TOUCH"
        title="Let's build something"
        description="Have a project in mind, a question, or want to collaborate? Reach out through any of the channels below."
      />

      <div className="page page--compact">
        {/* Main Email Box */}
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
      </div>
    </>
  )
}
