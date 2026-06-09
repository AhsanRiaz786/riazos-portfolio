'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePipelineContext } from '@/lib/pipeline/context'

/**
 * Narration text for each tour step.
 * Index matches tourStep from context.
 */
const NARRATION: string[] = [
  'Pipeline starts here. Every system flows from a real trigger.',
  'Nine projects shipped across automation, fullstack, and data.',
  'Capability clusters wire into every project that uses them.',
  'Pipeline complete. Click any node to read what was built inside.',
  "That's the whole graph. Let's build something together.",
]

export function TourNarration() {
  const { tourState, tourStep, setTourState } = usePipelineContext()
  const prefersReduced = useReducedMotion()

  if (tourState !== 'running' && tourState !== 'done') return null

  const text = NARRATION[tourStep] ?? NARRATION[NARRATION.length - 1]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={tourStep}
          initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: "'Fira Code', monospace",
            background: 'rgba(20,20,24,0.92)',
            border: '1px solid rgba(0,255,65,0.18)',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 12,
            color: '#E5E5E5',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}
        >
          {text}
        </motion.div>
      </AnimatePresence>

      {/* Skip button -- needs pointer events */}
      <button
        type="button"
        onClick={() => setTourState('done')}
        style={{
          pointerEvents: 'all',
          fontFamily: "'Fira Code', monospace",
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.3)',
          fontSize: 10,
          letterSpacing: '0.1em',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
      >
        skip
      </button>
    </div>
  )
}
