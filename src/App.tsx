import { useState, useMemo } from 'react'
import { activities } from './data/activities'
import type { Activity } from './data/activities'
import type { LogEntry, WeightUnit, DurationUnit } from './types'

import { AppHeader }       from './components/AppHeader'
import { DetailsCard }     from './components/DetailsCard'
import { ActivityPicker }  from './components/ActivityPicker'
import { CalorieBurnCard } from './components/CalorieBurnCard'
import { DailyLog }        from './components/DailyLog'

// ── Math note ──────────────────────────────────────────────────────────────
// Dataset stores `calsPerMinutePerLb`.
// Formula: calories = calsPerMinutePerLb × weightInLbs × durationInMinutes
// Units are normalised to lbs + minutes before calculation.

function App() {
  // ── Inputs ────────────────────────────────────────────────────────────────
  const [weight,       setWeight]       = useState<number | ''>(70)
  const [weightUnit,   setWeightUnit]   = useState<WeightUnit>('kg')
  const [durationValue, setDurationValue] = useState<number | ''>(30)
  const [durationUnit, setDurationUnit] = useState<DurationUnit>('min')

  // ── Activity ──────────────────────────────────────────────────────────────
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  // ── Log ───────────────────────────────────────────────────────────────────
  const [log, setLog] = useState<LogEntry[]>([])

  // ── Derived values ────────────────────────────────────────────────────────
  const weightInLbs = useMemo(() => {
    if (weight === '') return 0
    return weightUnit === 'lbs' ? (weight as number) : (weight as number) * 2.20462
  }, [weight, weightUnit])

  const durationInMinutes = useMemo(() => {
    if (durationValue === '') return 0
    return durationUnit === 'hr'
      ? (durationValue as number) * 60
      : (durationValue as number)
  }, [durationValue, durationUnit])

  const currentCalories = useMemo(() => {
    if (!selectedActivity || !weightInLbs || !durationInMinutes) return 0
    return Math.round(
      selectedActivity.calsPerMinutePerLb * weightInLbs * durationInMinutes
    )
  }, [selectedActivity, weightInLbs, durationInMinutes])

  // ── Duration label (passed to CalorieBurnCard + stored in log) ────────────
  const durationLabel =
    durationValue === ''
      ? '—'
      : durationUnit === 'hr'
      ? `${durationValue}h (${Math.round((durationValue as number) * 60)}min)`
      : `${durationValue}min`

  // ── Log actions ───────────────────────────────────────────────────────────
  const addToLog = () => {
    if (!selectedActivity || currentCalories === 0) return
    setLog(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
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
              onWeightUnitChange={setWeightUnit}
              onDurationChange={setDurationValue}
              onDurationUnitChange={setDurationUnit}
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
