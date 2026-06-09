# TECH_STACK.md

Architecture and dependency reference for the Pipeline v2 build. Every decision here is
final for the current build. When a future Claude Code instance hits an architecture question
(state model, caching strategy, Zustand, Route Handler pattern), it defers to this doc rather
than inventing an answer. No em dashes anywhere.

---

## Runtime environment

| Layer | Value |
|---|---|
| Framework | Next.js 15.2.8, App Router |
| React | 19.x |
| Language | TypeScript (strict: true) |
| Package manager | pnpm |
| Node target | 18+ (Vercel default) |
| Build | Turbopack (default in Next 15 dev) |

Next.js 15 + React 19 is the current baseline. React Flow (`@xyflow/react`) supports React 18
and 19. Framer Motion (`motion`) supports React 19. No compatibility shims needed.

---

## New dependencies (add in Phase 0)

```bash
pnpm add @xyflow/react framer-motion
```

| Package | Version target | Why |
|---|---|---|
| `@xyflow/react` | latest (11.x) | The graph canvas, handles, edges, pan/zoom, minimap, onConnect lifecycle. The visual language of n8n/LangGraph. React Flow owns all graph state. |
| `framer-motion` | latest (v11+) | Packet animation along SVG edge paths (`useMotionValue`, `useTransform`, `offsetDistance`), node expand/collapse spring, camera-follow easing, `useReducedMotion` hook. |

**Note on package name:** The npm package is `framer-motion` but is also published under `motion`.
Use `framer-motion` to match the existing dependency ecosystem; both resolve to the same library.
The `useReducedMotion` hook is at `framer-motion`.

These two packages are loaded **only** on the `/v2` route via dynamic import (see code-splitting
section). They do not appear in the `/` bundle.

No other new dependencies are introduced in Phases 0-3. Phase 4 adds the Vercel AI SDK
(already covered below) if the agent operator is built.

---

## Code-splitting strategy

React Flow and Framer Motion are heavy. Neither should be in the initial `/` bundle.

**Pattern (Phase 0, `app/(pipeline)/v2/page.tsx`):**

```tsx
import dynamic from 'next/dynamic'

const PipelineCanvas = dynamic(
  () => import('@/components/pipeline/pipeline-canvas'),
  {
    ssr: false,              // the canvas is purely client-side; no SSR
    loading: () => <PipelineSkeleton />,
  }
)
```

`ssr: false` is correct here. React Flow uses browser APIs (ResizeObserver, DOM measurements)
that are unavailable during SSR. Attempting SSR causes hydration mismatches. This is the
documented React Flow approach.

