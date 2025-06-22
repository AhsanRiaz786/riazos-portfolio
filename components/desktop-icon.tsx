"use client"

import type React from "react"

import { useState } from "react"

interface DesktopIconProps {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  style?: React.CSSProperties
}

export default function DesktopIcon({ label, description, icon, onClick, style }: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer group animate-fade-in"
      style={style}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-14 h-14 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
          isHovered
            ? "border-[#FF00F7] shadow-lg shadow-[#FF00F7]/30 scale-110 text-[#FF00F7]"
            : "border-[#00FF41] shadow-md shadow-[#00FF41]/20 text-[#00FF41]"
        }`}
      >
        {icon}
      </div>
      <div className="mt-1.5 text-[#00FF41] font-mono text-xs text-center max-w-20 leading-tight">{label}</div>

      {isHovered && (
        <div className="absolute left-20 top-0 bg-[#141414] border border-[#00FF41] rounded p-2 text-[#E5E5E5] font-mono text-xs whitespace-nowrap z-50">
          {description}
        </div>
      )}
    </div>
  )
}
