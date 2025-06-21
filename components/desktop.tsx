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
  Download,
  Cpu,
  MemoryStick,
  Network,
  Cloud,
  Sun,
  CloudRain,
  Music,
  Play,
  Pause,
  SkipForward,
  TrendingUp,
  DollarSign,
  Bitcoin,
  StickyNote,
  X,
  Maximize2,
  Minimize2
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

interface Widget {
  id: string
  name: string
  component: React.ComponentType
  defaultPosition: { x: number; y: number }
  size: { width: number; height: number }
  visible: boolean
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

function SystemMonitorWidget() {
  const [stats, setStats] = useState({
    cpu: 0,
    ram: 0,
    network: 0
  })

  useEffect(() => {
    const updateStats = () => {
      setStats({
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000)
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Cpu size={16} className="text-[#00FF41]" />
        <div className="flex-1">
          <div className="flex justify-between text-xs">
            <span>CPU</span>
            <span>{stats.cpu}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div 
              className="bg-[#00FF41] h-2 rounded transition-all duration-500"
              style={{ width: `${stats.cpu}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <MemoryStick size={16} className="text-[#00FF41]" />
        <div className="flex-1">
          <div className="flex justify-between text-xs">
            <span>RAM</span>
            <span>{stats.ram}%</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div 
              className="bg-[#00FF41] h-2 rounded transition-all duration-500"
              style={{ width: `${stats.ram}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Network size={16} className="text-[#00FF41]" />
        <div className="flex-1">
          <div className="flex justify-between text-xs">
            <span>NET</span>
            <span>{stats.network} KB/s</span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded">
            <div 
              className="bg-[#00FF41] h-2 rounded transition-all duration-500"
              style={{ width: `${Math.min(stats.network / 10, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 22,
    condition: 'clear',
    humidity: 45,
    wind: 12
  })

  useEffect(() => {
    const updateWeather = () => {
      const conditions = ['clear', 'cloudy', 'rain']
      setWeather({
        temp: Math.floor(Math.random() * 30) + 10,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 100),
        wind: Math.floor(Math.random() * 30)
      })
    }

    const interval = setInterval(updateWeather, 10000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'clear': return <Sun size={24} className="text-yellow-400" />
      case 'cloudy': return <Cloud size={24} className="text-gray-400" />
      case 'rain': return <CloudRain size={24} className="text-blue-400" />
      default: return <Sun size={24} className="text-yellow-400" />
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        {getWeatherIcon()}
        <div>
          <div className="text-2xl font-bold">{weather.temp}°C</div>
          <div className="text-xs text-gray-400 capitalize">{weather.condition}</div>
        </div>
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Humidity</span>
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span>Wind</span>
          <span>{weather.wind} km/h</span>
        </div>
        <div className="flex justify-between">
          <span>Location</span>
          <span>Matrix City</span>
        </div>
      </div>
    </div>
  )
}

function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Digital Dreams",
    artist: "Neo & The Machines",
    duration: "3:42"
  })

  const tracks = [
    { title: "Digital Dreams", artist: "Neo & The Machines", duration: "3:42" },
    { title: "Code Runner", artist: "Binary Beats", duration: "4:15" },
    { title: "Matrix Flow", artist: "Cyber Symphony", duration: "2:58" },
    { title: "Electron Dance", artist: "Quantum Waves", duration: "3:33" }
  ]

  const nextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.title === currentTrack.title)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Music size={16} className="text-[#00FF41]" />
        <span className="text-xs">NOW PLAYING</span>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm font-bold truncate">{currentTrack.title}</div>
        <div className="text-xs text-gray-400 truncate">{currentTrack.artist}</div>
        <div className="text-xs text-gray-500">{currentTrack.duration}</div>
      </div>
      
      <div className="flex justify-center space-x-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-[#00FF41] bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={nextTrack}
          className="p-2 bg-[#00FF41] bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
        >
          <SkipForward size={16} />
        </button>
      </div>
      
      {/* Simple visualizer */}
      {isPlaying && (
        <div className="flex justify-center space-x-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#00FF41] rounded animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 100}ms`,
                animationDuration: `${500 + Math.random() * 1000}ms`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CryptoWidget() {
  const [crypto, setCrypto] = useState([
    { symbol: 'BTC', price: 45230.50, change: 2.3 },
    { symbol: 'ETH', price: 3024.75, change: -1.2 },
    { symbol: 'SOL', price: 98.42, change: 5.7 }
  ])

  useEffect(() => {
    const updatePrices = () => {
      setCrypto(prev => prev.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * coin.price * 0.05,
        change: (Math.random() - 0.5) * 10
      })))
    }

    const interval = setInterval(updatePrices, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mb-3">
        <Bitcoin size={16} className="text-[#00FF41]" />
        <span className="text-xs">CRYPTO TRACKER</span>
      </div>
      
      {crypto.map((coin) => (
        <div key={coin.symbol} className="flex justify-between items-center">
          <div>
            <div className="text-sm font-bold">{coin.symbol}</div>
            <div className="text-xs text-gray-400">
              ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className={`text-xs flex items-center space-x-1 ${
            coin.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp size={12} className={coin.change < 0 ? 'rotate-180' : ''} />
            <span>{coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function DesktopWidget({ widget, onClose }: { widget: Widget; onClose: () => void }) {
  const [position, setPosition] = useState(widget.defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div
      className="fixed bg-[#1a1a1a] bg-opacity-95 border border-[#00FF41] border-opacity-30 rounded-lg shadow-xl z-30"
      style={{
        left: position.x,
        top: position.y,
        width: widget.size.width,
        height: widget.size.height,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Widget Header */}
      <div
        className="flex items-center justify-between p-2 border-b border-[#00FF41] border-opacity-20 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <span className="text-[#00FF41] text-xs font-mono font-bold">{widget.name}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      
      {/* Widget Content */}
      <div className="p-3 text-[#00FF41] font-mono text-sm">
        <widget.component />
      </div>
    </div>
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
    { icon: <Monitor size={16} />, label: "System Monitor", action: "widget-system" },
    { icon: <Cloud size={16} />, label: "Weather Widget", action: "widget-weather" },
    { icon: <Music size={16} />, label: "Music Player", action: "widget-music" },
    { icon: <Bitcoin size={16} />, label: "Crypto Tracker", action: "widget-crypto" },
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
        transform: `translate(${contextMenu.x + 200 > window.innerWidth ? '-100%' : '0'}, ${contextMenu.y + 400 > window.innerHeight ? '-100%' : '0'})`
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
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'system-monitor',
      name: 'SYSTEM_MONITOR',
      component: SystemMonitorWidget,
      defaultPosition: { x: window.innerWidth - 250, y: 80 },
      size: { width: 220, height: 180 },
      visible: false
    },
    {
      id: 'weather',
      name: 'WEATHER_STATION',
      component: WeatherWidget,
      defaultPosition: { x: window.innerWidth - 250, y: 280 },
      size: { width: 220, height: 160 },
      visible: false
    },
    {
      id: 'music',
      name: 'MUSIC_PLAYER',
      component: MusicWidget,
      defaultPosition: { x: window.innerWidth - 250, y: 460 },
      size: { width: 220, height: 200 },
      visible: false
    },
    {
      id: 'crypto',
      name: 'CRYPTO_TRACKER',
      component: CryptoWidget,
      defaultPosition: { x: window.innerWidth - 480, y: 80 },
      size: { width: 200, height: 180 },
      visible: false
    }
  ])

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

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, visible: !widget.visible }
        : widget
    ))
  }

  const closeWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, visible: false }
        : widget
    ))
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
      case "widget-system":
        toggleWidget("system-monitor")
        break
      case "widget-weather":
        toggleWidget("weather")
        break
      case "widget-music":
        toggleWidget("music")
        break
      case "widget-crypto":
        toggleWidget("crypto")
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

      {/* Desktop Widgets */}
      {widgets.filter(widget => widget.visible).map((widget) => (
        <DesktopWidget
          key={widget.id}
          widget={widget}
          onClose={() => closeWidget(widget.id)}
        />
      ))}

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
