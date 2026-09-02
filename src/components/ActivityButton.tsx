import { useTranslation } from 'react-i18next'
import type { Activity } from '../data/activities'

type Props = {
  activity: Activity
  isSelected: boolean
  onSelect: (activity: Activity) => void
}

export function ActivityButton({ activity, isSelected, onSelect }: Props) {
  const { t } = useTranslation()
  const displayName = t(`activities.${activity.name}`, activity.name)

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(activity)}
      className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer border ${
        isSelected
          ? 'bg-[rgba(139,168,136,0.14)] border-[var(--accent-matcha)] text-[var(--accent-matcha)]'
          : 'bg-transparent border-transparent text-[var(--text-primary)] hover:bg-[rgba(232,220,200,0.05)] hover:border-[var(--border-hover)]'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{displayName}</span>
        <span
          className="text-xs px-1.5 py-0.5 rounded font-mono shrink-0"
          style={{
            background: isSelected ? 'rgba(139,168,136,0.2)' : 'rgba(232,220,200,0.08)',
            color: isSelected ? 'var(--accent-matcha)' : 'var(--text-muted)',
          }}
        >
          {activity.met} MET
        </span>
      </div>
    </button>
  )
}
