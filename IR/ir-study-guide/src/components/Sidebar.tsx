import { NavLink } from 'react-router-dom'
import { BookOpen, Home, Layers, Sparkles, ListChecks, X, Search as SearchIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/concepts', label: 'Concepts', icon: BookOpen, end: false },
  { to: '/comparisons', label: 'Comparisons', icon: Layers, end: false },
  { to: '/flashcards', label: 'Flashcards', icon: Sparkles, end: false },
  { to: '/summary', label: 'Summary', icon: ListChecks, end: false },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpenSearch: () => void
}

export default function Sidebar({ open, onClose, onOpenSearch }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={`fixed z-40 inset-y-0 left-0 w-64 shrink-0 border-r border-slate-100 dark:border-slate-800
        bg-white dark:bg-slate-900 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen size={17} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight">
              IR Study Guide
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <button
          onClick={onOpenSearch}
          className="mx-4 mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <SearchIcon size={15} />
          <span>Search…</span>
        </button>

        <nav className="flex-1 px-3 mt-4 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 text-xs text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-800">
          Introducing Information Retrieval &amp; Web Search
        </div>
      </motion.aside>
    </>
  )
}
