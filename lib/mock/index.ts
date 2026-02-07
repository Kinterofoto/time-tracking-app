import { mockEmployees } from "./employees"
import { mockAttendance, mockBreaks } from "./attendance"
import { generateWeeklyScores } from "./behavior-scores"
import { buildTimelineSegments } from "@/lib/timeline/utils"
import type {
  EmployeeDayView,
  DashboardSummary,
  EmployeeStatus,
} from "@/lib/types"

// Re-export mock data
export { mockEmployees, mockAttendance, mockBreaks }

export function getMockDashboardData(): {
  summary: DashboardSummary
  employees: EmployeeDayView[]
} {
  const weeklyScores = generateWeeklyScores()
  const today = new Date().toISOString().split("T")[0]

  const employeeViews: EmployeeDayView[] = mockEmployees.map((emp) => {
    const attendance = mockAttendance.find((a) => a.employee_id === emp.id) || null
    const breaks = mockBreaks.filter((b) => b.employee_id === emp.id)
    const empScores = weeklyScores.filter((s) => s.employee_id === emp.id)
    const todayScore = empScores.find((s) => s.date === today) || null

    // Determine current status
    let currentStatus: EmployeeStatus = "absent"
    if (attendance) {
      if (!attendance.check_in) {
        currentStatus = "absent"
      } else if (attendance.check_out) {
        currentStatus = "checked-out"
      } else {
        const hasOngoingBreak = breaks.some((b) => !b.end_time)
        if (hasOngoingBreak) {
          currentStatus = "on-break"
        } else if (attendance.status === "late") {
          currentStatus = "working" // they're late but working now
        } else {
          currentStatus = "working"
        }
      }
    }

    // Calculate totals
    const timelineSegments = buildTimelineSegments(attendance, breaks)
    const totalWorkedMinutes = timelineSegments
      .filter((s) => s.type === "work")
      .reduce((sum, s) => sum + s.duration, 0)
    const totalBreakMinutes = timelineSegments
      .filter((s) => s.type === "break")
      .reduce((sum, s) => sum + s.duration, 0)

    return {
      employee: emp,
      attendance,
      breaks,
      currentStatus,
      timelineSegments,
      totalWorkedMinutes,
      totalBreakMinutes,
      behaviorScore: todayScore,
      weeklyScores: empScores,
    }
  })

  const checkedIn = employeeViews.filter(
    (e) => e.currentStatus === "working" || e.currentStatus === "on-break"
  ).length
  const onBreak = employeeViews.filter((e) => e.currentStatus === "on-break").length
  const absent = employeeViews.filter((e) => e.currentStatus === "absent").length
  const withHours = employeeViews.filter((e) => e.totalWorkedMinutes > 0)
  const averageHours =
    withHours.length > 0
      ? withHours.reduce((s, e) => s + e.totalWorkedMinutes, 0) / withHours.length / 60
      : 0
  const onTimeCount = employeeViews.filter(
    (e) => e.attendance && e.attendance.status === "present"
  ).length
  const totalWithAttendance = employeeViews.filter(
    (e) => e.attendance && e.attendance.check_in
  ).length

  const summary: DashboardSummary = {
    totalEmployees: mockEmployees.length,
    checkedIn,
    onBreak,
    absent,
    averageHoursToday: Math.round(averageHours * 10) / 10,
    punctualityRate:
      totalWithAttendance > 0
        ? Math.round((onTimeCount / totalWithAttendance) * 100)
        : 0,
  }

  return { summary, employees: employeeViews }
}
