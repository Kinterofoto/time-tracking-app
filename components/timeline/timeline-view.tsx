"use client"

import { useState, useMemo } from "react"
import { useTimeline } from "@/hooks/use-timeline"
import { EmployeeSearchFilter } from "@/components/dashboard/employee-search-filter"
import { TimelineHeader } from "./timeline-header"
import { TimelineRow } from "./timeline-row"
import { CurrentTimeIndicator } from "./current-time-indicator"
import { Card } from "@/components/ui/card"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  employees: EmployeeDayView[]
}

export function TimelineView({ employees }: Props) {
  const { currentTimePosition } = useTimeline()
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("all")
  const [status, setStatus] = useState("all")

  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.employee.department))
    return Array.from(set).sort()
  }, [employees])

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const name = `${e.employee.first_name} ${e.employee.last_name}`.toLowerCase()
      if (search && !name.includes(search.toLowerCase())) return false
      if (department !== "all" && e.employee.department !== department) return false
      if (status !== "all" && e.currentStatus !== status) return false
      return true
    })
  }, [employees, search, department, status])

  return (
    <div className="space-y-4">
      <EmployeeSearchFilter
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        status={status}
        onStatusChange={setStatus}
        departments={departments}
      />

      <Card className="overflow-hidden">
        <div className="custom-scrollbar overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Hour markers */}
            <TimelineHeader />

            {/* Employee rows with current time indicator */}
            <div className="relative">
              {/* Current time line */}
              <div className="absolute top-0 bottom-0 left-[200px] right-0 lg:left-[240px]">
                <CurrentTimeIndicator position={currentTimePosition} />
              </div>

              {/* Rows */}
              <div className="divide-y divide-border/30">
                {filtered.map((emp) => (
                  <TimelineRow key={emp.employee.id} data={emp} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No se encontraron empleados
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
