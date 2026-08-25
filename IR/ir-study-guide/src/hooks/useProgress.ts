import { useCallback, useEffect, useState } from 'react'
import { concepts } from '../data/concepts'

const STORAGE_KEY = 'ir-study-guide-progress'

function loadProgress(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as string[]
    return new Set(arr)
  } catch {
    return new Set()
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => loadProgress())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)))
  }, [completed])

  const markVisited = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const isVisited = useCallback((id: string) => completed.has(id), [completed])

  const resetProgress = useCallback(() => setCompleted(new Set()), [])

  const total = concepts.length
  const done = completed.size
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return { completed, markVisited, isVisited, resetProgress, total, done, percent }
}
