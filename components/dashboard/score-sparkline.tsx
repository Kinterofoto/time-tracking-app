"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"
import type { BehaviorScore } from "@/lib/types"
import { getScoreTrend } from "@/lib/scoring/calculate-scores"

type Props = {
  scores: BehaviorScore[]
}

const trendColors = {
  up: "#46FEA5D4",      // resend green
  down: "#FF9592",       // resend red
  stable: "#70B8FF",     // resend blue
}

export function ScoreSparkline({ scores }: Props) {
  const trend = getScoreTrend(scores)
  const data = scores
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((s) => ({ score: s.overall_score }))

  return (
    <div className="h-8 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="score"
            stroke={trendColors[trend]}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
