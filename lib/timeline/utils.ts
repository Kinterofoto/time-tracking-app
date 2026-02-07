import type { AttendanceRecord, BreakRecord, TimelineSegment } from "@/lib/types"

const DAY_START_HOUR = 6
const DAY_END_HOUR = 22
const TOTAL_HOURS = DAY_END_HOUR - DAY_START_HOUR // 16 hours

export function timeToPosition(time: Date): number {
  const hours = time.getHours() + time.getMinutes() / 60
  const pos = ((hours - DAY_START_HOUR) / TOTAL_HOURS) * 100
  return Math.max(0, Math.min(100, pos))
}

export function segmentWidth(start: Date, end: Date | null): number {
  const endTime = end || new Date()
  const startHours = start.getHours() + start.getMinutes() / 60
  const endHours = endTime.getHours() + endTime.getMinutes() / 60
  return Math.max(0, ((endHours - startHours) / TOTAL_HOURS) * 100)
}

export function getCurrentTimePosition(): number {
  return timeToPosition(new Date())
}

export function generateHourMarkers(): { hour: number; label: string; position: number }[] {
  const markers = []
  for (let h = DAY_START_HOUR; h <= DAY_END_HOUR; h++) {
    markers.push({
      hour: h,
      label: `${String(h).padStart(2, "0")}:00`,
      position: ((h - DAY_START_HOUR) / TOTAL_HOURS) * 100,
    })
  }
  return markers
}

export function buildTimelineSegments(
  attendance: AttendanceRecord | null,
  breaks: BreakRecord[]
): TimelineSegment[] {
  if (!attendance || !attendance.check_in) return []

  const checkIn = new Date(attendance.check_in)
  const checkOut = attendance.check_out ? new Date(attendance.check_out) : null

  // Sort breaks by start time
  const sortedBreaks = [...breaks].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  )

  const segments: TimelineSegment[] = []
  let cursor = checkIn

  for (const brk of sortedBreaks) {
    const breakStart = new Date(brk.start_time)
    const breakEnd = brk.end_time ? new Date(brk.end_time) : null

    // Work segment before break
    if (breakStart.getTime() > cursor.getTime()) {
      const diffMs = breakStart.getTime() - cursor.getTime()
      segments.push({
        type: "work",
        startTime: new Date(cursor),
        endTime: breakStart,
        duration: diffMs / 60000,
        label: "Trabajando",
      })
    }

    // Break segment
    const breakDurationMs = breakEnd
      ? breakEnd.getTime() - breakStart.getTime()
      : Date.now() - breakStart.getTime()

    const breakLabel =
      brk.type === "lunch" ? "Almuerzo" : brk.type === "short" ? "Descanso" : "Personal"

    segments.push({
      type: "break",
      startTime: breakStart,
      endTime: breakEnd,
      duration: breakDurationMs / 60000,
      label: breakLabel,
      breakType: brk.type,
    })

    cursor = breakEnd || new Date()
  }

  // Final work segment after last break
  const endPoint = checkOut || null
  if (!checkOut || cursor.getTime() < checkOut.getTime()) {
    // Only add if there are no ongoing breaks
    const hasOngoingBreak = sortedBreaks.some((b) => !b.end_time)
    if (!hasOngoingBreak) {
      const endTime = endPoint
      const diffMs = (endTime ? endTime.getTime() : Date.now()) - cursor.getTime()
      if (diffMs > 0) {
        segments.push({
          type: "work",
          startTime: new Date(cursor),
          endTime: endTime,
          duration: diffMs / 60000,
          label: "Trabajando",
        })
      }
    }
  }

  return segments
}
