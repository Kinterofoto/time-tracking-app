"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useLiveTimer } from "@/hooks/use-live-timer"
import { formatDuration } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  data: EmployeeDayView
}

export function LiveEmployeeCard({ data }: Props) {
  const { employee, currentStatus, attendance, breaks, totalWorkedMinutes, totalBreakMinutes } = data

  const checkInTime = attendance?.check_in ? new Date(attendance.check_in) : null
  const ongoingBreak = breaks.find((b) => !b.end_time)
  const breakStartTime = ongoingBreak ? new Date(ongoingBreak.start_time) : null

  const isOnBreak = currentStatus === "on-break"
  const mainTimer = useLiveTimer(isOnBreak ? breakStartTime : checkInTime, false)

  const initials = `${employee.first_name[0]}${employee.last_name[0]}`

  // Expected 8-hour day progress
  const expectedMinutes = 8 * 60
  const progress = Math.min(100, (totalWorkedMinutes / expectedMinutes) * 100)

  const isBreakOvertime = totalBreakMinutes > employee.max_break_minutes

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.avatar_url || undefined} alt={employee.first_name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {employee.first_name} {employee.last_name}
              </p>
              <p className="text-xs text-muted-foreground">{employee.department}</p>
            </div>
          </div>
          <Badge variant={isOnBreak ? "on-break" : "working"}>
            {isOnBreak ? "En Descanso" : "Trabajando"}
          </Badge>
        </div>

        {/* Main timer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            {isOnBreak ? "Tiempo en descanso" : "Tiempo activo"}
          </p>
          <p className={`font-mono text-3xl font-bold tabular-nums ${isOnBreak ? "text-resend-amber-fg" : "text-resend-green-fg"}`}>
            {mainTimer}
          </p>
        </div>

        {/* Break warning */}
        {isBreakOvertime && (
          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-resend-red-fg">
            <AlertTriangle className="h-3 w-3" />
            <span>Excedió tiempo de descanso</span>
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-md bg-muted/50 px-2 py-1.5">
            <p className="text-[10px] text-muted-foreground">Trabajado</p>
            <p className="font-mono text-sm font-semibold">{formatDuration(totalWorkedMinutes)}</p>
          </div>
          <div className="rounded-md bg-muted/50 px-2 py-1.5">
            <p className="text-[10px] text-muted-foreground">Descansos</p>
            <p className="font-mono text-sm font-semibold">{formatDuration(totalBreakMinutes)}</p>
          </div>
        </div>

        {/* Day progress bar */}
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
            <span>Progreso del día</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            indicatorClassName={isOnBreak ? "bg-resend-amber-fg" : "bg-resend-green-fg"}
          />
        </div>
      </CardContent>
    </Card>
  )
}
