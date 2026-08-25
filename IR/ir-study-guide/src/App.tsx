import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import ProgressBar from './components/ProgressBar'
import Home from './pages/Home'
import Concepts from './pages/Concepts'
import ConceptDetail from './pages/ConceptDetail'
import Comparisons from './pages/Comparisons'
import Flashcards from './pages/Flashcards'
import Summary from './pages/Summary'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'

const titles: Record<string, string> = {
  '/': 'Home',
  '/concepts': 'Concepts',
  '/comparisons': 'Comparisons',
  '/flashcards': 'Flashcards',
  '/summary': 'Summary',
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { percent } = useProgress()
  const location = useLocation()

  const pageTitle =
    titles[location.pathname] ??
    (location.pathname.startsWith('/concepts/') ? 'Concept' : 'IR Study Guide')

  return (
    <div className="flex min-h-screen bg-surface dark:bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenSearch={() => setSearchOpen(true)} />
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-20 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 dark:text-slate-400"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-slate-800 dark:text-slate-100">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block w-32">
              <ProgressBar percent={percent} />
            </div>
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Open search"
            >
              <Search size={16} />
            </button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home onOpenSearch={() => setSearchOpen(true)} />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/concepts/:id" element={<ConceptDetail />} />
            <Route path="/comparisons" element={<Comparisons />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
