import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { concepts } from '../data/concepts'

interface SearchBarProps {
  open: boolean
  onClose: () => void
}

export default function SearchBar({ open, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return concepts
      .filter((c) => {
        const haystack = [
          c.name,
          c.definition,
          c.simpleExplanation,
          ...c.keywords,
          ...c.examples,
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
      .slice(0, 8)
  }, [query])

  if (!open) return null

  const goTo = (id: string) => {
    navigate(`/concepts/${id}`)
    setQuery('')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-100 dark:border-slate-800">
            <Search size={18} className="text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts, definitions, keywords, examples…"
              className="flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {query && results.length === 0 && (
              <p className="text-sm text-slate-400 px-4 py-6 text-center">No matches found.</p>
            )}
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => goTo(r.id)}
                className="w-full flex items-center justify-between text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{r.name}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{r.section}</p>
                </div>
                <ArrowRight size={15} className="text-slate-300" />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
