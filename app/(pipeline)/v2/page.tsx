import dynamic from 'next/dynamic'

/**
 * Lightweight skeleton shown while the pipeline canvas chunk loads.
 * Must NOT import @xyflow/react or framer-motion -- that defeats the code split.
 */
function PipelineSkeleton() {
  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ background: '#0e0e11' }}
      aria-label="Loading pipeline..."
    >
      {/* Noise overlay -- matches the real canvas layer */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.025 }}
      >
        <filter id="sk-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sk-noise)" />
      </svg>

      {/* Centered pulse indicator */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-2 w-2 animate-pulse rounded-full"
          style={{ background: '#00FF41' }}
        />
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Fira Code', monospace" }}
        >
          loading pipeline
        </span>
      </div>
    </div>
  )
}

/**
 * The pipeline canvas is loaded client-side only.
 * React Flow uses browser APIs (ResizeObserver, DOM measurements) that are
 * unavailable during SSR -- ssr: false is required, not optional.
 */
const PipelineCanvas = dynamic(
  () =>
    import('@/components/pipeline/pipeline-canvas').then(
      (mod) => mod.PipelineCanvas
    ),
  {
    ssr: false,
    loading: () => <PipelineSkeleton />,
  }
)

export default function PipelinePage() {
  return <PipelineCanvas />
}
