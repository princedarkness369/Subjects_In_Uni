import { motion } from 'framer-motion'
import { BookMarked, AlertOctagon, Eye, Tags, Zap } from 'lucide-react'
import { summaries } from '../data/summaries'

export default function Summary() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Smart Notes</h1>
      <p className="text-sm text-slate-400 mb-6">
        A quick, exam-ready recap of every section — read this the night before the exam.
      </p>

      <div className="space-y-6">
        {summaries.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.2) }}
            className="card p-6"
          >
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-3">{s.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{s.quickSummary}</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
                  <BookMarked size={13} /> Important Concepts
                </p>
                <ul className="space-y-1.5">
                  {s.importantConcepts.map((c, ci) => (
                    <li key={ci} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                      <span className="text-primary mt-1">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 mb-2">
                  <AlertOctagon size={13} /> Common Mistakes
                </p>
                <ul className="space-y-1.5">
                  {s.commonMistakes.map((c, ci) => (
                    <li key={ci} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                      <span className="text-rose-400 mt-1">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-500 mb-2">
                  <Eye size={13} /> Professor Usually Focuses On
                </p>
                <ul className="space-y-1.5">
                  {s.professorFocus.map((c, ci) => (
                    <li key={ci} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                      <span className="text-amber-400 mt-1">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-purple-500 mb-2">
                  <Tags size={13} /> Keywords to Memorize
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.keywordsToMemorize.map((k) => (
                    <span
                      key={k}
                      className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                <Zap size={13} /> Last-Minute Revision
              </p>
              <ul className="space-y-1.5">
                {s.lastMinuteRevision.map((c, ci) => (
                  <li
                    key={ci}
                    className="text-sm text-slate-700 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-2"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
