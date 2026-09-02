import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LogEntry } from '../types'

type Props = {
  entry: LogEntry
  onRemove: (id: string) => void
}

export function LogEntryRow({ entry, onRemove }: Props) {
  const { t } = useTranslation()
  const displayName = t(`activities.${entry.activityName}`, entry.activityName)

  return (
    <div
      className="group flex items-center justify-between p-3 rounded-xl transition-all"
      style={{ border: '1px solid transparent' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(232,220,200,0.04)'
        e.currentTarget.style.borderColor = 'var(--border-color)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'transparent'
      }}
    >
      <div>
        <p className="font-medium text-sm line-clamp-1" title={displayName}>
          {displayName}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {entry.durationLabel} · {entry.calories.toLocaleString()} {t('dailyLog.kcal')}
        </p>
      </div>

      <button
        onClick={() => onRemove(entry.id)}
        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--accent-passionfruit)'
          e.currentTarget.style.background = 'rgba(232,68,47,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--text-muted)'
          e.currentTarget.style.background = 'transparent'
        }}
        title="Remove"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
