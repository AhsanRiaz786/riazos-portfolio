'use client'

import { useCallback } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { getInitialNodes, getInitialEdges } from '@/lib/pipeline/graph'
import type { PipelineNode, PipelineEdge } from '@/lib/pipeline/types'
import { PipelineProvider, usePipelineContext } from '@/lib/pipeline/context'
import { CanvasNoise } from './canvas-noise'
import { CanvasSpotlight } from './canvas-spotlight'
import { SrFallback } from './sr-fallback'
import { TriggerNodeComponent } from './nodes/trigger-node'
import { ProjectNodeComponent } from './nodes/project-node'
import { SkillNodeComponent } from './nodes/skill-node'
import { AgentNodeComponent } from './nodes/agent-node'
import { ContactNodeComponent } from './nodes/contact-node'
import { FlowEdge } from './edges/flow-edge'

// Node and edge type maps -- defined outside the component so references are stable.
// React Flow does reference equality on these; inline objects would remount all nodes on
// every render. Keep these at module scope.
const nodeTypes = {
  trigger: TriggerNodeComponent,
  project: ProjectNodeComponent,
  skill: SkillNodeComponent,
  agent: AgentNodeComponent,
  contact: ContactNodeComponent,
} as const

// Both edge kinds (pipeline solid, capability dashed) use the same FlowEdge renderer.
// The edge's `data.kind` field controls the visual variant.
const edgeTypes = {
  pipeline: FlowEdge,
  capability: FlowEdge,
} as const

function PipelineCanvasInner() {
  const { setWiredByUser, wiredByUser } = usePipelineContext()

  const [nodes, , onNodesChange] = useNodesState<PipelineNode>(getInitialNodes())
  const [edges, setEdges, onEdgesChange] = useEdgesState<PipelineEdge>(
    getInitialEdges()
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'pipeline',
            data: { kind: 'pipeline' as const, executing: false, packetKey: 0 },
          },
          eds
        )
      )
      if (!wiredByUser) {
        setWiredByUser(true)
      }
    },
    [setEdges, wiredByUser, setWiredByUser]
  )

  return (
    <div
      className="relative h-screen w-full"
      style={{ background: '#0e0e11' }}
    >
      {/* Screen reader text fallback -- visually hidden, full semantic content */}
      <SrFallback />

      {/* Depth layers rendered beneath the flow */}
      <CanvasSpotlight />
      <CanvasNoise />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        nodesFocusable
        nodesDraggable
        style={{ background: 'transparent' }}
        aria-label="Portfolio pipeline graph"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.06)"
          style={{ background: 'transparent' }}
        />
        <MiniMap
          nodeColor="#141418"
          maskColor="rgba(14,14,17,0.85)"
          style={{
            background: '#141418',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
          }}
        />
        <Controls
          style={{
            background: '#141418',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
          }}
        />
      </ReactFlow>
    </div>
  )
}

export function PipelineCanvas() {
  return (
    <PipelineProvider>
      <PipelineCanvasInner />
    </PipelineProvider>
  )
}
