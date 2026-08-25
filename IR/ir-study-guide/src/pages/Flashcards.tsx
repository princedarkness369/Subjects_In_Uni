import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCw, Shuffle } from 'lucide-react'
import { flashcards } from '../data/flashcards'
import { SECTIONS } from '../data/concepts'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const typeColors: Record<string, string> = {
  definition: 'bg-primary/10 text-primary dark:bg-primary/20',
  purpose: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  comparison: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  example: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

export default function Flashcards() {
  const [section, setSection] = useState<string>('All')
  const [order, setOrder] = useState<number[]>(() => flashcards.map((_, i) => i))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const deck = useMemo(() => {
    const filteredIdx = order.filter((i) => section === 'All' || flashcards[i].section === section)
    return filteredIdx
  }, [order, section])

  const card = deck.length > 0 ? flashcards[deck[Math.min(index, deck.length - 1)]] : null

  const go = (dir: 1 | -1) => {
    setFlipped(false)
    setIndex((i) => {
      const next = i + dir
      if (next < 0) return deck.length - 1
      if (next >= deck.length) return 0
      return next
    })
  }

  const handleShuffle = () => {
    setOrder(shuffle(flashcards.map((_, i) => i)))
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Flashcards</h1>
      <p className="text-sm text-slate-400 mb-6">Tap a card to flip it. {flashcards.length} cards total.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setSection('All')
            setIndex(0)
            setFlipped(false)
          }}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            section === 'All' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
          }`}
        >
          All
        </button>
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSection(s)
              setIndex(0)
              setFlipped(false)
            }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              section === s ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {card ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-semibold uppercase px-2 py-1 rounded-lg ${typeColors[card.type]}`}>
              {card.type}
            </span>
            <span className="text-xs text-slate-400">
              {index + 1} / {deck.length}
            </span>
          </div>

          <div className="[perspective:1200px]" onClick={() => setFlipped((f) => !f)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={card.id + (flipped ? '-back' : '-front')}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="card min-h-[260px] flex items-center justify-center text-center p-8 cursor-pointer select-none"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-4">
                    {flipped ? 'Answer' : 'Question'}
                  </p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                    {flipped ? card.back : card.front}
                  </p>
                  {!flipped && (
                    <p className="text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                      <RotateCw size={12} /> Tap to reveal
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:border-primary/40 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl hover:border-primary/40 transition-colors"
            >
              <Shuffle size={15} /> Shuffle
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:border-primary/40 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="card p-10 text-center text-slate-400 text-sm">No flashcards in this section.</div>
      )}
    </div>
  )
}
