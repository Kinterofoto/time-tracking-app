"use client"

import { motion } from "framer-motion"
import type { GreetingType } from "./greeting-overlay"

export interface TimeEntry {
  id: string
  type: GreetingType
  timestamp: Date
}

const typeLabels: Record<GreetingType, { label: string; emoji: string; color: string }> = {
  "check-in": { label: "Entrada", emoji: "🟢", color: "text-emerald-400" },
  "break-start": { label: "Inicio descanso", emoji: "🟡", color: "text-amber-400" },
  "break-end": { label: "Fin descanso", emoji: "🔵", color: "text-blue-400" },
  "check-out": { label: "Salida", emoji: "🔴", color: "text-rose-400" },
}

interface TimeLogProps {
  entries: TimeEntry[]
}

export function TimeLog({ entries }: TimeLogProps) {
  if (entries.length === 0) return null

  return (
    <div className="w-full max-w-md">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Registros de hoy
      </h3>
      <div className="space-y-2">
        {entries.map((entry, index) => {
          const config = typeLabels[entry.type]
          return (
            <motion.div
              key={entry.id}
              className="flex items-center justify-between rounded-xl bg-card/50 border border-border/50 px-4 py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <span>{config.emoji}</span>
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                {entry.timestamp.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
