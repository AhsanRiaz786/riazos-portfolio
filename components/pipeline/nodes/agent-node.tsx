'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { AgentNode } from '@/lib/pipeline/types'
import { usePipelineContext } from '@/lib/pipeline/context'

export function AgentNodeComponent({
  data,
  isConnectable,
}: NodeProps<AgentNode>) {
  const { tourState, startTour } = usePipelineContext()
  const isBusy = tourState === 'running' || tourState === 'paused'

  return (
    <div
      style={{
        fontFamily: "'Fira Code', monospace",
        background: '#141418',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '14px 18px',
        minWidth: 140,
        position: 'relative',
      }}
    >
      {/* Label */}
      <p
        style={{
          color: '#6B7280',
          fontSize: 9,
          letterSpacing: '0.14em',
          marginBottom: 10,
        }}
      >
        {data.label}
      </p>

      {/* Run tour button -- wired to context */}
      <button
        type="button"
        disabled={isBusy}
        aria-label={isBusy ? 'Tour is running' : 'Run guided tour'}
        onClick={startTour}
        style={{
          fontFamily: "'Fira Code', monospace",
          background: isBusy
            ? 'rgba(0,255,65,0.06)'
            : 'rgba(255,255,255,0.04)',
          border: isBusy
            ? '1px solid rgba(0,255,65,0.3)'
            : '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          padding: '6px 14px',
          fontSize: 11,
          color: isBusy ? '#00FF41' : '#E5E5E5',
          cursor: isBusy ? 'not-allowed' : 'pointer',
          opacity: isBusy ? 0.7 : 1,
          letterSpacing: '0.04em',
          width: '100%',
          transition: 'all 0.15s',
        }}
      >
        {isBusy ? 'running...' : 'Run tour'}
      </button>

      <Handle
        id="out"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.12)',
          width: 9,
          height: 9,
          right: -5,
        }}
      />
    </div>
  )
}
