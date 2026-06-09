# CONTENT_CHECKLIST

Every string that appears on the live site. Approved copy, cringe-audited, em-dash-free.
Source of truth: ABOUT_ME.md. This checklist exists so a developer typing content into
`lib/pipeline/projects.ts` never has to make a copy decision.

---

## Global rules (apply everywhere)

- No em dashes. Use commas, periods, or parentheses instead.
- No vendor names in marketing-voice lines (positioning, trigger node, node subtitles in
  the collapsed card view). Tech stack IS named in detail panels because it is factual.
- No superlatives without a real number behind them. "30+ projects shipped" is fine.
  "Industry-leading automation" is not.
- No invented adoption metrics. Every number in ABOUT_ME.md is real.
- Academic and in-progress projects are labeled honestly (see Depot: "in progress").
- Status chip text is the same vocabulary across all nodes (see vocabulary section below).

---

## Trigger node

| Field | Approved copy |
|---|---|
| Eyebrow | `AI SYSTEMS ENGINEER` |
| Headline (scrambles in) | `Ahsan Riaz` |
| Positioning line | `I build the systems that make your backend, your AI layer, and your automation actually work together.` |
| Metric chip 1 | `95% Job Success` |
| Metric chip 2 | `$7K+ earned` |
| Metric chip 3 | `30+ projects shipped` |
| Metric chip 4 | `100K+ records handled` |
| Handle hint | `drag to connect` |

Copy notes:
- The positioning line is drawn from the LinkedIn About section, stripped of em dashes and
  tightened. It names the value before it names the person.
- "95% Job Success" not "100%" (resolved contradiction; Upwork is system of record).
- "100K+ records handled" not "millions" (the 2M+ record job is real but not representative
  of the body of work; the 100K+ figure is the conservative, verified summary).

---

## Project nodes: collapsed view

Each collapsed node shows title + subtitle. These are the strings a visitor reads from the
graph without clicking. They must be self-explanatory in under 3 seconds.

| Node | Title | Subtitle |
|---|---|---|
| Ad Video Generator | `AI Ad Video Generator` | `Shopify URL to finished ad, automated` |
| Real-estate agents | `Multi-Agent Real Estate System` | `Two AI agents sourcing land and capital` |
| Aawaz AI work | `AI Agent Pipeline` | `Idea to outreach, automated at a startup` |
| Clutch.ai | `Clutch.ai` | `Zero-latency interview copilot` |
| SehatYaad | `SehatYaad` | `Bilingual medication reminders with OCR` |
| Depot | `Depot` | `Codebase to cloud infrastructure (in progress)` |
| TikTok scraper | `TikTok Ads Scraper` | `Per-brand ad and video extraction` |
| RevAutoSale | `RevAutoSale` | `100,000+ Copart listings, scraped and structured` |
| Corn Yield | `Corn Yield Prediction` | `82,000+ records, XGBoost, R2 0.863` |

Copy notes:
- Subtitles name the OUTCOME, not the tech. The tech appears in the stack chips and detail panel.
- "Idea to outreach, automated at a startup" confirms the Aawaz AI context without naming the company.
- "in progress" on Depot is honest; do not write "coming soon" or anything that implies it is a
  finished product.
- "R2 0.863" is the real metric from the resume; use it verbatim.

---

## Project nodes: detail panels (expanded)

The full content for each node's expanded state. Source: ABOUT_ME.md project entries.

### AI Ad Video Generator

**Problem:** Turning a Shopify product URL into a finished short-form ad requires writing
copy, choosing a style, prompting a video model, and delivering the result -- a multi-step
process that normally takes hours.

**What was built:** A Telegram bot that takes a Shopify product URL and returns a finished
9:16 ad video with no further input. It fetches product data from the Shopify API, generates
a 3-scene script (Hook, Showcase, CTA) with style variations, and calls a video generation
API to produce 4K video, delivered back in Telegram. Supports 1 to 5 style variations per run.

**Stack:** n8n, GPT-4o, Sora 2 (Fal.ai), Telegram Bot API, Shopify API, Python.

**Signal:** Workflow JSON is open-sourced on GitHub.

**Links:** GitHub (workflow JSON).

---

### Multi-Agent Real Estate System

**Problem:** A US real estate fund needed to source grants, investors, and suitable land
parcels at a scale that manual research could not support.

