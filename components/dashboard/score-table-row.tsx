"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScoreBadge } from "./score-badge"
import { ScoreSparkline } from "./score-sparkline"
import { getScoreTrend } from "@/lib/scoring/calculate-scores"
import { cn } from "@/lib/utils"
import type { EmployeeDayView } from "@/lib/types"

type Props = {
  data: EmployeeDayView
  rank: number
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-7 text-right font-mono text-[10px] text-muted-foreground">
        {value}
      </span>
    </div>
  )
}

export function ScoreTableRow({ data, rank }: Props) {
  const { employee, behaviorScore, weeklyScores } = data
  const initials = `${employee.first_name[0]}${employee.last_name[0]}`
  const trend = getScoreTrend(weeklyScores)

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const trendColor =
    trend === "up"
      ? "text-resend-green-fg"
      : trend === "down"
        ? "text-resend-red-fg"
        : "text-muted-foreground"

  return (
    <div className="flex items-center gap-4 border-b border-border/30 px-4 py-3 last:border-b-0">
      {/* Rank */}
      <div className="flex w-8 items-center justify-center">
        <span className="font-mono text-sm font-bold text-muted-foreground">
          {rank}
        </span>
      </div>

      {/* Trend indicator */}
      <TrendIcon className={cn("h-4 w-4 shrink-0", trendColor)} />

      {/* Employee info */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarImage src={employee.avatar_url || undefined} alt={employee.first_name} />
          <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {employee.first_name} {employee.last_name}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {employee.department}
          </p>
        </div>
      </div>

      {/* Score bars - hidden on mobile */}
      <div className="hidden space-y-1 md:block">
        <ScoreBar
          value={behaviorScore?.punctuality_score ?? 0}
          color="bg-resend-blue-fg"
        />
        <ScoreBar
          value={behaviorScore?.break_discipline_score ?? 0}
          color="bg-resend-amber-fg"
        />
        <ScoreBar
          value={behaviorScore?.consistency_score ?? 0}
          color="bg-resend-green-fg"
        />
      </div>

      {/* Sparkline */}
      <div className="hidden sm:block">
        <ScoreSparkline scores={weeklyScores} />
      </div>

      {/* Overall score */}
      <div className="text-right">
        <p className="font-mono text-lg font-bold">
          {behaviorScore?.overall_score ?? 0}
        </p>
        {behaviorScore && <ScoreBadge rank={behaviorScore.rank} />}
      </div>
    </div>
  )
}
