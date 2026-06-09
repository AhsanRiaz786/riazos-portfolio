'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { TriggerNode } from '@/lib/pipeline/types'

const MONO: React.CSSProperties = { fontFamily: "'Fira Code', monospace" }

export function TriggerNodeComponent({
  data,
  isConnectable,
}: NodeProps<TriggerNode>) {
  return (
    <div
      style={{
        ...MONO,
        background: '#141418',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '20px 24px',
        minWidth: 300,
        position: 'relative',
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          color: '#6B7280',
          fontSize: 10,
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}
      >
        {data.eyebrow}
      </p>

      {/* Headline */}
      <h1
        style={{
          color: '#E5E5E5',
          fontSize: 38,
          fontWeight: 600,
          letterSpacing: '-1.5px',
          lineHeight: 1.05,
          marginBottom: 14,
        }}
      >
        {data.headline}
      </h1>

      {/* Positioning line */}
      <p
        style={{
          color: '#6B7280',
          fontSize: 12,
          lineHeight: 1.65,
          marginBottom: 20,
          maxWidth: 280,
        }}
      >
        {data.positioningLine}
      </p>

      {/* Metric chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {data.metrics.map((m) => (
          <span
            key={m.label}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 10,
              color: '#E5E5E5',
              letterSpacing: '0.04em',
            }}
          >
            {m.value} {m.label}
          </span>
        ))}
      </div>

      {/* Handle drag hint */}
      <p
        style={{
          color: 'rgba(255,255,255,0.18)',
          fontSize: 9,
          letterSpacing: '0.1em',
          marginTop: 16,
          textAlign: 'right',
        }}
      >
        drag to connect
      </p>

      {/* Source handle -- the output of the pipeline */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.18)',
          width: 10,
          height: 10,
          right: -6,
        }}
      />
    </div>
  )
}
