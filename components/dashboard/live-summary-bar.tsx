"use client"

import { UserCheck, Coffee, Clock, TrendingUp } from "lucide-react"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  employees: EmployeeDayView[]
}

export function LiveSummaryBar({ employees }: Props) {
  const active = employees.filter(
    (e) => e.currentStatus === "working" || e.currentStatus === "on-break"
  )
  const working = active.filter((e) => e.currentStatus === "working").length
  const onBreak = active.filter((e) => e.currentStatus === "on-break").length
  const avgMinutes =
    active.length > 0
      ? active.reduce((s, e) => s + e.totalWorkedMinutes, 0) / active.length
      : 0
  const avgHours = Math.round((avgMinutes / 60) * 10) / 10

  const stats = [
    { icon: UserCheck, label: "Trabajando", value: working, color: "text-resend-green-fg" },
    { icon: Coffee, label: "En Descanso", value: onBreak, color: "text-resend-amber-fg" },
    { icon: Clock, label: "Horas Prom.", value: `${avgHours}h`, color: "text-resend-blue-fg" },
    { icon: TrendingUp, label: "Activos", value: active.length, color: "text-foreground" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="flex items-center gap-2 rounded-lg border bg-card p-3"
          >
            <Icon className={`h-4 w-4 ${stat.color}`} />
            <div>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className={`font-mono text-lg font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
