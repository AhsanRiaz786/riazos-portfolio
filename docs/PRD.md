# PRD: The Pipeline (Portfolio v2)

Product requirements for the node-graph portfolio rebuild. Source of truth for scope,
information architecture, the signature interaction, the tour, copy, and success
criteria. All content traces to [ABOUT_ME.md](personal-info/ABOUT_ME.md). No em dashes.

Status: draft for build. Supersedes nothing live (RiazOS stays at `/` until ship).

---

## 1. Problem and goal

**Problem.** The current RiazOS desktop-OS portfolio works against Ahsan. The genre is
saturated, the Matrix skin is a cliche, the one strong asset (a terminal making real
GitHub calls) is buried, and most of the surface is decoration backed by `Math.random`.
Worst, the desktop-OS metaphor says nothing about what Ahsan actually does: he builds
automation pipelines, AI agents, scrapers, and n8n workflows.

**Goal.** Ship a portfolio where the medium IS the message: the portfolio is a living
node/dataflow graph, the visual language of n8n and LangGraph, the exact tools Ahsan
works in. Every signal is real. The visitor wires a node and watches it execute. The
result is on-brand, memorable, shareable, and credibly different from the desktop-OS pack.

**One-sentence product:** an interactive node graph that presents Ahsan's work as a
pipeline you can run, where the projects are the payload and every number is real.

## 2. Audience

Primary, in priority order:

1. **Technical founders / hiring managers / clients** evaluating whether Ahsan can
   architect a system, not just write code. They want proof of real, shipped work and
   concrete outcomes. They skim first, then drill into one or two projects.
2. **Recruiters and collaborators** who need the fast version: what he does, the
   headline metrics, and how to contact him.
3. **Peers / the curious** who will share it if it is genuinely novel (the share loop
   is a real growth channel for a portfolio).

Design implication: the graph must deliver the gist in under 10 seconds without any
interaction (read-only skimmers), reward one interaction with a payoff (the wire-it
moment), and offer depth on demand (expand a project). It must also fully degrade to a
readable document for keyboard, screen-reader, reduced-motion, and no-JS-fallback users.

## 3. Non-goals (explicit scope guardrails)

- No WebGL / Three.js. Depth and motion come from CSS and SVG only. (Hard guardrail.)
- No rebuild of RiazOS. It is frozen and reused only as the `/os` easter egg post-ship.
- No fake data anywhere. If a signal is not real, it does not render.
- No CMS. Project content is typed data in `lib/pipeline/`.
- No vendor names in client-facing site copy (tooling can be named in detail panels as
  technical fact, e.g. "n8n", "Playwright"; marketing-voice copy stays generic).
- No new global state library unless React Flow state plus context proves insufficient.

## 4. Information architecture: the graph

One canvas. No page routing between sections. The camera pans and zooms between nodes.
The graph reads left-to-right as a pipeline: trigger on the left, output (contact) on the
right, projects and skills in between.

### 4.1 Node types

1. **`trigger` (entry)** - one. The start of the pipeline. Headline, one-line
   positioning, headline metrics chip row, a pulsing output handle. Camera lands here.
2. **`project` nodes** - the payload, most visual weight. Collapsed = a node card with
   title, one-line, stack chips, and a status chip. Expanded = detail panel (problem,
   what was built, stack, outcome, links).
3. **`skill` / cluster nodes** - grouped by domain, wired into the projects that use
   them so the graph visibly shows skills powering real work.
4. **`agent` node** - the operator. Wired to everything. Triggers the guided tour.
5. **`contact` (output)** - the end of the pipeline. Real links only.

### 4.2 Project node selection (decision)

ABOUT_ME lists the full inventory. For v2 we ship a curated set, chosen for narrative
strength and credibility, not exhaustiveness. Selected project nodes, grouped into three
visible tracks fanning out from the trigger:

**Track A: AI automation & agents (the headline track, most weight)**
- **AI Ad Video Generator** (Shopify URL to finished short-form ad; n8n + GPT-4o + Sora 2
  via Fal.ai + Telegram + Shopify API). Signal: open-sourced workflow JSON link.
- **Multi-agent real-estate fund system** (Krista grant/investor agent + Michael
  land-scout agent; n8n + LLM orchestration). Signal: outcome statement (no public repo).
- **AI agent pipeline at Aawaz AI** (idea to landing page to ad campaign to outreach;
  bank-statement PDF extraction). Signal: internship outcome statement.

**Track B: Full-stack & AI products**
- **Clutch.ai** (zero-latency interview copilot; BiLSTM intent classifier + MiniLM
  retriever + cross-attention reranker; PyTorch). Signal: live GitHub repo `clutch-ai`.
- **SehatYaad** (bilingual EN/UR medical reminder app with OCR; React Native + Flask).
  Signal: live GitHub repo `SehatYaad`.
- **Depot** (FYP, in progress: codebase to cloud-infra conversational system). Signal:
  honest "in progress" status, no inflated claims.

