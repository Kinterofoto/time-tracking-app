import { Star, ThumbsUp, Minus, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getRankLabel, type BehaviorRank } from "@/lib/scoring/calculate-scores"

type Props = {
  rank: BehaviorRank
  size?: "sm" | "md"
}

const rankStyles: Record<BehaviorRank, { bg: string; text: string; icon: typeof Star }> = {
  excellent: { bg: "bg-resend-green-bg", text: "text-resend-green-fg", icon: Star },
  good: { bg: "bg-resend-blue-bg", text: "text-resend-blue-fg", icon: ThumbsUp },
  average: { bg: "bg-resend-amber-bg", text: "text-resend-amber-fg", icon: Minus },
  "needs-improvement": { bg: "bg-resend-red-bg", text: "text-resend-red-fg", icon: AlertTriangle },
}

export function ScoreBadge({ rank, size = "sm" }: Props) {
  const style = rankStyles[rank]
  const Icon = style.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        style.bg,
        style.text,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {getRankLabel(rank)}
    </div>
  )
}
