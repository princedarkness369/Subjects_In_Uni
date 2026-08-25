import { useEffect, ElementType, ReactNode } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  ThumbsUp,
  ThumbsDown,
  ListTree,
  StickyNote,
  AlertTriangle,
  Tag,
  Brain,
} from 'lucide-react'
import { concepts, getConceptById } from '../data/concepts'
import ImportanceBadge from '../components/ImportanceBadge'
import { useProgress } from '../hooks/useProgress'

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: ElementType
  title: string
  children: ReactNode
}) {
  return (
    <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-5 first:border-none first:pt-0 first:mt-0">
      <div className="flex items-center gap-2 mb-2.5">
        <Icon size={16} className="text-primary" />
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function ConceptDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const concept = id ? getConceptById(id) : undefined
  const { markVisited, isVisited } = useProgress()

  useEffect(() => {
    if (concept) markVisited(concept.id)
  }, [concept, markVisited])

  if (!concept) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-slate-500">Concept not found.</p>
        <Link to="/concepts" className="text-primary font-semibold text-sm">
          Back to Concepts
        </Link>
      </div>
    )
  }

  const index = concepts.findIndex((c) => c.id === concept.id)
  const prev = concepts[index - 1]
  const next = concepts[index + 1]

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/concepts"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary mb-5 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Concepts
      </Link>

      <motion.div
        key={concept.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-lg">
            {concept.section}
          </span>
          {isVisited(concept.id) && (
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
              Studied
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          {concept.name}
        </h1>
        <ImportanceBadge importance={concept.importance} />

        <Section icon={Lightbulb} title="Definition">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{concept.definition}</p>
        </Section>

        <Section icon={Brain} title="Simple Explanation">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {concept.simpleExplanation}
          </p>
        </Section>

        <Section icon={Target} title="Why is it important?">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{concept.whyImportant}</p>
        </Section>

        <Section icon={Target} title="Main Goal">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{concept.mainGoal}</p>
        </Section>

        {(concept.advantages || concept.disadvantages) && (
          <Section icon={ThumbsUp} title="Advantages & Disadvantages">
            <div className="grid sm:grid-cols-2 gap-4">
              {concept.advantages && (
                <div>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                    <ThumbsUp size={12} /> Advantages
                  </p>
                  <ul className="space-y-1.5">
                    {concept.advantages.map((a, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                        <span className="text-emerald-400 mt-1">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {concept.disadvantages && (
                <div>
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1.5 flex items-center gap-1">
                    <ThumbsDown size={12} /> Disadvantages
                  </p>
                  <ul className="space-y-1.5">
                    {concept.disadvantages.map((d, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                        <span className="text-rose-400 mt-1">•</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        <Section icon={ListTree} title="Real-World Examples">
          <ul className="space-y-1.5">
            {concept.examples.map((ex, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-lg px-3 py-2 font-mono text-[13px]"
              >
                {ex}
              </li>
            ))}
          </ul>
        </Section>

        {concept.notes && (
          <Section icon={StickyNote} title="Important Notes">
            <ul className="space-y-1.5">
              {concept.notes.map((n, i) => (
                <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                  <span className="text-primary mt-1">•</span> {n}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {concept.confusions && (
          <Section icon={AlertTriangle} title="Common Confusions">
            <ul className="space-y-1.5">
              {concept.confusions.map((c, i) => (
                <li
                  key={i}
                  className="text-sm text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2 flex gap-2"
                >
                  <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section icon={Tag} title="Keywords">
          <div className="flex flex-wrap gap-2">
            {concept.keywords.map((k) => (
              <span
                key={k}
                className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full"
              >
                {k}
              </span>
            ))}
          </div>
        </Section>

        <Section icon={Brain} title="Memory Trick">
          <p className="text-sm text-slate-700 dark:text-slate-200 bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-2.5 italic">
            {concept.memoryTrick}
          </p>
        </Section>
      </motion.div>

      <div className="flex items-center justify-between mt-6 gap-3">
        {prev ? (
          <button
            onClick={() => navigate(`/concepts/${prev.id}`)}
            className="flex-1 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="truncate">{prev.name}</span>
          </button>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <button
            onClick={() => navigate(`/concepts/${next.id}`)}
            className="flex-1 flex items-center justify-end gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 hover:border-primary/40 transition-colors"
          >
            <span className="truncate">{next.name}</span>
            <ArrowRight size={15} />
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
