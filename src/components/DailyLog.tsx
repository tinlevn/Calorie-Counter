import { Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LogEntry } from '../types'
import { LogEntryRow } from './LogEntryRow'

type Props = {
  log: LogEntry[]
  onRemove: (id: string) => void
}

export function DailyLog({ log, onRemove }: Props) {
  const { t, i18n } = useTranslation()
  const totalCalories = log.reduce((acc, e) => acc + e.calories, 0)

  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
        <span>{t('dailyLog.title')}</span>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-lg"
          style={{
            background: 'rgba(253,190,2,0.12)',
            color: 'var(--accent-mango)',
            fontFamily: 'var(--font-mono)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {totalCalories.toLocaleString(i18n.language)} {t('dailyLog.kcal')}
        </span>
      </h2>

      {log.length === 0 ? (
        <div className="text-center py-10">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'rgba(232,220,200,0.05)' }}
          >
            <Activity className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('dailyLog.empty')}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {log.map(entry => (
            <LogEntryRow key={entry.id} entry={entry} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
