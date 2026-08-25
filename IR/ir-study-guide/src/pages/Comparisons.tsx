import { motion } from 'framer-motion'
import { GitCompare } from 'lucide-react'
import { comparisons } from '../data/comparisons'

export default function Comparisons() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1">Comparison Tables</h1>
      <p className="text-sm text-slate-400 mb-6">
        Side-by-side breakdowns of the key contrasts drawn out in the lecture.
      </p>

      <div className="space-y-6">
        {comparisons.map((table, i) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.2) }}
            className="card p-6 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <GitCompare size={17} className="text-primary" />
              <h2 className="font-bold text-slate-800 dark:text-slate-100">{table.title}</h2>
            </div>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[480px]">
                <thead>
                  <tr>
                    <th className="text-left font-semibold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wide px-3 py-2 w-1/4">
                      &nbsp;
                    </th>
                    <th className="text-left font-semibold text-primary text-xs uppercase tracking-wide px-3 py-2 bg-primary/5 dark:bg-primary/10 rounded-t-lg">
                      {table.leftName}
                    </th>
                    <th className="text-left font-semibold text-secondary text-xs uppercase tracking-wide px-3 py-2 bg-secondary/5 dark:bg-secondary/10 rounded-t-lg">
                      {table.rightName}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, ri) => (
                    <tr key={ri} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-3 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 align-top">
                        {row.label}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300 align-top bg-primary/[0.02] dark:bg-primary/[0.04]">
                        {row.left}
                      </td>
                      <td className="px-3 py-3 text-slate-600 dark:text-slate-300 align-top bg-secondary/[0.02] dark:bg-secondary/[0.04]">
                        {row.right}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Key Differences</p>
              <ul className="space-y-1.5">
                {table.keyDifferences.map((d, di) => (
                  <li key={di} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                    <span className="text-primary mt-1">•</span> {d}
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
