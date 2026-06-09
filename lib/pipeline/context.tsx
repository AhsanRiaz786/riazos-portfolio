'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { PipelineContextValue, TourState } from './types'

const PipelineContext = createContext<PipelineContextValue | null>(null)

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [tourState, setTourState] = useState<TourState>('idle')
  const [tourStep, setTourStep] = useState(0)
  const [wiredByUser, setWiredByUser] = useState(false)
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)

  const advanceTour = useCallback(() => {
    setTourStep((prev) => prev + 1)
  }, [])

  return (
    <PipelineContext.Provider
      value={{
        tourState,
        tourStep,
        setTourState,
        advanceTour,
        wiredByUser,
        setWiredByUser,
        activeNodeId,
        setActiveNodeId,
      }}
    >
      {children}
    </PipelineContext.Provider>
  )
}

export function usePipelineContext(): PipelineContextValue {
  const ctx = useContext(PipelineContext)
  if (!ctx) {
    throw new Error('usePipelineContext must be used inside PipelineProvider')
  }
  return ctx
}
