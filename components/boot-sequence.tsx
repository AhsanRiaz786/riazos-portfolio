"use client"

import { useState, useEffect } from "react"

interface BootSequenceProps {
  onBootComplete: () => void
}

const bootMessages = [
  "INITIATING RIΔZ.OS KERNEL...",
  "LOADING CORE MODULES...",
  "> FULL-STACK DEVELOPEMENT......[OK]",
  "> WEB SCRAPING.................[OK]",
  "> AUTOMATION FRAMEWORKS........[OK]",
  "> CLOUD INFRASTRUCTURE.........[OK]",
  "> PROBLEM-SOLVING ENGINE.......[OK]",
  "",
  "SYSTEM READY.",
  "AHSAN RIAZ: THE BUILDER.",
  "",
  "Press any key to launch GUI...",
  "> _",
]

const humanMessages = [
  "Brewing the perfect cup of code...",
  "Teaching machines to dance with data...",
  "Turning coffee into applications...",
  "Making the complex beautifully simple...",
]

export default function BootSequence({ onBootComplete }: BootSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [humanMessage] = useState(() => humanMessages[Math.floor(Math.random() * humanMessages.length)])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const message = bootMessages[currentMessageIndex]
      let charIndex = 0

      const typeMessage = () => {
        if (charIndex <= message.length) {
          setCurrentText(message.slice(0, charIndex))
          charIndex++
          setTimeout(typeMessage, 50)
        } else {
          setTimeout(() => {
            setCurrentMessageIndex((prev) => prev + 1)
            setCurrentText("")
          }, 300)
        }
      }

      typeMessage()
    }
  }, [currentMessageIndex])

  const handleKeyPress = () => {
    if (currentMessageIndex >= bootMessages.length - 1) {
      onBootComplete()
    }
  }

  useEffect(() => {
    const handleKey = () => handleKeyPress()
    const handleClick = () => handleKeyPress()

    document.addEventListener("keydown", handleKey)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKey)
      document.removeEventListener("click", handleClick)
    }
  }, [currentMessageIndex])

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col justify-center items-start p-8 cursor-pointer">
      <div className="w-full max-w-4xl">
        {bootMessages.slice(0, currentMessageIndex).map((message, index) => (
          <div key={index} className="mb-1">
            {message}
          </div>
        ))}
        <div className="mb-1">
          {currentText}
          {currentMessageIndex === bootMessages.length - 1 && showCursor && <span className="animate-pulse">_</span>}
        </div>

        {currentMessageIndex >= bootMessages.length - 2 && (
          <div className="mt-8 text-[#FF00F7] text-sm italic opacity-60">{humanMessage}</div>
        )}
      </div>
    </div>
  )
}
