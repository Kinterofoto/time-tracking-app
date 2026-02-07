"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScorePodium } from "./score-podium"
import { ScoreTableRow } from "./score-table-row"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  employees: EmployeeDayView[]
}

export function BehaviorScoreboard({ employees }: Props) {
  const ranked = useMemo(() => {
    return [...employees]
      .filter((e) => e.behaviorScore)
      .sort(
        (a, b) =>
          (b.behaviorScore?.overall_score ?? 0) -
          (a.behaviorScore?.overall_score ?? 0)
      )
  }, [employees])

  const top3 = ranked.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Podium */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <ScorePodium topEmployees={top3} />
        </CardContent>
      </Card>

      {/* Full ranking table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Ranking Completo</CardTitle>
          <div className="hidden items-center gap-8 text-[10px] text-muted-foreground md:flex">
            <span className="w-8" />
            <span className="w-4" />
            <span className="flex-1">Empleado</span>
            <div className="space-y-0.5">
              <span className="text-resend-blue-fg">Puntualidad</span>
              <span className="mx-1">|</span>
              <span className="text-resend-amber-fg">Descansos</span>
              <span className="mx-1">|</span>
              <span className="text-resend-green-fg">Consistencia</span>
            </div>
            <span className="hidden w-20 text-center sm:block">Tendencia</span>
            <span className="w-16 text-right">Score</span>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          {ranked.map((emp, i) => (
            <ScoreTableRow key={emp.employee.id} data={emp} rank={i + 1} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