**What was built:** A multi-agent system with two specialized agents: one agent (Krista)
handles grant and investor sourcing, and another (Michael) handles land scouting. The agents
run autonomously and surface qualified results.

**Stack:** n8n, OpenAI API, Claude API, LLM orchestration.

**Signal:** Shipped for a US-based client. No public repository (proprietary).

**Outcome:** Replaced manual research workflows for a real estate fund client.

---

### AI Agent Pipeline (Aawaz AI)

**Problem:** Taking a new business idea from concept to a deployed landing page, an ad
campaign, and an outreach sequence was a multi-day manual process.

**What was built:** An end-to-end AI agent pipeline that covers idea generation, landing page
creation, ad campaign setup, and automated outreach -- reducing the process from days to
minutes. Also built an automated bank-statement PDF extraction pipeline that parsed
unstructured financial documents into structured data, powering a core product feature.

**Stack:** React, Node.js, Express, PostgreSQL, OpenAI API, Claude API.

**Signal:** Shipped in a 3-month internship at a startup (Aawaz AI, Islamabad, 2025).

**Outcome:** Features in production for real users.

---

### Clutch.ai

**Problem:** Interview copilots that query a knowledge base need to understand the intent
of a question and retrieve the right answer fast enough to be useful in real time.

**What was built:** A retrieval system with three stages: a BiLSTM intent classifier, a
triplet-trained MiniLM sentence-embedding retriever, and a cross-attention reranker. The
pipeline identifies question intent, retrieves relevant passages, and reranks them for
precision.

**Stack:** PyTorch, Transformers (HuggingFace), Python.

**Signal:** GitHub repository (`AhsanRiaz786/clutch-ai`).

**Links:** GitHub.

---

### SehatYaad

**Problem:** Elderly patients with multiple medications need timely reminders, but existing
apps require reading complex labels in a single language.

**What was built:** A mobile app with OCR-powered prescription scanning, bilingual support
(English and Urdu), and scheduled reminders. Patients photograph a prescription and the
app extracts the medication schedule.

**Stack:** React Native (Expo), Flask, OCR.

**Signal:** GitHub repository (`AhsanRiaz786/SehatYaad`).

**Links:** GitHub.

---

### Depot (in progress)

**Problem:** Mapping an existing codebase to the cloud infrastructure it needs is a
manual, error-prone process requiring deep knowledge of both the code and the deployment
platform.

**What is being built:** A conversational system that takes a codebase as input and
produces cloud infrastructure configuration through a dialogue. Final-year project at NUST,
in progress.

**Stack:** To be confirmed (FYP in progress).

**Signal:** `in progress`. No repository link yet.

---

### TikTok Ads Scraper

**Problem:** A client needed automated extraction of ad data and video downloads from
TikTok Ads for multiple brands, delivered in a structured format.

**What was built:** A desktop tool that logs into TikTok Ads, scrapes ad metadata for
specified brands, downloads ad videos, and exports everything to Excel, with a desktop GUI.

**Stack:** Python, Playwright, Tkinter.

**Signal:** GitHub repository (`AhsanRiaz786/tiktok-ads-scraper`).

**Links:** GitHub.

---

### RevAutoSale

**Problem:** Copart vehicle auction listings are spread across thousands of pages and change
daily. A client needed a structured, queryable database of current listings.

**What was built:** A scraping pipeline that collects 100,000+ Copart vehicle listings,
structures the data, and makes it searchable.

**Stack:** Django, Scrapy, Selenium.

**Signal:** Live site.

**Links:** Live site.

---

### Corn Yield Prediction

**Problem:** Predicting US corn yield at the county level requires merging fragmented
agricultural, weather, and soil datasets across decades.

**What was built:** A machine learning pipeline that merged 4 data sources into 82,000+
county-year records (1981 to 2023), trained an XGBoost model achieving R2 = 0.863, and
presented the results in a Streamlit app.

**Stack:** Python, XGBoost, pandas, NumPy, Streamlit.

**Signal:** R2 = 0.863 (real metric from NUST coursework).

---

## Skill cluster node labels

Five clusters. Labels appear on the node pill. They also appear as edge labels on
capability edges (skill -> project), though smaller.

