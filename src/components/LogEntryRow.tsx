import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LogEntry } from '../types'

type Props = {
  entry: LogEntry
  onRemove: (id: string) => void
}

export function LogEntryRow({ entry, onRemove }: Props) {
  const { t, i18n } = useTranslation()
  const displayName = t(`activities.${entry.activityName}`, entry.activityName)

  return (
    <div
      className="group flex items-center justify-between p-3 rounded-xl transition-all border border-transparent hover:bg-[rgba(232,220,200,0.04)] hover:border-[var(--border-color)]"
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
          {entry.durationLabel} · {entry.calories.toLocaleString(i18n.language)} {t('dailyLog.kcal')}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(entry.id)}
        className="p-2 rounded-lg opacity-70 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-all text-[var(--text-muted)] hover:text-[var(--accent-passionfruit)] hover:bg-[rgba(232,68,47,0.1)] cursor-pointer"
        aria-label={`Remove ${displayName}`}
        title="Remove"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
