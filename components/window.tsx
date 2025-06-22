"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface WindowProps {
  title: string
  children: React.ReactNode
  isActive: boolean
  onClose: () => void
  onFocus: () => void
}

export default function Window({ title, children, isActive, onClose, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 800, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("window-header")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
      onFocus()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart])

  return (
    <div
      ref={windowRef}
      className={`fixed bg-[#141414] bg-opacity-95 backdrop-blur-sm border rounded-lg shadow-2xl transition-all duration-300 overflow-hidden ${
        isActive ? "border-[#00FF41] shadow-[#00FF41]/20" : "border-gray-600 shadow-gray-900/50"
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 100 : 50,
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div
        className="window-header flex items-center justify-between p-3 border-b border-[#00FF41] border-opacity-30 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="text-[#00FF41] font-mono text-sm font-semibold">{title}</div>
        </div>
        <div className="flex space-x-2">
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" onClick={onClose} />
        </div>
      </div>

      {/* Window Content */}
      <div className="p-4 h-[calc(100%-60px)] overflow-auto">{children}</div>
    </div>
  )
}
