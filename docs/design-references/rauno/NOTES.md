---
reference: rauno
url: https://rauno.me
researched: 2026-06-09
colors:
  site-background: "#FFFFFF (light, minimal)"
  text: "#000000 / #111111"
  accent: "none (no color accent on rauno.me; entirely neutral)"
typography:
  font-family: "system-ui / -apple-system stack (approx, maximally native)"
  body: "16-17px, 400, generous line-height ~1.7"
  heading: "same scale as body, 500-600, no dramatic size jumps"
  overall: "Radical restraint. Typography does not call attention to itself."
rounded: "not a notable design element on rauno.me"
spacing:
  page-max-width: "~640-680px (approx, single column, text-only)"
  vertical-rhythm: "generous, ~2-2.5rem between sections"
motion:
  philosophy: "Motion communicates spatial relationships and causality. Present and responsive but not performative."
  micro: "100-200ms (immediate; button presses, hover responses)"
  transitions: "300-500ms (larger state changes)"
  easing: "spring-like or ease-out preferred; avoid linear (mechanical) and ease-in (sluggish start)"
  reduced-motion: "A fundamental requirement, not an edge case"
principles:
  - metaphors
  - interruptability
  - kinetic-physics
  - lightweight-vs-destructive
  - responsive-gestures
  - spatial-consistency
  - frequency-and-novelty
  - fidgetability
  - fitts-law
  - implicit-input
---

## Named interaction-design principles

From Rauno's essay "Invisible Details of Interaction Design" at rauno.me/craft/interaction-design.
All 13 principles below are drawn directly from that source (confirmed via fetch).

**1. Metaphors**
Great interactions borrow from real-world physical precedents we already know. Horizontal swipes
feel natural because books work that way. The "wire it yourself" interaction should borrow from
the physical act of plugging a cable: grab the end (output handle), drag to a port (input handle),
and the connection clicks. The metaphor is already implicit in n8n/LangGraph; lean into it fully.

**2. Interruptability**
Every in-progress action must be cancellable mid-gesture. Animations that force completion feel
unnatural. Real-world metaphor: "flipping a page in a book is interruptible." For the portfolio:
if a user starts dragging an edge but releases without connecting, the provisional edge disappears
cleanly. On `onConnectEnd` without a target node: remove provisional edge, no residual.

**3. Kinetic physics**
Gestures retain "momentum and angle at which they were thrown." Movement should not be "perfectly
centered or consistent in timing." Deceleration and slight overshoot feel physical; constant
velocity (linear) feels mechanical. Packet travel: ease-in-out. Camera pan during tour: spring
with slight overshoot and settle.

**4. Lightweight vs. destructive action thresholds**
Lightweight overlays/actions trigger progressively, "during the swipe after an arbitrary amount
of distance." Destructive actions require explicit gesture completion. In the portfolio: all
interactions are lightweight (wire, expand, tour). No destructive actions. The wire should
start responding as soon as drag begins (not after a threshold).

**5. Responsive gestures (immediate feedback)**
"The scale delta applying immediately" before animation thresholds is the difference between
an interface that feels responsive and one that feels broken. Applied directly: the provisional
edge should appear and follow the cursor from the very first pixel of drag, not after some
threshold distance is exceeded. Zero delay from drag-start to visual response.

**6. Spatial consistency**
"Apps launched from icons...animate from the icon" to establish spatial relationship. Motion
direction communicates location. Packets must travel FROM source TO destination along the actual
edge path. Camera pans during the tour must move TOWARD the next node in the graph's spatial
layout (pan right if the next node is to the right). Motion that contradicts spatial layout
is disorienting.

**7. Frequency and novelty**
"High-frequency interactions...shouldn't have elaborate animations." Command menus used "hundreds
of times a day" appear instantly; only the selected item "briefly blinks." Applied: the first
wire is the most animated and celebratory. If the user wires subsequent edges, animations may
be proportionally shorter. The tour can be fast-forwarded; it should not lock the user in.

**8. Fidgetability**
Some interfaces "reward casual interaction." The idle packet looping at the trigger node's output
handle is a low-cost fidget affordance. It invites interaction without demanding it. One gentle
loop is enough; do not over-animate the idle state.

