import type { PipelineNode, PipelineEdge } from './types'
import { projects } from './projects'

// ---------------------------------------------------------------------------
// Initial node positions
// The canvas coordinate system has origin (0,0) at top-left.
// x increases right, y increases down.
// These positions produce a left-to-right flow: trigger -> projects -> contact.
// Skill nodes are arranged vertically between tracks.
// ---------------------------------------------------------------------------

export function getInitialNodes(): PipelineNode[] {
  return [
    // Trigger node -- entry point, left side
    {
      id: 'trigger',
      type: 'trigger',
      position: { x: 80, y: 340 },
      data: {
        eyebrow: 'AI SYSTEMS ENGINEER',
        headline: 'Ahsan Riaz',
        positioningLine:
          'I build the systems that make your backend, your AI layer, and your automation actually work together.',
        metrics: [
          { label: 'Job Success', value: '95%' },
          { label: 'Earned', value: '$7K+' },
          { label: 'Projects', value: '30+' },
          { label: 'Records', value: '100K+' },
        ],
      },
    },

    // Track A -- Automation (orange, top row)
    {
      id: 'ad-video-generator',
      type: 'project',
      position: { x: 500, y: 80 },
      data: projects['ad-video-generator'],
    },
    {
      id: 'real-estate-system',
      type: 'project',
      position: { x: 500, y: 260 },
      data: projects['real-estate-system'],
    },
    {
      id: 'aawaz-pipeline',
      type: 'project',
      position: { x: 500, y: 440 },
      data: projects['aawaz-pipeline'],
    },

    // Track B -- Fullstack (blue, middle row)
    {
      id: 'clutch-ai',
      type: 'project',
      position: { x: 500, y: 660 },
      data: projects['clutch-ai'],
    },
    {
      id: 'sehatyaad',
      type: 'project',
      position: { x: 500, y: 840 },
      data: projects['sehatyaad'],
    },
    {
      id: 'depot',
      type: 'project',
      position: { x: 500, y: 1020 },
      data: projects['depot'],
    },

    // Track C -- Data/Scraping (purple, bottom row)
    {
      id: 'tiktok-scraper',
      type: 'project',
      position: { x: 500, y: 1240 },
      data: projects['tiktok-scraper'],
    },
    {
      id: 'rev-auto-sale',
      type: 'project',
      position: { x: 500, y: 1420 },
      data: projects['rev-auto-sale'],
    },
    {
      id: 'corn-yield',
      type: 'project',
      position: { x: 500, y: 1600 },
      data: projects['corn-yield'],
    },

    // Skill cluster nodes
    {
      id: 'skill-automation',
      type: 'skill',
      position: { x: 860, y: 260 },
      data: { label: 'Automation' },
    },
    {
      id: 'skill-ai-agents',
      type: 'skill',
      position: { x: 860, y: 80 },
      data: { label: 'AI & Agents' },
    },
    {
      id: 'skill-scraping',
      type: 'skill',
      position: { x: 860, y: 1330 },
      data: { label: 'Scraping' },
    },
    {
      id: 'skill-fullstack',
      type: 'skill',
      position: { x: 860, y: 840 },
      data: { label: 'Full-Stack' },
    },
    {
      id: 'skill-data-infra',
      type: 'skill',
      position: { x: 860, y: 1510 },
      data: { label: 'Data & Infra' },
    },

    // Agent node -- operator
    {
      id: 'agent',
      type: 'agent',
      position: { x: 80, y: 80 },
      data: { label: 'OPERATOR' },
    },

    // Contact node -- pipeline output, right side
    {
      id: 'contact',
      type: 'contact',
      position: { x: 1140, y: 600 },
      data: {
        eyebrow: 'GET IN TOUCH',
        links: [
          {
            kind: 'email',
            label: 'ahsanriaz8000@gmail.com',
            href: 'mailto:ahsanriaz8000@gmail.com',
          },
          {
            kind: 'github',
            label: 'AhsanRiaz786',
            href: 'https://github.com/AhsanRiaz786',
          },
          {
            kind: 'linkedin',
            label: 'linkedin.com/in/ahsan-riaz',
            href: 'https://www.linkedin.com/in/ahsan-riaz-1254992a3',
          },
          {
            kind: 'upwork',
            label: 'Top Rated Profile',
            href: 'https://www.upwork.com/freelancers/~01d4988598a9368ee5',
          },
          {
            kind: 'resume',
            label: 'Download Resume',
            href: '/docs/personal-info/raw/resume-cv/Ahsan Riaz - Resume.pdf',
          },
        ],
      },
    },
  ]
}

export function getInitialEdges(): PipelineEdge[] {
  return [
    // Trigger -> all track A projects (pipeline edges)
    {
      id: 'e-trigger-ad-video',
      source: 'trigger',
      target: 'ad-video-generator',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-real-estate',
      source: 'trigger',
      target: 'real-estate-system',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-aawaz',
      source: 'trigger',
      target: 'aawaz-pipeline',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },

    // Trigger -> track B projects
    {
      id: 'e-trigger-clutch',
      source: 'trigger',
      target: 'clutch-ai',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-sehatyaad',
      source: 'trigger',
      target: 'sehatyaad',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-depot',
      source: 'trigger',
      target: 'depot',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },

    // Trigger -> track C projects
    {
      id: 'e-trigger-tiktok',
      source: 'trigger',
      target: 'tiktok-scraper',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-revautosale',
      source: 'trigger',
      target: 'rev-auto-sale',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-trigger-corn',
      source: 'trigger',
      target: 'corn-yield',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },

    // Projects -> contact (pipeline edges)
    {
      id: 'e-ad-video-contact',
      source: 'ad-video-generator',
      target: 'contact',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-clutch-contact',
      source: 'clutch-ai',
      target: 'contact',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },
    {
      id: 'e-corn-contact',
      source: 'corn-yield',
      target: 'contact',
      type: 'pipeline',
      data: { kind: 'pipeline', executing: false, packetKey: 0 },
    },

    // Skill capability edges (dashed)
    {
      id: 'e-cap-automation-ad',
      source: 'skill-automation',
      target: 'ad-video-generator',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-automation-realestate',
      source: 'skill-automation',
      target: 'real-estate-system',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-automation-aawaz',
      source: 'skill-automation',
      target: 'aawaz-pipeline',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-ai-ad',
      source: 'skill-ai-agents',
      target: 'ad-video-generator',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-ai-realestate',
      source: 'skill-ai-agents',
      target: 'real-estate-system',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-ai-aawaz',
      source: 'skill-ai-agents',
      target: 'aawaz-pipeline',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-ai-clutch',
      source: 'skill-ai-agents',
      target: 'clutch-ai',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-scraping-tiktok',
      source: 'skill-scraping',
      target: 'tiktok-scraper',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-scraping-rev',
      source: 'skill-scraping',
      target: 'rev-auto-sale',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-fullstack-sehatyaad',
      source: 'skill-fullstack',
      target: 'sehatyaad',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-fullstack-aawaz',
      source: 'skill-fullstack',
      target: 'aawaz-pipeline',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-fullstack-depot',
      source: 'skill-fullstack',
      target: 'depot',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-data-corn',
      source: 'skill-data-infra',
      target: 'corn-yield',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-data-rev',
      source: 'skill-data-infra',
      target: 'rev-auto-sale',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
    {
      id: 'e-cap-data-aawaz',
      source: 'skill-data-infra',
      target: 'aawaz-pipeline',
      type: 'capability',
      data: { kind: 'capability', executing: false, packetKey: 0 },
    },
  ]
}
