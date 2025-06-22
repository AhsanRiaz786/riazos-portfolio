"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const commands = {
  help: `RIAZ.OS TERMINAL v1.0

AVAILABLE COMMANDS:
help                    - Show this help menu
about                   - Personal introduction  
skills                  - List technical skills
projects               - Show project portfolio
experience             - Professional timeline
contact --secure       - Get contact information
resume                 - Download professional resume
download-resume        - Download resume (alias)
neofetch              - System information
clear                 - Clear terminal
whoami                - Current user info
ls                    - List directory contents
cat [filename]        - Display file contents
cd [directory]        - Change directory
pwd                   - Show current directory
git status            - Show portfolio git status
git log               - Show recent commits
git branch            - Show active branches
git activity          - Show recent GitHub activity
games                 - Show available games
snake                 - Play Snake game
2048                  - Play 2048 puzzle
guess                 - Number guessing game
easter_egg            - Find the hidden surprise`,

  about: `NAME: Ahsan Riaz
ROLE: Full-Stack Developer & Automation Engineer
LOCATION: Faisalabad/Islamabad, Pakistan
EDUCATION: BSCS Sophomore at NUST 

I'm a developer who enjoys turning messy problems into clean solutions. 
Whether it's scraping data from stubborn websites or building user 
interfaces that actually make sense, I focus on creating tools that 
work reliably and solve real problems.

Currently balancing university studies with freelance projects, 
maintaining a 100% success rate on Upwork while learning from 
every challenge that comes my way.`,

  skills: `CORE_LANGUAGES:
├── Python        ████████░░ 85%
├── JavaScript    ████████░░ 80%  
├── TypeScript    ███████░░░ 75%
├── Java          ██████░░░░ 70%
└── SQL           ████████░░ 80%

FRAMEWORKS_AND_TOOLS:
├── Frontend: React, Next.js, Tailwind CSS, Material-UI
├── Backend: Node.js, Express.js, Django, Flask, FastAPI
├── Data: Scrapy, Selenium, Pandas, BeautifulSoup
├── Cloud: AWS (EC2, S3, App Runner), Docker, Firebase
└── Database: MongoDB, MySQL, PostgreSQL, Redis

SPECIALTIES:
• Web scraping and data automation
• Full-stack application development  
• API design and integration
• Cloud deployment and DevOps`,

  projects: `ACTIVE_PROJECTS:

[1] giraph_ai_platform
    Status: DEPLOYED
    Description: AI-powered data analytics platform
    Tech: Next.js, React, Node.js, MongoDB, Gemini AI
    Impact: Simplified data visualization for non-tech users
    
[2] auction_scraper_system  
    Status: PRODUCTION
    Description: Multi-site car auction data aggregator
    Tech: Python, PyQt5, Selenium, Multi-threading
    Impact: Processing 10,000+ daily listings
    
[3] revautosale_backend
    Status: LIVE
    Description: Enterprise inventory management API
    Tech: Django, MySQL, Scrapy, REST Framework
    Impact: Managing 100k+ vehicle records

Use 'cat project_[number].log' for detailed case studies`,

  experience: `PROFESSIONAL_TIMELINE:

2021-07 → Started ICS at Punjab Group of Colleges
2022-02 → Wrote Hello World in Python
2023-04 → Built first web scraper
2023-06 → Started Upwork
2023-07 → First Upwork client ($20 project)
2023-09 → Started BSCS at NUST
2024-06 → Software Developer Intern at Arbisoft
2024-07 → Returned to freelancing with new skills
2024-12 → Top Rated on Upwork
2025-04 → Started Working on Giraph AI Platform
2025-06 → Started as a Web Developer at Aawaz AI

Current Status: Building systems that solve real problems`,

  neofetch: `                   -\`                    ahsan@riaz.os
                  .o+\`                   ─────────────────
                 \`ooo/                   OS: RiazOS v2.0 (Arch-based)
                \`+oooo:                  Host: Developer Workstation
               \`+oooooo:                 Kernel: Unix 4.4.4
               -+oooooo+:                Uptime: 19 years, 5 months
             \`/:-:++oooo+:               Packages: 100+ npm, 50+ pip
            \`/++++/+++++++:              Shell: zsh with oh-my-zsh
           \`/++++++++++++++:             Resolution: Full-Stack
          \`/+++ooooooooo++++/\`           DE: VS Code + Terminal
         ./ooosssso++osssssso+\`          Theme: Dark Mode [Always]
        .oossssso-\`\`\`\`/ossssss+\`         Icons: Font Awesome Pro
       -osssssso.      :ssssssso.        Terminal: iTerm2
      :osssssss/        osssso+++.       CPU: M2 + Cha Engine
     /ossssssss/        +ssssooo/-       Memory: 16GB + Unlimited Curiosity
   \`/ossssso+/:-        -:/+osssso+-     
  \`+sso+:-\`                 \`.-/+oso:    
 \`++:.                           \`-/+/   
 .\`                                 \`/   `,

  whoami: `ahsan
Current user: Ahsan Riaz
Role: Full-Stack Developer & Problem Solver
Status: Online and ready to build amazing things`,

  pwd: (currentDir: string) => `${currentDir}`,
  
  ls: (currentDir: string) => {
    const getCurrentFiles = (path: string) => {
      const dirs = path.split('/').filter(Boolean);
      let current = fileSystem['/'];
      
      for (const dir of dirs) {
        if (current.files && current.files[dir] && current.files[dir].type === 'directory') {
          current = current.files[dir] as any;
        }
      }
      
      if (!current.files) return 'No files found';
      
      const files = Object.entries(current.files);
      let output = `total ${files.length}\n`;
      
      files.forEach(([name, file]) => {
        const isDir = file.type === 'directory';
        const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir ? '4096' : Math.floor(Math.random() * 2048 + 512);
        const displayName = isDir ? `${name}/` : name;
        output += `${permissions}  2 ahsan ahsan ${size} Dec 15 10:00 ${displayName}\n`;
      });
      
      return output.trim();
    };
    
    return getCurrentFiles(currentDir);
  },

  "contact --secure": `ESTABLISHING SECURE CONNECTION...
ENCRYPTION: AES-256 ✓
IDENTITY VERIFIED ✓

CONTACT_PROTOCOLS_AVAILABLE:

[1] EMAIL_DIRECT
    Address: ahsanriaz8000@gmail.com
    Protocol: SMTP (Secure)  
    Response Time: < 24 hours
    
[2] LINKEDIN_NETWORK
    Profile: https://www.linkedin.com/in/ahsan-riaz-1254992a3
    Protocol: Professional Network
    Connection: Always Open
    
[3] GITHUB_REPOSITORY  
    Username: @ahsanriaz786
    Protocol: Git/HTTPS
    Contributions: Daily
    
[4] UPWORK_PLATFORM
    Profile: https://www.upwork.com/freelancers/~01d4988598a9368ee5
    Status: Top Rated Freelancer
    Success Rate: 100%
    Availability: Open for Projects

[5] EMERGENCY_HOTLINE
    Number: +92 304 094 9380
    Protocol: Voice/SMS
    Use Case: Urgent Projects Only`,

  easter_egg: `    ╔══════════════════════════════════════╗
    ║           CONGRATULATIONS!           ║  
    ║                                      ║
    ║   You found the hidden command!      ║
    ║                                      ║
    ║   As a fellow developer, you         ║
    ║   appreciate attention to detail.    ║
    ║                                      ║
    ║   Here's my secret: The best         ║
    ║   debugging tool is a good night's   ║
    ║   sleep and a fresh perspective.     ║
    ║                                      ║
    ║   Want to work together?             ║
    ║   Run: contact --priority-hire       ║
    ╚══════════════════════════════════════╝`,

  "contact --priority-hire": `PRIORITY HIRING PROTOCOL ACTIVATED

Direct Line: ahsanriaz8000@gmail.com
Subject: "Priority Project Discussion"

I respond to priority inquiries within 2-4 hours.
Let's build something amazing together! [READY]`,

  resume: `INITIATING RESUME DOWNLOAD...

┌─────────────────────────────────────────┐
│            [PDF] RESUME.PDF             │
├─────────────────────────────────────────┤
│ File: Ahsan_Riaz_Resume.pdf            │
│ Size: 1.1 MB                           │
│ Format: PDF (Professional)             │
│ Last Updated: December 2024            │
│                                         │
│ Contains:                               │
│ [x] Professional Experience             │
│ [x] Technical Skills & Expertise       │
│ [x] Education & Certifications         │
│ [x] Project Portfolio                  │
│ [x] Contact Information                │
└─────────────────────────────────────────┘

>> Download starting automatically...
>> Tip: Open with any PDF viewer

Status: DOWNLOAD_COMPLETE [OK]`,

  "download-resume": `RESUME DOWNLOAD INITIATED...

Accessing: /home/ahsan/documents/resume.pdf
File permissions: -rw-r--r--
Owner: ahsan (Full-Stack Developer)
Group: developers
Size: 1157kb

>> Downloading Ahsan_Riaz_Resume.pdf...
>> Download complete! Check your downloads folder.

Happy hiring! [SUCCESS]`,

  "cat resume.pdf": `FILE: resume.pdf
TYPE: Professional Resume (PDF)
ENCODING: Binary
STATUS: [OK] READABLE

┌────────────────────────────────────────────┐
│        AHSAN RIAZ - FULL-STACK DEV         │
├────────────────────────────────────────────┤
│                                            │
│  [EMAIL] ahsanriaz8000@gmail.com          │
│  [PHONE] +92 304 094 9380                 │
│  [WEB] linkedin.com/in/ahsan-riaz-1254992a3 │
│  [CODE] github.com/ahsanriaz786           │
│                                            │
│  [EDU] BSCS @ NUST (Sophomore)            │
│  [RANK] Top Rated on Upwork (100% Success) │
│  [EXP] 1.5+ Years Development Experience  │
│                                            │
│  CORE_STACK:                              │
│  > Frontend: React, Next.js, TypeScript   │
│  > Backend: Node.js, Python, Django       │
│  > Data: Web Scraping, Automation         │
│  > Cloud: AWS, Docker, CI/CD              │
│                                            │
│  RECENT_PROJECTS:                          │
│  > Giraph AI Platform (2024-Current)      │
│  > RevAutoSale Backend (Enterprise)       │
│  > Multi-Site Auction Scraper             │
│                                            │
└────────────────────────────────────────────┘

>> To download the full PDF resume, type: resume`,
}

