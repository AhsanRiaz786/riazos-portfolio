import type { Node, Edge } from '@xyflow/react'

// ---------------------------------------------------------------------------
// Enumerations
// ---------------------------------------------------------------------------

export type NodeKind = 'trigger' | 'project' | 'skill' | 'agent' | 'contact'

export type ProjectTrack = 'automation' | 'fullstack' | 'data'

export type NodeStatus = 'idle' | 'running' | 'success' | 'error'

export type EdgeKind = 'pipeline' | 'capability'

// ---------------------------------------------------------------------------
// Node data shapes
// ---------------------------------------------------------------------------

export type TriggerNodeData = {
  eyebrow: string
  headline: string
  positioningLine: string
  metrics: Array<{ label: string; value: string }>
}

export type ProjectLink = {
  label: string
  href: string
}

export type ProjectNodeData = {
  title: string
  subtitle: string
  track: ProjectTrack
  stack: string[]
  problem: string
  built: string
  outcome: string
  links: ProjectLink[]
  /** Which GitHub repo to pull live signals from, if any */
  repoSignal: string | null
  status: NodeStatus
}

export type SkillNodeData = {
  label: string
}

export type AgentNodeData = {
  label: string
}

export type ContactLink = {
  kind: 'email' | 'github' | 'linkedin' | 'upwork' | 'resume'
  label: string
  href: string
}

export type ContactNodeData = {
  eyebrow: string
  links: ContactLink[]
}

// ---------------------------------------------------------------------------
// Typed React Flow nodes
// ---------------------------------------------------------------------------

export type TriggerNode = Node<TriggerNodeData, 'trigger'>
export type ProjectNode = Node<ProjectNodeData, 'project'>
export type SkillNode = Node<SkillNodeData, 'skill'>
export type AgentNode = Node<AgentNodeData, 'agent'>
export type ContactNode = Node<ContactNodeData, 'contact'>

export type PipelineNode =
  | TriggerNode
  | ProjectNode
  | SkillNode
  | AgentNode
  | ContactNode

// ---------------------------------------------------------------------------
// Typed React Flow edges
// ---------------------------------------------------------------------------

export type EdgeData = {
  kind: EdgeKind
  /** True while a packet is animating along this edge */
  executing: boolean
  /** Incremented to restart the packet animation */
  packetKey: number
}

export type PipelineEdge = Edge<EdgeData>

// ---------------------------------------------------------------------------
// Context value
// ---------------------------------------------------------------------------

export type TourState = 'idle' | 'running' | 'paused' | 'done'

export type PipelineContextValue = {
  tourState: TourState
  tourStep: number
  setTourState: (s: TourState) => void
  advanceTour: () => void
  /** Reset step to 0 and set state to 'running' in one call */
  startTour: () => void

  /** True after the visitor draws their first edge manually */
  wiredByUser: boolean
  setWiredByUser: (v: boolean) => void

  /** ID of the node currently focused by the tour or active interaction */
  activeNodeId: string | null
  setActiveNodeId: (id: string | null) => void
}

// ---------------------------------------------------------------------------
// GitHub signal (returned by /api/github)
// ---------------------------------------------------------------------------

export type GitHubSignal = {
  repo: string
  stars: number
  language: string | null
  pushed_at: string
  open_issues: number
}

export type GitHubSignalsResponse = {
  signals: Record<string, GitHubSignal | null>
}
