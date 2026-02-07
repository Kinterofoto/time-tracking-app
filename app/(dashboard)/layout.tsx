import { DashboardHeader } from "@/components/layout/dashboard-header"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <DashboardShell>{children}</DashboardShell>
    </div>
  )
}
