import { Reveal } from '@/components/Reveal'
import type { SkillCategory } from '@/types'

export function SkillGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((group, i) => (
        <Reveal key={group.category} delay={i * 0.06} className="h-full">
          <div className="h-full bg-card p-6">
            <h3 className="label">{group.category}</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-border pb-2 text-sm last:border-none last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
