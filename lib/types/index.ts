export type {
  Employee,
  AttendanceRecord,
  BreakRecord,
  BehaviorScore,
} from "./database"

export type EmployeeStatus = "working" | "on-break" | "absent" | "checked-out" | "late"

export type TimelineSegment = {
  type: "work" | "break" | "absent"
  startTime: Date
  endTime: Date | null // null = ongoing
  duration: number // minutes
  label: string
  breakType?: "lunch" | "short" | "personal"
}

export type EmployeeDayView = {
  employee: import("./database").Employee
  attendance: import("./database").AttendanceRecord | null
  breaks: import("./database").BreakRecord[]
  currentStatus: EmployeeStatus
  timelineSegments: TimelineSegment[]
  totalWorkedMinutes: number
  totalBreakMinutes: number
  behaviorScore: import("./database").BehaviorScore | null
  weeklyScores: import("./database").BehaviorScore[]
}

export type DashboardSummary = {
  totalEmployees: number
  checkedIn: number
  onBreak: number
  absent: number
  averageHoursToday: number
  punctualityRate: number
}
