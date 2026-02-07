"use client"

import { motion } from "framer-motion"

interface Employee {
  id: string
  name: string
  avatar: string
}

const mockEmployees: Employee[] = [
  { id: "1", name: "María García", avatar: "MG" },
  { id: "2", name: "Carlos Rodríguez", avatar: "CR" },
  { id: "3", name: "Ana Martínez", avatar: "AM" },
  { id: "4", name: "Luis Hernández", avatar: "LH" },
  { id: "5", name: "Sofia López", avatar: "SL" },
  { id: "6", name: "Diego Torres", avatar: "DT" },
]

interface EmployeeSelectorProps {
  onSelect: (employee: Employee) => void
}

export function EmployeeSelector({ onSelect }: EmployeeSelectorProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
        Selecciona tu perfil
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {mockEmployees.map((employee, index) => (
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
