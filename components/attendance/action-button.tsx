"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ActionButtonProps {
  label: string
  emoji: string
  description: string
  variant: "primary" | "warning" | "info" | "danger"
  onClick: () => void
}

const variantStyles = {
  primary: {
    bg: "bg-emerald-500 hover:bg-emerald-400",
    shadow: "shadow-emerald-500/25 hover:shadow-emerald-400/30",
    ring: "focus-visible:ring-emerald-400",
  },
  warning: {
    bg: "bg-amber-500 hover:bg-amber-400",
    shadow: "shadow-amber-500/25 hover:shadow-amber-400/30",
    ring: "focus-visible:ring-amber-400",
  },
  info: {
    bg: "bg-blue-500 hover:bg-blue-400",
    shadow: "shadow-blue-500/25 hover:shadow-blue-400/30",
    ring: "focus-visible:ring-blue-400",
  },
  danger: {
    bg: "bg-rose-500 hover:bg-rose-400",
    shadow: "shadow-rose-500/25 hover:shadow-rose-400/30",
    ring: "focus-visible:ring-rose-400",
  },
}

export function ActionButton({
  label,
  emoji,
  description,
  variant,
  onClick,
}: ActionButtonProps) {
  const styles = variantStyles[variant]

  return (
    <motion.button
      className={cn(
        "group relative flex w-full flex-col items-center gap-3 rounded-2xl px-8 py-8 text-white transition-all duration-200",
        "shadow-lg focus-visible:outline-none focus-visible:ring-2",
        styles.bg,
        styles.shadow,
        styles.ring
      )}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="text-4xl transition-transform duration-200 group-hover:scale-110">
        {emoji}
      </span>
      <span className="text-xl font-bold">{label}</span>
      <span className="text-sm text-white/70">{description}</span>
    </motion.button>
  )
}
