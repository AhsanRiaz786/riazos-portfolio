# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Status: Building "The Pipeline" (v2)

The portfolio is being rebuilt as a living node/dataflow graph in the visual language of n8n and
LangGraph. The current RiazOS desktop-OS site is **frozen at `/` until ship day**. All new work
lives in parallel directories. Do not touch existing files outside the new directories.

**All decisions are documented.** Read the relevant doc before making any architecture, design,
or copy choice. Do not invent answers the docs already provide.

---

## Docs (single source of truth)

| Doc | What it answers |
|---|---|
| `docs/personal-info/ABOUT_ME.md` | Every fact about Ahsan: metrics, projects, stack, contact links |
| `docs/PRD.md` | What to build, node map, IA, copy, a11y, perf budget, success criteria |
| `docs/DESIGN_DOC.md` | Every visual decision with named reference citations (palette, type, motion, depth) |
| `docs/TECH_STACK.md` | State model, caching strategy, deps, code-splitting, TypeScript patterns |
| `docs/BUILD_PLAN.md` | 4 phases, done criteria per phase, full file structure, verification gates |
| `docs/CONTENT_CHECKLIST.md` | Every string, tour narration, status chip vocabulary, cringe-audit checklist |

---

## Commands

```bash
pnpm dev          # dev server at http://localhost:3000
pnpm build        # production build
pnpm start        # run production build locally
pnpm lint         # ESLint (run manually; next.config.mjs ignores errors at build for legacy code)
tsc --noEmit      # typecheck (run manually; same caveat)
```

Lint and typecheck must pass clean on all new code before a phase is declared done.

---

## Hard constraints (non-negotiable)

1. **Frozen zone:** zero edits to `app/page.tsx`, `components/boot-sequence.tsx`,
   `components/desktop.tsx`, `components/window.tsx`, or any other existing `components/*.tsx`.
   If a file outside the new directories needs to change, stop and ask first.

2. **New code directories only:**
   - `app/(pipeline)/v2/` -- the new route
   - `app/api/github/` and `app/api/agent/` -- server-side Route Handlers
   - `components/pipeline/` -- all new components
   - `lib/pipeline/` -- all new types, graph schema, project data

3. **No `Math.random` in new code.** Every dynamic value traces to a real source. Verification:
   `grep -r "Math.random" components/pipeline/ lib/pipeline/` must return nothing before sign-off.

4. **No em dashes** in any generated text: docs, copy, code comments, narration, UI strings.

5. **Secrets server-side only.** `GITHUB_TOKEN` and `AI_GATEWAY_KEY` live in `.env.local`,
   read via `process.env` inside Route Handlers. Never in client components. Never hardcoded.
   Add `.env.example` only (never a real `.env`).

6. **No WebGL / Three.js.** All depth and motion via CSS and SVG only.

7. **No vendor names in client-facing copy.** Tech can be named in node detail panels (factual).
   Marketing-voice lines (trigger node, subtitles, tour narration) stay generic.

---

## Architecture: new pipeline code

### State model (from TECH_STACK.md)

React Flow owns all graph state (`useNodesState`, `useEdgesState`). A single `PipelineContext`
holds the four cross-cutting values: `tourState`, `tourStep`, `wiredByUser`, `activeNodeId`.
Do not introduce Zustand unless Phase 2 proves context re-renders cause measurable jank AND
memoization fails to fix it.

Packet animation state lives in `edge.data.executing` (boolean) and `edge.data.packetKey`
(number, incremented to restart). Not in context.

### Code splitting

```tsx
// app/(pipeline)/v2/page.tsx
const PipelineCanvas = dynamic(
  () => import('@/components/pipeline/pipeline-canvas'),
  { ssr: false, loading: () => <PipelineSkeleton /> }
)
```

`ssr: false` is required -- React Flow uses browser APIs unavailable during SSR. The skeleton
must not import `@xyflow/react` or `framer-motion`.

### Route Handler caching (from TECH_STACK.md)

```ts
// app/api/github/route.ts
export const revalidate = 3600   // 1 hour; do not use 0 or 60
```