**Track C: Data, scraping & systems**
- **TikTok Ads Scraper** (Python + Playwright + Tkinter; per-brand ad + video export).
  Signal: live GitHub repo `tiktok-ads-scraper`.
- **RevAutoSale** (100,000+ Copart listings; Django + Scrapy + Selenium). Signal: live
  site link.
- **US Corn Yield Prediction** (82,000+ county-year records 1981-2023; XGBoost R2=0.863;
  Streamlit). Signal: metric (R2) stated as fact.

Held in reserve (data exists; include only if the canvas does not feel crowded, or as a
secondary "more work" cluster): secure-riscv-soc, terrorism-analysis, GHL+n8n stack,
OpenClaw lead-gen, SEO content agent, AI product approval agent, vendor scoring,
bid_cars 2M-record scrape.

> **Resolved judgment call (flagged in Step 2.0):** the strongest narrative projects
> (Ad Video Generator, real-estate agents) have no public repo, while the clean-repo
> projects skew academic/tooling. Resolution: **signal type is per-node and always real,
> never a fake live ticker.** Repo-backed nodes get live GitHub chips (last commit,
> language, stars). Repo-less flagship nodes get a "verified outcome" chip sourced from a
> real artifact (open-sourced workflow JSON, a stated metric, a live URL). The chip's
> label states its source honestly (for example "open source" vs "live commits" vs
> "shipped"). Narrative weight (size, position, the tour spotlight) is assigned by
> importance, decoupled from whether a live API happens to exist. This keeps the
> strongest work central without faking a signal it does not have.

### 4.3 Skill clusters

Five clusters, each wired to the project nodes that use them (from ABOUT_ME taxonomy):

- **Automation** (n8n, Make.com, Celery) -> Ad Video Generator, real-estate agents, Aawaz.
- **AI / agents** (LangChain, LangGraph, OpenAI, Claude, Gemini, PyTorch) -> Clutch.ai,
  agents, Ad Video Generator.
- **Scraping** (Playwright, Selenium, Scrapy) -> TikTok scraper, RevAutoSale.
- **Full-stack** (Next.js, React, React Native, FastAPI, Django, Node) -> SehatYaad,
  Giraph, Depot.
- **Data / infra** (PostgreSQL, MongoDB, Supabase, AWS, Docker) -> across the board.

## 5. Visitor journey

1. **Land.** Camera framed on the trigger node. One data packet idles at its glowing
   output handle. The trigger shows the positioning line and the headline metrics. A
   skimmer already has the gist.
2. **Choose.** Two affordances are visible: drag from the trigger's output handle to a
   nearby project's input handle (the signature interaction), or press "Run tour" on the
   agent node.
3. **Wire it (signature path).** On connect, the edge animates in, a packet flows
   trigger to project, the project node executes (status chip running to success) and
   expands its detail. This is the payoff moment.
4. **Explore.** Remaining edges can auto-complete or the visitor keeps wiring. Projects
   expand/collapse. The minimap shows the whole graph so nobody is lost.
5. **Tour (alternate path).** The agent node animates the camera node to node, fires
   packets, and shows short narration per node, ending at contact.
6. **Convert.** The pipeline ends at the contact node: email, GitHub, LinkedIn, Upwork,
   resume. Real links, no theater.

## 6. The signature interaction: "wire it yourself"

Requirement: a first-time visitor, with zero instructions, wires one edge and triggers a
node execution within roughly the first 5 seconds, and understands the metaphor by doing.

- The trigger node has a glowing output handle. A nearby project node has an unconnected,
  pulsing input handle. A subtle hint ("drag to connect") sits between them.
- On `onConnect`: the edge draws in with the brand flow gradient; a packet (animated dot
  tweened along the SVG edge path) travels trigger to project; on arrival the target node
  flips status chip running -> success and expands.
- After the first manual wire, the hint disappears. The visitor may wire more edges or let
  the rest auto-complete.
- Touch: the same drag works by touch; tap-and-drag from handle to handle. If precise
  drag is too hard on small screens, a tap on the target node's handle completes the wire
  (tap-to-connect fallback).
- Keyboard: focus the trigger handle, press Enter to arm, focus a project, press Enter to
  connect (the keyboard equivalent of the drag).
- Reduced motion: the edge and execution still happen, but instantly (no packet travel,
  no camera easing); the node snaps to its executed/expanded state.

## 7. The tour (agent node)

- **Phase 3 version (ships first):** pre-authored static narration. The agent node, when
  triggered, runs a scripted camera choreography: trigger -> one project per track ->
  a skill cluster -> contact, with a one or two sentence narration card per stop and a
  packet firing along each traversed edge. Pausable and skippable. Respects reduced motion
  (jump cuts instead of eased pans).
- **Phase 4 version (optional, gated):** the same node upgraded to a live AI operator
  (server-side Route Handler, AI SDK via the gateway, key from env) that can answer
  "show me your automation work" and drive the camera to the relevant nodes. The core
  ships without this; it is strictly additive.

