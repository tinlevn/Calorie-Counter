import { useMemo, useState } from 'react'
import { Search, Activity as ActivityIcon } from 'lucide-react'
import { activities, ACTIVITY_CATEGORIES, type Activity } from '../data/activities'
import { ActivityButton } from './ActivityButton'
import { CategoryGroup } from './CategoryGroup'

type Props = {
  selectedActivity: Activity | null
  onSelect: (activity: Activity) => void
}

export function ActivityPicker({ selectedActivity, onSelect }: Props) {
  const [search, setSearch] = useState('')
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(['Cardio & Aerobics', 'Running & Walking'])
  )

  const isSearching = search.trim().length > 0

  const filteredActivities = useMemo(() => {
    if (!search.trim()) return activities
    const lower = search.toLowerCase()
    return activities.filter(a => a.name.toLowerCase().includes(lower))
  }, [search])

  const groupedActivities = useMemo(
    () =>
      ACTIVITY_CATEGORIES.map(cat => ({
        category: cat,
        items: activities.filter(a => a.category === cat),
      })),
    []
  )

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  return (
    <div
      className="rounded-3xl p-6 flex flex-col"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        height: '520px',
      }}
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <ActivityIcon className="w-5 h-5" style={{ color: 'var(--accent-matcha)' }} />
        Select Activity
      </h2>

      {/* Search bar */}
      <div className="relative mb-3">
        <Search
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          placeholder="Search all activities..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 rounded-xl outline-none transition-all"
          style={{
            background: 'rgba(22,18,16,0.6)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-ui)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent-matcha)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded"
            style={{ color: 'var(--text-muted)', background: 'rgba(232,220,200,0.08)' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* List area */}
      <div className="flex-1 overflow-y-auto -mr-2 pr-2">
        {/* Flat search results */}
        {isSearching && (
          <div className="space-y-0.5">
            {filteredActivities.length === 0 ? (
              <p
                className="text-center py-8 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                No activities found for "{search}"
              </p>
            ) : (
              filteredActivities.map((activity, i) => (
                <ActivityButton
                  key={i}
                  activity={activity}
                  isSelected={activity.name === selectedActivity?.name}
                  onSelect={onSelect}
                />
              ))
            )}
          </div>
        )}

        {/* Grouped browse */}
        {!isSearching && (
          <div className="space-y-1">
            {groupedActivities.map(({ category, items }) => (
              <CategoryGroup
                key={category}
                category={category}
                items={items}
                isOpen={openCategories.has(category)}
                selectedActivityName={selectedActivity?.name ?? null}
                onToggle={toggleCategory}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
