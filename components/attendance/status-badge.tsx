"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type EmployeeStatus = "not-checked-in" | "working" | "on-break"

interface StatusBadgeProps {
  status: EmployeeStatus
}

const statusConfig: Record<
  EmployeeStatus,
  { label: string; color: string; dotColor: string }
> = {
  "not-checked-in": {
    label: "Sin registrar",
    color: "bg-secondary text-muted-foreground",
    dotColor: "bg-muted-foreground",
  },
  working: {
    label: "Trabajando",
    color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    dotColor: "bg-emerald-400",
  },
  "on-break": {
    label: "En descanso",
    color: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    dotColor: "bg-amber-400",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        config.color
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      key={status}
    >
      <motion.span
        className={cn("h-2 w-2 rounded-full", config.dotColor)}
        animate={
          status !== "not-checked-in"
            ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />
      {config.label}
    </motion.div>
  )
}
