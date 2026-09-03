import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Activity } from '../data/activities'
import { DisclaimerModal } from './DisclaimerModal'
import { MetInfoModal } from './MetInfoModal'

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
      className="rounded-3xl p-5 sm:p-6 relative overflow-hidden"
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
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold text-sm uppercase"
              style={{ color: 'rgba(255,240,210,0.75)', letterSpacing: '0.12em' }}
            >
              {t('burnCard.label')}
            </h3>
            {selectedActivity?.met && (
              <MetInfoModal met={selectedActivity.met} />
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {!selectedActivity?.met && (
              <MetInfoModal />
            )}
            <DisclaimerModal />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="font-black text-4xl sm:text-5xl md:text-[56px] leading-[1.05]"
            style={{
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
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className={`w-full flex items-center justify-center gap-2 py-3 min-h-[46px] rounded-xl font-semibold text-sm transition-all border backdrop-blur-md ${
            canAdd
              ? 'bg-[rgba(255,248,236,0.18)] hover:bg-[rgba(255,248,236,0.28)] text-[#FFF8EC] border-[rgba(255,248,236,0.25)] cursor-pointer opacity-100'
              : 'bg-[rgba(255,248,236,0.18)] text-[#FFF8EC] border-[rgba(255,248,236,0.25)] cursor-not-allowed opacity-50'
          }`}
        >
          <Plus className="w-4 h-4" />
          {t('burnCard.addButton')}
        </button>
      </div>
    </div>
  )
}
