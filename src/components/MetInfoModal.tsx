import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Flame, X, HelpCircle, ExternalLink, Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  met?: number
  className?: string
}

export function MetInfoModal({ met, className = '' }: Props) {
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

  const updateCoords = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const placeTop = rect.top > 260
    setCoords({
      top: placeTop ? rect.top - 8 : rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
      placement: placeTop ? 'top' : 'bottom',
    })
  }

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    updateCoords()
    setShowHoverCard(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowHoverCard(false)
    }, 150)
  }

  // Close modal on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  // Prevent background scroll when modal open
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
      {/* Trigger Button: either a MET value badge or a small MET info pill */}
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
        aria-label={t('metInfo.badgeAria')}
        title={t('metInfo.tooltip')}
        className="inline-flex items-center gap-1 px-2.5 py-1 sm:py-0.5 min-h-[28px] sm:min-h-0 rounded-full text-xs font-mono font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300/60"
        style={{
          background: 'rgba(255, 248, 236, 0.18)',
          color: '#FFF8EC',
          border: '1px solid rgba(255, 248, 236, 0.28)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {met !== undefined ? (
          <>
            <span className="font-semibold">MET {met}</span>
            <HelpCircle className="w-3 h-3 opacity-75" />
          </>
        ) : (
          <>
            <span className="font-semibold">MET</span>
            <HelpCircle className="w-3 h-3 opacity-75" />
          </>
        )}
      </button>

      {/* Floating Hover Card (rendered via Portal to avoid any overflow-hidden clipping) */}
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
            className="fixed z-[9999] w-72 sm:w-80 max-w-[calc(100vw-24px)] rounded-2xl p-4 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
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
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#FFF8EC] leading-tight">
                  {t('metInfo.title')}
                </h4>
                <p className="text-[11px] text-[#A87C5D] font-mono leading-none">
                  {t('metInfo.abbreviation')}
                </p>
              </div>
            </div>

            {/* Quick summary */}
            <p className="text-xs text-[#D6C7B2] leading-relaxed mb-2.5">
              {t('metInfo.baseline')}
            </p>

            {/* Formula badge */}
            <div
              className="p-2 rounded-lg text-[11px] font-mono mb-2.5"
              style={{
                background: 'rgba(42, 33, 24, 0.75)',
                border: '1px solid rgba(232, 220, 200, 0.1)',
                color: '#FDBE02',
              }}
            >
              {t('metInfo.formula')}
            </div>

            {/* Hint to click */}
            <div className="flex items-center justify-between text-[11px] text-[#8C7C6C] pt-1">
              <span>{t('disclaimer.hoverHint')}</span>
              <span className="text-[#FDBE02] font-semibold">→</span>
            </div>
          </div>,
          document.body
        )}

      {/* Full Modal Popup on click (rendered via Portal) */}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="met-info-title"
              className="w-full max-w-md rounded-2xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
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
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 id="met-info-title" className="text-lg font-bold text-[#FFF8EC] leading-tight">
                      {t('metInfo.title')}
                    </h3>
                    <p className="text-xs text-[#A87C5D] font-mono">
                      {t('metInfo.abbreviation')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-[#8C7C6C] hover:text-[#FFF8EC] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={t('metInfo.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Explanations */}
              <div className="space-y-3.5 mb-5 text-sm text-[#D6C7B2] leading-relaxed">
                <p>{t('metInfo.definition')}</p>
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    background: 'rgba(42, 33, 24, 0.6)',
                    borderColor: 'rgba(232, 220, 200, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1 text-[#8BA888] font-semibold text-xs uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Baseline (1 MET)</span>
                  </div>
                  <p className="text-xs text-[#B8A896] leading-relaxed">
                    {t('metInfo.baseline')}
                  </p>
                </div>

                {/* Formula */}
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    background: 'rgba(42, 33, 24, 0.6)',
                    borderColor: 'rgba(232, 220, 200, 0.08)',
                  }}
                >
                  <div className="text-xs font-semibold text-[#FDBE02] mb-1 uppercase tracking-wider">
                    {t('metInfo.formulaTitle')}
                  </div>
                  <div className="font-mono text-sm font-bold text-[#FFF8EC]">
                    {t('metInfo.formula')}
                  </div>
                </div>

                {/* Intensity scale table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A87C5D]">
                    {t('metInfo.scaleTitle')}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-black/20">
                      <span className="font-semibold text-[#8C7C6C]">
                        {t('metInfo.scale.sedentary.label')}
                      </span>
                      <span className="text-[#A89887] text-right">
                        {t('metInfo.scale.sedentary.examples')}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-black/20">
                      <span className="font-semibold text-[#8BA888]">
                        {t('metInfo.scale.light.label')}
                      </span>
                      <span className="text-[#A89887] text-right">
                        {t('metInfo.scale.light.examples')}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-black/20">
                      <span className="font-semibold text-[#FDBE02]">
                        {t('metInfo.scale.moderate.label')}
                      </span>
                      <span className="text-[#A89887] text-right">
                        {t('metInfo.scale.moderate.examples')}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2 p-2 rounded-lg bg-black/20">
                      <span className="font-semibold text-[#F0455C]">
                        {t('metInfo.scale.vigorous.label')}
                      </span>
                      <span className="text-[#A89887] text-right">
                        {t('metInfo.scale.vigorous.examples')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Source Note */}
                <p className="text-[11px] text-[#A08D7A] leading-relaxed pt-2 border-t border-[rgba(232,220,200,0.08)] flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span>{t('metInfo.sourceNote')}</span>
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FDBE02]/60 hover:brightness-110 cursor-pointer"
                  style={{
                    background: '#FDBE02',
                    color: '#1C1712',
                  }}
                >
                  {t('metInfo.close')}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
