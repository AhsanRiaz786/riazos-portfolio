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
neofetch              - System information
clear                 - Clear terminal
whoami                - Current user info
ls                    - List directory contents
cat [filename]        - Display file contents
easter_egg            - Find the hidden surprise`,

  about: `NAME: Ahsan Riaz
ROLE: Full-Stack Developer & Problem Solver
LOCATION: Islamabad, Pakistan
EDUCATION: BSCS at NUST (CGPA: 3.26/4.00)

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

2021-09 → Started BSCS at NUST
2022-03 → Built first web scraper
2022-08 → Discovered React development
2023-01 → First Upwork client ($200 project)
2023-06 → Launched freelance career
2024-06 → Software Developer Intern at Arbisoft
2024-07 → Returned to freelancing with new skills
2024-12 → Top Rated on Upwork, 15+ projects completed

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

  ls: `total 6
drwxr-xr-x  2 ahsan ahsan 4096 Dec 15 10:00 projects/
drwxr-xr-x  2 ahsan ahsan 4096 Dec 15 10:00 skills/
-rw-r--r--  1 ahsan ahsan 2048 Dec 15 10:00 README.md
-rw-r--r--  1 ahsan ahsan 1024 Dec 15 10:00 contact.txt
-rw-r--r--  1 ahsan ahsan  512 Dec 15 10:00 resume.pdf`,

  "contact --secure": `ESTABLISHING SECURE CONNECTION...
ENCRYPTION: AES-256 ✓
IDENTITY VERIFIED ✓

CONTACT_PROTOCOLS_AVAILABLE:

[1] EMAIL_DIRECT
    Address: ahsanriaz8000@gmail.com
    Protocol: SMTP (Secure)  
    Response Time: < 24 hours
    
[2] LINKEDIN_NETWORK
    Profile: /in/ahsan-riaz-dev
    Protocol: Professional Network
    Connection: Always Open
    
[3] GITHUB_REPOSITORY  
    Username: @ahsanriaz786
    Protocol: Git/HTTPS
    Contributions: Daily
    
[4] UPWORK_PLATFORM
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
Let's build something amazing together! 🚀`,
}

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ type: "command" | "output"; content: string }>>([
    { type: "output", content: "RiazOS Terminal v1.0 - Welcome to the system" },
    { type: "output", content: 'Type "help" for available commands' },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    // Add command to history
    setHistory((prev) => [...prev, { type: "command", content: `riaz@portfolio:~$ ${cmd}` }])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)

    // Handle special commands
    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    // Check if command exists
    const output =
      commands[trimmedCmd as keyof typeof commands] ||
      commands[cmd.trim() as keyof typeof commands] ||
      `Command not found: ${cmd}. Type 'help' for available commands.`

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
          <span className="text-[#00FF41] mr-2">riaz@portfolio:~$</span>
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
