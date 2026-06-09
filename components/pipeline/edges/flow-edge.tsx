'use client'

import { useCallback } from 'react'
import {
  BaseEdge,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react'
import { motion, useReducedMotion } from 'framer-motion'
import type { PipelineEdge } from '@/lib/pipeline/types'

/**
 * Custom edge for the pipeline graph.
 *
 * Pipeline edges (solid): connect trigger -> projects -> contact.
 * Capability edges (dashed): connect skill clusters -> projects.
 *
 * When data.executing is true a green dot animates from source to target.
 * The dot self-resets by calling setEdges on completion via useReactFlow.
 * key={data.packetKey} remounts the motion.circle to restart the animation.
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

  const prefersReduced = useReducedMotion()
  const { setEdges } = useReactFlow()

  const isPipeline = data?.kind !== 'capability'
  const executing = data?.executing === true

  // Reset executing flag when the packet finishes its travel
  const handleComplete = useCallback(() => {
    setEdges((eds) =>
      eds.map((e) =>
        e.id === id
          ? { ...e, data: { ...e.data, executing: false } }
          : e
      )
    )
  }, [id, setEdges])

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: executing
            ? 'rgba(0,255,65,0.6)'
            : isPipeline
              ? 'rgba(255,255,255,0.14)'
              : 'rgba(255,255,255,0.07)',
          strokeWidth: isPipeline ? 1.5 : 1,
          strokeDasharray: isPipeline ? undefined : '5 4',
          fill: 'none',
          transition: 'stroke 0.15s',
        }}
      />

      {/* Packet dot -- only when executing and motion is allowed */}
      {executing && !prefersReduced && (
        <motion.circle
          key={data?.packetKey}
          r={4}
          fill="#00FF41"
          cx={sourceX}
          cy={sourceY}
          animate={{ cx: targetX, cy: targetY }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          onAnimationComplete={handleComplete}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </>
  )
}
