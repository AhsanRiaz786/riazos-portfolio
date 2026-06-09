# BUILD_PLAN: The Pipeline (v2)

Phased sprint plan. Every sprint is shippable/reviewable before the next begins.
The live site at `/` is untouched until the final Ship step.

Sources: plan file at `~/.claude/plans/portfolio-redesign-steady-sedgewick.md`,
PRD at `docs/PRD.md`, DESIGN_DOC at `docs/DESIGN_DOC.md`.
No em dashes anywhere.

---

## Principles governing the build

1. **Zero edits outside the new directories until Ship.** All new code lives in:
   `app/(pipeline)/v2/`, `app/api/github/`, `app/api/agent/` (Phase 4 only),
   `components/pipeline/`, `lib/pipeline/`. If a file outside these paths needs to change,
   STOP and ask before touching it.
2. **`Math.random` is banned.** Every dynamic value traces to a real source. The verification
   gate before each sprint sign-off is: `grep -r "Math.random" components/pipeline/ lib/pipeline/`
   must return nothing.
3. **`pnpm lint` and `tsc --noEmit` run clean before each sprint is declared done.** The
   existing `next.config.mjs` ignores these during builds; that is for legacy code. New code
   has no errors.
4. **Accessibility floor is verified, not assumed.** Each sprint that adds interactive elements
   includes a keyboard-only pass and a reduced-motion pass as part of the done definition.

---

## Dependency additions (do once, before Phase 0)

```bash
pnpm add @xyflow/react framer-motion
```

These load only on `/v2` via dynamic import. The `/` bundle is untouched.

`.env.example` is created with:
```
GITHUB_TOKEN=your_github_personal_access_token_here
# Optional (Phase 4 only)
AI_GATEWAY_KEY=your_ai_gateway_key_here
```

---

## Phase 0: Scaffold

**Goal:** `/v2` loads a styled empty canvas. `/` unchanged (byte-for-byte).
**Milestone check:** `pnpm dev`, navigate to `/v2`. Empty React Flow canvas appears with
the correct dark palette. Navigate to `/`. RiazOS boots exactly as before.

### Files to create

```
app/(pipeline)/v2/page.tsx
  - Dynamically imports <PipelineCanvas /> with a lightweight skeleton fallback
  - No SSR for the canvas (it is purely client-side)

components/pipeline/pipeline-canvas.tsx
  - <ReactFlow> host with: dark background, dot grid, minimap, controls
  - Empty nodes/edges arrays (static for now)
  - Applies the DESIGN_DOC canvas background (#0e0e11)
  - Imports the noise SVG texture component

components/pipeline/canvas-noise.tsx
  - The inline SVG feTurbulence noise overlay (fixed, full-viewport, opacity 0.025)

components/pipeline/canvas-spotlight.tsx
  - The ambient radial-gradient spotlight layer (positioned behind the trigger node)
  - Reads trigger node position from React Flow's useNodes hook

lib/pipeline/types.ts
  - NodeType enum: trigger | project | skill | agent | contact
  - ProjectTrack enum: automation | fullstack | data
  - NodeStatus enum: idle | running | success | error
  - ProjectNode data type, SkillNode data type, etc.

lib/pipeline/graph.ts
  - The graph schema: initial node positions, edges, node data
  - Imports from lib/pipeline/projects.ts
  - Returns { nodes: Node[], edges: Edge[] } -- the single source of truth for graph shape

lib/pipeline/projects.ts
  - All project content from ABOUT_ME.md, typed as ProjectData[]
  - Includes: id, title, subtitle, track, stack, problem, built, outcome, links, repoSignal
  - No inline styles or component logic; pure data

.env.example
  - GITHUB_TOKEN placeholder
```

### What is NOT built in Phase 0

- No node components (just an empty canvas).
- No content in the graph.
- No API routes.
- No animations.

---

## Phase 1: Static graph

**Goal:** the entire portfolio is navigable as a static graph with all real content. No
animations, no real signals, no interactivity beyond pan/zoom and basic expand/collapse.
**Milestone check:** every node is rendered with correct content from `projects.ts`. All edges
are drawn. The graph is legible and navigable. Keyboard Tab navigates between nodes. Enter
expands a project node. `tsc --noEmit` clean.

### Files to create

