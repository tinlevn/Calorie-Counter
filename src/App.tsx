import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { Activity } from './data/activities'
import type { LogEntry, WeightUnit, DurationUnit } from './types'

import { AppHeader }       from './components/AppHeader'
import { DetailsCard }     from './components/DetailsCard'
import { ActivityPicker }  from './components/ActivityPicker'
import { CalorieBurnCard } from './components/CalorieBurnCard'
import { DailyLog }        from './components/DailyLog'

// ── Math note ──────────────────────────────────────────────────────────────
// All activities use MET values from the 2024 Adult Compendium of Physical
// Activities (pacompendium.com). Formula:
//   Calories = MET × weight_kg × duration_hours

function App() {
  const { t } = useTranslation()

  // ── Inputs ────────────────────────────────────────────────────────────────
  const [weight,        setWeight]        = useState<number | null>(70)
  const [weightUnit,    setWeightUnit]    = useState<WeightUnit>('kg')
  const [durationValue, setDurationValue] = useState<number | null>(30)
  const [durationUnit,  setDurationUnit]  = useState<DurationUnit>('min')

  // ── Activity ──────────────────────────────────────────────────────────────
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  // ── Log ───────────────────────────────────────────────────────────────────
  const [log, setLog] = useState<LogEntry[]>([])

  // ── Derived values ────────────────────────────────────────────────────────
  const weightKg = useMemo(() => {
    if (weight === null || weight <= 0) return 0
    return weightUnit === 'kg' ? weight : weight / 2.20462
  }, [weight, weightUnit])

  const durationHours = useMemo(() => {
    if (durationValue === null || durationValue <= 0) return 0
    return durationUnit === 'hr' ? durationValue : durationValue / 60
  }, [durationValue, durationUnit])

  const currentCalories = useMemo(() => {
    if (!selectedActivity || !weightKg || !durationHours) return 0
    return Math.round(selectedActivity.met * weightKg * durationHours)
  }, [selectedActivity, weightKg, durationHours])

  const durationInMinutes = useMemo(() => {
    if (durationValue === null || durationValue <= 0) return 0
    return durationUnit === 'hr' ? durationValue * 60 : durationValue
  }, [durationValue, durationUnit])

  // ── Duration label (passed to CalorieBurnCard + stored in log) ────────────
  const durationLabel = useMemo(() => {
    if (durationValue === null) return '—'
    const minStr = t('details.min', 'min')
    const hrStr = t('details.hr', 'h')
    return durationUnit === 'hr'
      ? `${durationValue} ${hrStr} (${Math.round(durationValue * 60)} ${minStr})`
      : `${durationValue} ${minStr}`
  }, [durationValue, durationUnit, t])

  // ── Log actions ───────────────────────────────────────────────────────────
  const addToLog = () => {
    if (!selectedActivity || currentCalories === 0) return
    setLog(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        activityName: selectedActivity.name,
        durationMins: durationInMinutes,
        calories: currentCalories,
        durationLabel,
      },
    ])
    setSelectedActivity(null)
  }

  const removeFromLog = (id: string) =>
    setLog(prev => prev.filter(e => e.id !== id))

  const handleWeightUnitChange = (newUnit: WeightUnit) => {
    if (newUnit === weightUnit) return
    if (weight !== null && weight > 0) {
      if (newUnit === 'lbs') {
        setWeight(Math.round(weight * 2.20462))
      } else {
        setWeight(Math.round(weight / 2.20462))
      }
    }
    setWeightUnit(newUnit)
  }

  const handleDurationUnitChange = (newUnit: DurationUnit) => {
    if (newUnit === durationUnit) return
    if (durationValue !== null && durationValue > 0) {
      if (newUnit === 'hr') {
        setDurationValue(Number((durationValue / 60).toFixed(2)))
      } else {
        setDurationValue(Math.round(durationValue * 60))
      }
    }
    setDurationUnit(newUnit)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: 'var(--bg-color)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <AppHeader />

        <main className="grid md:grid-cols-[1fr_350px] gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <DetailsCard
              weight={weight}
              weightUnit={weightUnit}
              durationValue={durationValue}
              durationUnit={durationUnit}
              onWeightChange={setWeight}
              onWeightUnitChange={handleWeightUnitChange}
              onDurationChange={setDurationValue}
              onDurationUnitChange={handleDurationUnitChange}
            />
            <ActivityPicker
              selectedActivity={selectedActivity}
              onSelect={setSelectedActivity}
            />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <CalorieBurnCard
              calories={currentCalories}
              selectedActivity={selectedActivity}
              durationLabel={durationLabel}
              onAdd={addToLog}
            />
            <DailyLog log={log} onRemove={removeFromLog} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
