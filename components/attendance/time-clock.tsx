"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LiveClock } from "./live-clock"
import { StatusBadge, type EmployeeStatus } from "./status-badge"
import { ActionButton } from "./action-button"
import { GreetingOverlay, type GreetingType } from "./greeting-overlay"
import { TimeLog, type TimeEntry } from "./time-log"
import { EmployeeSelector, type Employee } from "./employee-selector"

export function TimeClock() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [status, setStatus] = useState<EmployeeStatus>("not-checked-in")
  const [greeting, setGreeting] = useState<{
    type: GreetingType
    visible: boolean
  }>({ type: "check-in", visible: false })
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  const addEntry = useCallback((type: GreetingType) => {
    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      type,
      timestamp: new Date(),
    }
    setTimeEntries((prev) => [...prev, entry])
  }, [])

  const showGreeting = useCallback(
    (type: GreetingType) => {
      setGreeting({ type, visible: true })
      addEntry(type)

      switch (type) {
        case "check-in":
          setStatus("working")
          break
        case "break-start":
          setStatus("on-break")
          break
        case "break-end":
          setStatus("working")
          break
        case "check-out":
          setStatus("not-checked-in")
          break
      }
    },
    [addEntry]
  )

  const handleCloseGreeting = useCallback(() => {
    setGreeting((prev) => ({ ...prev, visible: false }))

    if (greeting.type === "check-out") {
      setTimeout(() => {
        setSelectedEmployee(null)
        setTimeEntries([])
        setStatus("not-checked-in")
      }, 300)
    }
  }, [greeting.type])

  const handleBackToSelector = useCallback(() => {
    setSelectedEmployee(null)
    setTimeEntries([])
    setStatus("not-checked-in")
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      {/* Background subtle pattern */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.03),transparent_70%)]" />

      <AnimatePresence mode="wait">
        {!selectedEmployee ? (
          <motion.div
            key="selector"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LiveClock />
            <EmployeeSelector onSelect={setSelectedEmployee} />
          </motion.div>
        ) : (
          <motion.div
            key="clock"
            className="flex w-full max-w-lg flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Back button */}
            <motion.button
              className="absolute left-6 top-6 flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={handleBackToSelector}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Cambiar
            </motion.button>

            {/* Clock */}
            <LiveClock />

            {/* Employee info */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary animate-pulse-glow">
                {selectedEmployee.avatar}
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedEmployee.name}
              </h2>
              <StatusBadge status={status} />
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="grid w-full gap-4"
              style={{
                gridTemplateColumns:
                  status === "working"
                    ? "repeat(2, 1fr)"
                    : "1fr",
              }}
              layout
            >
              <AnimatePresence mode="wait">
                {status === "not-checked-in" && (
                  <ActionButton
                    key="check-in"
                    label="Registrar Entrada"
                    emoji="🚀"
                    description="Comienza tu jornada laboral"
                    variant="primary"
                    onClick={() => showGreeting("check-in")}
                  />
                )}

                {status === "working" && (
                  <>
                    <ActionButton
                      key="break-start"
                      label="Tomar Descanso"
                      emoji="☕"
                      description="Relájate un momento"
                      variant="warning"
                      onClick={() => showGreeting("break-start")}
                    />
                    <ActionButton
                      key="check-out"
                      label="Registrar Salida"
                      emoji="👋"
                      description="Termina tu jornada"
                      variant="danger"
                      onClick={() => showGreeting("check-out")}
                    />
                  </>
                )}

                {status === "on-break" && (
                  <ActionButton
                    key="break-end"
                    label="Volver al Trabajo"
                    emoji="💪"
                    description="Regresa con toda la energía"
                    variant="info"
                    onClick={() => showGreeting("break-end")}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Time log */}
            <TimeLog entries={timeEntries} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting overlay */}
      <GreetingOverlay
        type={greeting.type}
        employeeName={selectedEmployee?.name ?? ""}
        isVisible={greeting.visible}
        onClose={handleCloseGreeting}
      />
    </div>
  )
}
