import { Star } from 'lucide-react'
import { Importance } from '../types'

export default function ImportanceBadge({ importance }: { importance: Importance }) {
  return (
    <div className="flex items-center gap-0.5" title={`Importance: ${importance}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < importance ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}
        />
      ))}
    </div>
  )
}
