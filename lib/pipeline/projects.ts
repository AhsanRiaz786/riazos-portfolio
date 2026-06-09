import type { ProjectNodeData } from './types'

// All project content sourced from docs/CONTENT_CHECKLIST.md and docs/personal-info/ABOUT_ME.md.
// No inline styles or component logic -- pure data.

export const projects: Record<string, ProjectNodeData> = {
  'ad-video-generator': {
    title: 'AI Ad Video Generator',
    subtitle: 'Shopify URL to finished ad, automated',
    track: 'automation',
    stack: ['n8n', 'GPT-4o', 'Fal.ai', 'Telegram Bot API', 'Shopify API', 'Python'],
    problem:
      'Turning a Shopify product URL into a finished short-form ad requires writing copy, choosing a style, prompting a video model, and delivering the result -- a multi-step process that normally takes hours.',
    built:
      'A Telegram bot that takes a Shopify product URL and returns a finished 9:16 ad video with no further input. It fetches product data from the Shopify API, generates a 3-scene script (Hook, Showcase, CTA) with style variations, and calls a video generation API to produce 4K video, delivered back in Telegram. Supports 1 to 5 style variations per run.',
    outcome: 'Workflow JSON is open-sourced on GitHub.',
    links: [{ label: 'GitHub', href: 'https://github.com/AhsanRiaz786' }],
    repoSignal: null,
    status: 'idle',
  },

  'real-estate-system': {
    title: 'Multi-Agent Real Estate System',
    subtitle: 'Two AI agents sourcing land and capital',
    track: 'automation',
    stack: ['n8n', 'OpenAI API', 'Claude API', 'LLM orchestration'],
    problem:
      'A US real estate fund needed to source grants, investors, and suitable land parcels at a scale that manual research could not support.',
    built:
      'A multi-agent system with two specialized agents: one agent (Krista) handles grant and investor sourcing, and another (Michael) handles land scouting. The agents run autonomously and surface qualified results.',
    outcome: 'Replaced manual research workflows for a real estate fund client.',
    links: [],
    repoSignal: null,
    status: 'idle',
  },

  'aawaz-pipeline': {
    title: 'AI Agent Pipeline',
    subtitle: 'Idea to outreach, automated at a startup',
    track: 'automation',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'OpenAI API', 'Claude API'],
    problem:
      'Taking a new business idea from concept to a deployed landing page, an ad campaign, and an outreach sequence was a multi-day manual process.',
    built:
      'An end-to-end AI agent pipeline that covers idea generation, landing page creation, ad campaign setup, and automated outreach -- reducing the process from days to minutes. Also built an automated bank-statement PDF extraction pipeline that parsed unstructured financial documents into structured data, powering a core product feature.',
    outcome: 'Features in production for real users. Shipped in a 3-month internship (Aawaz AI, Islamabad, 2025).',
    links: [],
    repoSignal: null,
    status: 'idle',
  },

  'clutch-ai': {
    title: 'Clutch.ai',
    subtitle: 'Zero-latency interview copilot',
    track: 'fullstack',
    stack: ['PyTorch', 'Transformers (HuggingFace)', 'Python'],
    problem:
      'Interview copilots that query a knowledge base need to understand the intent of a question and retrieve the right answer fast enough to be useful in real time.',
    built:
      'A retrieval system with three stages: a BiLSTM intent classifier, a triplet-trained MiniLM sentence-embedding retriever, and a cross-attention reranker. The pipeline identifies question intent, retrieves relevant passages, and reranks them for precision.',
    outcome: 'Open-source retrieval pipeline with custom-trained models.',
    links: [{ label: 'GitHub', href: 'https://github.com/AhsanRiaz786/clutch-ai' }],
    repoSignal: 'clutch-ai',
    status: 'idle',
  },

  'sehatyaad': {
    title: 'SehatYaad',
    subtitle: 'Bilingual medication reminders with OCR',
    track: 'fullstack',
    stack: ['React Native (Expo)', 'Flask', 'OCR'],
    problem:
      'Elderly patients with multiple medications need timely reminders, but existing apps require reading complex labels in a single language.',
    built:
      'A mobile app with OCR-powered prescription scanning, bilingual support (English and Urdu), and scheduled reminders. Patients photograph a prescription and the app extracts the medication schedule.',
    outcome: 'Open-source mobile app with bilingual OCR pipeline.',
    links: [{ label: 'GitHub', href: 'https://github.com/AhsanRiaz786/SehatYaad' }],
    repoSignal: 'SehatYaad',
    status: 'idle',
  },

  'depot': {
    title: 'Depot',
    subtitle: 'Codebase to cloud infrastructure (in progress)',
    track: 'fullstack',
    stack: [],
    problem:
      'Mapping an existing codebase to the cloud infrastructure it needs is a manual, error-prone process requiring deep knowledge of both the code and the deployment platform.',
    built:
      'A conversational system that takes a codebase as input and produces cloud infrastructure configuration through a dialogue. Final-year project at NUST, in progress.',
    outcome: 'In progress. No repository link yet.',
    links: [],
    repoSignal: null,
    status: 'idle',
  },

  'tiktok-scraper': {
    title: 'TikTok Ads Scraper',
    subtitle: 'Per-brand ad and video extraction',
    track: 'data',
    stack: ['Python', 'Playwright', 'Tkinter'],
    problem:
      'A client needed automated extraction of ad data and video downloads from TikTok Ads for multiple brands, delivered in a structured format.',
    built:
      'A desktop tool that logs into TikTok Ads, scrapes ad metadata for specified brands, downloads ad videos, and exports everything to Excel, with a desktop GUI.',
    outcome: 'Open-source desktop tool for per-brand ad extraction.',
    links: [{ label: 'GitHub', href: 'https://github.com/AhsanRiaz786/tiktok-ads-scraper' }],
    repoSignal: 'tiktok-ads-scraper',
    status: 'idle',
  },

  'rev-auto-sale': {
    title: 'RevAutoSale',
    subtitle: '100,000+ Copart listings, scraped and structured',
    track: 'data',
    stack: ['Django', 'Scrapy', 'Selenium'],
    problem:
      'Copart vehicle auction listings are spread across thousands of pages and change daily. A client needed a structured, queryable database of current listings.',
    built:
      'A scraping pipeline that collects 100,000+ Copart vehicle listings, structures the data, and makes it searchable.',
    outcome: 'Live site with 100,000+ structured vehicle listings.',
    links: [{ label: 'Live site', href: '#' }],
    repoSignal: null,
    status: 'idle',
  },

  'corn-yield': {
    title: 'Corn Yield Prediction',
    subtitle: '82,000+ records, XGBoost, R2 0.863',
    track: 'data',
    stack: ['Python', 'XGBoost', 'pandas', 'NumPy', 'Streamlit'],
    problem:
      'Predicting US corn yield at the county level requires merging fragmented agricultural, weather, and soil datasets across decades.',
    built:
      'A machine learning pipeline that merged 4 data sources into 82,000+ county-year records (1981 to 2023), trained an XGBoost model achieving R2 = 0.863, and presented the results in a Streamlit app.',
    outcome: 'R2 = 0.863 on held-out test data. NUST coursework.',
    links: [],
    repoSignal: null,
    status: 'idle',
  },
}
