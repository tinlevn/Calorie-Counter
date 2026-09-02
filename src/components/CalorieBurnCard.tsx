import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Activity } from '../data/activities'

type Props = {
  calories: number
  selectedActivity: Activity | null
  durationLabel: string
  onAdd: () => void
}

export function CalorieBurnCard({ calories, selectedActivity, durationLabel, onAdd }: Props) {
  const { t } = useTranslation()
  const canAdd = !!selectedActivity && calories > 0
  const activityDisplayName = selectedActivity
    ? t(`activities.${selectedActivity.name}`, selectedActivity.name)
    : ''

  return (
    <div
      className="rounded-3xl p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #C03B26 0%, #E8442F 40%, #FDBE02 100%)',
        boxShadow: '0 8px 32px rgba(232,68,47,0.35)',
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(253,190,2,0.18) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <h3
          className="font-semibold mb-1 text-sm uppercase"
          style={{ color: 'rgba(255,240,210,0.75)', letterSpacing: '0.12em' }}
        >
          {t('burnCard.label')}
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="font-black"
            style={{
              fontSize: '56px',
              lineHeight: 1.05,
              fontFamily: 'var(--font-mono)',
              color: '#FFF8EC',
            }}
          >
            {calories}
          </span>
          <span className="font-semibold text-lg" style={{ color: 'rgba(255,240,210,0.7)' }}>
            {t('dailyLog.kcal')}
          </span>
        </div>

        {selectedActivity ? (
          <p className="text-sm mb-6" style={{ color: 'rgba(255,240,210,0.6)' }}>
            {activityDisplayName} · {durationLabel}
          </p>
        ) : (
          <p className="text-sm mb-6" style={{ color: 'rgba(255,240,210,0.5)' }}>
            {t('burnCard.hint')}
          </p>
        )}

        <button
          onClick={onAdd}
          disabled={!canAdd}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: 'rgba(255,248,236,0.18)',
            color: '#FFF8EC',
            border: '1px solid rgba(255,248,236,0.25)',
            backdropFilter: 'blur(8px)',
            cursor: canAdd ? 'pointer' : 'not-allowed',
            opacity: canAdd ? 1 : 0.5,
          }}
          onMouseEnter={e => {
            if (canAdd) e.currentTarget.style.background = 'rgba(255,248,236,0.28)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,248,236,0.18)'
          }}
        >
          <Plus className="w-4 h-4" />
          {t('burnCard.addButton')}
        </button>
      </div>
    </div>
  )
}
