"use client"

import { Briefcase, Coffee, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDuration, formatTime } from "@/lib/utils"
import type { TimelineSegment } from "@/lib/types"
import { TimelineSegmentBlock } from "./timeline-segment"

type Props = {
  segment: TimelineSegment
}

const breakTypeLabels = {
  lunch: "Almuerzo",
  short: "Descanso Corto",
  personal: "Personal",
}

const typeIcons = {
  work: Briefcase,
  break: Coffee,
  absent: User,
}

export function TimelineSegmentPopover({ segment }: Props) {
  const Icon = typeIcons[segment.type]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="contents">
          <TimelineSegmentBlock segment={segment} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64" side="top" align="center">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{segment.label}</span>
            {segment.type === "break" && segment.breakType && (
              <Badge variant="on-break" className="text-[10px]">
                {breakTypeLabels[segment.breakType]}
              </Badge>
            )}
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Inicio</p>
              <p className="font-mono font-medium">
                {formatTime(segment.startTime)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Fin</p>
              <p className="font-mono font-medium">
                {segment.endTime ? formatTime(segment.endTime) : "En curso..."}
              </p>
            </div>
          </div>
          <div className="rounded-md bg-muted p-2 text-center">
            <p className="text-xs text-muted-foreground">Duración</p>
            <p className="font-mono text-lg font-bold">
              {formatDuration(segment.duration)}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
