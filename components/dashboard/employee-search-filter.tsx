"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  search: string
  onSearchChange: (value: string) => void
  department: string
  onDepartmentChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  departments: string[]
}

export function EmployeeSearchFilter({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
  departments,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar empleado..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={department} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Departamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {departments.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="working">Trabajando</SelectItem>
          <SelectItem value="on-break">En Descanso</SelectItem>
          <SelectItem value="absent">Ausente</SelectItem>
          <SelectItem value="checked-out">Salió</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
