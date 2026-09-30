import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import portfolio from '@/data/portfolio.json'

export default function Contact() {
  useDocumentTitle(`Contact — ${portfolio.hero.name}`)

  return (
    <>
      <PageHeader
        label="Contact"
        title="Get in touch"
        description="Have a project, a question, or just want to say hi? Pick a channel below."
      />

      <section className="relative border-b border-border px-6 py-14 sm:px-10 md:py-20">
        <Reveal>
          <span className="label">Email</span>
          <a
            href={`mailto:${portfolio.hero.email}`}
            className="link-underline mt-3 block font-mono text-2xl font-medium tracking-tight break-all hover:text-foreground sm:text-3xl md:text-4xl"
          >
            {portfolio.hero.email}
          </a>
        </Reveal>

        <div className="mt-14 border-t border-border">
          {portfolio.contacts.map((contact, i) => {
            const content = (
              <>
                <span className="label md:w-40 md:shrink-0">{contact.label}</span>
                <span className="font-mono text-sm md:text-base">{contact.value}</span>
                {contact.url && (
                  <span
                    aria-hidden="true"
                    className="ml-auto text-muted-foreground transition-transform md:translate-x-0 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                )}
              </>
            )

            return (
              <Reveal key={contact.label} delay={i * 0.06}>
                {contact.url ? (
                  <a
                    href={contact.url}
                    target={contact.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:text-foreground"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 border-b border-border py-5 text-muted-foreground">
                    {content}
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>

        <div className="mt-14">
          <span className="label">Elsewhere</span>
          <div className="mt-4 flex flex-wrap gap-3">
            {portfolio.socialMedia.map((social, i) => (
              <Reveal key={social.label} delay={i * 0.06}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm transition-colors hover:border-foreground"
                >
                  {social.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {social.username}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