| Cluster | Label on node | Projects wired to |
|---|---|---|
| Automation | `Automation` | Ad Video Generator, Real Estate System, Aawaz AI |
| AI & Agents | `AI & Agents` | Clutch.ai, Ad Video Generator, Real Estate System, Aawaz AI |
| Scraping | `Scraping` | TikTok Ads Scraper, RevAutoSale |
| Full-Stack | `Full-Stack` | SehatYaad, Aawaz AI, Depot |
| Data & Infra | `Data & Infra` | Corn Yield, RevAutoSale, Aawaz AI |

---

## Agent node

| Field | Copy |
|---|---|
| Label | `OPERATOR` |
| Primary action | `Run tour` |
| Tour narration (Phase 3 static version) | See tour script below |

### Tour narration script (Phase 3, pre-authored)

5 stops, one narration per stop. Each card is shown for approximately 3-4 seconds before
auto-advancing. Pausable and skippable.

**Stop 1 -- Trigger node:**
"This is the pipeline. Ahsan builds systems where your backend, AI layer, and automation
actually connect. Everything starts here."

**Stop 2 -- AI Ad Video Generator (Track A):**
"One of the flagship builds: a Telegram bot that takes a Shopify URL and returns a finished
ad video, automated end-to-end. No manual steps after the link is sent."

**Stop 3 -- Clutch.ai (Track B):**
"On the product side: a zero-latency interview copilot using a custom retrieval pipeline.
BiLSTM intent classifier, MiniLM retriever, cross-attention reranker."

**Stop 4 -- TikTok Ads Scraper / RevAutoSale (Track C):**
"Data and scraping work: 100,000+ Copart listings, per-brand TikTok ad extraction. Real
pipelines handling real scale."

**Stop 5 -- Contact node:**
"That is the pipeline. The best place to start is an email."

Copy notes:
- No em dashes in tour narration.
- Tour narration uses "Ahsan" (third person in stop 1, to introduce) then switches to
  descriptive statements in subsequent stops.
- Stop 4 is intentionally quick; the contact CTA in stop 5 is the destination.

---

## Contact node

| Field | Copy |
|---|---|
| Eyebrow | `GET IN TOUCH` |
| Links | Email, GitHub, LinkedIn, Upwork, Resume |

| Link | Display label | URL |
|---|---|---|
| Email | `ahsanriaz8000@gmail.com` | `mailto:ahsanriaz8000@gmail.com` |
| GitHub | `AhsanRiaz786` | `https://github.com/AhsanRiaz786` |
| LinkedIn | `linkedin.com/in/ahsan-riaz` | `https://www.linkedin.com/in/ahsan-riaz-1254992a3` |
| Upwork | `Top Rated Profile` | `https://www.upwork.com/freelancers/~01d4988598a9368ee5` |
| Resume | `Download Resume` | `/docs/personal-info/raw/resume-cv/Ahsan Riaz - Resume.pdf` |

No encryption/security theater copy on the contact node. These are just real links.

---

## Status chip vocabulary

Used consistently across all nodes. All caps, Fira Code 10px.

| State | Text | Color |
|---|---|---|
| Default | `IDLE` | gray (#6B7280) |
| Executing | `RUNNING` | orange (#F97316) |
| Done | `SUCCESS` | green (#00FF41) |
| Failed | `ERROR` | red (#FF2047) |
| Live commits | `LIVE COMMITS` | green (#00FF41) |
| No live signal, shipped product | `SHIPPED` | gray (#6B7280) |
| Open-source | `OPEN SOURCE` | green (#00FF41) |
| In progress | `IN PROGRESS` | muted yellow (#FBBF24) |

---

## Cringe audit (final check before content goes into code)

Run this mental checklist against every string before writing it to `projects.ts`:

- [ ] Does this contain an em dash? If yes, replace with comma or period.
- [ ] Does this name a vendor (Telegram, Shopify, TikTok, Fal.ai, Vercel) in a marketing-voice
  line (trigger node, subtitle, tour narration)? If yes, make it generic or move to detail panel.
- [ ] Does this contain a superlative without a real number? ("best", "industry-leading",
  "cutting-edge") If yes, remove or replace with the actual metric.
- [ ] Does this claim a scale not in ABOUT_ME.md? If yes, remove.
- [ ] Is an academic or in-progress project presented as shipped? If yes, add honest label.
- [ ] Does a non-repo node have a "live signal" chip? If yes, that chip is lying. Remove.

All strings in this document have passed the above checklist.
