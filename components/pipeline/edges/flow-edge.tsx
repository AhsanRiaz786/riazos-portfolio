'use client'

import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react'
import type { PipelineEdge } from '@/lib/pipeline/types'

/**
 * Custom edge for the pipeline graph.
 *
 * Pipeline edges (solid): connect trigger -> projects -> contact.
 * Capability edges (dashed): connect skill clusters -> projects.
 *
 * In Phase 1 both render as static styled paths.
 * Phase 2 adds the Framer Motion packet animation when data.executing is true.
 */
export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps<PipelineEdge>) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const isPipeline = data?.kind !== 'capability'

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke: isPipeline
          ? 'rgba(255,255,255,0.14)'
          : 'rgba(255,255,255,0.07)',
        strokeWidth: isPipeline ? 1.5 : 1,
        strokeDasharray: isPipeline ? undefined : '5 4',
        fill: 'none',
      }}
    />
  )
}
