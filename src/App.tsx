import { useState, useMemo } from 'react'
import { activities } from './data/activities'
import { Search, Activity, Flame, Weight, Clock, Plus, Trash2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type LogEntry = {
  id: string
  activityName: string
  duration: number
  calories: number
}

function App() {
  const [weight, setWeight] = useState<number | ''>(150)
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs')
  const [duration, setDuration] = useState<number | ''>(30)
  const [search, setSearch] = useState('')
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null)

  const [log, setLog] = useState<LogEntry[]>([])

  const weightInLbs = useMemo(() => {
    if (weight === '') return 0
    return unit === 'lbs' ? weight : weight * 2.20462
  }, [weight, unit])

  const filteredActivities = useMemo(() => {
    if (!search) return activities
    const lower = search.toLowerCase()
    return activities.filter(a => a.name.toLowerCase().includes(lower))
  }, [search])

  const currentCalories = useMemo(() => {
    if (!selectedActivity || !weightInLbs || !duration) return 0
    return Math.round(selectedActivity.calsPerMinutePerLb * weightInLbs * (duration as number))
  }, [selectedActivity, weightInLbs, duration])

  const totalLogCalories = log.reduce((acc, entry) => acc + entry.calories, 0)

  const addToLog = () => {
    if (!selectedActivity || !duration || currentCalories === 0) return
    setLog(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        activityName: selectedActivity.name,
        duration: duration as number,
        calories: currentCalories
      }
    ])
    setSearch('')
    setSelectedActivity(null)
  }

  const removeEntry = (id: string) => {
    setLog(prev => prev.filter(entry => entry.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <Flame className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Calorie Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400">Calculate your energy expenditure effortlessly.</p>
        </header>

        <main className="grid md:grid-cols-[1fr_350px] gap-8">

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Weight className="w-5 h-5 text-indigo-500" />
                Your Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Weight</label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-transparent outline-none"
                      placeholder="150"
                    />
                    <div className="flex bg-slate-100 dark:bg-slate-800 divide-x divide-slate-200 dark:divide-slate-700">
                      <button
                        className={cn("px-3 text-sm font-medium transition-colors", unit === 'lbs' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
                        onClick={() => setUnit('lbs')}
                      >
                        lbs
                      </button>
                      <button
                        className={cn("px-3 text-sm font-medium transition-colors", unit === 'kg' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
                        onClick={() => setUnit('kg')}
                      >
                        kg
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration (mins)</label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 px-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-transparent outline-none"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-[500px]">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-rose-500" />
                Select Activity
              </h2>
              <div className="relative mb-4">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2">
                {filteredActivities.map((activity, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedActivity(activity)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl transition-all border",
                      selectedActivity?.name === activity.name
                        ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300"
                        : "border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    {activity.name}
                  </button>
                ))}
                {filteredActivities.length === 0 && (
                  <p className="text-center text-slate-500 py-8">No activities found.</p>
                )}
              </div>
            </div>
          </div>


          <div className="space-y-6">

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-indigo-100 font-medium mb-1">Estimated Burn</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black tracking-tight">{currentCalories}</span>
                <span className="text-indigo-200 font-medium text-lg">kcal</span>
              </div>

              <button
                onClick={addToLog}
                disabled={!selectedActivity || currentCalories === 0}
                className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:hover:bg-white/20 transition-colors py-3 rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add to Daily Log
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
                Daily Log
                <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  {totalLogCalories} kcal total
                </span>
              </h2>

              {log.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm">Your log is empty.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {log.map(entry => (
                    <div key={entry.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <div>
                        <p className="font-medium text-sm line-clamp-1" title={entry.activityName}>{entry.activityName}</p>
                        <p className="text-xs text-slate-500">{entry.duration} mins • {entry.calories} kcal</p>
                      </div>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default App
