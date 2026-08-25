interface ProgressBarProps {
  percent: number
  label?: string
}

export default function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
          <span className="text-xs font-semibold text-primary">{percent}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
