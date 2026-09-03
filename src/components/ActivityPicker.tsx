import { useMemo, useState } from 'react'
import { Search, Activity as ActivityIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { activities, ACTIVITY_CATEGORIES, type Activity } from '../data/activities'
import { ActivityButton } from './ActivityButton'
import { CategoryGroup } from './CategoryGroup'

type Props = {
  selectedActivity: Activity | null
  onSelect: (activity: Activity) => void
}

export function ActivityPicker({ selectedActivity, onSelect }: Props) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const isSearching = search.trim().length > 0

  const filteredActivities = useMemo(() => {
    if (!search.trim()) return activities
    const lower = search.toLowerCase()
    return activities.filter(a => {
      const enName = a.name.toLowerCase()
      const trName = t(`activities.${a.name}`, a.name).toLowerCase()
      return enName.includes(lower) || trName.includes(lower)
    })
  }, [search, t])

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
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  return (
    <div
      className="rounded-3xl p-4 sm:p-6 flex flex-col h-[380px] sm:h-[460px] md:h-[520px]"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <ActivityIcon className="w-5 h-5" style={{ color: 'var(--accent-matcha)' }} />
        {t('activityPicker.title')}
      </h2>

      {/* Search bar */}
      <div className="relative mb-3">
        <Search
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-muted)' }}
          aria-hidden="true"
        />
        <input
          id="activity-search"
          type="text"
          aria-label={t('activityPicker.searchPlaceholder')}
          placeholder={t('activityPicker.searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 rounded-xl outline-none transition-all focus:border-[var(--accent-matcha)]"
          style={{
            background: 'rgba(22,18,16,0.6)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-ui)',
          }}
        />
        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-xs rounded-md cursor-pointer transition-colors"
            style={{ color: 'var(--text-muted)', background: 'rgba(232,220,200,0.08)' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* List area */}
      <div className="flex-1 overflow-y-auto overscroll-contain -mr-2 pr-2">
        {/* Flat search results */}
        {isSearching && (
          <div className="space-y-0.5">
            {filteredActivities.length === 0 ? (
              <p
                className="text-center py-8 text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('activityPicker.noResults', { query: search })}
              </p>
            ) : (
              filteredActivities.map(activity => (
                <ActivityButton
                  key={activity.name}
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