## 8. Real-signals policy (restated as requirement)

Every dynamic value must trace to a real source or it does not render.

- Project status chips: real GitHub data per repo (last commit time, language, stars,
  open state), fetched via `app/api/github/route.ts` (server-side, token from env,
  cached with `revalidate`). Repo-less nodes show a static verified-outcome chip whose
  label names its real source. No live ticker is faked.
- Graph "heartbeat": derived from real fetch timestamps, not a random ticker.
- Code under `components/pipeline/` and `lib/pipeline/` must be grep-clean of
  `Math.random`. This is a verification gate, not a guideline.

## 9. Copy (cringe-audited, no em dashes)

These are the approved strings. The DESIGN_DOC sets type treatment; this PRD owns wording.

**Trigger node**
- Eyebrow: `AI SYSTEMS ENGINEER`
- Headline: `Ahsan Riaz`
- Positioning (one line): `I build the systems that make your backend, your AI layer, and your automation actually work together.`
- Metric chips: `95% Job Success` · `$7K+ earned` · `30+ projects shipped` · `100K+ records handled`
- Handle hint: `drag to connect`

**Node labels (concise, factual)**
- `AI Ad Video Generator`, sub: `Shopify URL to finished ad, automated`
- `Multi-Agent Real Estate System`, sub: `two AI agents sourcing land and capital`
- `AI Agent Pipeline`, sub: `idea to outreach, built at an AI startup`
- `Clutch.ai`, sub: `zero-latency interview copilot`
- `SehatYaad`, sub: `bilingual medication reminders with OCR`
- `Depot`, sub: `codebase to cloud infrastructure, in progress`
- `TikTok Ads Scraper`, sub: `per-brand ad and video extraction`
- `RevAutoSale`, sub: `100,000+ auction listings, scraped and structured`
- `Corn Yield Prediction`, sub: `82,000+ records, XGBoost, R2 0.863`

**Skill clusters:** `Automation`, `AI & Agents`, `Scraping`, `Full-Stack`, `Data & Infra`.

**Agent node:** label `Operator`, action `Run tour`. Narration drafted in CONTENT_CHECKLIST.

**Contact node:** label `Get in touch`. Links: `Email`, `GitHub`, `LinkedIn`, `Upwork`,
`Resume`. No encryption/security theater copy.

**Status chip vocabulary:** `idle`, `running`, `success` (for executed nodes);
`live commits`, `open source`, `shipped`, `in progress` (for the real signal source per node).

Cringe rules applied: no superlatives, no invented adoption numbers, real metrics only,
academic work labeled honestly, tools named as fact in detail panels but not in
marketing-voice lines.

## 10. Accessibility requirements (floor, non-negotiable)

- Keyboard: every node reachable by Tab and arrow keys; Enter expands a project, Escape
  collapses; the wire interaction has a keyboard path (section 6); visible focus ring.
- Screen reader: each node has an accessible name and role; a persistent "Read as a list"
  link renders the same content as a plain semantic document (the graph is hostile to SR
  users without this, so it is mandatory).
- Reduced motion: full static fallback; no packet travel, no camera easing, snap to end
  states.
- Touch: canvas pans/zooms, nodes tap-expand, wire works by touch (section 6). We do not
  repeat window.tsx's mouse-only mistake.
- Color is never the only signal: status chips carry text plus icon, not just hue.

## 11. Performance budget (requirement)

Mobile, mid-tier device, Lighthouse: LCP < 2.5s, CLS < 0.05, TBT < 200ms, JS to first
paint < ~180KB gzip. React Flow and Framer Motion load only on `/v2` via dynamic import
with a skeleton. GitHub signals are server-fetched and cached. Packets are
transform/GPU-driven, capped in count, paused when off-screen and when the tab is hidden.

## 12. Success criteria (how we know it worked)

- A first-time visitor wires an edge and sees a node execute without reading instructions.
- The gist (who, what, headline metrics) is readable in under 10 seconds with no interaction.
- Every visible dynamic value is real; `Math.random` grep returns nothing in the new dirs.
- A11y floor met: keyboard-only pass, SR text-fallback pass, reduced-motion pass, touch pass.
- Perf budget met on a Lighthouse mobile run.
- `/` still boots RiazOS byte-for-byte until the one-commit cutover; cutover is revertible.

## 13. Open questions for design (handed to DESIGN_DOC)

- Exact node card anatomy and the trigger/success/error visual vocabulary (informed by
  the n8n and LangGraph research).
- The flow-gradient direction and packet styling (green to pink? brand-green only?).
- CSS-only depth treatment for nodes and the ambient canvas (informed by Clerk research).
- Motion durations and easings for packet travel and camera (informed by Rauno research).
- The one screenshot-worthy "hero moment" framing (informed by awwwards/Godly research).
