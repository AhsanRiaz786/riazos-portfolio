'use client'

/**
 * Ambient radial-gradient spotlight.
 * Positioned behind the trigger node area.
 * CSS-only, no framer-motion.
 * Reference: Clerk depth toolkit (DESIGN_DOC.md).
 */
export function CanvasSpotlight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse 600px 400px at 200px 50%, rgba(0,255,65,0.04) 0%, transparent 70%)',
      }}
    />
  )
}
