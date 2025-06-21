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
  Mail,
  RefreshCw,
  Settings,
  Info,
  Folder,
  Image,
  Palette,
  MousePointer,
  Menu,
  Power,
  User,
  HardDrive,
  Wifi,
  Volume2,
  Battery,
  Bell,
  Search,
  Grid3X3,
  LogOut,
  RotateCcw,
  Download
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

interface ContextMenu {
  visible: boolean
  x: number
  y: number
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

function DesktopContextMenu({ contextMenu, onClose, onAction }: {
  contextMenu: ContextMenu
  onClose: () => void
  onAction: (action: string) => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [contextMenu.visible, onClose])

  if (!contextMenu.visible) return null

  const menuItems = [
    { icon: <RefreshCw size={16} />, label: "Refresh Desktop", action: "refresh" },
    { icon: <Folder size={16} />, label: "New Folder", action: "new-folder", disabled: true },
    { icon: <Image size={16} />, label: "Set Wallpaper", action: "wallpaper", disabled: true },
    "separator",
    { icon: <TerminalIcon size={16} />, label: "Open Terminal", action: "terminal" },
    { icon: <Activity size={16} />, label: "Process Manager", action: "process-manager" },
    "separator",
    { icon: <Palette size={16} />, label: "Personalize", action: "personalize", disabled: true },
    { icon: <Settings size={16} />, label: "Desktop Settings", action: "settings", disabled: true },
    "separator",
    { icon: <Info size={16} />, label: "About RIAZ.OS", action: "about" },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#1a1a1a] border border-[#00FF41] border-opacity-30 rounded-md shadow-lg py-1 z-50 min-w-[200px]"
      style={{
        left: contextMenu.x,
        top: contextMenu.y,
        transform: `translate(${contextMenu.x + 200 > window.innerWidth ? '-100%' : '0'}, ${contextMenu.y + 300 > window.innerHeight ? '-100%' : '0'})`
      }}
    >
      {menuItems.map((item, index) => {
        if (item === "separator") {
          return (
            <div key={index} className="h-px bg-[#00FF41] bg-opacity-20 my-1 mx-2" />
          )
        }

        const menuItem = item as { icon: React.ReactNode; label: string; action: string; disabled?: boolean }
        
        return (
          <button
            key={index}
            onClick={() => {
              if (!menuItem.disabled) {
                onAction(menuItem.action)
                onClose()
              }
            }}
            disabled={menuItem.disabled}
            className={`w-full flex items-center px-3 py-2 text-sm font-mono transition-colors ${
              menuItem.disabled 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-[#00FF41] hover:bg-[#00FF41] hover:bg-opacity-10 hover:text-white cursor-pointer'
            }`}
          >
            <span className="mr-3">{menuItem.icon}</span>
            {menuItem.label}
          </button>
        )
      })}
    </div>
  )
}

function StartMenu({ isOpen, onClose, onAction }: {
  isOpen: boolean
  onClose: () => void
  onAction: (action: string) => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const quickActions = [
    { icon: <TerminalIcon size={18} />, label: "Terminal", action: "terminal" },
    { icon: <Activity size={18} />, label: "Process Manager", action: "process-manager" },
    { icon: <FolderOpen size={18} />, label: "Tech Stack", action: "tech-stack" },
    { icon: <History size={18} />, label: "Chronos", action: "chronos" },
    { icon: <FileText size={18} />, label: "README", action: "readme" },
    { icon: <Shield size={18} />, label: "Contact", action: "contact" },
  ]

  const systemActions = [
    { icon: <Settings size={18} />, label: "Settings", action: "settings", disabled: true },
    { icon: <HardDrive size={18} />, label: "File Manager", action: "file-manager", disabled: true },
    { icon: <Search size={18} />, label: "Search", action: "search", disabled: true },
    "separator",
    { icon: <RotateCcw size={18} />, label: "Restart", action: "restart" },
    { icon: <Power size={18} />, label: "Shutdown", action: "shutdown" },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bottom-12 left-4 bg-[#1a1a1a] border border-[#00FF41] border-opacity-30 rounded-lg shadow-xl p-4 z-50 w-80"
    >
      {/* User Info */}
      <div className="flex items-center mb-4 p-3 bg-[#00FF41] bg-opacity-10 rounded-lg">
        <div className="w-10 h-10 bg-[#00FF41] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
          <User size={20} className="text-[#00FF41]" />
        </div>
        <div>
          <div className="text-[#00FF41] font-mono font-bold">Ahsan Riaz</div>
          <div className="text-gray-400 text-xs font-mono">Developer</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <div className="text-[#00FF41] text-xs font-mono mb-2 opacity-70">QUICK ACCESS</div>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                onAction(action.action)
                onClose()
              }}
              className="flex items-center p-2 rounded-md hover:bg-[#00FF41] hover:bg-opacity-10 transition-colors text-left"
            >
              <span className="text-[#00FF41] mr-2">{action.icon}</span>
              <span className="text-[#00FF41] text-sm font-mono truncate">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Actions */}
      <div>
        <div className="text-[#00FF41] text-xs font-mono mb-2 opacity-70">SYSTEM</div>
        {systemActions.map((action, index) => {
          if (action === "separator") {
            return (
              <div key={index} className="h-px bg-[#00FF41] bg-opacity-20 my-2" />
            )
          }

          const systemAction = action as { icon: React.ReactNode; label: string; action: string; disabled?: boolean }
          
          return (
            <button
              key={index}
              onClick={() => {
                if (!systemAction.disabled) {
                  onAction(systemAction.action)
                  onClose()
                }
              }}
              disabled={systemAction.disabled}
              className={`w-full flex items-center p-2 rounded-md transition-colors text-left ${
                systemAction.disabled 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'text-[#00FF41] hover:bg-[#00FF41] hover:bg-opacity-10'
              }`}
            >
              <span className="mr-3">{systemAction.icon}</span>
              <span className="text-sm font-mono">{systemAction.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SystemTray({ currentTime }: { currentTime: Date }) {
  const [notifications, setNotifications] = useState(0)

  useEffect(() => {
    // Simulate occasional notifications
    const notificationTimer = setInterval(() => {
      if (Math.random() > 0.95) {
        setNotifications(prev => prev + 1)
      }
    }, 5000)

    return () => clearInterval(notificationTimer)
  }, [])

  const clearNotifications = () => setNotifications(0)

  return (
    <div className="flex items-center space-x-2 text-[#00FF41]">
      {/* System Status Icons */}
      <div className="flex items-center space-x-1">
        <Wifi size={16} className="opacity-80" />
        <Volume2 size={16} className="opacity-80" />
        <Battery size={16} className="opacity-80" />
      </div>

      {/* Notifications */}
      {notifications > 0 && (
        <button
          onClick={clearNotifications}
          className="relative hover:bg-[#00FF41] hover:bg-opacity-10 p-1 rounded"
        >
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications}
          </span>
        </button>
      )}

      {/* Date and Time */}
      <div className="text-right">
        <div className="text-xs font-mono">{currentTime.toLocaleDateString()}</div>
        <div className="text-sm font-mono">{currentTime.toLocaleTimeString()}</div>
      </div>
    </div>
  )
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ visible: false, x: 0, y: 0 })
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 })
  }

  const handleContextAction = (action: string) => {
    switch (action) {
      case "refresh":
        window.location.reload()
        break
      case "terminal":
        openWindow("terminal")
        break
      case "process-manager":
        openWindow("process-manager")
        break
      case "about":
        alert("RIAZ.OS v2024.12\nBuilt Different\n\nA portfolio operating system experience\nDeveloped by Ahsan Riaz")
        break
      default:
        console.log(`Action: ${action}`)
    }
  }

  const handleStartMenuAction = (action: string) => {
    switch (action) {
      case "terminal":
      case "process-manager":
      case "tech-stack":
      case "chronos":
      case "readme":
      case "contact":
        openWindow(action)
        break
      case "restart":
        if (confirm("Are you sure you want to restart RIAZ.OS?")) {
          window.location.reload()
        }
        break
      case "shutdown":
        if (confirm("Are you sure you want to shutdown RIAZ.OS?")) {
          window.close()
        }
        break
      default:
        console.log(`Start menu action: ${action}`)
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
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onContextMenu={handleRightClick}
    >
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

      {/* System Info - Simplified since we have system tray now */}
      <div className="absolute bottom-4 right-4 text-[#00FF41] font-mono text-xs opacity-60 z-10 bg-black bg-opacity-30 px-2 py-1 rounded">
        RIAZ.OS v2024.12
      </div>

      {/* Context Menu */}
      <DesktopContextMenu 
        contextMenu={contextMenu}
        onClose={closeContextMenu}
        onAction={handleContextAction}
      />

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onAction={handleStartMenuAction}
      />

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

      {/* Enhanced Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-[#141414] bg-opacity-90 backdrop-blur-sm border-t border-[#00FF41] border-opacity-30 flex items-center px-4 z-20">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`flex items-center px-4 py-2 rounded-md mr-4 transition-colors font-mono ${
            startMenuOpen ? "bg-[#00FF41] text-black" : "bg-[#333] text-[#00FF41] hover:bg-[#444]"
          }`}
        >
          <Grid3X3 size={18} className="mr-2" />
          <span className="text-sm">START</span>
        </button>

        {/* Window List */}
        <div className="flex space-x-2 flex-1">
          {openWindows.map((windowId) => {
            const icon = desktopIcons.find((i) => i.id === windowId)
            return (
              <button
                key={windowId}
                onClick={() => setActiveWindow(windowId)}
                className={`px-3 py-2 rounded text-xs font-mono transition-colors max-w-32 truncate ${
                  activeWindow === windowId ? "bg-[#00FF41] text-black" : "bg-[#333] text-[#00FF41] hover:bg-[#444]"
                }`}
                title={icon?.label}
              >
                {icon?.label}
              </button>
            )
          })}
        </div>

        {/* System Tray */}
        <SystemTray currentTime={currentTime} />
      </div>
    </div>
  )
}
