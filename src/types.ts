/** A single entry in the daily activity log */
export type LogEntry = {
  id: string
  activityName: string
  /** Always stored internally in minutes */
  durationMins: number
  calories: number
  /** Human-readable display string, e.g. "1.5h (90min)" or "30min" */
  durationLabel: string
}

export type WeightUnit   = 'kg' | 'lbs'
export type DurationUnit = 'min' | 'hr'