On missing/failed token: return `null` per repo, never throw. Client shows static chip.

### TypeScript pattern for React Flow nodes

```ts
import type { Node, NodeProps } from '@xyflow/react'
import type { ProjectNodeData } from '@/lib/pipeline/types'

type ProjectNode = Node<ProjectNodeData, 'project'>

export function ProjectNodeComponent({ data, selected }: NodeProps<ProjectNode>) { ... }
```

No `any` in node component props.

---

## File structure (what exists and what to create)

```
# FROZEN (do not touch)
app/page.tsx                          boots RiazOS
components/boot-sequence.tsx
components/desktop.tsx
components/window.tsx
components/(all other existing)

# TO BUILD
app/(pipeline)/v2/page.tsx            route entry, dynamic import
app/api/github/route.ts               GitHub proxy, server-side
app/api/agent/route.ts                (Phase 4 only) AI operator
components/pipeline/
  pipeline-canvas.tsx
  canvas-noise.tsx
  canvas-spotlight.tsx
  nodes/  trigger-node, project-node, skill-node, agent-node, contact-node
  edges/  flow-edge.tsx
  tour/   use-tour.ts, tour-narration.tsx
  hooks/  use-github-signals.ts
lib/pipeline/
  types.ts
  graph.ts
  projects.ts
.env.example

# SHIP DAY ONLY (one commit, reversible)
app/os/page.tsx                       RiazOS moved here
app/page.tsx                          swapped to pipeline entry
```

---

## Design tokens (from DESIGN_DOC.md)

| Token | Value | Usage |
|---|---|---|
| Canvas bg | `#0e0e11` | React Flow canvas background |
| Node surface | `#141418` | All node card backgrounds |
| Node border | `rgba(255,255,255,0.07)` | 1px at rest |
| Accent green | `#00FF41` | ONLY when data is flowing (packets, active edges, executing node border) |
| Accent pink | `#FF00F7` | Contact node and error states only |
| Track A (automation) | `#F97316` | Left stripe on Track A project nodes |
| Track B (fullstack) | `#3B82F6` | Left stripe on Track B project nodes |
| Track C (data) | `#8B5CF6` | Left stripe on Track C project nodes |
| Text primary | `#E5E5E5` | Node titles, all readable text |
| Text secondary | `#6B7280` | Subtitles, muted labels |
| Canvas dot grid | `rgba(255,255,255,0.06)` | React Flow Background component |
| Noise opacity | `0.025` | SVG feTurbulence overlay |

Font: **Fira Code only** (already in codebase). Display at `clamp(40px, 5vw, 68px)` weight 600
letterSpacing -1.5px. Node titles at 14px weight 500. Status chips at 10px uppercase.

---

## Existing codebase (frozen, for reference only)

The RiazOS code at `/` is a client-only Next.js app styled as a retro OS. It has:
- `components/boot-sequence.tsx` -- boot animation with ASCII art and Web Audio API
- `components/desktop.tsx` -- draggable windows, Matrix rain background, app icons
- `components/terminal.tsx` -- command interpreter, makes real GitHub API calls via `fetchGitHubData`
- `tailwind.config.ts` -- design tokens: green `#00FF41`, pink `#FF00F7`, charcoal (reused in v2)
- `next.config.mjs` -- ESLint and TypeScript errors ignored at build (legacy; fix new code properly)

None of these files are modified during the build. On ship day, RiazOS moves to `/os` in one commit.

---

## Deployment

- Deployed to Vercel (production)
- Vercel Analytics active in root layout
- After adding `GITHUB_TOKEN`: set it in Vercel environment variables (production + preview)
- Verify secret is absent from client bundle post-build:
  `grep -r "GITHUB_TOKEN" .next/static/` must return nothing

<!-- compact-note 2026-06-09 11:20 | session compacted -->

<!-- compact-note 2026-06-09 11:20 | session compacted -->

<!-- compact-note 2026-06-09 17:08 | session compacted -->

<!-- compact-note 2026-06-09 17:08 | session compacted -->
