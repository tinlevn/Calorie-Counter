import { Flame } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="text-center space-y-2">
      <div
        className="inline-flex items-center justify-center p-3 rounded-2xl mb-4"
        style={{ background: 'rgba(232, 68, 47, 0.15)' }}
      >
        <Flame className="w-8 h-8" style={{ color: 'var(--accent-passionfruit)' }} />
      </div>
      <h1
        className="text-3xl md:text-4xl font-extrabold tracking-tight"
        style={{ letterSpacing: '-0.02em' }}
      >
        Calorie Calculator
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
        Calculate your energy expenditure effortlessly.
      </p>
    </header>
  )
}
