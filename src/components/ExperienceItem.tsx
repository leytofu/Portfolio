import { Reveal } from '@/components/Reveal'
import type { Experience } from '@/types'

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <Reveal>
      <article className="grid grid-cols-1 gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr] md:gap-10">
        <div className="flex flex-col gap-2">
          <span className="label">{item.period}</span>
          <span className="label">{item.location}</span>
        </div>
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-medium tracking-tight">{item.role}</h3>
            {item.tag && (
              <span className="border border-border px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted-foreground">
                {item.tag}
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{item.company}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {item.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-border" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}
