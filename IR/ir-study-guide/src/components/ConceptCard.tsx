import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Concept } from '../types'
import ImportanceBadge from './ImportanceBadge'

interface ConceptCardProps {
  concept: Concept
  visited: boolean
}

export default function ConceptCard({ concept, visited }: ConceptCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
      <Link
        to={`/concepts/${concept.id}`}
        className="card p-5 flex flex-col gap-3 h-full hover:shadow-card-hover transition-shadow"
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-lg">
            {concept.section}
          </span>
          {visited && <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />}
        </div>
        <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-snug">{concept.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{concept.simpleExplanation}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <ImportanceBadge importance={concept.importance} />
          <div className="flex gap-1 flex-wrap justify-end">
            {concept.keywords.slice(0, 2).map((k) => (
              <span
                key={k}
                className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
