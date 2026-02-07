"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-resend-red-bg">
            <AlertTriangle className="h-6 w-6 text-resend-red-fg" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Error al cargar el dashboard</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {error.message || "Ocurrió un error inesperado."}
            </p>
          </div>
          <Button onClick={reset}>Intentar de nuevo</Button>
        </CardContent>
      </Card>
    </div>
  )
}
