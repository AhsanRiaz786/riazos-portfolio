---
reference: tldraw-excalidraw
url: https://tldraw.com , https://excalidraw.com
researched: 2026-06-09
colors:
  tldraw-canvas-bg: "#FFFFFF (default light, fully customizable)"
  tldraw-grid-line: "rgba(0,0,0,0.07) (approx, very subtle cross-grid)"
  tldraw-selection-blue: "#2D7FF9 (approx, selection box + handles)"
  tldraw-handle: "#FFFFFF fill, #2D7FF9 stroke (corner selection handles)"
  excalidraw-canvas-bg: "#FFFFFF"
  excalidraw-selection: "#6965db (approx, purple)"
  shared-chrome: "white/near-white floating panels"
typography:
  tldraw-ui: "Geist or system-ui (approx), ~12-13px"
  excalidraw-ui: "system-ui, ~12-13px"
  excalidraw-canvas-text: "Virgil (hand-drawn cursive font, intentional)"
rounded:
  tldraw-toolbar: "8-10px (approx)"
  tldraw-selection-handle: "2px (small square nubs)"
  excalidraw-elements: "0 (sketchy, intentionally imprecise)"
spacing:
  toolbar-height: "40-48px (approx, floating bar)"
  handle-size: "8px (approx, small square selection handles)"
components:
  canvas: "infinite, pan via spacebar+drag or two-finger, zoom via ctrl+scroll or pinch"
  selection: "bounding box with 8 handles (4 corners + 4 midpoints), rotation handle above"
  arrow-binding: "arrows bind to shapes on hover; binding indicator at attachment point; moving a bound shape moves the arrow endpoint with it"
  toolbar: "horizontal floating bar, minimal: shapes, text, draw, eraser, select"
  minimap: "not present by default in tldraw; opt-in"
---

## Canvas feel (pan, zoom, grid)

Both tools provide an infinite canvas with no visual boundary. Pan: hold spacebar + drag, or
two-finger drag on trackpad/touch. Zoom: ctrl+scroll or pinch. The grid is off by default in
tldraw (enabling it shows a subtle cross-hatch). Excalidraw has an optional dot grid.

Core philosophy: **the canvas is the primary surface; chrome is an intrusion.** Toolbars are
minimal floating bars, not sidebars. The user is always looking at their work.

## Selection and handles

tldraw: selecting a shape shows a blue (#2D7FF9 approx) bounding box with 8 small square handles
(corners + edge midpoints) and a circular rotation handle above. Handles are ~8px, grow on hover.
Single click selects. Double-click enters text edit. ESC deselects. Tab cycles through shapes.
Arrow keys nudge 1px (shift+arrow for 10px).

Excalidraw: similar structure with purple selection (#6965db), handles slightly less polished
(intentional, matching the sketchy style).

## Drawing and binding arrows: the key interaction for "wire it yourself"

**tldraw arrow binding (confirmed from docs and codebase):**
When you draw an arrow, the endpoint snaps to a nearby shape when it enters the shape's
"binding zone" (a proximity margin around the shape). The shape highlights to indicate that
binding is possible. On release, the endpoint is bound: it stays attached when the shape moves.
A bound endpoint shows a small indicator at the attachment point.

The binding approach is proximity-based, not target-specific: you don't need to hit a small
handle exactly; the arrow snaps to the nearest eligible shape. This makes edge-drawing forgiving.

**React Flow's model (different):** explicit output and input handles at defined positions. You
wire handle to handle, not near-shape to near-shape. More structured, directional, appropriate
for the pipeline metaphor. The portfolio uses React Flow's model.

**Lesson for the portfolio's wire interaction:** borrow tldraw's forgiveness. Make the input
handle's snap zone large (20-30px radius around the handle, not just the 10px visual dot).
Show a binding indicator (glow + slight scale) on the target handle when the dragged edge is
near. This makes the interaction feel like tldraw-style "just drop it near there" rather than
demanding pixel-perfect precision.

## Chrome philosophy

From tldraw's design choices:
- **Minimal chrome by default.** Only necessary tools are visible; everything else is hidden.
- **Floating, not docked.** No sidebars eating canvas space.
- **Escape to deselect / Escape to close.** One consistent exit gesture.
- **No modals for common actions.** Style options appear as inline popovers.

Direct implication for the portfolio: floating minimap, floating "Read as list" a11y link,
floating "Run tour" button. Nothing docked. The node graph is the whole page.

## tldraw vs Excalidraw aesthetic

| Dimension | tldraw | Excalidraw |
|---|---|---|
| Line quality | Crisp, pixel-perfect | Intentionally rough/sketchy |
| Text in canvas | Clean system font | Virgil (hand-written cursive) |
| Overall feel | Polished product diagram | Thinking tool, brainstorm |
| Color palette | Clean primaries | Muted, slightly desaturated |

The portfolio targets **tldraw's aesthetic**: clean, crisp, precise. Not sketchy.

## Touch and mobile

Both tools are touch-native:
- One finger pan
- Two-finger pinch-to-zoom
- Tap to select
- Tap-and-hold for context menu

tldraw is designed for iOS/iPadOS with Apple Pencil as first-class. Touch is not an afterthought.
React Flow also supports touch pan/zoom natively. The portfolio must not repeat `window.tsx`'s
mouse-only mistake.

## What is reusable for the portfolio's wire interaction

1. **Large, obvious, grabbable output handle with a hover glow.** The first touchpoint.
2. **Proximity-based snapping on the target.** 20-30px snap zone around the input handle,
   not just the visual dot. Forgiveness on landing.
3. **Binding indicator on target while dragging.** Target input handle pulses/scales when
   the dragged edge is near. "You can drop here."
4. **Immediate visual feedback on connect.** Edge animates in the moment connection is made.
5. **Escape to cancel.** If user drags but does not connect, provisional edge disappears cleanly.
6. **Touch fallback:** if precise drag is hard on mobile, support tap-source-handle then
   tap-target-handle as a two-tap alternative.
