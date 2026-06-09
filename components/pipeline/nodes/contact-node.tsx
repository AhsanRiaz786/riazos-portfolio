'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ContactNode } from '@/lib/pipeline/types'

// Icon characters -- Fira Code renders these cleanly
const LINK_ICONS: Record<string, string> = {
  email: '✉',
  github: '⌥',
  linkedin: '⚡',
  upwork: '◈',
  resume: '↓',
}

export function ContactNodeComponent({
  data,
  isConnectable,
}: NodeProps<ContactNode>) {
  return (
    <div
      style={{
        fontFamily: "'Fira Code', monospace",
        background: '#141418',
        // Pink accent border -- contact node only
        border: '1px solid rgba(255,0,247,0.25)',
        borderRadius: 12,
        padding: '16px 20px',
        minWidth: 240,
        position: 'relative',
        // Subtle pink ambient glow
        boxShadow: '0 0 24px rgba(255,0,247,0.06)',
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          color: '#FF00F7',
          fontSize: 9,
          letterSpacing: '0.14em',
          marginBottom: 14,
          opacity: 0.8,
        }}
      >
        {data.eyebrow}
      </p>

      {/* Links */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {data.links.map((link) => (
          <li key={link.kind}>
            <a
              href={link.href}
              target={link.kind === 'email' ? undefined : '_blank'}
              rel={link.kind === 'email' ? undefined : 'noopener noreferrer'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#E5E5E5',
                textDecoration: 'none',
                fontSize: 11,
                letterSpacing: '0.02em',
                transition: 'color 0.1s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#FF00F7')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#E5E5E5')
              }
            >
              <span
                aria-hidden="true"
                style={{ color: 'rgba(255,0,247,0.5)', fontSize: 12, width: 16 }}
              >
                {LINK_ICONS[link.kind] ?? '→'}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Target handle -- pipeline ends here */}
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          background: '#141418',
          border: '2px solid rgba(255,0,247,0.3)',
          width: 9,
          height: 9,
          left: -5,
        }}
      />
    </div>
  )
}
