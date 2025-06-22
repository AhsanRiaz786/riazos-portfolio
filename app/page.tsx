"use client"

// RiazOS Portfolio - Auto-deployment test
import { useState, useEffect } from "react"
import BootSequence from "@/components/boot-sequence"
import Desktop from "@/components/desktop"

export default function RiazOSPortfolio() {
  const [isBooted, setIsBooted] = useState(false)
  const [showDesktop, setShowDesktop] = useState(false)

  useEffect(() => {
    if (isBooted) {
      const timer = setTimeout(() => setShowDesktop(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [isBooted])

  if (!showDesktop) {
    return <BootSequence onBootComplete={() => setIsBooted(true)} />
  }

  return <Desktop />
}
