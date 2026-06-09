---
reference: clerk
url: https://clerk.com
researched: 2026-06-09
colors:
  page-background: "#0A0A0A (approx, near-black)"
  surface-card: "#111111 to #141414 (approx, 1 step above page-bg)"
  surface-elevated: "#1a1a1a (approx, modals/dropdowns)"
  border-subtle: "rgba(255,255,255,0.06-0.10) (approx, 1px, barely visible)"
  border-glow: "brand-color at 0.25-0.40 opacity on hover/focus"
  brand-violet: "#7C3AED (approx, primary accent)"
  brand-violet-light: "#A78BFA (approx)"
  gradient-mesh-1: "#7C3AED to #2563EB (approx, violet to blue)"
  gradient-mesh-2: "#EC4899 to #7C3AED (approx, pink to violet)"
  text-primary: "#FAFAFA (approx)"
  text-secondary: "#A1A1AA (approx, muted)"
typography:
  font-family: "Geist (confirmed, Vercel/Clerk design system font)"
  hero-size: "clamp(48px, 6vw, 80px) (approx)"
  hero-weight: "600-700"
  body: "16px, 400, line-height 1.6"
  label: "12-13px, 500, letter-spacing 0.02em"
  code: "Geist Mono"
rounded:
  card: "12-16px (approx, prominently rounded)"
  button: "8px (approx)"
  badge: "9999px (full pill)"
  input: "8px (approx)"
spacing:
  section-vertical: "96-120px (approx)"
  card-padding: "24-32px (approx)"
components:
  gradient-border-card: "pseudo-element with conic/linear gradient, masked to show only 1px border"
  ambient-spotlight: "radial-gradient ellipse at top, brand-color 0.12 opacity, transparent"
  glassmorphism-modal: "backdrop-filter blur(20px), semi-transparent dark surface, gradient border"
  cta-button-primary: "gradient fill (violet to blue), glow box-shadow, no stroke border"
  cta-button-outline: "transparent fill, 1px gradient border, brand-color text"
  feature-card: "dark surface, 1px border, hover: border brightens + soft brand glow"
---

## Dark-theme palette

Clerk's marketing site is one of the most polished dark-theme implementations in the
developer-tools space. Page background near-black (~#0A0A0A). Surfaces at 2-3 steps of
elevation, all in the #111-#1a1a1a range. The contrast between levels is deliberately minimal
(3-5% lighter per level) so depth reads as subtle hierarchy, not jarring contrast.

Brand accent is violet (~#7C3AED), appearing as: gradient fills on CTAs, ambient radial spotlights
behind hero content, gradient border accents on featured cards, glow on hover states. Everything
else is neutral (black + white + zinc/slate scale).

## Depth toolkit (the CSS-only depth system)

**1. Ambient spotlight radial gradient**
A large (400-600px wide) radial gradient in brand color at 8-15% opacity behind key content
creates a sense that the content is softly illuminated, not sitting on a flat surface.
```css
background: radial-gradient(ellipse 600px 400px at 50% 0%, rgba(124,58,237,0.15), transparent);
```

**2. Gradient border via pseudo-element (confirmed technique)**
Cards with glowing borders use a pseudo-element with a gradient background padded to show through
the transparent border, creating a 1px gradient border without native CSS gradient-border support:
```css
.card {
  position: relative;
  background: #111;
  border-radius: 14px;
}
.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(124,58,237,0.6), rgba(37,99,235,0.3), transparent);
  z-index: -1;
}
```
On hover: gradient opacity increases from ~0.2 to ~0.6 (150ms transition).

**3. Layered box-shadow for elevation**
2-3 shadow layers rather than a single drop shadow:
- Tight ground-plane edge: `0 1px 2px rgba(0,0,0,0.4)`
- Medium diffuse lift: `0 8px 32px rgba(0,0,0,0.3)`
- Optional brand glow: `0 0 40px rgba(124,58,237,0.12)`

**4. Backdrop-blur for modals and dropdowns**
`backdrop-filter: blur(20px)` with semi-transparent dark background creates glassmorphism.
The blurred content behind makes the overlay feel physically elevated.

**5. Noise/grain texture**
A very subtle noise SVG or PNG overlay (2-4% opacity) on dark surfaces breaks up flat color
and gives backgrounds material depth rather than pure digital black.

## Card and surface anatomy

A Clerk feature card:
- Dark surface (#111-#141) fill
- 1px border (rgba white at 6-8%, barely visible at rest)
- On hover: border increases to 10-15% opacity AND soft brand-glow appears in box-shadow
- Featured/hero cards: full gradient-border pseudo-element treatment
- 24px padding, 12-16px border-radius
- Content: icon (24px, brand-colored), heading (Geist 600, 18-20px), body (14-16px muted)

Hover state change: 150-200ms transition, opacity + glow only, no size change. The card "wakes
up" on hover without jarring the layout.

## Gradient and glow techniques

Hero section: a large conic-gradient mesh placed at low opacity and blurred with
`filter: blur(80-120px)` creates a soft color wash that reads as ambient environment, not a garish
gradient. Combined with near-black background it looks like the content is lit from within.

Button glows: gradient-fill primary buttons use `box-shadow` with the gradient's midpoint color at
0.3 opacity and large spread (20-30px). On hover the spread increases slightly.

## Typography

Geist is Vercel's (and Clerk's) design-system font: clean geometric sans-serif, excellent at
small sizes, expressive weight range (100-900). Geist Mono for code and terminal-style labels.

The type scale creates strong hierarchy: very large display (80px+) for hero text, compact
functional sizes for UI. Contrast between display and body creates rhythm without relying on color.

## What is reusable for CSS-only depth in the node-graph portfolio

1. **Ambient radial-gradient spotlight on the canvas behind the trigger node.** One
   `radial-gradient` on the canvas background using brand-green. Establishes the entry visually.
2. **Pseudo-element gradient border on project nodes.** Activates on hover; becomes bright and
   glowing when the node "executes." Use brand-green to pink gradient for the pipeline feel.
3. **2-3 layer box-shadow for node elevation.** Tight ground edge + medium diffuse + optional glow.
4. **Backdrop-blur for the node detail expansion panel.** Slide-in panel with
   `backdrop-filter: blur()` and semi-transparent dark surface.
5. **Noise texture overlay on canvas background.** 2-3% opacity, static SVG/PNG, adds material depth.
6. **The 150ms "wake-up" hover transition:** opacity + glow only, no scale. Nodes glow on hover,
   they do not jump.
