"use client"

import { Users, UserCheck, Coffee, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { DashboardSummary } from "@/lib/types"

const cards = [
  {
    key: "totalEmployees" as const,
    label: "Total Empleados",
    icon: Users,
    color: "text-resend-blue-fg",
    bg: "bg-resend-blue-bg",
  },
  {
    key: "checkedIn" as const,
    label: "Trabajando Ahora",
    icon: UserCheck,
    color: "text-resend-green-fg",
    bg: "bg-resend-green-bg",
  },
  {
    key: "onBreak" as const,
    label: "En Descanso",
    icon: Coffee,
    color: "text-resend-amber-fg",
    bg: "bg-resend-amber-bg",
  },
  {
    key: "averageHoursToday" as const,
    label: "Horas Promedio",
    icon: Clock,
    color: "text-resend-blue-fg",
    bg: "bg-resend-blue-bg",
    suffix: "h",
  },
]

export function SummaryCards({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const value = summary[card.key]
        return (
          <Card key={card.key} className="overflow-hidden">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold tabular-nums">
                  {value}
                  {"suffix" in card ? card.suffix : ""}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
