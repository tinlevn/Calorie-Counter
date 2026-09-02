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
      className="w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium"
      style={{
        background: isSelected ? 'rgba(139,168,136,0.14)' : 'transparent',
        border: `1px solid ${isSelected ? 'var(--accent-matcha)' : 'transparent'}`,
        color: isSelected ? 'var(--accent-matcha)' : 'var(--text-primary)',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(232,220,200,0.05)'
          e.currentTarget.style.borderColor = 'var(--border-hover)'
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'transparent'
        }
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{displayName}</span>
        {activity.met && (
          <span
            className="text-xs px-1.5 py-0.5 rounded font-mono shrink-0"
            style={{
              background: isSelected ? 'rgba(139,168,136,0.2)' : 'rgba(232,220,200,0.08)',
              color: isSelected ? 'var(--accent-matcha)' : 'var(--text-muted)',
            }}
          >
            {activity.met} MET
          </span>
        )}
      </div>
    </button>
  )
}