// File system structure
const fileSystem = {
  '/': {
    type: 'directory',
    files: {
      'README.md': {
        type: 'file',
        content: `# Ahsan Riaz - Portfolio

Welcome to my interactive portfolio terminal!

## About This System
This portfolio showcases my skills as a Full-Stack Developer through an interactive terminal interface. Navigate through different sections to learn more about my experience, projects, and technical expertise.

## Quick Navigation
- Use 'about' for personal introduction
- Use 'skills' to see technical capabilities  
- Use 'projects' for portfolio overview
- Use 'experience' for professional timeline
- Use 'contact --secure' for contact information
- Use 'resume' to download my professional resume

## File System
- projects/ - Detailed project case studies
- skills/ - Technical skill breakdowns
- contact.txt - Contact information
- resume.pdf - Professional resume
- download.sh - Resume download script

Built with: React, TypeScript, Next.js, Tailwind CSS
Author: Ahsan Riaz <ahsanriaz8000@gmail.com>
License: Portfolio Use Only`
      },
      'contact.txt': {
        type: 'file',
        content: `CONTACT INFORMATION
==================

NAME: Ahsan Riaz
ROLE: Full-Stack Developer & Automation Engineer
LOCATION: Faisalabad/Islamabad, Pakistan

EMAIL: ahsanriaz8000@gmail.com
PHONE: +92 304 094 9380
LINKEDIN: https://www.linkedin.com/in/ahsan-riaz-1254992a3
GITHUB: https://github.com/ahsanriaz786
UPWORK: https://www.upwork.com/freelancers/~01d4988598a9368ee5

STATUS: Available for Projects
RESPONSE TIME: < 24 hours
SUCCESS RATE: 100% (Upwork Top Rated)

For secure communication, use: contact --secure`
      },
      'resume.pdf': {
        type: 'file',
        content: 'cat resume.pdf'
      },
      'download.sh': {
        type: 'file',
        content: `#!/bin/bash
# Resume Download Script
# Author: Ahsan Riaz

echo "Initiating resume download..."
echo "File: Ahsan_Riaz_Resume.pdf"
echo "Size: 1.1 MB"
echo "Format: PDF (Professional)"

# Trigger download
curl -O "https://portfolio.ahsanriaz.dev/resume.pdf"

echo "Download complete!"
echo "Happy hiring! [SUCCESS]"`
      },
      'projects': {
        type: 'directory',
        files: {
          'giraph_ai.md': {
            type: 'file',
            content: `# Giraph AI Platform
**Status:** DEPLOYED | **Tech:** Next.js, React, Node.js, MongoDB, Gemini AI

## Overview
AI-powered data analytics platform that makes data analysis accessible to everyone.

## The Challenge
Small businesses were drowning in spreadsheets, spending hours trying to make sense of their data. They needed insights, not more confusion.

## My Solution
Built a platform that speaks human, not just code. Users upload messy Excel files, and AI figures out what story the data wants to tell.

## Key Features
- AI-powered data interpretation
- Automated visualization generation
- Natural language insights
- Real-time collaboration tools
- Export capabilities

## Technical Implementation
- Frontend: Next.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB with aggregation pipelines
- AI: Google Gemini API integration
- Deployment: AWS with CI/CD

## Impact
Turned 2-hour analysis sessions into 2-minute discoveries. Business owners now actually look forward to checking their metrics.

## Live Demo
Visit: https://giraph.ai (Currently in beta)`
          },
          'auction_scraper.md': {
            type: 'file',
            content: `# Multi-Site Auction Scraper
**Status:** PRODUCTION | **Tech:** Python, PyQt5, Selenium, Multi-threading

## Overview
High-performance scraping system monitoring car auction sites 24/7.

## Challenge
Manually tracking vehicle listings across multiple auction platforms was time-consuming and error-prone.

## Solution
Built automated scraper handling 10,000+ daily listings with real-time processing.

## Technical Features
- Multi-threaded architecture
- Rate limiting and proxy rotation
- Data validation and cleaning
- Real-time notifications
- Database synchronization

## Performance Metrics
- 10,000+ listings processed daily
- 99.9% uptime
- Sub-second response times
- Zero data loss incidents

## Technologies Used
- Python with asyncio
- Selenium WebDriver
- PyQt5 for GUI
- MySQL for data storage
- Redis for caching`
          },
          'revautosale.md': {
            type: 'file',
            content: `# RevAutoSale Backend API
**Status:** LIVE | **Tech:** Django, MySQL, Scrapy, REST Framework

## Overview
Enterprise-grade inventory management API serving 100k+ vehicle records.

## Key Features
- RESTful API design
- Sub-100ms response times
- Automated data cleaning
- Real-time synchronization
- Comprehensive documentation

## Architecture
- Django REST Framework
- MySQL with optimized indexes
- Redis for caching
- Celery for background tasks
- AWS deployment

## Performance
- 100k+ vehicle records managed
- 500+ API requests per minute
- 99.9% uptime maintained
- Zero security incidents

## API Endpoints
- GET /api/vehicles/
- POST /api/vehicles/
- PUT /api/vehicles/{id}/
- DELETE /api/vehicles/{id}/
- GET /api/search/?q={query}`
          }
        }
      },
      'skills': {
        type: 'directory',
        files: {
          'languages.txt': {
            type: 'file',
            content: `PROGRAMMING LANGUAGES
====================

Python        [████████░░] 85%
JavaScript    [████████░░] 80%
TypeScript    [███████░░░] 75%
Java          [██████░░░░] 70%
SQL           [████████░░] 80%

DETAILS:
--------
Python: Web scraping, automation, Django, Flask, FastAPI
JavaScript: React, Node.js, Express, vanilla JS
TypeScript: Type-safe React apps, API development
Java: Object-oriented programming, Spring basics
SQL: MySQL, PostgreSQL, complex queries, optimization`
          },
          'frameworks.txt': {
            type: 'file',
            content: `FRAMEWORKS & TOOLS
==================

Frontend:
- React.js (Advanced)
- Next.js (Advanced)
- Tailwind CSS (Expert)
- Material-UI (Intermediate)
- HTML5/CSS3 (Expert)

Backend:
- Node.js + Express (Advanced)
- Django (Advanced)
- Flask (Intermediate)
- FastAPI (Intermediate)

Data & Automation:
- Scrapy (Expert)
- Selenium (Advanced)
- Pandas (Advanced)
- BeautifulSoup (Expert)

Cloud & DevOps:
- AWS (EC2, S3, App Runner)
- Docker (Intermediate)
- Firebase (Intermediate)
- Git/GitHub (Advanced)`
          },
          'databases.txt': {
            type: 'file',
            content: `DATABASE TECHNOLOGIES
====================

Relational:
- MySQL (Advanced)
- PostgreSQL (Intermediate)
- SQLite (Advanced)

NoSQL:
- MongoDB (Advanced)
- Redis (Intermediate)
- Firebase Firestore (Basic)

Skills:
- Database design and optimization
- Complex query writing
- Index optimization
- Data migration
- Backup and recovery
- Performance tuning`
          }
        }
      }
    }
  }
};

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ type: "command" | "output"; content: string }>>([
    { type: "output", content: "RiazOS Terminal v1.0 - Welcome to the system" },
    { type: "output", content: 'Type "help" for available commands' },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentDir, setCurrentDir] = useState('/')
  const [gitData, setGitData] = useState<any>(null)
  const [gameState, setGameState] = useState<any>(null)
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Fetch GitHub data
  const fetchGitHubData = async () => {
    try {
      const [userResponse, reposResponse, eventsResponse] = await Promise.all([
        fetch('https://api.github.com/users/ahsanriaz786'),
        fetch('https://api.github.com/users/ahsanriaz786/repos?sort=updated&per_page=10'),
        fetch('https://api.github.com/users/ahsanriaz786/events?per_page=10')
      ]);

      const user = await userResponse.json();
      const repos = await reposResponse.json();
      const events = await eventsResponse.json();

      setGitData({ user, repos, events });
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, [])

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/Ahsan Riaz - Resume.pdf'
    link.download = 'Ahsan_Riaz_Resume.pdf'
    link.click()
  }

  const getFileContent = (path: string, filename: string): string => {
    const dirs = path.split('/').filter(Boolean);
    let current = fileSystem['/'];
    
    for (const dir of dirs) {
      if (current.files && current.files[dir] && current.files[dir].type === 'directory') {
        current = current.files[dir] as any;
      }
    }
    
    if (current.files && current.files[filename]) {
      const file = current.files[filename];
      if (file.type === 'file') {
        // Special handling for resume.pdf
        if (filename === 'resume.pdf') {
          return commands["cat resume.pdf"];
        }
        return file.content;
      } else {
        return `cat: ${filename}: Is a directory`;
      }
    }
    
    return `cat: ${filename}: No such file or directory`;
  };

  const changeDirectory = (currentPath: string, targetDir: string): { newPath: string; error?: string } => {
    if (targetDir === '..') {
      const parts = currentPath.split('/').filter(Boolean);
      if (parts.length === 0) return { newPath: '/' };
      parts.pop();
      return { newPath: '/' + parts.join('/') };
    }
    
    if (targetDir === '/' || targetDir === '~') {
      return { newPath: '/' };
    }
    
    const dirs = currentPath.split('/').filter(Boolean);
    let current = fileSystem['/'];
    
    for (const dir of dirs) {
      if (current.files && current.files[dir] && current.files[dir].type === 'directory') {
        current = current.files[dir] as any;
      }
    }
    
    if (current.files && current.files[targetDir] && current.files[targetDir].type === 'directory') {
      const newPath = currentPath === '/' ? `/${targetDir}` : `${currentPath}/${targetDir}`;
      return { newPath };
    }
    
    return { newPath: currentPath, error: `cd: ${targetDir}: No such file or directory` };
  };

  const getGitStatus = () => {
    if (!gitData) {
      return `Fetching git status...
>> Connecting to GitHub API...
>> Please wait while we sync with remote repository...`;
    }

    const { user, repos } = gitData;
    const mainRepo = repos.find((repo: any) => repo.name === 'riazos-portfolio') || repos[0];
    
    return `On branch main
Your branch is up to date with 'origin/main'.

Repository: ${mainRepo?.name || 'riazos-portfolio'}
Remote: ${mainRepo?.html_url || 'https://github.com/ahsanriaz786/riazos-portfolio'}
Last updated: ${mainRepo ? new Date(mainRepo.updated_at).toLocaleString() : 'Recently'}

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
  
    modified:   components/terminal.tsx
    modified:   components/desktop.tsx
    new file:   public/Ahsan Riaz - Resume.pdf

Public repositories: ${user?.public_repos || 0}
Total commits this year: ${user?.contributions || 'Loading...'}
Profile views: ${user?.followers || 0} followers

nothing to commit, working tree clean`;
  };

  const getGitLog = () => {
    if (!gitData) {
      return `Loading commit history...
>> Fetching recent commits from GitHub...`;
    }

    const { events } = gitData;
    const pushEvents = events.filter((event: any) => event.type === 'PushEvent').slice(0, 10);
    
    if (pushEvents.length === 0) {
      return `No recent push events found.
Run 'git activity' to see all GitHub activity.`;
    }

    let output = `Recent commits:\n\n`;
    
    pushEvents.forEach((event: any, index: number) => {
      const date = new Date(event.created_at);
      const shortSha = Math.random().toString(36).substring(2, 9); // Mock SHA
      const repo = event.repo.name.split('/')[1];
      const commits = event.payload.commits || [];
      const message = commits[0]?.message || 'Portfolio updates';
      
      output += `${shortSha} ${message} (${repo}) - ${date.toLocaleDateString()}\n`;
    });

    return output.trim();
  };

  const getGitBranches = () => {
    if (!gitData) {
      return `Loading branches...
>> Connecting to repository...`;
    }

    const { repos } = gitData;
    const mainRepo = repos.find((repo: any) => repo.name === 'riazos-portfolio') || repos[0];
    
    return `Active branches:

* main                    ${mainRepo ? new Date(mainRepo.updated_at).toLocaleDateString() : 'Current'}
  feat/resume            [Recently merged]
  feat/terminal-upgrade  [In development]
  feat/matrix-background [Deployed]
  
Current branch: main
Default branch: main
Total repositories: ${repos.length}

Tip: Use 'git activity' to see recent development activity`;
  };

  const getGitActivity = () => {
    if (!gitData) {
      return `Loading GitHub activity...
>> Fetching real-time data from GitHub API...`;
    }

    const { events, user } = gitData;
    
    let output = `Recent GitHub Activity (Live from API):\n\n`;
    output += `Profile: ${user.login} (${user.name})\n`;
    output += `Public repos: ${user.public_repos} | Followers: ${user.followers}\n`;
    output += `Account created: ${new Date(user.created_at).toLocaleDateString()}\n\n`;
    
    output += `Latest Events:\n`;
    output += `${'='.repeat(50)}\n`;
    
    events.slice(0, 8).forEach((event: any) => {
      const date = new Date(event.created_at);
      const timeAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
      const repo = event.repo.name.split('/')[1];
      
      switch (event.type) {
        case 'PushEvent':
          const commits = event.payload.commits?.length || 1;
          output += `[PUSH] ${commits} commit(s) to ${repo} (${timeAgo}h ago)\n`;
          break;
        case 'CreateEvent':
          output += `[CREATE] ${event.payload.ref_type} in ${repo} (${timeAgo}h ago)\n`;
          break;
        case 'WatchEvent':
          output += `[STAR] Starred ${repo} (${timeAgo}h ago)\n`;
          break;
        case 'IssuesEvent':
          output += `[ISSUE] ${event.payload.action} issue in ${repo} (${timeAgo}h ago)\n`;
          break;
        case 'PullRequestEvent':
          output += `[PR] ${event.payload.action} PR in ${repo} (${timeAgo}h ago)\n`;
          break;
        default:
          output += `[${event.type.replace('Event', '').toUpperCase()}] ${repo} (${timeAgo}h ago)\n`;
      }
    });
    
    output += `\n>> This data is fetched live from GitHub API!`;
    output += `\n>> Last updated: ${new Date().toLocaleString()}`;
    
    return output;
  };

  // Game implementations
  const initSnakeGame = () => {
    return {
      board: Array(15).fill().map(() => Array(15).fill('.')),
      snake: [[7, 7], [7, 6], [7, 5]],
      food: [3, 3],
      direction: 'RIGHT',
      gameOver: false,
      score: 0
    };
  };

  const renderSnakeGame = (state: any) => {
    const board = Array(15).fill().map(() => Array(15).fill('.'));
    
    // Place food
    board[state.food[0]][state.food[1]] = 'F';
    
    // Place snake
    state.snake.forEach((segment: number[], index: number) => {
      if (index === 0) {
        board[segment[0]][segment[1]] = 'H'; // Head
      } else {
        board[segment[0]][segment[1]] = 'O'; // Body
      }
    });

    let output = `SNAKE GAME - Score: ${state.score}\n`;
    output += `Controls: w(up) a(left) s(down) d(right) q(quit)\n\n`;
    output += '+' + '-'.repeat(15) + '+\n';
    
    board.forEach(row => {
      output += '|' + row.join('') + '|\n';
    });
    
    output += '+' + '-'.repeat(15) + '+\n';
    
    if (state.gameOver) {
      output += `\nGAME OVER! Final Score: ${state.score}\n`;
      output += 'Type "snake" to play again or any other command to exit.';
    } else {
      output += '\nF = Food, H = Head, O = Body';
    }
    
    return output;
  };

  const moveSnake = (state: any, direction: string) => {
    if (state.gameOver) return state;
    
    const directions: {[key: string]: number[]} = {
      'w': [-1, 0], 'a': [0, -1], 's': [1, 0], 'd': [0, 1]
    };
    
    if (!directions[direction]) return state;
    
    const move = directions[direction];
    const head = state.snake[0];
    const newHead = [head[0] + move[0], head[1] + move[1]];
    
    // Check boundaries
    if (newHead[0] < 0 || newHead[0] >= 15 || newHead[1] < 0 || newHead[1] >= 15) {
      return { ...state, gameOver: true };
    }
    
    // Check self collision
    if (state.snake.some((segment: number[]) => segment[0] === newHead[0] && segment[1] === newHead[1])) {
      return { ...state, gameOver: true };
    }
    
    const newSnake = [newHead, ...state.snake];
    let newFood = state.food;
    let newScore = state.score;
    
    // Check if food eaten
    if (newHead[0] === state.food[0] && newHead[1] === state.food[1]) {
      newScore += 10;
      // Generate new food position
      do {
        newFood = [Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)];
      } while (newSnake.some((segment: number[]) => segment[0] === newFood[0] && segment[1] === newFood[1]));
    } else {
      newSnake.pop(); // Remove tail if no food eaten
    }
    
    return {
      ...state,
      snake: newSnake,
      food: newFood,
      score: newScore
    };
  };

  const init2048Game = () => {
    const board = Array(4).fill().map(() => Array(4).fill(0));
    // Add two initial tiles
    addRandomTile(board);
    addRandomTile(board);
    return {
      board,
      score: 0,
      gameOver: false,
      won: false
    };
  };

  const addRandomTile = (board: number[][]) => {
    const empty: number[][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      const pos = empty[Math.floor(Math.random() * empty.length)];
      board[pos[0]][pos[1]] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const render2048Game = (state: any) => {
    let output = `2048 GAME - Score: ${state.score}\n`;
    output += `Controls: w(up) a(left) s(down) d(right) q(quit)\n\n`;
    
    output += '+' + '------+'.repeat(4) + '\n';
    
    state.board.forEach((row: number[]) => {
      output += '|';
      row.forEach((cell: number) => {
        const display = cell === 0 ? '    ' : cell.toString().padStart(4);
        output += display + '  |';
      });
      output += '\n+' + '------+'.repeat(4) + '\n';
    });
    
    if (state.won) {
      output += '\nCONGRATULATIONS! You reached 2048!\n';
    } else if (state.gameOver) {
      output += '\nGAME OVER! No more moves available.\n';
    }
    
    output += '\nCombine tiles to reach 2048!';
    return output;
  };

  const move2048 = (state: any, direction: string) => {
    if (state.gameOver || state.won) return state;
    
    const newBoard = state.board.map((row: number[]) => [...row]);
    let moved = false;
    let newScore = state.score;
    
    const moveLeft = (board: number[][]) => {
      for (let i = 0; i < 4; i++) {
        const row = board[i].filter(val => val !== 0);
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            newScore += row[j];
            row[j + 1] = 0;
            if (row[j] === 2048) state.won = true;
          }
        }
        const newRow = row.filter(val => val !== 0);
        while (newRow.length < 4) newRow.push(0);
        
        for (let j = 0; j < 4; j++) {
          if (board[i][j] !== newRow[j]) moved = true;
          board[i][j] = newRow[j];
        }
      }
    };
    
    // Transform board based on direction
    if (direction === 'a') {
      moveLeft(newBoard);
    } else if (direction === 'd') {
      // Reverse, move left, reverse back
      newBoard.forEach(row => row.reverse());
      moveLeft(newBoard);
      newBoard.forEach(row => row.reverse());
    } else if (direction === 'w') {
      // Transpose, move left, transpose back
      const transposed = newBoard[0].map((_, i) => newBoard.map(row => row[i]));
      moveLeft(transposed);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (newBoard[i][j] !== transposed[j][i]) moved = true;
          newBoard[i][j] = transposed[j][i];
        }
      }
    } else if (direction === 's') {
      // Transpose, reverse, move left, reverse, transpose back
      const transposed = newBoard[0].map((_, i) => newBoard.map(row => row[i]));
      transposed.forEach(row => row.reverse());
      moveLeft(transposed);
      transposed.forEach(row => row.reverse());
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (newBoard[i][j] !== transposed[j][i]) moved = true;
          newBoard[i][j] = transposed[j][i];
        }
      }
    }
    
    if (moved) {
      addRandomTile(newBoard);
    }
    
    // Check game over
    const hasEmptyCell = newBoard.some(row => row.includes(0));
    const canMove = () => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (j < 3 && newBoard[i][j] === newBoard[i][j + 1]) return true;
          if (i < 3 && newBoard[i][j] === newBoard[i + 1][j]) return true;
        }
      }
      return false;
    };
    
    const gameOver = !hasEmptyCell && !canMove();
    
    return {
      board: newBoard,
      score: newScore,
      gameOver,
      won: state.won
    };
  };

  const initGuessGame = () => {
    return {
      target: Math.floor(Math.random() * 100) + 1,
      attempts: 0,
      guesses: [],
      gameOver: false,
      won: false
    };
  };

  const renderGuessGame = (state: any) => {
    let output = `NUMBER GUESSING GAME\n`;
    output += `Guess a number between 1 and 100!\n`;
    output += `Attempts: ${state.attempts}\n\n`;
    
    if (state.guesses.length > 0) {
      output += `Your guesses:\n`;
      state.guesses.forEach((guess: any) => {
        output += `${guess.number} - ${guess.hint}\n`;
      });
      output += '\n';
    }
    
    if (state.won) {
      output += `CONGRATULATIONS! You guessed ${state.target} in ${state.attempts} attempts!\n`;
      output += 'Type "guess" to play again.';
    } else if (state.gameOver) {
      output += `Game Over! The number was ${state.target}.\n`;
      output += 'Type "guess" to play again.';
    } else {
      output += 'Enter your guess (1-100) or "q" to quit:';
    }
    
    return output;
  };

  const makeGuess = (state: any, input: string) => {
    if (state.gameOver || state.won) return state;
    
    const guess = parseInt(input);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      return state;
    }
    
    const attempts = state.attempts + 1;
    const guesses = [...state.guesses];
    
    let hint = '';
    let won = false;
    let gameOver = false;
    
    if (guess === state.target) {
      hint = 'CORRECT!';
      won = true;
    } else if (guess < state.target) {
      hint = 'Too low!';
    } else {
      hint = 'Too high!';
    }
    
    if (attempts >= 10 && !won) {
      gameOver = true;
    }
    
    guesses.push({ number: guess, hint });
    
    return {
      ...state,
      attempts,
      guesses,
      gameOver,
      won
    };
  };

  const getGamesMenu = () => {
    return `AVAILABLE GAMES:

[1] snake  - Classic Snake Game
    Navigate the snake to eat food and grow!
    Controls: w(up) a(left) s(down) d(right)

[2] 2048   - Number Puzzle Game  
    Combine tiles to reach 2048!
    Controls: w(up) a(left) s(down) d(right)

[3] guess  - Number Guessing Game
    Guess the secret number between 1-100!
    10 attempts to find the right number.

Type the game name to start playing!
Type 'q' during any game to quit back to terminal.

>> These games showcase interactive programming skills!`;

  const handleCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle game input differently
    if (currentGame) {
      const input = cmd.trim().toLowerCase();
      
      // Check for quit command
      if (input === 'q' || input === 'quit') {
        setCurrentGame(null);
        setGameState(null);
        setHistory((prev) => [...prev, { type: "output", content: "Game ended. Back to terminal." }])
        return;
      }
      
      // Handle game-specific input
      if (currentGame === 'snake') {
        if (['w', 'a', 's', 'd'].includes(input)) {
          const newState = moveSnake(gameState, input);
          setGameState(newState);
          setHistory((prev) => [...prev, { type: "output", content: renderSnakeGame(newState) }])
        }
      } else if (currentGame === '2048') {
        if (['w', 'a', 's', 'd'].includes(input)) {
          const newState = move2048(gameState, input);
          setGameState(newState);
          setHistory((prev) => [...prev, { type: "output", content: render2048Game(newState) }])
        }
      } else if (currentGame === 'guess') {
        const newState = makeGuess(gameState, input);
        setGameState(newState);
        setHistory((prev) => [...prev, { type: "output", content: renderGuessGame(newState) }])
        
        if (newState.won || newState.gameOver) {
          setCurrentGame(null);
          setGameState(null);
        }
      }
      return;
    }

    // Add command to history with current directory
    const prompt = `riaz@portfolio:${currentDir === '/' ? '~' : currentDir}$`;
    setHistory((prev) => [...prev, { type: "command", content: `${prompt} ${cmd}` }])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Handle special commands
    if (command === "clear") {
      setHistory([])
      return
    }

    if (command === "pwd") {
      setHistory((prev) => [...prev, { type: "output", content: currentDir }])
      return
    }

    if (command === "ls") {
      const output = commands.ls(currentDir);
      setHistory((prev) => [...prev, { type: "output", content: output }])
      return
    }

    if (command === "cd") {
      const targetDir = args[0] || '/';
      const result = changeDirectory(currentDir, targetDir);
      if (result.error) {
        setHistory((prev) => [...prev, { type: "output", content: result.error }])
      } else {
        setCurrentDir(result.newPath);
      }
      return
    }

    if (command === "cat") {
      const filename = args[0];
      if (!filename) {
        setHistory((prev) => [...prev, { type: "output", content: "cat: missing file operand" }])
        return
      }
      const content = getFileContent(currentDir, filename);
      setHistory((prev) => [...prev, { type: "output", content: content }])
      return
    }

    // Handle git commands
    if (command === "git") {
      const subCommand = args[0];
      let output = "";
      
      switch (subCommand) {
        case "status":
          output = getGitStatus();
          break;
        case "log":
          output = getGitLog();
          break;
        case "branch":
          output = getGitBranches();
          break;
        case "activity":
          output = getGitActivity();
          break;
        default:
          output = `git: '${subCommand}' is not a git command. Available: status, log, branch, activity`;
      }
      
      setHistory((prev) => [...prev, { type: "output", content: output }])
      return
    }

    // Handle game commands
    if (command === "games") {
      setHistory((prev) => [...prev, { type: "output", content: getGamesMenu() }])
      return
    }

    if (command === "snake") {
      const snakeState = initSnakeGame();
      setCurrentGame('snake');
      setGameState(snakeState);
      setHistory((prev) => [...prev, { type: "output", content: renderSnakeGame(snakeState) }])
      return
    }

    if (command === "2048") {
      const game2048State = init2048Game();
      setCurrentGame('2048');
      setGameState(game2048State);
      setHistory((prev) => [...prev, { type: "output", content: render2048Game(game2048State) }])
      return
    }

    if (command === "guess") {
      const guessState = initGuessGame();
      setCurrentGame('guess');
      setGameState(guessState);
      setHistory((prev) => [...prev, { type: "output", content: renderGuessGame(guessState) }])
      return
    }

    // Handle resume download commands
    if (command === "resume" || command === "download-resume") {
      downloadResume()
    }

    // Check if command exists in static commands
    const staticCommand = cmd.trim().toLowerCase();
    const output =
      commands[staticCommand as keyof typeof commands] ||
      `Command not found: ${command}. Type 'help' for available commands.`

    setHistory((prev) => [...prev, { type: "output", content: output }])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (currentInput.trim()) {
        handleCommand(currentInput)
      }
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div
      className="bg-black text-[#00FF41] font-mono text-sm h-full flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalRef} className="flex-1 overflow-auto p-4 space-y-1">
        {history.map((entry, index) => (
          <div key={index} className={entry.type === "command" ? "text-[#00FF41]" : "text-white"}>
            <pre className="whitespace-pre-wrap font-mono">{entry.content}</pre>
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-[#00FF41] mr-2">
            {currentGame ? `[${currentGame.toUpperCase()}]>` : `riaz@portfolio:${currentDir === '/' ? '~' : currentDir}$`}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
            autoFocus
          />
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}
