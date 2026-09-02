import { Flame, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function AppHeader() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
  }

  const isVi = i18n.language.startsWith('vi')

  return (
    <header className="relative text-center space-y-2">
      {/* Language Switcher */}
      <div
        className="flex items-center gap-1 absolute right-0 top-0 p-1 rounded-xl"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
        }}
      >
        <Globe className="w-3.5 h-3.5 ml-1.5" style={{ color: 'var(--text-muted)' }} />
        <button
          type="button"
          aria-label="Chuyển sang tiếng Việt"
          onClick={() => changeLanguage('vi')}
          className="px-2 py-1 text-xs font-semibold rounded-lg transition-colors"
          style={{
            color: isVi ? 'var(--accent-matcha)' : 'var(--text-muted)',
            background: isVi ? 'rgba(139,168,136,0.15)' : 'transparent',
          }}
        >
          VI
        </button>
        <button
          type="button"
          aria-label="Switch to English"
          onClick={() => changeLanguage('en')}
          className="px-2 py-1 text-xs font-semibold rounded-lg transition-colors"
          style={{
            color: !isVi ? 'var(--accent-matcha)' : 'var(--text-muted)',
            background: !isVi ? 'rgba(139,168,136,0.15)' : 'transparent',
          }}
        >
          EN
        </button>
      </div>

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
        {t('header.title')}
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
        {t('header.subtitle')}
      </p>
    </header>
  )
}
