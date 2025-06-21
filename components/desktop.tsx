"use client"

import { useState } from "react"
import DesktopIcon from "./desktop-icon"
import Window from "./window"
import ProcessManager from "./process-manager"
import TechStack from "./tech-stack"
import Chronos from "./chronos"
import ReadMe from "./readme"
import Terminal from "./terminal"
import Contact from "./contact"

const desktopIcons = [
  {
    id: "process-manager",
    label: "//PROCESS_MANAGER",
    description: "Active Projects & Live Systems",
    icon: "🖥️",
  },
  {
    id: "tech-stack",
    label: "/tech_stack",
    description: "Tools, Languages & Frameworks",
    icon: "📁",
  },
  {
    id: "chronos",
    label: "CHRONOS.log",
    description: "Professional Journey & Experience",
    icon: "⏰",
  },
  {
    id: "readme",
    label: "README.md",
    description: "About the Human Behind the Code",
    icon: "📄",
  },
  {
    id: "terminal",
    label: "TERMINAL",
    description: "Direct System Access",
    icon: "💻",
  },
  {
    id: "contact",
    label: "SECURE_CONNECTION",
    description: "Establish Contact Protocol",
    icon: "🔐",
  },
]

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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

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
      <div className="absolute top-4 right-4 text-[#00FF41] font-mono text-sm z-10">
        <div>{new Date().toLocaleTimeString()}</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[#00FF41] font-mono text-xs opacity-60 z-10">RIAZ.OS v2024.12</div>

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
