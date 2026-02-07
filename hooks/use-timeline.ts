"use client"

import { useState, useEffect } from "react"
import { getCurrentTimePosition } from "@/lib/timeline/utils"

export function useTimeline() {
  const [currentTimePosition, setCurrentTimePosition] = useState(
    getCurrentTimePosition()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimePosition(getCurrentTimePosition())
    }, 60000) // update every minute
    return () => clearInterval(interval)
  }, [])

  return { currentTimePosition }
}