```
components/pipeline/nodes/trigger-node.tsx
  - Headline, positioning line, metric chips (static values from ABOUT_ME)
  - Output handle (the key interactive element -- pulsing animation stubbed for Phase 2)
  - Text-scramble effect on metrics (can be stubbed as static text in Phase 1)
  - Ambient spotlight positioning hook

components/pipeline/nodes/project-node.tsx
  - Collapsed: left-stripe, title, subtitle, stack chips, status chip, handles
  - Expanded: the full detail panel (backdrop-blur surface, problem/built/outcome/links)
  - Toggled by click/tap/Enter; Escape collapses
  - Track-color left-stripe via CSS custom property driven by track enum

components/pipeline/nodes/skill-node.tsx
  - Pill shape, label, invisible handles that appear on hover
  - Opacity-based visibility (dim at rest, visible when adjacent project is active)

components/pipeline/nodes/agent-node.tsx
  - Label + "Run tour" button
  - Tour trigger wired to tour context (tour starts in Phase 2)

components/pipeline/nodes/contact-node.tsx
  - Terminal visual treatment
  - Real links: email, GitHub, LinkedIn, Upwork, resume
  - Pink ambient border

components/pipeline/edges/flow-edge.tsx
  - Custom edge component: bezier, with correct stroke color per type (solid pipeline vs
    dashed capability edge)
  - Packet animation slot (stubbed for Phase 2)

lib/pipeline/graph.ts (completed)
  - All nodes positioned: trigger (left), three project tracks (center), skills (wired),
    agent (above-right), contact (right)
  - All edges defined: pipeline (solid) and capability (dashed)
```

### Keyboard accessibility (Phase 1)

React Flow built-ins provide basic node focus. Augment:
- `nodesFocusable: true` on `<ReactFlow>`
- Custom `onNodeClick` and `onKeyDown` handlers for Enter-to-expand on project nodes
- Escape handler to collapse the open node
- "Skip the graph, read as a list" link (top-right, visually subtle but accessible)
- The `<section aria-label="Portfolio as a list">` visually-hidden SR fallback rendered as
  a sibling to the canvas (all node content as semantic HTML)

### Done criteria for Phase 1

- All 9 project nodes rendered with correct content.
- All 5 skill cluster nodes rendered and wired.
- Trigger, agent, and contact nodes rendered.
- All edges visible (solid and dashed).
- Pan/zoom works on desktop and touch.
- Keyboard: Tab focuses nodes, Enter expands project, Escape collapses.
- SR text fallback renders correctly.
- `Math.random` grep returns nothing.
- `tsc --noEmit` and `pnpm lint` clean.

---

## Phase 2: Signature interaction + motion

**Goal:** the "wire it yourself" mechanic works end-to-end. Packets travel. Nodes execute.
Camera follows the tour. The dopamine moment is real.
**Milestone check:** wire the trigger->project edge, packet animates, node executes, detail
expands. Run the tour: camera pans node to node, packets fire, narration appears. Works on
desktop, mobile touch, and keyboard. Reduced-motion toggle shows the static path.

### Files to create/extend

```
components/pipeline/edges/flow-edge.tsx (extended)
  - Framer Motion packet: a <motion.circle> or CSS offset-path circle animated along the
    edge SVG path when the edge's "executing" state is true
  - Edge glow: CSS filter drop-shadow on the edge SVG when active
  - Provisional edge: drawn during onConnect drag, styled differently (dashed green)

components/pipeline/tour/use-tour.ts
  - Hook managing tourState: idle | running | paused | done
  - Step sequence: [ trigger, projectA1, skillCluster, projectB1, contact ]
  - Per-step: which node to pan to (fitView with padding), which edge to fire a packet on,
    narration text, duration before auto-advancing
  - Camera choreography via React Flow's fitView / setCenter / useReactFlow hook
  - Pausable: tourState flips to paused on any user interaction during the tour;
    resumes on "Continue" button

components/pipeline/tour/tour-narration.tsx
  - Floating narration card (bottom-center of screen, not on the canvas)
  - Shows current step's narration text, step indicator (1/5), Pause/Skip buttons
  - Hides when tour is idle
  - Reduced motion: no fade animation, just immediate show/hide

hooks/use-pipeline-context.ts (or lib/pipeline/context.tsx)
  - React context holding: tourState, activeNodeId, wiredByUser (bool), setters
  - Used by node components to react to tour state without prop drilling

components/pipeline/nodes/trigger-node.tsx (extended)
  - Text scramble effect on first mount (character-by-character, 600ms, Fira Code)
  - Idle packet loop: a packet that gently oscillates near the output handle every 3s
  - "drag to connect" hint label appears on first load; disappears after first wire

components/pipeline/nodes/skill-node.tsx (extended)
  - Opacity increases when adjacent project node is hovered or executing
  - Uses activeNodeId from context to derive whether to highlight
```

### onConnect lifecycle (the signature interaction)

```
onConnect(params) ->
  1. Draw the edge (React Flow adds it to state)
  2. Mark edge as "executing" in edge data
  3. Fire a packet along the edge (set edge.data.packetActive = true)
  4. After packet travel duration (700ms): set target node status = "running"
  5. After 600ms: set target node status = "success"
  6. Expand the target node (if it is a project node and this is the first connection)
  7. Mark wiredByUser = true in context (hint label disappears)
  8. If this is the first wire, auto-advance to the next nearest unconnected project node
     hint (pulse its input handle once)
```

