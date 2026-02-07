import type { BehaviorScore } from "@/lib/types"

export type BehaviorRank = BehaviorScore["rank"]

export function calculateOverallScore(
  punctuality: number,
  breakDiscipline: number,
  consistency: number
): { score: number; rank: BehaviorRank } {
  const score = Math.round(punctuality * 0.4 + breakDiscipline * 0.35 + consistency * 0.25)
  let rank: BehaviorRank = "needs-improvement"
  if (score >= 90) rank = "excellent"
  else if (score >= 75) rank = "good"
  else if (score >= 60) rank = "average"
  return { score, rank }
}

export function getScoreTrend(
  scores: BehaviorScore[]
): "up" | "down" | "stable" {
  if (scores.length < 2) return "stable"
  const sorted = [...scores].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const recent = sorted.slice(-3)
  const older = sorted.slice(0, 3)
  const recentAvg =
    recent.reduce((s, v) => s + v.overall_score, 0) / recent.length
  const olderAvg =
    older.reduce((s, v) => s + v.overall_score, 0) / older.length
  const diff = recentAvg - olderAvg
  if (diff > 3) return "up"
  if (diff < -3) return "down"
  return "stable"
}

export function getRankLabel(rank: BehaviorRank): string {
  switch (rank) {
    case "excellent":
      return "Excelente"
    case "good":
      return "Bueno"
    case "average":
      return "Regular"
    case "needs-improvement":
      return "Mejorar"
  }
}
