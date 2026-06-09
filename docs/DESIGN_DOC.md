---
version: alpha
name: pipeline-portfolio-design
description: |
  The Pipeline portfolio runs on a near-black canvas (~#0a0a0b), a dot grid at 6% white opacity,
  and a single hot accent -- brand green #00FF41 -- that appears only when data is moving. Nodes
  are dark charcoal cards (12px radius) with a track-color left-stripe (n8n pattern), elevated by
  a 3-layer box-shadow (Clerk pattern). Fira Code (already in codebase) serves as both the display
  face at 48-72px for the trigger headline and the data label face at 11-13px for metrics and chips.
  The portfolio has no new fonts and no WebGL. Depth comes entirely from radial-gradient spotlights,
  pseudo-element gradient borders, backdrop-blur panels, SVG noise texture, and CSS box-shadow.
  Every aesthetic choice traces to a named reference in docs/design-references/.

colors:
  page-bg: "#0a0a0b"
  canvas-bg: "#0e0e11"
  node-surface: "#141418"
  node-surface-elevated: "#1a1a1f"
  node-border: "rgba(255,255,255,0.07)"
  node-border-hover: "rgba(255,255,255,0.14)"
  accent-green: "#00FF41"
  accent-green-glow: "rgba(0,255,65,0.18)"
  accent-green-dim: "rgba(0,255,65,0.50)"
  accent-pink: "#FF00F7"
  accent-pink-glow: "rgba(255,0,247,0.18)"
  text-primary: "#E5E5E5"
  text-secondary: "#6B7280"
  text-muted: "rgba(229,229,229,0.45)"
  track-a-color: "#F97316"
  track-b-color: "#3B82F6"
  track-c-color: "#8B5CF6"
  edge-default: "rgba(255,255,255,0.10)"
  edge-active: "#00FF41"
  state-running-border: "rgba(0,255,65,0.70)"
  state-success-bg: "rgba(0,255,65,0.12)"
  state-success-text: "#00FF41"
  state-error-bg: "rgba(255,0,71,0.12)"
  state-error-text: "#FF2047"
  packet: "#00FF41"
  canvas-dot: "rgba(255,255,255,0.06)"
  noise-opacity: "0.025"
  spotlight-color: "rgba(0,255,65,0.06)"

typography:
  display:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "clamp(40px, 5vw, 68px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-1.5px"
  node-title:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.2px"
  node-subtitle:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
    color: "text-secondary"
  metric-chip:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.04em"
  status-chip:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  edge-label:
    fontFamily: "'Fira Code', 'Roboto Mono', monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0"

rounded:
  node: "12px"
  node-icon: "8px"
  chip: "9999px"
  button: "8px"
  detail-panel: "16px"
  handle: "50%"

spacing:
  node-padding: "12px 14px"
  node-icon-size: "28px"
  handle-visual: "10px"
  handle-touch-target: "44px"
  chip-padding: "3px 8px"
  node-min-width: "180px"
  node-max-width: "260px"
  detail-panel-width: "320px"
  section-gap: "80-120px"

motion:
  handle-hover: "100ms ease-out"
  edge-animate-in: "250ms ease-out"
  packet-travel: "700ms ease-in-out"
  node-idle-to-running: "0ms"
  node-running-to-success: "150ms ease-out"
  node-expand: "300ms cubic-bezier(0.34, 1.56, 0.64, 1)"
  camera-pan: "600ms cubic-bezier(0.4, 0, 0.2, 1)"
  stagger-initial-load: "50ms per node"
  scramble-metrics: "600ms total"
  reduced-motion: "0ms all (snap to end state)"
---

## Design philosophy

The pipeline portfolio makes one bet: **the medium is the message**. A portfolio that explains
automation workflows is rendered as an automation workflow. Every design decision must strengthen
that bet, not undermine it.

Three rules govern every choice:
1. **No decoration that does not carry meaning.** Packets only flow when data is actually flowing
   (real signals or real interactions). The dot grid exists to provide spatial reference, not
   decoration. The noise texture exists to add material depth to dark surfaces, not texture for
   its own sake. If it can be removed without losing meaning, it is removed.
2. **Every dynamic value traces to a real source.** No `Math.random`. No fake tickers. Follows
   from the PRD's real-signals policy and from Resend's design philosophy (cited below).
3. **CSS and SVG depth only.** No WebGL, no Three.js. Depth comes from radial-gradient spotlights,
   pseudo-element gradient borders, backdrop-blur panels, SVG noise, and layered box-shadow.
   This is the explicit guardrail set by the project brief, and it is the right constraint: it keeps
   the performance budget on mobile and guarantees the a11y floor is not broken by a canvas element.

---

## Color system

### Why these colors

**Canvas: #0e0e11**
Slightly lighter than the page background (#0a0a0b) so the canvas reads as a distinct surface.
Reference: Linear's near-black stack (#010102 to #141516) shows how 2-3% luminosity differences
create hierarchy without contrast breaks. The canvas is at Linear's surface-1 level.

**Node surface: #141418**
One level above the canvas. Nodes must feel lifted above the canvas, not painted on it. This is
the same strategy as Linear's #0f1011 card surface and Clerk's #111111. The 3-4% lift is
sufficient; more would break the visual relationship with the dark canvas.

**Accent green: #00FF41**
Pre-existing brand color from the Tailwind config. Retained as-is. This is the single hot accent
and it appears ONLY when data is moving: packet in flight, edge active, node executing, handle
hover. At rest, it is absent from the canvas entirely. This is the n8n lesson applied: the hot
orange (our green) means "this is executing right now." Any other usage dilutes the signal.

**Accent pink: #FF00F7**
Pre-existing secondary accent. Reserved for: the contact/output node (the terminus of the pipeline)
and error states. Using it at the end of the pipeline echoes Resend's accent-pair approach (two
semantic colors for two semantic roles: active execution and terminal/error).

**Track colors (orange #F97316, blue #3B82F6, purple #8B5CF6):**
Applied as left-stripe accents on project nodes, one color per track (AI/automation, Full-stack,
Scraping/data). Reference: n8n's category-color left-stripe pattern. These three are derived from
standard Tailwind 500 values, which fit naturally into the dark palette without needing adjustment.

**Text: #E5E5E5 primary, #6B7280 secondary**
From the existing Tailwind config. Consistent with Linear's #f7f8f8 / #8a8f98 hierarchy:
high-contrast primary text for node titles, muted secondary for subtitles and labels.

### Color usage rules

- **Brand green appears only when something is executing.** At rest: absent. On hover: handle only.
  On execute: edge, packet, node border.
- **Node surface and canvas must remain visually distinct.** Never set node-surface and canvas to
  the same value.
- **No color for decoration.** Track colors are semantic (they identify the track). They do not
  appear as gradients, glows, or background fills anywhere except their specific node stripe.
- **Status chip colors follow the n8n/Linear semantic vocabulary:** green = success, red = error,
  orange (approx #F97316) = running, gray = idle.

---

## Typography

### Why Fira Code for everything

Fira Code is already in the codebase at 300-700 weights. The awwwards/Godly research confirms
that monospace fonts used for data and metrics create "implicit technical credibility" -- the
numbers feel like they came from a terminal. For this portfolio, every number is real (95% JSS,
$7K+, last commit 2d ago), and rendering them in Fira Code reinforces that reality.

The risk of monospace-only is visual sameness. The solution, as identified in the awwwards
research, is **dramatic size contrast**: the trigger node headline at 40-68px feels completely
different from node title labels at 14px, which feel different from status chips at 10px. Same
typeface, three registers.

Reference: Resend uses Domaine Display as a serif display face for editorial weight, paired with
Inter for body. The pipeline portfolio uses Fira Code for both registers, justified because (a)
it is already present, (b) the monospace identity is the brand, and (c) the size contrast alone
achieves the needed hierarchy.

### Type scale

| Role | Size | Weight | Tracking | Where |
|---|---|---|---|---|
| Display (trigger headline) | clamp(40px, 5vw, 68px) | 600 | -1.5px | Trigger node name |
| Positioning line | clamp(14px, 1.4vw, 18px) | 400 | -0.3px | Trigger node sub |
| Node title | 14px | 500 | -0.2px | All project/skill nodes |
| Node subtitle | 11px | 400 | 0 | All project/skill nodes |
| Metric chip | 11px | 500 | +0.04em | Trigger node chips |
| Status chip | 10px | 400 | +0.08em uppercase | All node state chips |
| Edge label | 10px | 400 | 0 | Skill-to-project edges |
| Detail panel heading | 16px | 500 | -0.2px | Expanded project panel |
| Detail panel body | 13px | 400 | 0 | Expanded project panel |

Negative tracking at the display size follows the Linear (display-xl: -3px) and Stripe (display-xxl:
-1.4px) pattern: large monospaced characters at high weight need negative tracking or they read
as a digital ticker, not a headline.

---

## Node anatomy

### Trigger node (entry)

The trigger node is visually distinct from all other nodes. It is the START node in LangGraph
terms: a different shape or at minimum a different scale and ambient treatment. Its job is to
anchor the visitor's eye on landing.

Structure:
- **Shape:** wider card (280-340px), no left-stripe (it is the source, not a category).
- **Background:** node-surface (#141418) with an ambient green spotlight behind it
  (radial-gradient ellipse, #00FF41 at 6% opacity, ~500px diameter). The spotlight is on the
  canvas layer behind the node, not on the node itself.
- **Border:** 1px rgba(255,255,255,0.10) at rest; increases to 0.20 on hover.
- **Content:**
  - Eyebrow: `AI SYSTEMS ENGINEER` in status-chip style (10px, Fira Code 400, #6B7280, uppercase).
  - Headline: `Ahsan Riaz` in display type (clamp 40-68px, Fira Code 600, -1.5px tracking, #E5E5E5).
    The name scrambles in on first render (text-scramble effect, 600ms, reference: awwwards).
  - Positioning line: one sentence, 14-18px Fira Code 400.
  - Metric chips row: `95% Job Success` / `$7K+ earned` / `30+ projects shipped` / `100K+ records`.
    Each chip: Fira Code 500 11px, green text (#00FF41), dark green bg (rgba(0,255,65,0.10)),
    pill border-radius, 3px 8px padding. The metric values scramble in with the headline.
- **Output handle:** the key interactive element. Visually distinct: 14px diameter (not 10px),
  pulsing green glow animation (2s infinite ease-in-out), border-radius 50%. Touch target: 44x44px.
  A hint label "drag to connect" appears next to it on first load, disappears after first wire.
- **Box-shadow:** 0 1px 3px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 0 60px rgba(0,255,65,0.08).
  The third shadow is a faint green ambient glow specific to the trigger node.

### Project nodes (payload)

Project nodes are the visual payload. Three variants by track (track color left-stripe):

**Collapsed state (default):**
- Rounded rectangle, 12px radius, 180-260px wide.
- **Icon/stripe zone:** 6px wide left border in track color (not a full icon box). Subtle, not loud.
  Reference: n8n's category-color left-stripe but narrowed to a 6px stripe to keep the palette quiet.
- **Content:**
  - Status chip: top-right corner. `idle` / `running` / `success` in 10px Fira Code uppercase.
  - Title: 14px Fira Code 500, -0.2px tracking, #E5E5E5.
  - Subtitle: 11px Fira Code 400, #6B7280.
  - Stack chips row: 2-4 chips showing key tech (Fira Code 10px, dark surface, hairline border).
    For repo-backed nodes: a `live commits` chip in green. For outcome-based nodes: `shipped` or
    `open source` chip in the appropriate semantic color.
- **Handles:** input handle (left edge, 10px, rgba white 0.3 at rest, green on hover),
  output handle (right edge, same). Touch targets: 44x44px each.
- **Box-shadow:** 0 1px 2px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.25). No glow at rest.

**Executing state (on wire-connect or during tour):**
- Border changes to rgba(0,255,65,0.70) with a CSS animation (pulsing, 1.5s infinite).
  Reference: LangGraph Studio's pulsing border on the active node.
- Status chip flips to `running` (orange text, orange bg: derived from n8n's running state).
- Box-shadow gains a third layer: 0 0 20px rgba(0,255,65,0.15).
- Track-color stripe brightens (opacity increases from 0.8 to 1.0).

**Success state:**
- Border returns to normal (the pulse stops).
- Status chip: `success`, green text, green bg at 12% opacity.
- A brief (150ms) green flash on the node surface signals the state change.
- If the node expands on success (the signature interaction), the expansion begins here.

**Expanded state:**
- The node card expands downward (300ms spring animation, cubic-bezier(0.34, 1.56, 0.64, 1)).
  Reference: Rauno's spring/slight-overshoot principle for expand/collapse.
- Below the collapsed content, a detail section appears with a backdrop-blur surface
  (backdrop-filter: blur(16px), background rgba(14,14,17,0.85)):
  - Problem statement (1-2 lines).
  - What was built (2-3 lines).
  - Stack list.
  - Outcome metric (real number: R2 0.863, 100K+ records, etc.) in Fira Code 500 green.
  - Links: GitHub repo, live URL, "open source" badge.

### Skill cluster nodes

Skill clusters are smaller and less prominent than project nodes. Their role is to show
connectivity, not to demand attention.

- Shape: pill (border-radius 9999px), not a rectangle.
- Size: content-width + 12px padding, ~80-120px wide, ~28px tall.
- Background: rgba(255,255,255,0.04) (barely visible).
- Border: rgba(255,255,255,0.08), hairline.
- Label: Fira Code 11px 500, #6B7280 (muted).
- Handles: invisible at rest; small white dots appear on hover.
- At rest, skill nodes are nearly invisible -- they are the connective tissue, not the stars.
  When a track's project node is hovered or executing, the skill nodes wired to it increase their
  border and label opacity (from 0.08/0.45 to 0.20/0.80). This is the implicit-input principle
  from Rauno: highlight related nodes without requiring explicit interaction.

### Agent node (operator)

- Shape: hexagonal or distinctly different from rectangles (to signal it is a meta-node).
  If hexagons are complex in React Flow, use a square rotated 45 degrees (diamond) or a distinct
  oversized circular badge.
- Label: `OPERATOR` in eyebrow style, `Run tour` as the primary action button.
- Color: uses pink accent (#FF00F7) as its border, since it is not part of any project track.
- Position: wired to all tracks, positioned above-right in the graph.
- Behavior: clicking/tapping "Run tour" triggers the tour state in the context.

### Contact node (output/terminus)

- Shape: visually signals termination. Wider card (like trigger) but darker interior
  (rgba(255,0,247,0.04) pink ambient -- the pipeline ends in pink, it began in green).
- Label: `GET IN TOUCH` eyebrow, no headline (the links ARE the content).
- Links list: Email, GitHub, LinkedIn, Upwork, Resume. Each is a real link, icon + label in
  Fira Code 13px. No encryption theater.
- A thin pink border: rgba(255,0,247,0.30). On hover: rgba(255,0,247,0.60) + pink box-shadow glow.
- No handles beyond an input handle (it is the terminal node).

---

## Edge and connection treatment

### Two edge types (LangGraph pattern)

**Pipeline edges (solid):** trigger -> project, project -> contact. These are the execution path.
Solid bezier stroke, 1.5px. At rest: rgba(255,255,255,0.10). When executing: #00FF41, 2px,
with a green glow (filter: drop-shadow(0 0 4px rgba(0,255,65,0.6))).

**Capability edges (dashed):** skill cluster -> project. These show what skills power what work.
Dashed stroke, 1px, gap 6px, 1px. At rest: rgba(255,255,255,0.06). On hover of connected node:
rgba(255,255,255,0.15). Never animated (they are structural, not execution-path).

### Data packets

A packet is a small filled circle (6px diameter, color: #00FF41) animated along the edge path
using CSS `offset-path` and `offset-distance`. This is the Framer Motion `motionPath` approach
or a custom CSS animation on the SVG path element.

- Entry (at source handle): the circle appears with a scale from 0 to 1 (100ms).
- Travel: the circle follows the bezier path over 700ms, ease-in-out (kinetic physics per Rauno).
- Exit (at target handle): the circle scales down and disappears (100ms), triggering the target
  node's "running" state.
- At most 2 packets in flight at once on the same edge (prevents visual overload).
- Packets pause when the tab is hidden (visibilitychange listener).
- Reduced motion: packets do not animate; they teleport to the destination in 0ms.

The idle packet on the trigger node (before the first wire): a single packet loops gently
back and forth 1-2px from the output handle every 3s. This is the "fidgetability" affordance
from Rauno: something is alive, come interact with it.

---

## Canvas and background

### Layers (back to front)

1. **Page background:** #0a0a0b. Full viewport. Static.
2. **Noise texture:** SVG feTurbulence inline element, fixed position, full viewport, opacity 0.025.
   Reference: awwwards research confirms 2-3% noise is required on dark surfaces for material depth.
   ```jsx
   <svg style={{position:'fixed',inset:0,opacity:0.025,pointerEvents:'none',zIndex:0}}>
     <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3"/></filter>
     <rect width="100%" height="100%" filter="url(#noise)"/>
   </svg>
   ```
3. **Canvas background:** #0e0e11. The React Flow canvas surface.
4. **Dot grid:** `<Background variant="dots" color="rgba(255,255,255,0.06)" gap={24} size={1} />`
   React Flow built-in. Reference: n8n's dot grid on dark canvas. Provides spatial reference,
   disappears at very low zoom.
5. **Ambient spotlight:** a radial-gradient div positioned behind the trigger node, updated with
   the node's position on the canvas. `radial-gradient(ellipse 600px 400px at [node-center-x]
   [node-center-y], rgba(0,255,65,0.06), transparent)`. This is the Clerk ambient-spotlight
   technique applied to the canvas layer.
6. **React Flow node/edge layer:** the actual graph.
7. **UI chrome layer:** minimap (bottom-right), controls (bottom-right), "Read as list" link
   (top-right), tour state indicator.
8. **Detail panel layer:** the expanded project detail slides in over the canvas with
   backdrop-blur (z-index above the graph, but below the minimap controls).

### Canvas chrome (floating, minimal, tldraw-inspired)

Reference: tldraw's philosophy: **floating, not docked; minimal chrome; the canvas is the surface.**

- **Minimap:** React Flow `<MiniMap>` component, bottom-right, dark styling (background: #0a0a0b,
  node fill: rgba(255,255,255,0.15), mask color: rgba(0,0,0,0.8)). Small, 160x100px.
- **Controls:** React Flow `<Controls>` component, bottom-right above the minimap, dark styled.
- **"Read as list" a11y link:** top-right, small Fira Code 11px, rgba white 0.4, becomes 0.8
  on hover. Opens the screen-reader text fallback (a rendered semantic document of the same content).
- **"Run tour" button:** attached to or near the agent node on the canvas. Also accessible as a
  keyboard shortcut (T key).
- Nothing else. No header, no sidebar, no footer while in the graph view.

---

## CSS-only depth toolkit

All four Clerk depth techniques adapted for the pipeline palette:

**1. Ambient spotlight (canvas layer, behind trigger node)**
As described in the canvas layers above. The single most impactful depth technique. Creates the
feeling that the trigger node is "lit from the canvas."

**2. Pseudo-element gradient border (on project nodes, active on hover + execute)**
```css
.project-node {
  position: relative;
  background: #141418;
  border-radius: 12px;
}
.project-node::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: linear-gradient(135deg, rgba(0,255,65,0.0), rgba(0,255,65,0.0));
  transition: background 150ms ease-out;
  z-index: -1;
}
.project-node:hover::before {
  background: linear-gradient(135deg, rgba(0,255,65,0.4), rgba(0,255,65,0.1), transparent);
}
.project-node.executing::before {
  background: linear-gradient(135deg, rgba(0,255,65,0.8), rgba(0,255,65,0.3), transparent);
  animation: executing-pulse 1.5s ease-in-out infinite;
}
```

**3. 3-layer box-shadow for node elevation**
Default node: `0 1px 2px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.25)`.
Trigger node: `0 1px 2px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4), 0 0 60px rgba(0,255,65,0.08)`.
Executing node: `0 1px 2px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4), 0 0 24px rgba(0,255,65,0.20)`.

**4. Backdrop-blur for the detail expansion panel**
```css
.detail-panel {
  backdrop-filter: blur(16px);
  background: rgba(14, 14, 17, 0.85);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
}
```

---

## Motion system

All values derived from Rauno's principles (docs/design-references/rauno/NOTES.md), mapped to
specific durations based on interaction type:

| Interaction | Duration | Easing | Principle source |
|---|---|---|---|
| Handle hover glow on/off | 100ms | ease-out | Rauno: micro, immediate |
| Provisional edge follows cursor | real-time | N/A (follows cursor) | Rauno: responsive gestures |
| Edge animate-in on connect | 250ms | ease-out | Fast, satisfying, not showy |
| Edge connect cancel (disappear) | 150ms | ease-in | Rauno: interruptability |
| Packet travel along edge | 700ms | ease-in-out | Rauno: kinetic physics |
| Node idle to running | 0ms | N/A | Rauno: immediate feedback |
| Node running to success | 150ms | ease-out | Fast settle, not delayed |
| Node expand/collapse | 300ms | cubic-bezier(0.34,1.56,0.64,1) | Rauno: spring/slight overshoot |
| Camera pan during tour | 600ms | cubic-bezier(0.4,0,0.2,1) | Rauno: spatial, not teleport |
| Skill cluster highlight (on adjacent node hover) | 200ms | ease-out | Rauno: implicit input |
| Initial load stagger (per node) | 50ms | ease-out | Awwwards: stagger reveals |
| Text scramble (metrics) | 600ms total | step-based | Awwwards: text scramble |
| Idle packet loop at trigger | 3s cycle | ease-in-out | Rauno: fidgetability |

**Reduced motion (prefers-reduced-motion: reduce):**
All durations become 0ms. Animations and transitions are instant. Packets do not travel; nodes
flip state immediately. Camera does not pan; it cuts. The tour still works: it just jumps.
This is Rauno's requirement: "a fundamental requirement, not an edge case."

**Frequency calibration (Rauno: frequency and novelty):**
- First wire: full 700ms packet travel.
- Second wire in the same session: 500ms packet travel.
- Third+: 400ms packet travel.
- Tour packets: 400ms (the user already understands the mechanic).

---

## Initial load sequence (the graph builds itself)

Reference: awwwards stagger pattern.

1. **0ms:** canvas appears (background, dot grid, noise texture). No nodes yet.
2. **100ms:** trigger node fades in (opacity 0->1, translateY 8->0, 300ms ease-out).
   Metrics begin scrambling in.
3. **200ms:** Track A project nodes stagger in from left (50ms apart, opacity + translateY).
4. **300ms:** Track B project nodes stagger in.
5. **350ms:** Track C project nodes stagger in.
6. **450ms:** Skill cluster nodes fade in (lower opacity animation, 200ms).
7. **500ms:** Edges draw in (SVG path length animation, 300ms each, slight stagger).
8. **600ms:** Agent node and contact node appear.
9. **700ms:** The first idle packet begins its loop at the trigger node output handle.
   The "drag to connect" hint appears with a fade.
10. **Scramble completes ~800ms.** The page is fully alive.

Total time to "fully alive" state: ~1000ms on a fast device. The key frames (trigger node visible
with readable headline) are at 300ms -- well within LCP budget.

---

## The screenshot moment

The target shareable frame, as identified in the awwwards research:

**Trigger node:** headline + scrambled-in metric chips visible. Green ambient spotlight behind it.
**One packet in flight:** green dot traveling along a glowing solid edge from trigger to a project node.
**One project node:** pulsing green border (executing state). Status chip showing "running."
**One skill cluster:** border and label at full opacity (the implicit-input highlight is active
because its connected project node is executing).
**Contact node:** visible in the far right of the canvas.

This frame occurs naturally at the peak of the signature wire-it interaction, approximately
300-500ms after the first successful edge connection. It requires no staging. It is the natural
visual state when the packet is mid-travel.

Design gate: before shipping Phase 2, screenshot the canvas in this state and confirm it looks
shareable. If the scene reads as confusing or flat, adjust packet size, edge glow intensity, or
node pulse strength before shipping.

---

## Accessibility floor (design-level decisions)

The a11y floor is a PRD requirement. Design-level decisions:

- **Color is never the only signal.** Status chips have text + color (never color alone). The
  "running" state has both the border-pulse AND the "running" text chip.
- **Focus ring:** 2px solid #00FF41 with a 2px offset. Visible on all focused nodes, handles,
  and buttons. Does not break the dark theme.
- **Keyboard wireframe:** the graph has two modes: Explore (default, Tab/arrow keys navigate
  nodes, Enter expands) and Connect (activated by pressing Enter on an output handle, arrow keys
  select the target, Enter completes the wire). Escape returns to Explore mode from Connect mode.
- **Screen-reader text fallback:** a `<section aria-label="Portfolio as a list">` sibling element
  to the canvas, visually hidden but accessible, that renders all node content as a semantic
  document (headings, lists, links). A visible "Read as list" link in the chrome surfaces it.
- **Touch minimum sizes:** 44x44px for all interactive elements (Rauno: Fitts's Law). Handles
  use invisible padding wrappers, not CSS transforms, to ensure the hit target matches the HIG.

---

## What is explicitly not in this design

- No Three.js, no WebGL, no canvas-element visual effects. (Brief guardrail + performance.)
- No animations on scroll (there is no traditional scroll in the graph view).
- No custom cursor (desktop-only; excluded because the touch-first requirement conflicts with it,
  and the interaction is already novel enough without a custom cursor adding noise).
- No sidebar or header (tldraw philosophy: chrome is an intrusion).
- No color for decoration. Every color usage has a semantic role.
- No fake signals. The design does not create space for `Math.random` data.

---

## Reference index

Every aesthetic choice in this document traces to one of these sources:

| Reference | Contribution |
|---|---|
| n8n (docs/design-references/n8n/NOTES.md) | Node anatomy, left-stripe category color, execution state badge vocabulary, dot-grid canvas, hot-accent-only-when-active principle |
| LangGraph (docs/design-references/langgraph/NOTES.md) | Solid vs dashed edge convention, START/END node distinction, executing-node pulsing border, graph-as-debugger philosophy |
| tldraw/Excalidraw (docs/design-references/tldraw-excalidraw/NOTES.md) | Arrow-binding proximity/forgiveness, floating chrome philosophy, touch-first canon, Escape-to-cancel, minimal chrome |
| Clerk (docs/design-references/clerk/NOTES.md) | Ambient radial-gradient spotlight, pseudo-element gradient border, 3-layer box-shadow, backdrop-blur panels, "wake-up" hover transition |
| Rauno (docs/design-references/rauno/NOTES.md) | Full motion system: interruptability, immediate feedback, kinetic physics, spatial consistency, spring expand, frequency calibration, Fitts's law, reduced-motion first class |
| Awwwards/Godly/Cosmos (docs/design-references/awwwards-godly-cosmos/NOTES.md) | Grain noise texture, monospace for data metrics, bento-style node hierarchy, text scramble on headline metrics, stagger initial load, the screenshot-moment concept |
| Linear (docs/design-references/linear/DESIGN-linear.app.md) | Near-black palette hierarchy (multiple surface levels), hairline borders, single chromatic accent philosophy |
| Resend (docs/design-references/resend/DESIGN-resend.md) | Accent-pair semantic roles (green = active, pink = terminus/error), near-pure-black canvas, accent-glow values |
| Stripe (docs/design-references/stripe/DESIGN-stripe.md) | Negative letter-spacing at display sizes, tabular/monospaced metrics treatment |
| Vercel (docs/design-references/vercel/DESIGN-vercel.md) | Geist-family type treatment (reference for Fira Code substitution), gradient-pair semantic roles |