### onConnectEnd without target (cancel)

```
onConnectEnd(event, connectionState) ->
  if !connectionState.isValid:
    // React Flow removes the provisional edge automatically
    // No residual state to clean up
```

### Reduced motion

All components check `useReducedMotion()` (Framer Motion hook). When true:
- All motion durations become 0ms
- Packets skip travel and immediately trigger the target node state
- Camera cuts instead of panning

### Done criteria for Phase 2

- Wire trigger->project: edge animates in, packet travels, node executes, detail expands.
- Cancel: drag without connecting, edge disappears cleanly.
- Tour: all 5 steps, camera pans, packets fire, narration appears per step.
- Keyboard wire: focus output handle (Enter), arrow to target node (Enter), edge created.
- Touch wire: tap-and-drag on mobile; tap-to-connect two-tap fallback works.
- Reduced motion: all interactions work without animation (verified by toggling the OS setting).
- Skill cluster nodes highlight when adjacent project node is active.
- `Math.random` grep returns nothing.
- `tsc --noEmit` and `pnpm lint` clean.
- Mobile Lighthouse score >= 70 (a regression check; full budget target is Phase 3).

---

## Phase 3: Real signals

**Goal:** every dynamic value is real. GitHub API signals are live. A11y floor is fully met.
Perf budget is verified. This is the minimum shippable product.
**Milestone check:** status chips on repo-backed nodes show real last-commit time and language.
No `Math.random` anywhere (already enforced). Lighthouse mobile: LCP < 2.5s, TBT < 200ms.
Keyboard-only pass. SR pass on the text fallback. Confirmed on real Android device or emulated.

### Files to create/extend

```
app/api/github/route.ts
  - Next.js Route Handler (server-side, never touches the client bundle)
  - Reads GITHUB_TOKEN from process.env (never hardcoded, never logged)
  - Fetches: for each repo in REPO_SIGNAL_LIST, call
    https://api.github.com/repos/AhsanRiaz786/{repo}
    and return: { name, stars, language, pushed_at, open_issues_count }
  - Caches with: export const revalidate = 3600 (1 hour, respects rate limits)
  - Returns a typed JSON response matching the GithubSignal type in lib/pipeline/types.ts
  - On error (rate limit, network): returns null per repo (node shows static verified chip)

REPO_SIGNAL_LIST (in lib/pipeline/graph.ts or a constants file):
  - clutch-ai, tiktok-ads-scraper, SehatYaad, secure-riscv-soc
  - (Giraph and RevAutoSale to verify; add if repos exist and are public)

components/pipeline/hooks/use-github-signals.ts
  - Client-side hook that fetches /api/github on mount
  - Returns { signals: Record<repoName, GithubSignal | null>, loading: boolean }
  - No SWR or React Query required: a single fetch on mount, cached by the Route Handler
  - Consumed by project-node.tsx to populate the live-commits chip

components/pipeline/nodes/project-node.tsx (extended)
  - If node has repoSignal: show the live chip from use-github-signals
    (e.g. "last commit 2d ago", "TypeScript", "4 stars")
  - If no repoSignal or signal returns null: show static verified-outcome chip
    ("open source", "shipped", "in progress") as specified in ABOUT_ME.md
  - Chip source label is always visible and honest (not "live" if it is not live)
```

### Performance verification

- Run `pnpm build && pnpm start`, then Lighthouse mobile against `/v2`.
- Targets: LCP < 2.5s, CLS < 0.05, TBT < 200ms.
- If TBT is too high: React Flow and Framer Motion are already code-split; check that the
  dynamic import skeleton is lightweight enough and that the canvas does not paint during SSR.
- Image: `next/image` not used in Phase 1-3 (no images in nodes). If images are added later,
  remove `images.unoptimized: true` for the new route only (per-route optimization config).

### A11y verification (Phase 3 gate)

- **Keyboard-only pass:** navigate every node (Tab + arrows), expand a project (Enter),
  collapse it (Escape), trigger the tour (T key), navigate to the "Read as list" link
  and activate it, use the contact links.
- **SR text fallback pass:** navigate to `/v2` with VoiceOver (macOS) or NVDA (Windows).
  Confirm the "Read as list" link is announced and activating it renders all content as a
  navigable document. Confirm the canvas is labelled (`role="application"` with an
  `aria-label` describing what it is).
- **Reduced motion pass:** enable "Reduce Motion" in OS settings, reload. Confirm all
  interactions work without animation. No layout shifts caused by snapped transitions.
