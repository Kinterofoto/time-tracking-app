"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getEmployees } from "@/lib/data/attendance"

interface Employee {
  id: string
  name: string
  avatar: string
}

interface EmployeeSelectorProps {
  onSelect: (employee: Employee) => void
}

export function EmployeeSelector({ onSelect }: EmployeeSelectorProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEmployees() {
      try {
        const dbEmployees = await getEmployees()
        const formattedEmployees: Employee[] = dbEmployees
          .filter((emp) => emp.status === "active")
          .map((emp) => {
            const initials =
              emp.first_name.charAt(0) + emp.last_name.charAt(0)
            return {
              id: emp.id,
              name: `${emp.first_name} ${emp.last_name}`,
              avatar: initials.toUpperCase(),
            }
          })
        setEmployees(formattedEmployees)
      } catch (error) {
        console.error("Error loading employees:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEmployees()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
          Cargando empleados...
        </h2>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
        Selecciona tu perfil
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {employees.map((employee, index) => (
          <motion.button
            key={employee.id}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-primary/50 hover:bg-card"
            onClick={() => onSelect(employee)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
              {employee.avatar}
            </div>
            <span className="text-sm font-medium text-foreground">
              {employee.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export type { Employee }
