"use client"

import { cn } from "@/lib/utils"
import { formatDuration, formatTime } from "@/lib/utils"
import type { TimelineSegment as TSegment } from "@/lib/types"
import { timeToPosition, segmentWidth } from "@/lib/timeline/utils"

type Props = {
  segment: TSegment
  onClick?: () => void
}

const typeStyles = {
  work: "bg-resend-green-bg border-resend-green-fg/30 hover:bg-resend-green-bg/80",
  break: "bg-resend-amber-bg border-resend-amber-fg/30 hover:bg-resend-amber-bg/80 border-dashed",
  absent: "bg-muted border-muted-foreground/20",
}

const typeLabels = {
  work: "text-resend-green-fg",
  break: "text-resend-amber-fg",
  absent: "text-muted-foreground",
}

export function TimelineSegmentBlock({ segment, onClick }: Props) {
  const left = timeToPosition(segment.startTime)
  const width = segmentWidth(segment.startTime, segment.endTime)
  const isOngoing = !segment.endTime

  return (
    <button
      onClick={onClick}
      className={cn(
        "group absolute top-1 bottom-1 rounded-md border transition-all duration-200 hover:scale-y-110 hover:shadow-md",
        typeStyles[segment.type],
        isOngoing && "animate-pulse-soft",
        "animate-slide-right"
      )}
      style={{
        left: `${left}%`,
        width: `${Math.max(width, 0.5)}%`,
      }}
      title={`${segment.label} - ${formatDuration(segment.duration)}`}
    >
      {width > 4 && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100",
            typeLabels[segment.type]
          )}
        >
          {formatTime(segment.startTime)} - {segment.endTime ? formatTime(segment.endTime) : "..."}
        </span>
      )}
    </button>
  )
}
