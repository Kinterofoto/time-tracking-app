export type Employee = {
  id: string
  first_name: string
  last_name: string
  email: string
  department: string
  position: string
  avatar_url: string | null
  expected_check_in: string // "08:00" format
  expected_check_out: string // "17:00" format
  max_break_minutes: number
  status: "active" | "inactive"
  created_at: string
}

export type AttendanceRecord = {
  id: string
  employee_id: string
  date: string // "YYYY-MM-DD"
  check_in: string | null // ISO timestamp
  check_out: string | null // ISO timestamp
  status: "present" | "absent" | "late" | "half-day"
  notes: string | null
  created_at: string
}

export type BreakRecord = {
  id: string
  attendance_id: string
  employee_id: string
  start_time: string // ISO timestamp
  end_time: string | null // null = currently on break
  type: "lunch" | "short" | "personal"
  duration_minutes: number | null
}

export type BehaviorScore = {
  id: string
  employee_id: string
  date: string
  punctuality_score: number
  break_discipline_score: number
  consistency_score: number
  overall_score: number
  rank: "excellent" | "good" | "average" | "needs-improvement"
}
