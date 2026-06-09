'use client'

/**
 * SVG feTurbulence noise overlay.
 * Fixed, full-viewport, pointer-events: none.
 * Opacity: 0.025 (2.5%) per DESIGN_DOC -- subtle grain texture.
 * Does NOT import @xyflow/react or framer-motion.
 */
export function CanvasNoise() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
      style={{ opacity: 0.025 }}
    >
      <filter id="pipeline-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#pipeline-noise)" />
    </svg>
  )
}
