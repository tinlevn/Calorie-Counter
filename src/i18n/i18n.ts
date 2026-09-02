import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'

export function getSavedLanguage(): 'en' | 'vi' {
  try {
    const v = localStorage.getItem('i18nextLng')
    return v === 'en' || v === 'vi' ? v : 'vi'
  } catch {
    return 'vi'
  }
}

const savedLanguage = getSavedLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

// Keep <html> lang attribute in sync
if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage
  i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng
  })
}

export default i18n
