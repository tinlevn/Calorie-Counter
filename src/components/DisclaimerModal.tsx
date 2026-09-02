import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Info, X, Activity, Heart, Award, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  className?: string
}

export function DisclaimerModal({ className = '' }: Props) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showHoverCard, setShowHoverCard] = useState(false)
  const [coords, setCoords] = useState<{ top: number; right: number; placement: 'top' | 'bottom' }>({
    top: 0,
    right: 0,
    placement: 'bottom',
  })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hoverCardRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const updateCoords = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const placeTop = rect.top > 280
    setCoords({
      top: placeTop ? rect.top - 8 : rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
      placement: placeTop ? 'top' : 'bottom',
    })
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    updateCoords()
    setShowHoverCard(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowHoverCard(false)
    }, 150)
  }

  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Tiny trigger button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setIsOpen(true)
          setShowHoverCard(false)
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={t('disclaimer.buttonAria')}
        title={t('disclaimer.tooltip')}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300/60 cursor-pointer"
        style={{
          background: 'rgba(255, 248, 236, 0.18)',
          color: '#FFF8EC',
          border: '1px solid rgba(255, 248, 236, 0.3)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {/* Floating Hover Card (rendered in Portal to avoid being clipped by parent overflow-hidden) */}
      {showHoverCard &&
        !isOpen &&
        createPortal(
          <div
            ref={hoverCardRef}
            role="tooltip"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
            }}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[9999] w-80 sm:w-96 rounded-2xl p-4 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
            style={{
              top: coords.top,
              right: coords.right,
              transform: coords.placement === 'top' ? 'translateY(-100%)' : 'none',
              background: '#241D17',
              border: '1px solid rgba(232, 220, 200, 0.18)',
              color: '#E8DCC8',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[rgba(232,220,200,0.1)]">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(253, 190, 2, 0.15)', color: '#FDBE02' }}
              >
                <Info className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-bold text-[#FFF8EC]">
                {t('disclaimer.title')}
              </h4>
            </div>

            {/* Intro text */}
            <p className="text-xs text-[#D6C7B2] leading-relaxed mb-3">
              {t('disclaimer.subtitle')}
            </p>

            {/* Factor highlights */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <div
                className="p-1.5 rounded-lg text-center border"
                style={{
                  background: 'rgba(42, 33, 24, 0.7)',
                  borderColor: 'rgba(232, 220, 200, 0.08)',
                }}
              >
                <Activity className="w-3.5 h-3.5 mx-auto mb-1 text-[#8BA888]" />
                <span className="text-[10px] font-medium text-[#E8DCC8] block leading-tight">
                  {t('disclaimer.factors.bodyComposition.title')}
                </span>
              </div>

              <div
                className="p-1.5 rounded-lg text-center border"
                style={{
                  background: 'rgba(42, 33, 24, 0.7)',
                  borderColor: 'rgba(232, 220, 200, 0.08)',
                }}
              >
                <Award className="w-3.5 h-3.5 mx-auto mb-1 text-[#A87C5D]" />
                <span className="text-[10px] font-medium text-[#E8DCC8] block leading-tight">
                  {t('disclaimer.factors.fitnessLevel.title')}
                </span>
              </div>

              <div
                className="p-1.5 rounded-lg text-center border"
                style={{
                  background: 'rgba(42, 33, 24, 0.7)',
                  borderColor: 'rgba(232, 220, 200, 0.08)',
                }}
              >
                <Heart className="w-3.5 h-3.5 mx-auto mb-1 text-[#F0455C]" />
                <span className="text-[10px] font-medium text-[#E8DCC8] block leading-tight">
                  {t('disclaimer.factors.heartRate.title')}
                </span>
              </div>
            </div>

            {/* Click to open full details */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(true)
                setShowHoverCard(false)
              }}
              className="w-full flex items-center justify-between text-[11px] font-semibold text-[#FDBE02] hover:text-[#ffca28] transition-colors pt-1 cursor-pointer"
            >
              <span>{t('disclaimer.hoverHint')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>,
          document.body
        )}

      {/* Popup Modal dialog rendered at root */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(20, 15, 12, 0.78)', backdropFilter: 'blur(6px)' }}
            onClick={e => {
              if (e.target === e.currentTarget) setIsOpen(false)
            }}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="disclaimer-title"
              className="w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              style={{
                background: '#241D17',
                border: '1px solid rgba(232, 220, 200, 0.15)',
                color: '#E8DCC8',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[rgba(232,220,200,0.1)]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(253, 190, 2, 0.15)', color: '#FDBE02' }}
                  >
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 id="disclaimer-title" className="text-lg font-bold text-[#FFF8EC]">
                    {t('disclaimer.title')}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-[#8C7C6C] hover:text-[#FFF8EC] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={t('disclaimer.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subtitle / Intro */}
              <p className="text-sm leading-relaxed text-[#D6C7B2] mb-5">
                {t('disclaimer.subtitle')}
              </p>

              {/* Factors */}
              <div className="space-y-3.5 mb-6">
                {/* Body Composition */}
                <div
                  className="p-3.5 rounded-xl border"
                  style={{
                    background: 'rgba(42, 33, 24, 0.6)',
                    borderColor: 'rgba(232, 220, 200, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#FDBE02] font-semibold text-sm">
                    <Activity className="w-4 h-4 shrink-0 text-[#8BA888]" />
                    <span>{t('disclaimer.factors.bodyComposition.title')}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#B8A896]">
                    {t('disclaimer.factors.bodyComposition.desc')}
                  </p>
                </div>

                {/* Fitness Level */}
                <div
                  className="p-3.5 rounded-xl border"
                  style={{
                    background: 'rgba(42, 33, 24, 0.6)',
                    borderColor: 'rgba(232, 220, 200, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#FDBE02] font-semibold text-sm">
                    <Award className="w-4 h-4 shrink-0 text-[#A87C5D]" />
                    <span>{t('disclaimer.factors.fitnessLevel.title')}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#B8A896]">
                    {t('disclaimer.factors.fitnessLevel.desc')}
                  </p>
                </div>

                {/* Heart Rate */}
                <div
                  className="p-3.5 rounded-xl border"
                  style={{
                    background: 'rgba(42, 33, 24, 0.6)',
                    borderColor: 'rgba(232, 220, 200, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5 text-[#FDBE02] font-semibold text-sm">
                    <Heart className="w-4 h-4 shrink-0 text-[#F0455C]" />
                    <span>{t('disclaimer.factors.heartRate.title')}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#B8A896]">
                    {t('disclaimer.factors.heartRate.desc')}
                  </p>
                </div>
              </div>

              {/* Footer Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FDBE02]/60 cursor-pointer"
                  style={{
                    background: '#FDBE02',
                    color: '#1C1712',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = 'brightness(1.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = 'none'
                  }}
                >
                  {t('disclaimer.close')}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
