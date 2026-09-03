import { Weight, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { WeightUnit, DurationUnit } from '../types'

type Props = {
  weight: number | null
  weightUnit: WeightUnit
  durationValue: number | null
  durationUnit: DurationUnit
  onWeightChange: (v: number | null) => void
  onWeightUnitChange: (u: WeightUnit) => void
  onDurationChange: (v: number | null) => void
  onDurationUnitChange: (u: DurationUnit) => void
}

export function DetailsCard({
  weight,
  weightUnit,
  durationValue,
  durationUnit,
  onWeightChange,
  onWeightUnitChange,
  onDurationChange,
  onDurationUnitChange,
}: Props) {
  const { t } = useTranslation()

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onWeightChange(null)
    } else {
      const n = Number(e.target.value)
      onWeightChange(n < 0 ? 0 : n)
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onDurationChange(null)
    } else {
      const n = Number(e.target.value)
      onDurationChange(n < 0 ? 0 : n)
    }
  }

  return (
    <div
      className="rounded-3xl p-4 sm:p-6"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <Weight className="w-5 h-5" style={{ color: 'var(--accent-hojicha)' }} />
        {t('details.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ── Weight ── */}
        <div className="space-y-2">
          <label htmlFor="weight-input" className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('details.bodyWeight')}
          </label>
          <div
            className="flex rounded-xl overflow-hidden transition-[border-color] duration-200 focus-within:!border-[var(--accent-matcha)]"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <input
              id="weight-input"
              type="number"
              inputMode="decimal"
              value={weight ?? ''}
              onChange={handleWeightChange}
              className="w-full px-4 py-2.5 bg-transparent outline-none"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontVariantNumeric: 'tabular-nums',
              }}
              placeholder="70"
              min={1}
            />
            <div
              className="flex divide-x"
              style={{ background: 'rgba(28,23,18,0.5)', borderColor: 'var(--border-color)' }}
            >
              {(['kg', 'lbs'] as const).map(u => (
                <button
                  key={u}
                  type="button"
                  aria-label={`Select ${u}`}
                  className="px-3.5 sm:px-3 py-2 text-sm font-semibold transition-colors cursor-pointer min-h-[42px] flex items-center justify-center"
                  style={{
                    color: weightUnit === u ? 'var(--accent-matcha)' : 'var(--text-muted)',
                    background: weightUnit === u ? 'rgba(139,168,136,0.15)' : 'transparent',
                  }}
                  onClick={() => onWeightUnitChange(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Duration ── */}
        <div className="space-y-2">
          <label htmlFor="duration-input" className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('details.duration')}
          </label>
          <div
            className="flex rounded-xl overflow-hidden transition-[border-color] duration-200 focus-within:!border-[var(--accent-matcha)]"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center pl-3" style={{ color: 'var(--text-muted)' }}>
              <Clock className="w-4 h-4 flex-shrink-0" />
            </div>
            <input
              id="duration-input"
              type="number"
              inputMode="decimal"
              value={durationValue ?? ''}
              onChange={handleDurationChange}
              className="w-full px-3 py-2.5 bg-transparent outline-none"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontVariantNumeric: 'tabular-nums',
              }}
              placeholder={durationUnit === 'hr' ? '1.5' : '30'}
              step={durationUnit === 'hr' ? 0.25 : 5}
              min={0}
            />
            <div
              className="flex divide-x"
              style={{ background: 'rgba(28,23,18,0.5)', borderColor: 'var(--border-color)' }}
            >
              {(['min', 'hr'] as const).map(u => (
                <button
                  key={u}
                  type="button"
                  aria-label={`Select ${u}`}
                  className="px-3.5 sm:px-3 py-2 text-sm font-semibold transition-colors cursor-pointer min-h-[42px] flex items-center justify-center"
                  style={{
                    color: durationUnit === u ? 'var(--accent-matcha)' : 'var(--text-muted)',
                    background: durationUnit === u ? 'rgba(139,168,136,0.15)' : 'transparent',
                  }}
                  onClick={() => onDurationUnitChange(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion hint in hours mode */}
          {durationUnit === 'hr' && durationValue !== null && durationValue > 0 && (
            <p
              className="text-xs"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {t('details.minutesHint', { minutes: Math.round(durationValue * 60) })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
