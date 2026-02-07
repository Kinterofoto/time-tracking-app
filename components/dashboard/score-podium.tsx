"use client"

import { Trophy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScoreBadge } from "./score-badge"
import { cn } from "@/lib/utils"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  topEmployees: EmployeeDayView[]
}

const podiumConfig = [
  { position: 1, order: "order-2", height: "h-full", color: "text-yellow-500", bg: "bg-yellow-500/10", label: "1ro" },
  { position: 2, order: "order-1", height: "h-[85%]", color: "text-gray-400", bg: "bg-gray-400/10", label: "2do" },
  { position: 3, order: "order-3", height: "h-[70%]", color: "text-amber-700", bg: "bg-amber-700/10", label: "3ro" },
]

export function ScorePodium({ topEmployees }: Props) {
  return (
    <div className="flex items-end justify-center gap-4 py-4">
      {podiumConfig.map((config, i) => {
        const emp = topEmployees[i]
        if (!emp) return null

        const initials = `${emp.employee.first_name[0]}${emp.employee.last_name[0]}`

        return (
          <div
            key={emp.employee.id}
            className={cn("flex w-[140px] flex-col items-center", config.order)}
          >
            <Card className={cn("w-full", config.bg)}>
              <CardContent className="flex flex-col items-center p-4">
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={emp.employee.avatar_url || undefined}
                      alt={emp.employee.first_name}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full",
                      config.bg
                    )}
                  >
                    <Trophy className={cn("h-3.5 w-3.5", config.color)} />
                  </div>
                </div>

                <p className="mt-2 text-center text-sm font-semibold">
                  {emp.employee.first_name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {emp.employee.last_name}
                </p>

                <div className="mt-2 font-mono text-2xl font-bold">
                  {emp.behaviorScore?.overall_score ?? 0}
                </div>

                {emp.behaviorScore && (
                  <ScoreBadge rank={emp.behaviorScore.rank} size="sm" />
                )}

                <span className={cn("mt-1 text-xs font-bold", config.color)}>
                  {config.label}
                </span>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
