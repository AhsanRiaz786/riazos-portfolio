---
reference: n8n
url: https://n8n.io
researched: 2026-06-09
colors:
  canvas-background: "#1a1b26 (approx, dark navy-charcoal)"
  canvas-grid-dot: "rgba(255,255,255,0.07) (approx)"
  node-surface: "#242531 (approx, dark card)"
  node-border: "rgba(255,255,255,0.08) (approx, 1px subtle)"
  trigger-accent: "#F97316 (approx, orange, used as left-edge category stripe)"
  success-green: "#22C55E (approx)"
  error-red: "#EF4444 (approx)"
  running-orange: "#F97316 (approx, spinner)"
  edge-default: "rgba(255,255,255,0.25) (approx, subtle bezier line)"
  edge-active: "#F97316 (approx, orange when executing)"
  text-primary: "#E5E7EB (approx, off-white)"
  text-secondary: "#9CA3AF (approx, muted gray)"
typography:
  ui-font: "Inter (confirmed)"
  node-title: "Inter 500, ~13-14px"
  node-subtitle: "Inter 400, ~11-12px, muted"
  sidebar-labels: "Inter 400, ~12px"
rounded:
  node: "12px (approx, clearly in rounded-xl range)"
  handle: "50% (circles)"
  button: "6px (approx)"
spacing:
  node-padding: "12px (approx)"
  handle-size: "10-12px diameter (approx)"
  node-icon-area: "28x28px (approx, left zone of node)"
components:
  trigger-node: "rounded rect, orange left-edge accent stripe, trigger icon, title, optional subtitle, output handle right"
  action-node: "rounded rect, integration-colored left-edge stripe, service icon, title, input handle left + output handle right"
  handle: "small filled circle, brand color on hover, left/right edges of node"
  edge: "bezier curve, semi-transparent default, animated orange when executing, arrowhead at target"
  canvas: "infinite, dark background, subtle dot grid, pan+zoom, minimap bottom-right"
  execution-badge: "small pill overlaid on node: green check+count (success), orange spinner (running), red X+count (error)"
---

## Node anatomy

n8n nodes are rounded rectangles (approx 12px radius). Each node has three zones:

1. **Icon zone (left):** a square region (~28x28px) with the integration icon set on a colored
   background tile. The tile color is the node's category color and the primary visual identity
   signal. Trigger nodes: orange. Integration nodes: the service's brand color.

2. **Content zone:** node title in Inter 500 at ~13-14px, optional subtitle in smaller muted text.

3. **Handle zone:** small filled circles at the left edge (input) and right edge (output).
   Handles are ~10-12px diameter. On hover they grow slightly and glow with brand color. You drag
   FROM output (right) TO input (left) to connect.

The node card has a dark surface (~#242531), a very subtle 1px border (rgba white ~8%), and a
minimal drop shadow. Selected nodes get a more visible border/outline.

## Edge and connection treatment

Edges are bezier curves. Default: semi-transparent white/gray stroke, 1-2px. During execution,
the active edge turns orange with an animated dash/flow (moving dashed stroke or a traveling dot).
Arrowheads at the target end indicate direction. S-curve bezier control handles create smooth
curves between horizontally offset nodes.

## Canvas and navigation

Dark navy-charcoal background (~#1a1b26). Subtle dot grid at very low opacity for spatial
reference; dots disappear at low zoom. Pan: click-drag on empty canvas. Zoom: scroll or pinch.
Minimap in the bottom-right corner. Compact floating controls bar also bottom-right.

## Execution states: the signal vocabulary

The most directly reusable section for the portfolio. n8n uses overlay badges for node state:

- **Idle/not yet run:** no badge. Node looks normal.
- **Running:** orange circular spinner overlaid on the node. Connecting edge pulses orange.
- **Success:** small green pill with checkmark and item count.
- **Error:** red pill with X and error count.
- **Skipped/disabled:** node dimmed/greyed out.

Transition from running to success/error is immediate (no long animation). The colored edge
animation is the "in-flight" signal; the badge is the "settled" signal. This snappy feedback
is the key feel to replicate.

## Color system

n8n does not publish public design tokens (the old design-system repo was archived 2021). All
values above are approximated from visual inspection. The dominant language:
**dark background + minimal contrast surfaces + orange as the single high-energy accent +
green/red for semantic state + muted everything else.**

This restraint is the lesson: orange executing-state and green success-state are immediately
legible because everything else is quiet.

## What is reusable for the pipeline portfolio

1. **Category-color left-stripe per node:** instant visual identity without making the canvas noisy.
2. **Execution state badge vocabulary:** running (spinner) / success (green check) / error (red X).
   Use this exact vocabulary for project node states.
3. **Hot-accent-only-when-active:** edges and handles muted at rest, lit up (brand green or pink)
   only when data is flowing.
4. **Bezier edges with directional arrowheads:** the S-curve bezier is the canonical "connection"
   language. React Flow's default bezier edge type covers this.
5. **Dot grid on dark canvas:** `<Background variant="dots" />` in React Flow, low opacity.
