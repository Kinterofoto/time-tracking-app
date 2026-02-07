import { mockAttendance, mockBreaks, mockEmployees } from "@/lib/mock"
import type { AttendanceRecord, BreakRecord, Employee } from "@/lib/types"

export type EmployeeCurrentStatus = {
  status: "not-checked-in" | "working" | "on-break"
  attendanceRecord: AttendanceRecord | null
  activeBreak: BreakRecord | null
  timeEntries: Array<{
    id: string
    type: "check-in" | "break-start" | "break-end" | "check-out"
    timestamp: Date
  }>
}

/**
 * Get the current status of an employee for today
 */
export async function getEmployeeCurrentStatus(
  employeeId: string
): Promise<EmployeeCurrentStatus> {
  const today = new Date().toISOString().split("T")[0]

  // Find today's attendance record
  const attendanceRecord = mockAttendance.find(
    (att) => att.employee_id === employeeId && att.date === today
  )

  // If no attendance record or no check-in, employee is not checked in
  if (!attendanceRecord || !attendanceRecord.check_in) {
    return {
      status: "not-checked-in",
      attendanceRecord: null,
      activeBreak: null,
      timeEntries: [],
    }
  }

  // If checked out, employee is not checked in
  if (attendanceRecord.check_out) {
    return {
      status: "not-checked-in",
      attendanceRecord,
      activeBreak: null,
      timeEntries: [],
    }
  }

  // Check if employee is on break
  const activeBreak = mockBreaks.find(
    (brk) =>
      brk.employee_id === employeeId &&
      brk.attendance_id === attendanceRecord.id &&
      brk.end_time === null
  )

  if (activeBreak) {
    return {
      status: "on-break",
      attendanceRecord,
      activeBreak,
      timeEntries: buildTimeEntries(attendanceRecord, mockBreaks),
    }
  }

  // Employee is working
  return {
    status: "working",
    attendanceRecord,
    activeBreak: null,
    timeEntries: buildTimeEntries(attendanceRecord, mockBreaks),
  }
}

/**
 * Build time entries from attendance and break records
 */
function buildTimeEntries(
  attendance: AttendanceRecord,
  allBreaks: BreakRecord[]
): Array<{
  id: string
  type: "check-in" | "break-start" | "break-end" | "check-out"
  timestamp: Date
}> {
  const entries: Array<{
    id: string
    type: "check-in" | "break-start" | "break-end" | "check-out"
    timestamp: Date
  }> = []

  // Add check-in
  if (attendance.check_in) {
    entries.push({
      id: `${attendance.id}-check-in`,
      type: "check-in",
      timestamp: new Date(attendance.check_in),
    })
  }

  // Add breaks
  const employeeBreaks = allBreaks.filter(
    (brk) => brk.attendance_id === attendance.id
  )

  for (const brk of employeeBreaks) {
    entries.push({
      id: `${brk.id}-start`,
      type: "break-start",
      timestamp: new Date(brk.start_time),
    })

    if (brk.end_time) {
      entries.push({
        id: `${brk.id}-end`,
        type: "break-end",
        timestamp: new Date(brk.end_time),
      })
    }
  }

  // Add check-out
  if (attendance.check_out) {
    entries.push({
      id: `${attendance.id}-check-out`,
      type: "check-out",
      timestamp: new Date(attendance.check_out),
    })
  }

  // Sort by timestamp
  return entries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

/**
 * Record a check-in
 */
export async function recordCheckIn(employeeId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0]
  const now = new Date().toISOString()

  const newRecord: AttendanceRecord = {
    id: `att-${Date.now()}`,
    employee_id: employeeId,
    date: today,
    check_in: now,
    check_out: null,
    status: "present",
    notes: null,
    created_at: now,
  }

  // In production, this would save to Supabase
  // For now, we'll add to mock data
  mockAttendance.push(newRecord)
}

/**
 * Record a check-out
 */
export async function recordCheckOut(attendanceId: string): Promise<void> {
  const now = new Date().toISOString()

  const record = mockAttendance.find((att) => att.id === attendanceId)
  if (record) {
    record.check_out = now
  }
}

/**
 * Start a break
 */
export async function startBreak(
  attendanceId: string,
  employeeId: string,
  type: "lunch" | "short" | "personal" = "short"
): Promise<void> {
  const now = new Date().toISOString()

  const newBreak: BreakRecord = {
    id: `brk-${Date.now()}`,
    attendance_id: attendanceId,
    employee_id: employeeId,
    start_time: now,
    end_time: null,
    type,
    duration_minutes: null,
  }

  mockBreaks.push(newBreak)
}

/**
 * End a break
 */
export async function endBreak(breakId: string): Promise<void> {
  const now = new Date().toISOString()

  const breakRecord = mockBreaks.find((brk) => brk.id === breakId)
  if (breakRecord) {
    breakRecord.end_time = now
    const startTime = new Date(breakRecord.start_time)
    const endTime = new Date(now)
    breakRecord.duration_minutes = Math.round(
      (endTime.getTime() - startTime.getTime()) / 60000
    )
  }
}

/**
 * Get all employees
 */
export async function getEmployees(): Promise<Employee[]> {
  return mockEmployees
}
