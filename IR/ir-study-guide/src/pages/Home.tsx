import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Layers, Sparkles, ArrowRight, Search } from 'lucide-react'
import { concepts, SECTIONS } from '../data/concepts'
import { comparisons } from '../data/comparisons'
import ProgressBar from '../components/ProgressBar'
import { useProgress } from '../hooks/useProgress'

const AVG_MINUTES_PER_CONCEPT = 3

export default function Home({ onOpenSearch }: { onOpenSearch: () => void }) {
  const navigate = useNavigate()
  const { percent, done, total } = useProgress()
  const studyMinutes = concepts.length * AVG_MINUTES_PER_CONCEPT

  const stats = [
    { icon: BookOpen, label: 'Concepts', value: concepts.length },
    { icon: Layers, label: 'Sections', value: SECTIONS.length },
    { icon: Clock, label: 'Est. Study Time', value: `${studyMinutes} min` },
    { icon: Sparkles, label: 'Comparison Tables', value: comparisons.length },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card p-8 md:p-10 mb-8 relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full mb-4">
            Lecture 2
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-3">
            Introducing Information Retrieval
            <br className="hidden md:block" /> and Web Search
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mb-6">
            An interactive study guide covering the Boolean retrieval model, inverted indexes, term-document
            matrices, query processing, phrase &amp; positional indexes, and structured vs. unstructured data —
            built entirely from your lecture slides.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/concepts')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-card"
            >
              Start Learning
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold px-5 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Search size={16} />
              Search Lecture
            </button>
          </div>
        </div>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full" />
        <div className="absolute -right-6 bottom-0 w-40 h-40 bg-secondary/5 dark:bg-secondary/10 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="card p-5"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
              <Icon size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{value}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="card p-6 mb-8">
        <ProgressBar percent={percent} label={`Your progress — ${done} of ${total} concepts studied`} />
      </div>

      <div className="card p-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Sections in this Lecture</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SECTIONS.map((section) => {
            const count = concepts.filter((c) => c.section === section).length
            return (
              <button
                key={section}
                onClick={() => navigate(`/concepts?section=${encodeURIComponent(section)}`)}
                className="flex items-center justify-between text-left px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{section}</span>
                <span className="text-xs text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {count} concepts
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
