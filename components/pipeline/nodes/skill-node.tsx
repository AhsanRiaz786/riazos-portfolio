'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { SkillNode } from '@/lib/pipeline/types'

export function SkillNodeComponent({
  data,
  isConnectable,
}: NodeProps<SkillNode>) {
  return (
    <div
      style={{
        fontFamily: "'Fira Code', monospace",
        background: '#141418',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 999,
        padding: '5px 14px',
        fontSize: 10,
        color: '#6B7280',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      {data.label}

      {/* Source handle on the LEFT -- edges go right-to-left toward project nodes */}
      <Handle
        id="cap-out"
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.1)',
          width: 8,
          height: 8,
          left: -5,
        }}
      />
    </div>
  )
}
