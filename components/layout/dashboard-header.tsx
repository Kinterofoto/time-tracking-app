"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/providers/theme-provider"

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme()
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
      setDate(
        now.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Clock className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Damascus</h1>
            <p className="text-xs text-muted-foreground">Control de Tiempo</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <span className="font-mono text-lg tabular-nums">{time}</span>
          <span className="text-muted-foreground">|</span>
          <span className="capitalize text-muted-foreground">{date}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
