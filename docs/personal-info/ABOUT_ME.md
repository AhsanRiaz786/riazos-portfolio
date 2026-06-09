# ABOUT_ME

Canonical fact sheet for Ahsan Riaz. Single source of truth for all portfolio copy,
node labels, project content, and metrics. Every claim here traces to a real source
(Upwork, LinkedIn, GitHub, resume, CV). Nothing is inflated. No em dashes.

Source legend: `[U]` Upwork, `[L]` LinkedIn, `[G]` GitHub, `[R]` Resume, `[CV]` CV.
Where sources disagreed, the resolved value is recorded under "Resolved facts" and
used everywhere below.

---

## Resolved facts (contradictions settled)

| Field | Sources said | Resolved value |
|---|---|---|
| Job Success Score | 95% [U] vs 100% [L][R] | **95%** (Upwork is the system of record) |
| Lifetime earnings | $7K+ [U] vs $6K+ [CV] | **$7K+** |
| Graduation | May 2027 [R] vs Sep 2027 [L][CV] | **Expected May 2027** |
| Location | Faisalabad [U] vs Islamabad [L][G][R] | **Faisalabad (home) and Islamabad (NUST)** |
| GitHub username | casing varied | **AhsanRiaz786** (exact) |

---

## Identity

- **Name:** Ahsan Riaz
- **Primary positioning:** AI Systems Engineer who builds full-stack products and the
  automation that makes them run. Architects the system, not just the code. [L]
- **Secondary framing (Upwork specialty):** AI Automation Expert. n8n, AI agents,
  multi-agent systems. [U]
- **Location:** Faisalabad, Pakistan (home); studies and works in Islamabad (NUST). [U][L][G][R]
- **Email:** ahsanriaz8000@gmail.com [R]
- **Phone:** +92 304 0949380 [R]
- **Portfolio:** ahsanriaz.live [G]
- **GitHub:** github.com/AhsanRiaz786 [G]
- **LinkedIn:** linkedin.com/in/ahsan-riaz-1254992a3 [L]
- **Upwork:** upwork.com/freelancers/~01d4988598a9368ee5 [G][U]
- **Org:** @Vyrothon [G]

## One-line positioning candidates (for the trigger node, pick one in PRD)

1. "I build the systems that connect your backend, your AI layer, and your automation so they actually work together." (derived from [L] About)
2. "AI systems engineer. I architect the pipeline, not just the code."
3. "Full-stack and automation engineer. Real products, real workflows, shipped."

---

## Headline metrics (all real, all citable)

- **95% Job Success Score**, Top Rated on Upwork. [U]
- **$7K+ earned** across freelance work. [U]
- **30+ production projects** delivered for **30+ clients** over **2+ years**. [U][L]
- **100K+ records** handled in production scraping/data pipelines. [L][R]
- **2M+ records** in a single scrape job (bid_cars). [U]
- **1,102 GitHub contributions** in the last year. [G]
- **46 public repos**, 74 followers. [G]
- **861 LinkedIn followers**, 500+ connections. [L]
- **CGPA 3.23 / 4.00** at NUST. [R]

> Note for copy: lead with 95% JSS, $7K+, and the 100K+/2M+ record numbers. These are
> concrete and verifiable. Do not round up or embellish.

---

## Education

- **BS Computer Science, NUST (SEECS)**, Islamabad. Expected **May 2027**. CGPA 3.23/4.00. [R][L]
  - Enrolled Sep 2023. [L]
- **Intermediate (Computer Science), Punjab Group of Colleges.** Oct 2021 to Apr 2023. Grade A. [L]

## Experience

1. **Independent freelancer (Upwork), May 2023 to Present.** AI & Automation Engineer,
   Backend & Web Scraping. Top Rated, 95% JSS, $7K+, 30+ projects. Built automation
   workflows (n8n, Make.com, Python) cutting 10-20 hrs/week of manual ops; scraping
   infra (Playwright, Scrapy, Celery) over 100K+ records with validation, dedup, and
   delivery to Postgres/CSV/APIs; AI products on OpenAI, Claude, Gemini; full-stack apps
   on Next.js, FastAPI, Supabase deployed to AWS (EC2, ECS/Fargate, RDS) with Docker and
   NGINX; concurrency-safe DB design (Firestore transactions, Postgres row locking). [U][L]
