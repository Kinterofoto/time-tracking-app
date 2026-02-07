import type { DashboardSummary, EmployeeDayView } from "@/lib/types"
import { getMockDashboardData } from "@/lib/mock"

export async function getDashboardData(): Promise<{
  summary: DashboardSummary
  employees: EmployeeDayView[]
}> {
  // Always use mock data for now — switch to Supabase when env vars are configured
  return getMockDashboardData()
}