`<PipelineSkeleton />` is a lightweight placeholder: the dark canvas background (#0e0e11),
the noise SVG overlay, and a centered subtle spinner or pulse. It renders in the initial HTML
and is replaced when the dynamic import resolves. It must not import `@xyflow/react` or
`framer-motion` (that defeats the split).

All node components, edge components, hooks, and tour logic under `components/pipeline/` are
imported from `pipeline-canvas.tsx` or its children, so they are all automatically in the
same code-split chunk. No additional `dynamic()` calls needed inside the pipeline tree.

---

## State model

### Decision: React Flow state + one context. No Zustand unless Phase 2 proves it insufficient.

React Flow manages all graph state:

```tsx
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
```

This is the correct model. React Flow's internal state handles node positions, edge routing,
selection, pan/zoom, and all graph mutations. Do not replicate graph state outside React Flow.

A single React context (`PipelineContext`) holds the four pieces of state that cross component
boundaries outside React Flow's concern:

```ts
type PipelineContextValue = {
  // Tour
  tourState: 'idle' | 'running' | 'paused' | 'done'
  tourStep: number
  setTourState: (s: PipelineContextValue['tourState']) => void
  advanceTour: () => void

  // Signature interaction
  wiredByUser: boolean          // true after the first manual edge connection
  setWiredByUser: (v: boolean) => void

  // Active node (for skill cluster highlight logic)
  activeNodeId: string | null
  setActiveNodeId: (id: string | null) => void
}
```

`PipelineContext` is provided in `pipeline-canvas.tsx` wrapping the `<ReactFlow>` component.
Node components read from it with `usePipelineContext()`.

**When to introduce Zustand:** if Phase 2 implementation reveals that the context re-renders
are causing performance problems (measurable: jank during packet animation) AND the problem
cannot be fixed by memoization (`useMemo`, `useCallback`, `React.memo`), then introduce
Zustand as a drop-in replacement for `PipelineContext`. The API surface stays identical; only
the implementation changes. Do not introduce Zustand preemptively.

### Edge `data` field for packet state

Each edge carries a `data` object in React Flow state:

```ts
type EdgeData = {
  type: 'pipeline' | 'capability'   // solid vs dashed rendering
  executing: boolean                 // true while packet is in flight
  packetKey: number                  // incremented to restart packet animation
}
```

When the `onConnect` lifecycle fires, `setEdges` is called to set `executing: true` on the
new edge. After the packet travel duration, a `setTimeout` sets it back to `false`. The
`flow-edge.tsx` component reads `data.executing` to decide whether to render the packet.

This keeps packet state inside the React Flow edges array, which is already managed and
subscribed by React Flow. No external state needed.

---

## Route Handler: GitHub proxy (`app/api/github/route.ts`)

### Purpose

Fetch real GitHub data for repo-backed project nodes. Keep the GitHub token server-side.
Deliver a cached, typed JSON response to the client hook.

### Caching strategy

```ts
export const revalidate = 3600   // revalidate at most once per hour
```

Next.js App Router Route Handlers support the `revalidate` export for time-based ISR.
This means:
- The first request hits the GitHub API.
- Subsequent requests within the hour return the cached response (no API call, no rate-limit risk).
- After 1 hour, the next request triggers a background revalidation.

This is the correct strategy for portfolio data that updates at most a few times per day.
Do not use `revalidate = 0` (defeats caching) or `revalidate = 60` (too aggressive for a
low-traffic portfolio; risks hitting GitHub's unauthenticated rate limit of 60 req/hr if
traffic spikes).

### Token handling

```ts
const token = process.env.GITHUB_TOKEN
// Never log, never include in response body, never expose to client
```

The handler reads `GITHUB_TOKEN` from `process.env`. If the token is absent (e.g. in a
preview deploy that does not have the env var set), the handler falls back to unauthenticated
requests (60 req/hr rate limit applies) and returns `null` per repo on failure rather than
throwing. The client hook treats `null` as "no live signal" and falls back to the static
chip for that node.

**Verification gate (Phase 3):** after building, inspect the client-side JS bundle with
`pnpm build && grep -r "GITHUB_TOKEN" .next/static/`. It must return nothing. This is the
"secret absent from client bundle" check in the BUILD_PLAN.

### Response shape

```ts
// GET /api/github
// Returns:
type GitHubSignalsResponse = {
  signals: Record<string, GitHubSignal | null>
}

type GitHubSignal = {
  repo: string
  stars: number
  language: string | null
  pushed_at: string          // ISO 8601, e.g. "2026-06-07T14:23:00Z"
  open_issues: number
}
```

The client hook (`use-github-signals.ts`) calls `GET /api/github` once on mount and returns
`{ signals, loading }`. No polling. No SWR. The Route Handler's cache is the freshness
mechanism; the client does not need to re-fetch.

### Repos in scope (Phase 3)

```ts
const REPOS = [
  'clutch-ai',
  'tiktok-ads-scraper',
  'SehatYaad',
  'secure-riscv-soc',
  // add 'Giraph' and 'RevAutoSale' if confirmed public
]
```

For each repo, call `https://api.github.com/repos/AhsanRiaz786/{repo}`. Note the exact
username casing: `AhsanRiaz786` (resolved contradiction from ABOUT_ME.md).

---

## Route Handler: AI agent operator (`app/api/agent/route.ts`, Phase 4 only)

### Dependency (Phase 4 only)

```bash
pnpm add ai   # Vercel AI SDK
```

### Pattern

```ts
import { streamText } from 'ai'

const key = process.env.AI_GATEWAY_KEY
// Use the Vercel AI Gateway via "provider/model" string
// Do not install @ai-sdk/anthropic or @ai-sdk/openai as separate packages
// unless the gateway is unavailable
```

The handler accepts `POST { userPrompt: string }` and returns a `TourStep[]` JSON array.
The system prompt instructs the model to select from the known node IDs in the graph and
produce a narration per step.

The agent tour is gated: if `AI_GATEWAY_KEY` is absent from env, `use-tour.ts` falls back
to the static tour without error. The UI shows the "Run tour" button regardless; the
fallback is transparent to the user.

---

## TypeScript configuration

`tsconfig.json` is already set to `strict: true`. For the new code:

- All component props are typed. No `any` types in `components/pipeline/` or `lib/pipeline/`.
- `lib/pipeline/types.ts` is the single source of type definitions. Node and edge data types
  extend React Flow's generic `Node<TData>` and `Edge<TData>` types.
- `tsc --noEmit` must pass cleanly before each sprint is declared done. The existing
  `next.config.mjs` ignores TypeScript errors at build time (for the legacy code). New code
  is held to a stricter standard: fix errors, do not rely on the ignore flag.

### React Flow TypeScript pattern

```ts
import type { Node, Edge, NodeProps } from '@xyflow/react'
import type { ProjectNodeData } from '@/lib/pipeline/types'

// Typed node:
type ProjectNode = Node<ProjectNodeData, 'project'>

// Typed component:
export function ProjectNodeComponent({ data, selected }: NodeProps<ProjectNode>) { ... }
```

React Flow v11 (`@xyflow/react`) has full TypeScript generics. Use them. This is what
eliminates `any` in node component props.

---

## Environment variables

| Variable | Required | Phase | Used in | Notes |
|---|---|---|---|---|
| `GITHUB_TOKEN` | Recommended | Phase 3 | `app/api/github/route.ts` only | Without it, falls back to unauthenticated GitHub API (rate-limited). Never client-side. |
| `AI_GATEWAY_KEY` | Optional | Phase 4 | `app/api/agent/route.ts` only | Without it, tour falls back to static narration. Never client-side. |

`.env.example` (committed):
```
GITHUB_TOKEN=your_github_personal_access_token_here
AI_GATEWAY_KEY=your_ai_gateway_key_here
```

`.env.local` (gitignored, never committed):
Real values go here. Verify `.gitignore` includes `.env.local` before adding real tokens.

---

## Performance constraints

| Constraint | Target | Mechanism |
|---|---|---|
| JS to first paint on `/v2` | < 180KB gzip | React Flow + Framer Motion in a single dynamic-import chunk, never in the `/` bundle |
| LCP | < 2.5s | `<PipelineSkeleton />` renders in initial HTML; canvas hydrates after |
| CLS | < 0.05 | Skeleton has exact same dimensions as the canvas; no layout shift on hydration |
| TBT | < 200ms | No heavy main-thread work before canvas hydrates; GitHub signals are server-fetched |
| Packet animation | GPU-only | CSS `transform` and `opacity` only; no layout-triggering properties |
| Off-screen packets | Paused | `visibilitychange` listener sets a `paused` ref; packet animation skips frames when paused |

Measurement: run `pnpm build && pnpm start` then `lighthouse http://localhost:3000/v2 --only-categories=performance` (or the chrome-devtools MCP `lighthouse_audit` tool) before Phase 3 sign-off.

---

## What is explicitly not in the stack

| Excluded | Why |
|---|---|
| Three.js / WebGL | Hard guardrail. Depth via CSS and SVG only. |
| SWR / React Query | Not needed. Single-fetch-on-mount for GitHub signals; Route Handler provides freshness. |
| Zustand | Not added until Phase 2 proves context performance is insufficient. |
| CSS Modules | Not used. Tailwind classes + inline styles for dynamic values. |
| Any animation library other than Framer Motion | Consistency. One motion library. |
| `@ai-sdk/anthropic` or `@ai-sdk/openai` | Use the Vercel AI Gateway via plain `ai` SDK and a `"provider/model"` string. No vendor SDK in the bundle. |
| New global CSS | All new styles go in component-level Tailwind classes or inline styles. No additions to `app/globals.css` beyond one new `@keyframes` block for the executing-node pulse animation (if Tailwind `animate-pulse` is insufficient). |
