"use client"

import { useMemo } from "react"
import { LiveSummaryBar } from "./live-summary-bar"
import { LiveEmployeeCard } from "./live-employee-card"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  employees: EmployeeDayView[]
}

export function LiveTrackingPanel({ employees }: Props) {
  const activeEmployees = useMemo(
    () =>
      employees.filter(
        (e) => e.currentStatus === "working" || e.currentStatus === "on-break"
      ),
    [employees]
  )

  return (
    <div className="space-y-4">
      <LiveSummaryBar employees={employees} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeEmployees.map((emp) => (
          <LiveEmployeeCard key={emp.employee.id} data={emp} />
        ))}
      </div>

      {activeEmployees.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No hay empleados activos en este momento
        </div>
      )}
    </div>
  )
}
