"use client"

import { formatTime } from "@/lib/utils"

type Props = {
  position: number
}

export function CurrentTimeIndicator({ position }: Props) {
  if (position <= 0 || position >= 100) return null

  return (
    <div
      className="pointer-events-none absolute top-0 bottom-0 z-20 transition-all duration-1000"
      style={{ left: `${position}%` }}
    >
      {/* Line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-resend-red-fg/80" />
      {/* Top circle + time label */}
      <div className="absolute -top-1 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-resend-red-fg shadow-sm shadow-resend-red-fg/50" />
          <span className="mt-0.5 rounded bg-resend-red-bg px-1.5 py-0.5 font-mono text-[9px] font-medium text-resend-red-fg">
            {formatTime(new Date())}
          </span>
        </div>
      </div>
    </div>
  )
}
