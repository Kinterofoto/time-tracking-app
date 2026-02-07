"use client"

import { useState, useEffect } from "react"

export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) {
    return (
      <div className="text-center">
        <div className="text-7xl md:text-8xl font-mono font-bold tracking-tight text-foreground tabular-nums">
          --:--:--
        </div>
        <div className="mt-2 text-lg text-muted-foreground">
          Cargando...
        </div>
      </div>
    )
  }

  const timeStr = time.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const dateStr = time.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="text-center">
      <div className="text-7xl md:text-8xl font-mono font-bold tracking-tight text-foreground tabular-nums">
        {timeStr}
      </div>
      <div className="mt-2 text-lg text-muted-foreground capitalize">
        {dateStr}
      </div>
    </div>
  )
}
