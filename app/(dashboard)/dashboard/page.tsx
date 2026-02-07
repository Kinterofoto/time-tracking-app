import { getDashboardData } from "@/lib/data/dashboard"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const { summary, employees } = await getDashboardData()

  return <DashboardContent summary={summary} employees={employees} />
}
