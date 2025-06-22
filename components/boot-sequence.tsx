"use client"

import { useState, useEffect } from "react"

interface BootSequenceProps {
  onBootComplete: () => void
}

const asciiLogo = `
    ██████╗ ██╗ █████╗ ███████╗     ██████╗ ███████╗
    ██╔══██╗██║██╔══██╗╚══███╔╝    ██╔═══██╗██╔════╝
    ██████╔╝██║███████║  ███╔╝     ██║   ██║███████╗
    ██╔══██╗██║██╔══██║ ███╔╝      ██║   ██║╚════██║
    ██║  ██║██║██║  ██║███████╗    ╚██████╔╝███████║
    ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚══════╝
`

const asciiLogoMobile = `
  ██████╗ ██╗ █████╗ ███████╗
  ██╔══██╗██║██╔══██╗╚══███╔╝
  ██████╔╝██║███████║  ███╔╝ 
  ██╔══██╗██║██╔══██║ ███╔╝  
  ██║  ██║██║██║  ██║███████╗
  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝
        ██████╗ ███████╗
        ██╔═══██╗██╔════╝
        ██║   ██║███████╗
        ██║   ██║╚════██║
        ╚██████╔╝███████║
         ╚═════╝ ╚══════╝
`

const bootMessages = [
  "RIAZ.OS v2024.12 - Booting...",
  "Loading developer environment...",
  "progress", // Special marker for progress bar
  "System ready. Welcome to the MATRIX."
]

const originalQuotes = [
  "For me Giving Up is harder than trying",
  "I didn't find the game, the game found me",
  "I'm not a businessman, I'm a business, man",
  "Started from the bottom, now we're here.",
  "If you don't know, now you know."
]

export default function BootSequence({ onBootComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"logo" | "typing" | "complete">("logo")
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([])
  const [currentText, setCurrentText] = useState("")
  const [progressValue, setProgressValue] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [showSkipHint, setShowSkipHint] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [quote] = useState(() => originalQuotes[Math.floor(Math.random() * originalQuotes.length)])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Play boot complete sound
  const playBootSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      // Silently fail if Web Audio API not supported
    }
  }

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Show skip hint after 2 seconds
  useEffect(() => {
    const skipTimer = setTimeout(() => {
      if (phase !== "complete") {
        setShowSkipHint(true)
      }
    }, 2000)
    return () => clearTimeout(skipTimer)
  }, [phase])

  // Main sequence controller
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []

    const runSequence = async () => {
      // Phase 1: Show logo
      timeouts.push(setTimeout(() => {
        setPhase("typing")
      }, 1500))

      // Phase 2: Type messages one by one
      timeouts.push(setTimeout(() => {
        typeAllMessages()
      }, 1600))
    }

    const typeAllMessages = () => {
      let messageIndex = 0

      const typeNextMessage = () => {
        if (messageIndex >= bootMessages.length) {
          // All messages typed, show completion
          timeouts.push(setTimeout(() => {
            setPhase("complete")
            playBootSound()
          }, 500))
          return
        }

        const message = bootMessages[messageIndex]

        // Handle progress bar specially
        if (message === "progress") {
          animateProgressBar(() => {
            messageIndex++
            timeouts.push(setTimeout(typeNextMessage, 600))
          })
          return
        }

      let charIndex = 0
        setCurrentText("")

        const typeChar = () => {
        if (charIndex <= message.length) {
          setCurrentText(message.slice(0, charIndex))
          charIndex++
            
            // Typing speed
            const delay = message.includes("RIAZ.OS") ? 60 : 45
            timeouts.push(setTimeout(typeChar, delay))
        } else {
            // Message complete, add to displayed messages
            setDisplayedMessages(prev => [...prev, message])
            setCurrentText("")
            messageIndex++
            
            // Pause between messages
            timeouts.push(setTimeout(typeNextMessage, 600))
        }
      }

        typeChar()
    }

      typeNextMessage()
    }

    const animateProgressBar = (onComplete: () => void) => {
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += 2
        setProgressValue(progress)
        
        if (progress >= 100) {
          clearInterval(progressInterval)
          setDisplayedMessages(prev => [...prev, "████████████████████████ 100%"])
          onComplete()
        }
      }, 40) // Smooth animation
    }

    runSequence()

    // Cleanup timeouts on unmount
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, []) // Empty dependency array - runs only once

  const handleInteraction = () => {
      onBootComplete()
    }

  const handleSkip = () => {
    setPhase("complete")
    setDisplayedMessages(bootMessages.filter(msg => msg !== "progress"))
    setCurrentText("")
    setProgressValue(100)
    playBootSound()
  }

  // Global event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && phase !== "complete") {
        e.preventDefault()
        handleSkip()
      } else if (phase === "complete") {
        handleInteraction()
      }
    }

    const handleClick = () => {
      if (phase === "complete") {
        handleInteraction()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClick)
    }
  }, [phase])

  if (phase === "logo") {
    return (
      <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col justify-center items-center p-4 md:p-8">
        <pre className={`leading-tight animate-pulse whitespace-pre-wrap text-center ${
          isMobile ? 'text-xs' : 'text-xs md:text-sm'
        }`}>
          {isMobile ? asciiLogoMobile : asciiLogo}
        </pre>
        <div className="mt-4 text-[#FF00F7] text-sm animate-fade-in text-center">
          Built Different
        </div>
        {showSkipHint && (
          <div className="mt-8 text-gray-500 text-xs animate-fade-in text-center">
            Press SPACE to skip
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono flex flex-col justify-center items-center p-4 md:p-8 cursor-pointer">
      <div className={`w-full text-center ${isMobile ? 'max-w-sm' : 'max-w-2xl'}`}>
        {/* Skip hint */}
        {showSkipHint && phase !== "complete" && (
          <div className="mb-4 text-gray-500 text-xs animate-fade-in">
            Press SPACE to skip
          </div>
        )}

        {/* Display completed messages */}
        {displayedMessages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-2 ${
              message.includes("████") ? "text-blue-400" :
              message.includes("RIAZ.OS") ? "text-[#FF00F7] font-bold text-lg" :
              message.includes("100%") ? "text-green-400" :
              message.includes("ready") ? "text-cyan-400" :
              "text-[#00FF41]"
            } ${isMobile ? 'text-sm' : ''}`}
          >
            {message}
          </div>
        ))}
        
        {/* Currently typing message */}
        {phase === "typing" && (
          <div className={`mb-2 ${
            currentText.includes("RIAZ.OS") ? "text-[#FF00F7] font-bold text-lg" :
            currentText.includes("ready") ? "text-cyan-400" :
            "text-[#00FF41]"
          } ${isMobile ? 'text-sm' : ''}`}>
          {currentText}
            {showCursor && <span className="animate-pulse bg-[#00FF41] text-black">_</span>}
          </div>
        )}

        {/* Dynamic progress bar */}
        {phase === "typing" && progressValue > 0 && progressValue < 100 && (
          <div className="mb-2">
            <div className="text-blue-400 animate-pulse">
              {`${'█'.repeat(Math.floor(progressValue / 4))}${'░'.repeat(25 - Math.floor(progressValue / 4))} ${progressValue}%`}
            </div>
        </div>
        )}

        {/* Completion prompt */}
        {phase === "complete" && (
          <div className="mt-8 space-y-4 animate-fade-in">
            <div className="text-[#00FF41] animate-pulse">
              Click anywhere or press any key to enter...
            </div>
            <div className={`text-[#FF00F7] italic opacity-80 ${isMobile ? 'text-sm' : 'text-sm'}`}>
              {quote}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
