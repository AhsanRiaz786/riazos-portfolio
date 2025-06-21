"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Activity, 
  FolderOpen, 
  Clock, 
  FileText, 
  Terminal as TerminalIcon, 
  Shield,
  Monitor,
  Code,
  History,
  Mail
} from "lucide-react"
import DesktopIcon from "./desktop-icon"
import Window from "./window"
import ProcessManager from "./process-manager"
import TechStack from "./tech-stack"
import Chronos from "./chronos"
import ReadMe from "./readme"
import Terminal from "./terminal"
import Contact from "./contact"

// Matrix characters for the rain effect
const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

interface RainDrop {
  id: number
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  trail: Array<{ char: string; opacity: number }>
}

const desktopIcons = [
  {
    id: "process-manager",
    label: "//PROCESS_MANAGER",
    description: "Active Projects & Live Systems",
    icon: <Activity size={24} strokeWidth={1.5} />,
  },
  {
    id: "tech-stack",
    label: "/tech_stack",
    description: "Tools, Languages & Frameworks",
    icon: <FolderOpen size={24} strokeWidth={1.5} />,
  },
  {
    id: "chronos",
    label: "CHRONOS.log",
    description: "Professional Journey & Experience",
    icon: <History size={24} strokeWidth={1.5} />,
  },
  {
    id: "readme",
    label: "README.md",
    description: "About the Human Behind the Code",
    icon: <FileText size={24} strokeWidth={1.5} />,
  },
  {
    id: "terminal",
    label: "TERMINAL",
    description: "Direct System Access",
    icon: <TerminalIcon size={24} strokeWidth={1.5} />,
  },
  {
    id: "contact",
    label: "SECURE_CONNECTION",
    description: "Establish Contact Protocol",
    icon: <Shield size={24} strokeWidth={1.5} />,
  },
]

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const fontSize = 14
    const columns = Math.floor(dimensions.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    let animationId: number

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00FF41'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        
        // Calculate position
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Create gradient effect for each drop
        const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y)
        gradient.addColorStop(0, 'rgba(0, 255, 65, 0)')
        gradient.addColorStop(0.7, 'rgba(0, 255, 65, 0.8)')
        gradient.addColorStop(1, 'rgba(0, 255, 65, 1)')
        
        ctx.fillStyle = gradient
        ctx.fillText(char, x, y)

        // Reset drop if it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20"
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  )
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows((prev) => [...prev, windowId])
    }
    setActiveWindow(windowId)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((id) => id !== windowId))
    if (activeWindow === windowId) {
      const remaining = openWindows.filter((id) => id !== windowId)
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null)
    }
  }

  const renderWindowContent = (windowId: string) => {
    switch (windowId) {
      case "process-manager":
        return <ProcessManager />
      case "tech-stack":
        return <TechStack />
      case "chronos":
        return <Chronos />
      case "readme":
        return <ReadMe />
      case "terminal":
        return <Terminal />
      case "contact":
        return <Contact />
      default:
        return <div>Window content not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Desktop Icons */}
      <div className="absolute left-8 top-8 space-y-4 z-10">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            onClick={() => openWindow(icon.id)}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* System Info */}
      <div className="absolute top-4 right-4 text-[#00FF41] font-mono text-sm z-10 bg-black bg-opacity-30 px-2 py-1 rounded">
        <div>{new Date().toLocaleTimeString()}</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[#00FF41] font-mono text-xs opacity-60 z-10 bg-black bg-opacity-30 px-2 py-1 rounded">
        RIAZ.OS v2024.12
      </div>

      {/* Windows */}
      {openWindows.map((windowId) => {
        const icon = desktopIcons.find((i) => i.id === windowId)
        return (
          <Window
            key={windowId}
            title={icon?.label || "Unknown"}
            isActive={activeWindow === windowId}
            onClose={() => closeWindow(windowId)}
            onFocus={() => setActiveWindow(windowId)}
          >
            {renderWindowContent(windowId)}
          </Window>
        )
      })}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#141414] bg-opacity-80 backdrop-blur-sm border-t border-[#00FF41] border-opacity-30 flex items-center px-4 z-20">
        <div className="flex space-x-2">
          {openWindows.map((windowId) => {
            const icon = desktopIcons.find((i) => i.id === windowId)
            return (
              <button
                key={windowId}
                onClick={() => setActiveWindow(windowId)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  activeWindow === windowId ? "bg-[#00FF41] text-black" : "bg-[#333] text-[#00FF41] hover:bg-[#444]"
                }`}
              >
                {icon?.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