**9. Touch content visibility (Fitts's Law, adjacent)**
When fingers occlude content, show a representation above the touch point (iOS keyboard key
enlargement). For the portfolio: on touch devices, when a handle is being dragged, show a large
visual indicator of what is being dragged above the touch point so the user's finger does not
block the important visual feedback.

**10. Fitts's Law**
"Target size and distance determine interaction speed." On touch, targets must be at least 44x44px
(Apple HIG). The visual handle (10-12px dot) is not the touch target. Use invisible padding
(::after or a wrapper element) to expand the touch target. On desktop, handles expand on hover.

**11. Scroll window focus / implicit input**
Interfaces should infer intent from context. If a user hovers Track A nodes, the Automation skill
cluster should softly highlight. No explicit mode switch required. Infer from proximity.

**12. Precision via pinch (canvas-specific)**
Pinching to zoom requires two fingers close together establishing an anchor point. The anchor
point should be stable: the content under the pinch center should not move as zoom changes.
React Flow handles this natively; confirm its pinch-zoom anchor behavior is correct.

**13. Robustness (from Rauno's broader work)**
"Most interactions are brittle and fail under real-world stress." If the wire interaction only
works 80% of the time (e.g. fails on slow connections, at certain zoom levels, on certain
browsers), the perception of quality breaks entirely. Test edge cases: extremely zoomed in, on a
slow device, with many nodes loaded, on touch vs mouse.

## Motion specifics

Rauno's essay gives principles, not numerical values. Mapping to implementation:

| Interaction | Duration | Easing | Basis |
|---|---|---|---|
| Handle hover glow | 100ms | ease-out | Micro, immediate |
| Edge draw (drag) | real-time | follows cursor | Responsive gesture |
| Edge animate-in on connect | 200-300ms | ease-out | Fast, satisfying |
| Packet travel along edge | 600-900ms | ease-in-out | Kinetic physics |
| Node idle -> running (instant) | 0ms | N/A | Responsive gesture |
| Node running -> success | 150ms | ease-out | Fast settle |
| Node expand/collapse | 250-350ms | spring (slight overshoot) | Physical, not mechanical |
| Camera pan during tour | 500-800ms | ease-in-out or spring | Spatial, not teleport |
| Reduced motion: all | 0ms | N/A | Snap to end state |

Note: duration values are derived from Rauno's philosophy + standard motion guidelines, not
directly quoted from the essay. Mark as (approx) in implementation comments.

## Affordances for draggable/interactive elements

Affordances must be present at rest (not only on hover) because mobile users have no hover state.

For the output handle (primary interactive element):
- **At rest:** visually distinct (larger, pulsing/glowing), clearly different from input handles.
- **On hover:** grows and brightens further.
- **First visit:** persistent hint label "drag to connect" visible in the canvas (not a tooltip).
  After the first connection is made, the hint disappears.
- **On touch:** hint is a persistent label, not a hover tooltip.

For project node cards:
- Expandable nodes show a subtle "click to expand" indicator visible at rest (not hidden until hover).
- After first expansion, the indicator disappears (mechanic learned).

## Typography and restraint on rauno.me

Rauno's own site is radically minimal: single column, ~640px max-width, system fonts, no
decorative elements, no hero images, no scroll animations. The content is the experience.
His restraint principle: "if you can remove it and the experience still works, remove it."

Takeaway: the node graph should be the whole experience. The chrome (controls, legend, footer
links) should be invisible at rest and surface only when needed.

## What is reusable for the wire-it-yourself and packet-flow motion

1. **Interruptability:** clean cancel on dropped edge (no target connection).
2. **Immediate response:** provisional edge follows cursor from drag pixel zero.
3. **Spatial consistency:** packets travel physically along the edge SVG path.
4. **Kinetic physics:** ease-in-out on packet travel; spring on node expand.
5. **Frequency calibration:** first wire most animated; subsequent wires snappier.
6. **44px minimum touch targets** on all handles and interactive elements.
7. **Reduced motion as a first-class path:** deliberate static version, not a degraded fallback.
8. **Robustness:** test the wire interaction at edge cases before declaring it done.
