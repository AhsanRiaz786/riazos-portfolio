'use client'

import { useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'
import { usePipelineContext } from '@/lib/pipeline/context'
import type { PipelineNode, PipelineEdge } from '@/lib/pipeline/types'

/**
 * Tour step definition.
 * nodeId: the node to focus (sets activeNodeId in context).
 * edgeIds: edges on which to fire packets.
 * duration: ms before advancing to the next step.
 */
type TourStep = {
  nodeId: string
  edgeIds: string[]
  duration: number
}

const TOUR_STEPS: TourStep[] = [
  {
    nodeId: 'trigger',
    edgeIds: [],
    duration: 2200,
  },
  {
    nodeId: 'real-estate-system',
    edgeIds: ['e-trigger-ad-video', 'e-trigger-real-estate', 'e-trigger-aawaz'],
    duration: 2800,
  },
  {
    nodeId: 'skill-ai-agents',
    edgeIds: ['e-cap-ai-ad', 'e-cap-automation-realestate', 'e-cap-ai-aawaz'],
    duration: 2800,
  },
  {
    nodeId: 'contact',
    edgeIds: ['e-ad-video-contact', 'e-clutch-contact', 'e-corn-contact'],
    duration: 3200,
  },
]

/**
 * Renders nothing -- pure tour sequencing logic.
 *
 * Must be placed as a child of <ReactFlow> so that useReactFlow() is in scope.
 * Watches tourState/tourStep from PipelineContext and fires packets on edges
 * at each step before advancing.
 */
export function TourController() {
  const {
    tourState,
    tourStep,
    advanceTour,
    setTourState,
    setActiveNodeId,
  } = usePipelineContext()

  const { setEdges } = useReactFlow<PipelineNode, PipelineEdge>()

  useEffect(() => {
    if (tourState !== 'running') return

    const step = TOUR_STEPS[tourStep]

    if (!step) {
      // All steps done
      setTourState('done')
      setActiveNodeId(null)
      return
    }

    // Focus the step's target node
    setActiveNodeId(step.nodeId)

    // Fire packets on the step's edges
    if (step.edgeIds.length > 0) {
      setEdges((eds) =>
        eds.map((e) =>
          step.edgeIds.includes(e.id)
            ? ({
                ...e,
                data: {
                  ...e.data,
                  executing: true,
                  packetKey: (e.data?.packetKey ?? 0) + 1,
                },
              } as PipelineEdge)
            : e
        )
      )
    }

    const timer = setTimeout(() => {
      advanceTour()
    }, step.duration)

    return () => clearTimeout(timer)
  }, [tourState, tourStep, advanceTour, setTourState, setActiveNodeId, setEdges])

  // Purely logical -- renders nothing
  return null
}
