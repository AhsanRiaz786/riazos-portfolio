---
reference: langgraph
url: https://langchain-ai.github.io/langgraph/
researched: 2026-06-09
colors:
  brand-primary: "#1C64F2 (approx, LangChain blue)"
  brand-teal: "#0D9488 (approx, secondary)"
  node-surface: "#FFFFFF or #F9FAFB (approx, light card on Studio canvas)"
  node-border: "#E5E7EB (approx, 1px)"
  node-active-border: "#1C64F2 or #7C3AED (approx, pulsing on executing node)"
  start-node: "#22C55E background (approx, green)"
  end-node: "#6B7280 (approx, gray)"
  conditional-edge: "dashed, #9CA3AF (approx)"
  direct-edge: "solid, #6B7280 (approx)"
  studio-sidebar: "#111827 (approx, dark)"
  studio-canvas: "#F3F4F6 (approx, light gray)"
typography:
  marketing-font: "Inter (confirmed)"
  node-label: "Inter 500, ~12-13px"
  edge-label: "Inter 400, ~11px"
rounded:
  node: "8px (approx, less rounded than n8n)"
  start-end-node: "50% circle or full-pill"
spacing:
  node-min-width: "120px (approx)"
  node-padding: "8-12px (approx)"
components:
  start-node: "circle or pill, green fill, '__start__' label"
  end-node: "circle or pill, dark gray fill, '__end__' label"
  regular-node: "rounded rect, white/light card, dark label, input + output ports"
  direct-edge: "solid line with arrowhead, neutral gray"
  conditional-edge: "dashed line, same neutral gray, indicates routing decision"
  active-node: "pulsing/glowing border in brand blue or purple during execution"
  executed-node: "checkmark overlay or altered fill post-execution"
---

## Graph rendering model

LangGraph Studio renders a state machine graph: nodes are Python functions, edges are state
transitions. Compared to n8n, LangGraph graphs are more formal and compact (typically 5-20 nodes)
with denser conditional routing. The Studio interface has a dark sidebar (thread/run history,
state viewer) and a lighter canvas (the graph). The canvas is the focal point.

## Node types and visual signaling

Three visually distinct node types (confirmed from documentation and visual research):

1. **`__start__` node:** circle or rounded pill, green fill, positioned top-left. Immediately
   recognizable as the entry point. Distinct from all other nodes: no rectangular card.

2. **`__end__` node:** circle or pill, dark gray fill. The terminal state.

3. **Regular/agent/tool nodes:** rounded rectangles with white/light-gray card, 1px border,
   function name as label. Possibly different visual treatment for tool-call nodes.

During active runs: the executing node receives a pulsing border highlight (brand blue or purple
spectrum, confirmed). Already-executed nodes settle to a "done" state (slightly different fill or
a checkmark). Not-yet-reached nodes look identical to their default state.

## Edge treatment: solid vs conditional (key pattern)

This is the most directly reusable pattern from LangGraph:

- **Direct edges (unconditional):** solid lines with arrowhead at destination. "This always goes here."
- **Conditional edges (routing):** dashed lines. Multiple dashed lines fan out from one source node
  to several possible destinations, labeled with the condition name. "This goes somewhere depending."

The dashed-vs-solid convention communicates certainty vs. optionality using only stroke style,
with no color difference needed. Clean and immediately readable.

Edge labels (condition names) appear as small text at the midpoint of conditional edges.

## Execution and active-node highlighting

During execution: active node gets pulsing border (brand color). Traversed edges may briefly
darken or animate to show the path taken. The state panel in the sidebar updates in real time.
Time-travel debugging lets you step backward, with the graph showing state at each step.
This pattern confirms: the graph is the debugger, not just a diagram. The same applies to
the portfolio: the graph IS the portfolio, not a decoration on top of it.

## What is reusable for the pipeline portfolio

1. **Solid vs dashed edge convention:** use solid edges for the main pipeline flow (trigger ->
   project), dashed or dotted edges for optional connections (skill clusters -> projects, the
   tour path). Visual certainty map at a glance.
2. **START node as a distinct trigger shape:** the trigger node should feel visually different
   from project/skill nodes. Not just a bigger card but a different shape or more prominent
   treatment (larger glow, different border, prominent position).
3. **END node as semantic terminal:** the contact node is a deliberate exit, not just another card.
4. **Labeled mid-edge text:** labeling skill-to-project edges with the skill name at the midpoint
   is cleaner than a legend.
5. **Execution-state pulsing border:** the natural language for "executing right now." Apply to
   project nodes during the wire-it interaction and the guided tour.