- **Touch pass:** Chrome DevTools device emulation at 375px. Confirm pan/zoom/tap-expand/
  wire-interaction all work.

### Done criteria for Phase 3 (minimum shippable product)

- Real GitHub signals populate repo-backed project nodes.
- Static verified-outcome chips appear for non-repo nodes (never fake).
- `Math.random` grep: zero results in components/pipeline/ and lib/pipeline/.
- GitHub token confirmed absent from client bundle (inspect built JS; grep for the token prefix).
- Lighthouse mobile LCP < 2.5s, CLS < 0.05, TBT < 200ms.
- All a11y checks above pass.
- `tsc --noEmit` and `pnpm lint` clean.

---

## Phase 4: Agent operator (optional, gated)

**Goal:** the agent node runs a live AI-powered guided tour that answers "show me your
automation work" and navigates to the relevant nodes. Strictly additive; the core ships
without it.
**Milestone check:** clicking "Run tour" on the agent node sends a prompt to the server-side
route, receives a tour script, and the camera follows the script. The AI key is confirmed
absent from the client bundle.

### Files to create

```
app/api/agent/route.ts
  - Next.js Route Handler (server-side)
  - Reads AI_GATEWAY_KEY from process.env
  - Uses the Vercel AI SDK with the AI Gateway ("provider/model" string, not a vendor SDK)
  - Accepts a POST body: { userPrompt: string }
  - Returns a streaming or JSON response: { steps: TourStep[] }
    where TourStep = { nodeId: string, narration: string }
  - The system prompt instructs the model to select relevant nodes from the node list and
    produce a narration per step, formatted as the TourStep JSON array

components/pipeline/tour/use-tour.ts (extended)
  - When tourMode === "agent": call /api/agent with the user's optional prompt
  - Parse the response into TourStep[] and run the same tour choreography
  - The static tour (tourMode === "static") still works and is the default
  - The agent tour is gated: if AI_GATEWAY_KEY is not set (e.g. in preview deploys),
    fall back to the static tour gracefully
```

---

## Ship

One commit on the main branch. Reversible by revert.

```bash
# In app/page.tsx (the only file outside new dirs touched at ship time):
# Change: renders <RiazOS />
# To: redirect to /v2 or render <PipelineCanvas /> directly

# Move RiazOS to /os:
# Create app/os/page.tsx that renders what app/page.tsx used to render
# Update app/page.tsx to be the pipeline entry point
```

### Pre-ship checklist

- [ ] `/v2` smoke test: all nodes visible, wire interaction works, tour plays, contact links work.
- [ ] `/` (new pipeline): smoke test same as above.
- [ ] `/os` (RiazOS moved here): boot sequence plays, desktop opens, terminal works.
- [ ] Confirm revert path: `git revert HEAD` restores `/` to RiazOS instantly.
- [ ] No `Math.random` in components/pipeline/ or lib/pipeline/.
- [ ] No API keys or secrets in client bundle.
- [ ] `tsc --noEmit` and `pnpm lint` clean.
- [ ] Lighthouse mobile perf budget met.
- [ ] A11y checks passed.

---

## File structure summary

```
app/
  (pipeline)/
    v2/
      page.tsx                    # route entry, dynamic imports canvas
  api/
    github/
      route.ts                    # server-side GitHub proxy
    agent/
      route.ts                    # (Phase 4) server-side AI operator
  os/
    page.tsx                      # (Ship) RiazOS moved here
  page.tsx                        # (Ship) swapped to pipeline

components/pipeline/
  pipeline-canvas.tsx             # <ReactFlow> host
  canvas-noise.tsx                # SVG noise overlay
  canvas-spotlight.tsx            # ambient radial-gradient
  nodes/
    trigger-node.tsx
    project-node.tsx
    skill-node.tsx
    agent-node.tsx
    contact-node.tsx
  edges/
    flow-edge.tsx                 # custom edge: gradient + packet
  tour/
    use-tour.ts                   # camera choreography + tour state
    tour-narration.tsx            # floating narration card
  hooks/
    use-github-signals.ts         # client hook -> /api/github

lib/pipeline/
  types.ts                        # all types
  graph.ts                        # node + edge definitions
  projects.ts                     # project content data

.env.example                      # GITHUB_TOKEN, AI_GATEWAY_KEY placeholders
```

---

## What is deliberately excluded

- No new global state library. React Flow state + one context is sufficient.
- No CMS. Project content is typed data in `lib/pipeline/projects.ts`.
- No Three.js or WebGL. Guardrail enforced by design.
- No rebuild or refactor of RiazOS. It is frozen.
- No vendor names in client-facing copy (confirmed in content checklist).
- No fake data. Enforced by `Math.random` grep gate at each sprint.
