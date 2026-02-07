import type { BehaviorScore } from "@/lib/types"

type Rank = BehaviorScore["rank"]

function makeScore(
  employeeId: string,
  date: string,
  punctuality: number,
  breakDiscipline: number,
  consistency: number
): BehaviorScore {
  const overall = Math.round(punctuality * 0.4 + breakDiscipline * 0.35 + consistency * 0.25)
  let rank: Rank = "needs-improvement"
  if (overall >= 90) rank = "excellent"
  else if (overall >= 75) rank = "good"
  else if (overall >= 60) rank = "average"
  return {
    id: `score-${employeeId}-${date}`,
    employee_id: employeeId,
    date,
    punctuality_score: punctuality,
    break_discipline_score: breakDiscipline,
    consistency_score: consistency,
    overall_score: overall,
    rank,
  }
}

function getDaysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split("T")[0]
}

// Generate 7-day scores for each employee with realistic trends
const employeeProfiles: Record<string, { base: [number, number, number]; trend: "up" | "down" | "stable" }> = {
  "emp-001": { base: [95, 90, 92], trend: "stable" },    // Carlos: consistently excellent
  "emp-002": { base: [92, 85, 88], trend: "up" },        // María: improving
  "emp-003": { base: [60, 75, 65], trend: "down" },      // Andrés: declining (late today)
  "emp-004": { base: [88, 82, 85], trend: "stable" },    // Sofía: good and stable
  "emp-005": { base: [98, 92, 95], trend: "up" },        // Diego: top performer
  "emp-006": { base: [90, 78, 86], trend: "stable" },    // Valentina: good but break-heavy
  "emp-007": { base: [70, 80, 72], trend: "up" },        // Javier: improving from average
  "emp-008": { base: [85, 88, 80], trend: "down" },      // Camila: absent today
  "emp-009": { base: [82, 85, 78], trend: "stable" },    // Mateo: decent
  "emp-010": { base: [88, 90, 87], trend: "up" },        // Isabella: good and improving
  "emp-011": { base: [75, 70, 68], trend: "down" },      // Sebastián: declining
  "emp-012": { base: [93, 88, 90], trend: "stable" },    // Luciana: consistently good
}

export function generateWeeklyScores(): BehaviorScore[] {
  const scores: BehaviorScore[] = []

  for (const [empId, profile] of Object.entries(employeeProfiles)) {
    for (let day = 6; day >= 0; day--) {
      const dateStr = getDaysAgo(day)
      const variance = () => Math.floor(Math.random() * 10) - 5
      let trendMod = 0
      if (profile.trend === "up") trendMod = (6 - day) * 2
      if (profile.trend === "down") trendMod = -(6 - day) * 2

      const p = Math.min(100, Math.max(0, profile.base[0] + trendMod + variance()))
      const b = Math.min(100, Math.max(0, profile.base[1] + trendMod + variance()))
      const c = Math.min(100, Math.max(0, profile.base[2] + trendMod + variance()))

      scores.push(makeScore(empId, dateStr, p, b, c))
    }
  }

  return scores
}
