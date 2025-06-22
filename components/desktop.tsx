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
  Minimize2,
  FileDown
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
  {
    id: "resume",
    label: "RESUME.pdf",
    description: "Professional Resume - Click to Download",
    icon: <FileDown size={24} strokeWidth={1.5} />,
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
    <div className="space-y-3 h-full flex flex-col justify-center">
      <div className="flex items-center space-x-2">
        <Cpu size={14} className="text-[#00FF41] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#00FF41] truncate">CPU</span>
            <span className="text-white font-bold flex-shrink-0">{stats.cpu}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#00FF41] to-[#00CC33] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stats.cpu}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <MemoryStick size={14} className="text-[#00FF41] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#00FF41] truncate">Memory</span>
            <span className="text-white font-bold flex-shrink-0">{stats.ram}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#00FF41] to-[#00CC33] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${stats.ram}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Network size={14} className="text-[#00FF41] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#00FF41] truncate">Network</span>
            <span className="text-white font-bold flex-shrink-0 text-xs">{stats.network} KB/s</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#00FF41] to-[#00CC33] h-full rounded-full transition-all duration-500 ease-out"
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
    temp: null as number | null,
    condition: 'loading',
    humidity: null as number | null,
    wind: null as number | null,
    location: 'Loading...',
    loading: true,
    error: false
  })

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords
              await getWeatherData(latitude, longitude)
            },
            async () => {
              await getWeatherData(37.7749, -122.4194)
            }
          )
        } else {
          await getWeatherData(37.7749, -122.4194)
        }
      } catch (error) {
        console.error('Weather fetch error:', error)
        setWeather(prev => ({ ...prev, loading: false, error: true }))
      }
    }

    const getWeatherData = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m&timezone=auto`
        )
        
        if (!response.ok) throw new Error('Weather API failed')
        
        const data = await response.json()
        const current = data.current_weather
        
        let locationName = 'Unknown Location'
        try {
          const geoResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          )
          if (geoResponse.ok) {
            const geoData = await geoResponse.json()
            locationName = geoData.city || geoData.locality || geoData.countryName || 'Unknown'
          }
        } catch (error) {
          console.error('Geocoding error:', error)
        }

        setWeather({
          temp: Math.round(current.temperature),
          condition: getConditionFromCode(current.weathercode),
          humidity: Math.round(data.hourly.relative_humidity_2m[0] || 50),
          wind: Math.round(current.windspeed),
          location: locationName,
          loading: false,
          error: false
        })
      } catch (error) {
        console.error('Weather data error:', error)
        setWeather(prev => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getConditionFromCode = (code: number): string => {
    if (code === 0) return 'clear'
    if (code <= 3) return 'cloudy'
    if (code <= 67) return 'rain'
    if (code <= 77) return 'snow'
    if (code <= 82) return 'rain'
    return 'cloudy'
  }

  const getWeatherIcon = () => {
    if (weather.loading) return <Clock size={24} className="text-gray-400 animate-spin" />
    if (weather.error) return <X size={24} className="text-red-400" />
    
    switch (weather.condition) {
      case 'clear': return <Sun size={24} className="text-yellow-400" />
      case 'cloudy': return <Cloud size={24} className="text-gray-400" />
      case 'rain': return <CloudRain size={24} className="text-blue-400" />
      case 'snow': return <Cloud size={24} className="text-blue-200" />
      default: return <Sun size={24} className="text-yellow-400" />
    }
  }

  if (weather.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Clock size={24} className="text-[#00FF41] animate-spin mb-2" />
        <div className="text-[#00FF41] font-bold text-xs">Loading...</div>
      </div>
    )
  }

  if (weather.error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <X size={24} className="text-red-400 mb-2" />
        <div className="text-red-400 font-bold text-xs">Error</div>
      </div>
    )
  }

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center space-x-3">
        {getWeatherIcon()}
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-bold text-white">{weather.temp}°</div>
          <div className="text-xs text-gray-400 capitalize truncate">{weather.condition}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-800 bg-opacity-50 rounded p-2">
          <div className="text-gray-400 text-xs">Humidity</div>
          <div className="text-[#00FF41] font-bold truncate">{weather.humidity}%</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 rounded p-2">
          <div className="text-gray-400 text-xs">Wind</div>
          <div className="text-[#00FF41] font-bold truncate">{weather.wind} km/h</div>
        </div>
      </div>
      
      <div className="text-center flex-1 flex flex-col justify-end">
        <div className="text-xs text-gray-400">Location</div>
        <div className="text-[#00FF41] font-bold text-xs truncate">{weather.location}</div>
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
    { title: "Electron Dance", artist: "Quantum Waves", duration: "3:33" },
    { title: "Neural Network", artist: "AI Collective", duration: "4:01" },
    { title: "Quantum Leap", artist: "Data Stream", duration: "3:17" }
  ]

  const nextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.title === currentTrack.title)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-[#00FF41] to-[#00CC33] rounded flex items-center justify-center flex-shrink-0">
          <Music size={16} className="text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-white truncate">{currentTrack.title}</div>
          <div className="text-xs text-gray-400 truncate">{currentTrack.artist}</div>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-50 rounded p-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Duration</span>
          <span className="flex-shrink-0">{currentTrack.duration}</span>
        </div>
        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
          <div className="bg-[#00FF41] h-1 rounded-full w-1/3"></div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-[#00FF41] bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 border border-[#00FF41] border-opacity-30"
        >
          {isPlaying ? <Pause size={16} className="text-[#00FF41]" /> : <Play size={16} className="text-[#00FF41] ml-0.5" />}
        </button>
        <button
          onClick={nextTrack}
          className="w-10 h-10 bg-[#00FF41] bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 border border-[#00FF41] border-opacity-30"
        >
          <SkipForward size={16} className="text-[#00FF41]" />
        </button>
      </div>
      
      {/* Visualizer */}
      {isPlaying && (
        <div className="flex justify-center space-x-1 flex-1 items-end pb-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-[#00FF41] rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 16 + 4}px`,
                animationDelay: `${i * 30}ms`,
                animationDuration: `${300 + Math.random() * 500}ms`
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
    { symbol: 'BTC', name: 'Bitcoin', price: 0, change: 0, loading: true },
    { symbol: 'ETH', name: 'Ethereum', price: 0, change: 0, loading: true },
    { symbol: 'SOL', name: 'Solana', price: 0, change: 0, loading: true }
  ])
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        )
        
        if (!response.ok) throw new Error('Crypto API failed')
        
        const data = await response.json()
        
        setCrypto([
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: data.bitcoin.usd,
            change: data.bitcoin.usd_24h_change,
            loading: false
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            price: data.ethereum.usd,
            change: data.ethereum.usd_24h_change,
            loading: false
          },
          {
            symbol: 'SOL',
            name: 'Solana',
            price: data.solana.usd,
            change: data.solana.usd_24h_change,
            loading: false
          }
        ])
        setError(false)
      } catch (error) {
        console.error('Crypto fetch error:', error)
        setError(true)
        setCrypto(prev => prev.map(coin => ({ ...coin, loading: false })))
      }
    }

    fetchCryptoData()
    const interval = setInterval(fetchCryptoData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Bitcoin size={24} className="text-red-400 mb-2" />
        <div className="text-red-400 font-bold text-xs">Error</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-2 overflow-hidden">
        {crypto.map((coin, index) => (
          <div key={coin.symbol} className="bg-gray-800 bg-opacity-30 rounded p-2 border border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  coin.symbol === 'BTC' ? 'bg-orange-500 text-white' :
                  coin.symbol === 'ETH' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {coin.symbol}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{coin.symbol}</div>
                  <div className="text-xs text-gray-400 truncate">{coin.name}</div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0 ml-2">
                <div className="text-xs font-bold text-white">
                  {coin.loading ? (
                    <div className="w-12 h-3 bg-gray-600 animate-pulse rounded"></div>
                  ) : (
                    `$${coin.price.toLocaleString(undefined, { 
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0 
                    })}`
                  )}
                </div>
                <div className={`text-xs flex items-center justify-end space-x-1 ${
                  coin.loading ? 'text-gray-400' : 
                  coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coin.loading ? (
                    <div className="w-8 h-2 bg-gray-600 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <TrendingUp size={8} className={coin.change < 0 ? 'rotate-180' : ''} />
                      <span className="text-xs">{coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
      className="fixed bg-[#1a1a1a] bg-opacity-95 border border-[#00FF41] border-opacity-30 rounded-lg shadow-xl z-30 overflow-hidden"
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
        className="flex items-center justify-between px-2 py-1.5 border-b border-[#00FF41] border-opacity-20 cursor-grab active:cursor-grabbing bg-[#0a0a0a] bg-opacity-50"
        onMouseDown={handleMouseDown}
      >
        <span className="text-[#00FF41] text-xs font-mono font-bold truncate mr-2">{widget.name}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
        >
          <X size={12} />
        </button>
      </div>
      
      {/* Widget Content */}
      <div className="p-2 text-[#00FF41] font-mono text-sm overflow-hidden" style={{ height: 'calc(100% - 32px)' }}>
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
      size: { width: 220, height: 160 },
      visible: false
    },
    {
      id: 'weather',
      name: 'WEATHER_STATION',
      component: WeatherWidget,
      defaultPosition: { x: window.innerWidth - 250, y: 260 },
      size: { width: 220, height: 180 },
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
      size: { width: 200, height: 220 },
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
    if (windowId === "resume") {
      // Create download link for resume
      const link = document.createElement('a')
      link.href = '/Ahsan Riaz - Resume.pdf'
      link.download = 'Ahsan_Riaz_Resume.pdf'
      link.click()
      return
    }
    
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
      case "resume":
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
