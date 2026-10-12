import type { Experience } from '@/types'

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="exp-item">
      <div className="exp-item__meta">
        <span className="exp-item__period">{item.period}</span>
        <span className="exp-item__loc">{item.location}</span>
      </div>
      <div className="exp-item__body">
        <div className="exp-item__role-row">
          <h3 className="exp-item__role">{item.role}</h3>
          {item.tag && <span className="pill">{item.tag}</span>}
        </div>
        <p className="exp-item__company">{item.company}</p>
        <ul className="exp-item__points">
          {item.points.map((point) => (
            <li key={point}>
              <span className="dot" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
