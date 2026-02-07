import type { AttendanceRecord, BreakRecord } from "@/lib/types"

function today() {
  return new Date().toISOString().split("T")[0]
}

function todayAt(hours: number, minutes: number): string {
  const d = new Date()
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

const dateStr = today()

// Employee scenarios:
// emp-001 Carlos: checked in on time, took 1 short break, currently working
// emp-002 María: checked in on time, took lunch break, currently working
// emp-003 Andrés: checked in late (9:22), currently working
// emp-004 Sofía: checked in on time, currently on break (lunch)
// emp-005 Diego: checked in early (6:50), took short break, currently working
// emp-006 Valentina: checked in on time, took 2 breaks, currently working
// emp-007 Javier: checked in late (8:15), currently working
// emp-008 Camila: absent
// emp-009 Mateo: checked in on time, already checked out (half day)
// emp-010 Isabella: checked in on time, currently on short break
// emp-011 Sebastián: absent
// emp-012 Luciana: checked in on time, took lunch, currently working

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "att-001",
    employee_id: "emp-001",
    date: dateStr,
    check_in: todayAt(7, 58),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(7, 58),
  },
  {
    id: "att-002",
    employee_id: "emp-002",
    date: dateStr,
    check_in: todayAt(7, 55),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(7, 55),
  },
  {
    id: "att-003",
    employee_id: "emp-003",
    date: dateStr,
    check_in: todayAt(9, 22),
    check_out: null,
    status: "late",
    notes: "Tráfico pesado",
    created_at: todayAt(9, 22),
  },
  {
    id: "att-004",
    employee_id: "emp-004",
    date: dateStr,
    check_in: todayAt(8, 28),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(8, 28),
  },
  {
    id: "att-005",
    employee_id: "emp-005",
    date: dateStr,
    check_in: todayAt(6, 50),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(6, 50),
  },
  {
    id: "att-006",
    employee_id: "emp-006",
    date: dateStr,
    check_in: todayAt(7, 59),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(7, 59),
  },
  {
    id: "att-007",
    employee_id: "emp-007",
    date: dateStr,
    check_in: todayAt(8, 15),
    check_out: null,
    status: "late",
    notes: null,
    created_at: todayAt(8, 15),
  },
  {
    id: "att-008",
    employee_id: "emp-008",
    date: dateStr,
    check_in: null,
    check_out: null,
    status: "absent",
    notes: "Licencia médica",
    created_at: todayAt(8, 0),
  },
  {
    id: "att-009",
    employee_id: "emp-009",
    date: dateStr,
    check_in: todayAt(7, 0),
    check_out: todayAt(12, 0),
    status: "half-day",
    notes: "Cita médica en la tarde",
    created_at: todayAt(7, 0),
  },
  {
    id: "att-010",
    employee_id: "emp-010",
    date: dateStr,
    check_in: todayAt(7, 55),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(7, 55),
  },
  {
    id: "att-011",
    employee_id: "emp-011",
    date: dateStr,
    check_in: null,
    check_out: null,
    status: "absent",
    notes: "Vacaciones",
    created_at: todayAt(8, 0),
  },
  {
    id: "att-012",
    employee_id: "emp-012",
    date: dateStr,
    check_in: todayAt(7, 52),
    check_out: null,
    status: "present",
    notes: null,
    created_at: todayAt(7, 52),
  },
]

export const mockBreaks: BreakRecord[] = [
  // Carlos: 1 short break (done)
  {
    id: "brk-001",
    attendance_id: "att-001",
    employee_id: "emp-001",
    start_time: todayAt(10, 15),
    end_time: todayAt(10, 30),
    type: "short",
    duration_minutes: 15,
  },
  // María: lunch break (done)
  {
    id: "brk-002",
    attendance_id: "att-002",
    employee_id: "emp-002",
    start_time: todayAt(12, 0),
    end_time: todayAt(12, 45),
    type: "lunch",
    duration_minutes: 45,
  },
  // Sofía: currently on lunch break
  {
    id: "brk-003",
    attendance_id: "att-004",
    employee_id: "emp-004",
    start_time: todayAt(12, 30),
    end_time: null,
    type: "lunch",
    duration_minutes: null,
  },
  // Diego: short break (done)
  {
    id: "brk-004",
    attendance_id: "att-005",
    employee_id: "emp-005",
    start_time: todayAt(9, 30),
    end_time: todayAt(9, 45),
    type: "short",
    duration_minutes: 15,
  },
  // Valentina: 2 breaks (both done)
  {
    id: "brk-005",
    attendance_id: "att-006",
    employee_id: "emp-006",
    start_time: todayAt(10, 0),
    end_time: todayAt(10, 10),
    type: "short",
    duration_minutes: 10,
  },
  {
    id: "brk-006",
    attendance_id: "att-006",
    employee_id: "emp-006",
    start_time: todayAt(12, 15),
    end_time: todayAt(13, 0),
    type: "lunch",
    duration_minutes: 45,
  },
  // Mateo: lunch break during half day
  {
    id: "brk-007",
    attendance_id: "att-009",
    employee_id: "emp-009",
    start_time: todayAt(10, 0),
    end_time: todayAt(10, 30),
    type: "short",
    duration_minutes: 30,
  },
  // Isabella: currently on short break
  {
    id: "brk-008",
    attendance_id: "att-010",
    employee_id: "emp-010",
    start_time: todayAt(11, 45),
    end_time: null,
    type: "short",
    duration_minutes: null,
  },
  // Luciana: lunch done
  {
    id: "brk-009",
    attendance_id: "att-012",
    employee_id: "emp-012",
    start_time: todayAt(12, 0),
    end_time: todayAt(12, 40),
    type: "lunch",
    duration_minutes: 40,
  },
]
