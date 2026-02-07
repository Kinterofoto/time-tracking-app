"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDuration } from "@/lib/utils"
import type { EmployeeDayView, EmployeeStatus } from "@/lib/types"
import { TimelineSegmentPopover } from "./timeline-segment-popover"

type Props = {
  data: EmployeeDayView
}

const statusConfig: Record<EmployeeStatus, { label: string; variant: "working" | "on-break" | "absent" | "checked-out"; dot: string }> = {
  working: { label: "Trabajando", variant: "working", dot: "bg-resend-green-fg" },
  "on-break": { label: "En Descanso", variant: "on-break", dot: "bg-resend-amber-fg" },
  absent: { label: "Ausente", variant: "absent", dot: "bg-resend-red-fg" },
  "checked-out": { label: "Salió", variant: "checked-out", dot: "bg-muted-foreground" },
  late: { label: "Tarde", variant: "absent", dot: "bg-resend-red-fg" },
}

export function TimelineRow({ data }: Props) {
  const { employee, currentStatus, timelineSegments, totalWorkedMinutes } = data
  const config = statusConfig[currentStatus]
  const initials = `${employee.first_name[0]}${employee.last_name[0]}`

  return (
    <div className="flex items-center border-b border-border/50 py-2 last:border-b-0">
      {/* Employee info */}
      <div className="flex w-[200px] shrink-0 items-center gap-3 pr-4 lg:w-[240px]">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={employee.avatar_url || undefined} alt={employee.first_name} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
              config.dot
            )}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {employee.first_name} {employee.last_name}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[10px] text-muted-foreground">
              {employee.department}
            </span>
            {totalWorkedMinutes > 0 && (
              <span className="font-mono text-[10px] text-muted-foreground">
                {formatDuration(totalWorkedMinutes)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative h-8 flex-1 rounded-md bg-muted/30">
        {timelineSegments.length === 0 && currentStatus === "absent" && (
          <div className="flex h-full items-center justify-center">
            <Badge variant="absent" className="text-[10px]">
              {data.attendance?.notes || "Ausente"}
            </Badge>
          </div>
        )}
        {timelineSegments.map((segment, i) => (
          <TimelineSegmentPopover key={i} segment={segment} />
        ))}
      </div>
    </div>
  )
}
