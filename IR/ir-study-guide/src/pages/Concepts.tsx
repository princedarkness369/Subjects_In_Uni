import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { concepts, SECTIONS } from '../data/concepts'
import ConceptCard from '../components/ConceptCard'
import { useProgress } from '../hooks/useProgress'

export default function Concepts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSection = searchParams.get('section')
  const [query, setQuery] = useState('')
  const { isVisited } = useProgress()

  const filtered = useMemo(() => {
    let list = concepts
    if (activeSection) list = list.filter((c) => c.section === activeSection)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((c) =>
        [c.name, c.simpleExplanation, ...c.keywords].join(' ').toLowerCase().includes(q),
      )
    }
    return list
  }, [activeSection, query])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">All Concepts</h1>
          <p className="text-sm text-slate-400 mt-1">{filtered.length} of {concepts.length} concepts</p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter concepts…"
          className="w-full md:w-72 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSearchParams({})}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            !activeSection
              ? 'bg-primary text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
          }`}
        >
          All
        </button>
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => setSearchParams({ section })}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              activeSection === section
                ? 'bg-primary text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-slate-400 text-sm">No concepts match your filter.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} visited={isVisited(concept.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
