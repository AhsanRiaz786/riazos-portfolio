'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from '@xyflow/react'
import type { ProjectNode, ProjectTrack } from '@/lib/pipeline/types'

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------

const TRACK_COLOR: Record<ProjectTrack, string> = {
  automation: '#F97316',
  fullstack: '#3B82F6',
  data: '#8B5CF6',
}

const MONO: React.CSSProperties = { fontFamily: "'Fira Code', monospace" }

// ---------------------------------------------------------------------------
// Status chip -- static in Phase 1. Phase 3 overlays live GitHub signals.
// ---------------------------------------------------------------------------

type ChipInfo = { label: string; color: string }

function getStaticChip(data: ProjectNode['data']): ChipInfo {
  if (data.title === 'Depot') return { label: 'IN PROGRESS', color: '#FBBF24' }
  if (data.repoSignal !== null) return { label: 'OPEN SOURCE', color: '#00FF41' }
  if (
    data.track === 'automation' ||
    data.track === 'data' ||
    data.title === 'RevAutoSale'
  ) {
    return { label: 'SHIPPED', color: '#6B7280' }
  }
  return { label: 'SHIPPED', color: '#6B7280' }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProjectNodeComponent({
  id,
  data,
  isConnectable,
}: NodeProps<ProjectNode>) {
  const [expanded, setExpanded] = useState(false)
  const updateNodeInternals = useUpdateNodeInternals()

  // Tell React Flow to re-measure this node whenever expand state changes
  useEffect(() => {
    updateNodeInternals(id)
  }, [expanded, id, updateNodeInternals])

  const toggle = useCallback(() => setExpanded((v) => !v), [])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setExpanded(true)
    if (e.key === 'Escape') setExpanded(false)
  }, [])

  const trackColor = TRACK_COLOR[data.track]
  const chip = getStaticChip(data)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${data.title}. ${data.subtitle}. Press Enter to expand.`}
      onClick={toggle}
      onKeyDown={onKeyDown}
      style={{
        ...MONO,
        position: 'relative',
        background: '#141418',
        border: expanded
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        minWidth: 260,
        maxWidth: expanded ? 360 : 260,
        overflow: 'hidden',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.15s, max-width 0.15s',
      }}
    >
      {/* Track colour stripe */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '0 auto 0 0',
          width: 3,
          background: trackColor,
          borderRadius: '12px 0 0 12px',
        }}
      />

      {/* Collapsed header -- always visible */}
      <div style={{ padding: '12px 14px 12px 18px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 4,
          }}
        >
          <h3
            style={{
              color: '#E5E5E5',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.01em',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {data.title}
          </h3>

          {/* Status chip */}
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.1em',
              color: chip.color,
              background: `${chip.color}18`,
              border: `1px solid ${chip.color}45`,
              borderRadius: 4,
              padding: '2px 6px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {chip.label}
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: '#6B7280',
            fontSize: 11,
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {data.subtitle}
        </p>

        {/* Stack chips -- show first 3, then a count */}
        {data.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {data.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 9,
                  color: '#6B7280',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 4,
                  padding: '2px 6px',
                }}
              >
                {s}
              </span>
            ))}
            {data.stack.length > 3 && (
              <span
                style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', padding: '2px 2px' }}
              >
                +{data.stack.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '12px 14px 12px 18px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Section label="PROBLEM" text={data.problem} />
          <Section label="BUILT" text={data.built} />
          {data.outcome && <Section label="OUTCOME" text={data.outcome} />}

          {/* External links */}
          {data.links.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {data.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: 10,
                    color: '#00FF41',
                    border: '1px solid rgba(0,255,65,0.3)',
                    borderRadius: 4,
                    padding: '3px 8px',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          )}

          <p
            style={{
              color: 'rgba(255,255,255,0.15)',
              fontSize: 9,
              letterSpacing: '0.1em',
              marginTop: 10,
              textAlign: 'right',
            }}
          >
            Esc to close
          </p>
        </div>
      )}

      {/* Handles -- three distinct ones to support two edge types */}

      {/* Pipeline input -- from trigger, on the left */}
      <Handle
        id="pipeline-in"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.15)',
          width: 9,
          height: 9,
          left: -5,
        }}
      />

      {/* Capability input -- from skill nodes, on the right (upper) */}
      <Handle
        id="capability-in"
        type="target"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.10)',
          width: 8,
          height: 8,
          top: '30%',
          right: -5,
        }}
      />

      {/* Pipeline output -- to contact, on the right (lower) */}
      <Handle
        id="pipeline-out"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,255,255,0.15)',
          width: 9,
          height: 9,
          top: '70%',
          right: -5,
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-component: detail section row
// ---------------------------------------------------------------------------

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <p
        style={{
          color: '#6B7280',
          fontSize: 9,
          letterSpacing: '0.1em',
          marginBottom: 3,
        }}
      >
        {label}
      </p>
      <p style={{ color: '#E5E5E5', fontSize: 11, lineHeight: 1.6 }}>{text}</p>
    </div>
  )
}