2. **Software Developer Intern, Aawaz AI. Jun 2025 to Aug 2025 (3 months), Islamabad, on-site.** [L][R]
   Built an end-to-end AI agent pipeline (idea generation, landing page creation, ad
   campaign setup, automated outreach) reducing a multi-day manual process to minutes;
   automated bank-statement PDF extraction (unstructured to structured) powering a core
   product feature; integrated OpenAI and Claude into multi-step orchestration with
   conditional branching, error handling, state management; full-stack features in
   React, Node/Express, PostgreSQL. [L]
3. **Fiverr scraping freelancer, May 2023 to Jul 2024.** 50+ scraping projects. [U]

## Certifications

- **AI Automation Expert**, issued Jul 2025. [U]
- **N8N Automations Expert**, issued Jun 2025. [U]
- Introduction to Generative AI with GPT (LinkedIn), Dec 2023. [L]
- Machine Learning with Python: Foundations (LinkedIn), Dec 2023. [L]

## Honors

- **3rd Place, Vyrothon 2026** (hackathon by ImagineArt / Vyro.ai). [R]
- **Top Rated**, Upwork. [U][R]
- **Google Antigravity Hackathon** participant. [R]
- **Director, NUST Community Service Club.** [R]

---

## Projects (the payload nodes)

Each entry: problem, what was built, stack, outcome, link, source, and whether it maps
to a live GitHub repo for real status signals. "Repo signal" = candidate for the
`/api/github` proxy. Final node selection happens in PRD; this is the full inventory.

### Freelance / automation (Upwork)

- **Multi-agent US real-estate fund system** [U]
  - Problem: a US real-estate fund needed grant/investor sourcing and land scouting done
    at scale.
  - Built: a multi-agent system. "Krista" is an AI grant/investor agent; "Michael" is an
    AI land-scout agent.
  - Stack: n8n, LLM orchestration (OpenAI/Claude), automation.
  - Outcome: automated sourcing workflows. (No public repo.)
- **AI Ad Video Generator (Sora 2 + n8n)** [U][L]
  - Problem: turn any Shopify product URL into a finished short-form ad with zero manual input.
  - Built: a Telegram bot that fetches product data from the Shopify API (HTML-scrape
    fallback), uses GPT-4o to pick an ad style and write a 3-scene script
    (Hook, Showcase, CTA), optimizes prompts, and calls Sora 2 via Fal.ai to render 4K
    9:16 video, delivered back in Telegram. Session memory, sequential generation loops,
    1-5 ads per run.
  - Stack: n8n, GPT-4o, Sora 2 (Fal.ai), Telegram Bot API, Shopify API, Python.
  - Outcome: end-to-end automated video ads. Workflow JSON open-sourced on GitHub. (Repo signal: likely.)
- **TikTok Ads Scraper** [L][G]
  - Problem: a client needed automated extraction of TikTok ad data per brand.
  - Built: logs into TikTok Ads, scrapes ad metadata for specified brands, downloads ad
    videos, exports to Excel, with a Tkinter desktop GUI.
  - Stack: Python, Playwright, Tkinter.
  - Repo: `tiktok-ads-scraper` (pinned). **Repo signal: yes.**
- **GHL + n8n sales automation stack** [U] — automation connecting GoHighLevel with n8n for sales ops. (No public repo.)
- **OpenClaw AI lead-gen engine** [U] — AI lead-generation engine. (No public repo.)
- **End-to-end SEO content agent (UK e-commerce)** [U] — agent that produces SEO content
  for a UK e-commerce client. (No public repo.)
- **AI product approval agent** [U] — polls every 30 minutes, uses Claude for compliance
  and SEO checks on products. (No public repo.)
- **AI vendor quality scoring system** [U] — scores vendor quality with AI. (No public repo.)
- **bid_cars scrape** [U] — scraped 2M+ records. Fixed-price $400 job.
- **Custom Make.com agent**, **Selenium development** [U] — assorted delivered jobs.

### Engineering / academic (resume, GitHub)

