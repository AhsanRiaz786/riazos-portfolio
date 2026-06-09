'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { AgentNode } from '@/lib/pipeline/types'

export function AgentNodeComponent({
  data,
  isConnectable,
}: NodeProps<AgentNode>) {
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

      {/* Run tour button -- wired to tour context in Phase 2 */}
      <button
        type="button"
        disabled
        aria-label="Run guided tour (coming soon)"
        style={{
          fontFamily: "'Fira Code', monospace",
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          padding: '6px 14px',
          fontSize: 11,
          color: '#E5E5E5',
          cursor: 'not-allowed',
          opacity: 0.5,
          letterSpacing: '0.04em',
          width: '100%',
        }}
      >
        Run tour
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
