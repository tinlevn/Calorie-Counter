import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Activity } from '../data/activities'
import { ActivityButton } from './ActivityButton'

const CATEGORY_ICON: Record<string, string> = {
  'Cardio & Aerobics':   '🫀',
  'Running & Walking':   '🏃',
  'Strength & Gym':      '🏋️',
  'Cycling & Water':     '🚴',
  'Team & Court Sports': '🏅',
  'Outdoor & Hiking':    '🥾',
  'Winter Sports':       '⛷️',
  'Dance & Leisure':     '💃',
  'Household & Yard':    '🏡',
}

type Props = {
  category: string
  items: Activity[]
  isOpen: boolean
  selectedActivityName: string | null
  onToggle: (category: string) => void
  onSelect: (activity: Activity) => void
}

export function CategoryGroup({
  category,
  items,
  isOpen,
  selectedActivityName,
  onToggle,
  onSelect,
}: Props) {
  const { t } = useTranslation()
  const hasSelected = items.some(a => a.name === selectedActivityName)
  const categoryDisplayName = t(`categories.${category}`, category)

  return (
    <div>
      {/* Header row */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={`${categoryDisplayName} (${items.length})`}
        onClick={() => onToggle(category)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all"
        style={{
          background: hasSelected ? 'rgba(139,168,136,0.08)' : 'transparent',
          border: `1px solid ${hasSelected ? 'rgba(139,168,136,0.25)' : 'transparent'}`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(232,220,200,0.05)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = hasSelected
            ? 'rgba(139,168,136,0.08)'
            : 'transparent'
        }}
      >
        <span className="flex items-center gap-2.5">
          <span className="text-base leading-none">{CATEGORY_ICON[category]}</span>
          <span
            className="font-semibold text-sm"
            style={{ color: hasSelected ? 'var(--accent-matcha)' : 'var(--text-primary)' }}
          >
            {categoryDisplayName}
          </span>
        </span>

        <span className="flex items-center gap-2">
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded-md"
            style={{
              background: 'rgba(232,220,200,0.08)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {items.length}
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform duration-200"
            style={{
              color: 'var(--text-muted)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </span>
      </button>

      {/* Item list */}
      {isOpen && (
        <div
          className="mt-0.5 ml-3 pl-3 space-y-0.5"
          style={{ borderLeft: '2px solid var(--border-color)' }}
        >
          {items.map((activity, i) => (
            <ActivityButton
              key={i}
              activity={activity}
              isSelected={activity.name === selectedActivityName}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