- **Clutch.ai** [R][G]
  - Problem: a stealth, zero-latency interview copilot needs to understand a question and
    surface the right answer instantly.
  - Built: a BiLSTM intent classifier, a triplet-trained MiniLM retriever, and a
    cross-attention reranker.
  - Stack: PyTorch, Transformers (HuggingFace).
  - Repo: `clutch-ai` (pinned). **Repo signal: yes.**
- **US Corn Yield Prediction** [R]
  - Problem: predict county-level corn yield across the US.
  - Built: merged 4 data sources into 82,000+ county-year records (1981-2023); trained
    XGBoost reaching R2 = 0.863; Streamlit app.
  - Stack: Python, XGBoost, pandas, Streamlit.
- **Giraph** [R]
  - Problem: analytics product.
  - Built: full-stack analytics app with Gemini-powered insights.
  - Stack: Next.js, Node.js, MongoDB, Gemini.
  - Link: GitHub (per CV). **Repo signal: check.**
- **SehatYaad** [R][G]
  - Problem: medical prescription reminders for elderly patients.
  - Built: mobile app with OCR for prescriptions, bilingual English/Urdu.
  - Stack: React Native (Expo), Flask, OCR.
  - Repo: `SehatYaad` (pinned). **Repo signal: yes.**
- **RevAutoSale** [R]
  - Problem: aggregate Copart vehicle auction listings.
  - Built: scraper pipeline for 100,000+ Copart listings.
  - Stack: Django, Scrapy, Selenium.
  - Link: live site (per CV).
- **Depot (FYP, in progress)** [R]
  - Problem: convert a codebase into cloud infrastructure conversationally.
  - Built: codebase-to-cloud-infra conversational system. Final-year project, ongoing.
- **secure-riscv-soc** [G]
  - Custom RISC-V processor with built-in hardware security for IoT.
  - Stack: Verilog. Repo: `secure-riscv-soc` (pinned). **Repo signal: yes (note: not web-stack).**
- **terrorism-analysis** [G] — data analysis of a terrorism dataset. Python. Repo (pinned).
- **riazos-portfolio** [G] — the current RiazOS site itself. TypeScript. Repo (pinned).

---

## Skills taxonomy (for skill/capability nodes)

Grouped by domain to match the planned skill clusters. Sources: [R][L][G][U].

- **Languages:** Python, JavaScript, TypeScript, Java, C++, C, Verilog.
- **AI / agents:** n8n, LangChain, LangGraph, OpenAI API, Claude API, Gemini API,
  multi-agent systems, Make.com, Vapi (voice AI), PyTorch, Transformers, XGBoost.
- **Frontend:** React, Next.js, React Native (Expo), Redux, Tailwind CSS, Material-UI, Radix.
- **Backend:** Node.js, Express, Django, Flask, FastAPI.
- **Scraping / automation:** Playwright, Selenium, Scrapy, Celery, pandas, NumPy,
  requests/httpx, data validation and deduplication pipelines.
- **Data / infra:** PostgreSQL, MongoDB, MySQL, Redis, Supabase, Firebase,
  AWS (EC2, ECS/Fargate, RDS, S3, Lambda), Docker, NGINX, Vercel, Linux.

> Copy guidance: cluster nodes should wire visibly into the projects that use them
> (e.g. n8n -> Ad Video Generator + real-estate agents; Playwright -> TikTok scraper +
> RevAutoSale; PyTorch -> Clutch.ai). The graph should show skills powering real work.

---

## Contact / output node (real links only)

- Email: ahsanriaz8000@gmail.com
- GitHub: github.com/AhsanRiaz786
- LinkedIn: linkedin.com/in/ahsan-riaz-1254992a3
- Upwork: upwork.com/freelancers/~01d4988598a9368ee5
- Portfolio: ahsanriaz.live
- Resume: PDF on file (`docs/personal-info/raw/resume-cv/Ahsan Riaz - Resume.pdf`)

No fake encryption copy, no "AES-256 verified" theater. Just real, working links.

---

## Cringe-audit notes (carried into PRD copy review)

- Use real numbers, never "millions of users" or invented adoption.
- "95% JSS, Top Rated, $7K+, 100K+ records" carries the credibility. Resist superlatives.
- Avoid buzzword stacking. Name the concrete thing built and the concrete outcome.
- The multi-agent and Sora-2 work is genuinely differentiated; let it speak plainly.
- Do not claim production scale for academic projects; label FYP/academic honestly.
