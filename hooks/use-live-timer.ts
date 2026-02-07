"use client"

import { useState, useEffect } from "react"

export function useLiveTimer(startTime: Date | null, isPaused: boolean = false) {
  const [elapsed, setElapsed] = useState("00:00:00")

  useEffect(() => {
    if (!startTime || isPaused) {
      if (!startTime) setElapsed("00:00:00")
      return
    }

    const tick = () => {
      const diff = Date.now() - startTime.getTime()
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setElapsed(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      )
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [startTime, isPaused])

  return elapsed
}
