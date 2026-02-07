"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export type GreetingType = "check-in" | "break-start" | "break-end" | "check-out"

interface GreetingConfig {
  emoji: string
  title: string
  subtitle: string
  gradient: string
  particles: string[]
  accentColor: string
}

const greetingConfigs: Record<GreetingType, GreetingConfig> = {
  "check-in": {
    emoji: "👋",
    title: "Bienvenido/a",
    subtitle: "A dar lo mejor hoy",
    gradient: "from-emerald-600/90 via-green-500/90 to-teal-400/90",
    particles: ["🌟", "✨", "⚡", "🔥", "💪", "🚀"],
    accentColor: "rgb(52, 211, 153)",
  },
  "break-start": {
    emoji: "☕",
    title: "Buen descanso",
    subtitle: "Relájate y recarga energías",
    gradient: "from-amber-600/90 via-orange-500/90 to-yellow-400/90",
    particles: ["☕", "🧘", "🌿", "😌", "🎵", "🌸"],
    accentColor: "rgb(251, 191, 36)",
  },
  "break-end": {
    emoji: "💪",
    title: "De vuelta",
    subtitle: "Con toda la energía",
    gradient: "from-blue-600/90 via-indigo-500/90 to-violet-400/90",
    particles: ["⚡", "🔥", "💪", "🚀", "✨", "🎯"],
    accentColor: "rgb(99, 102, 241)",
  },
  "check-out": {
    emoji: "🌅",
    title: "Buen trabajo hoy",
    subtitle: "Que tengas un excelente día",
    gradient: "from-purple-600/90 via-pink-500/90 to-rose-400/90",
    particles: ["👋", "🌙", "⭐", "🏠", "😊", "🎉"],
    accentColor: "rgb(236, 72, 153)",
  },
}

function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 18) return "Buenas tardes"
  return "Buenas noches"
}

interface FloatingParticleProps {
  emoji: string
  index: number
}

function FloatingParticle({ emoji, index }: FloatingParticleProps) {
  const randomX = Math.random() * 100
  const randomDelay = Math.random() * 0.5
  const randomDuration = 2 + Math.random() * 2
  const randomSize = 1.5 + Math.random() * 1.5

  return (
    <motion.div
      className="pointer-events-none fixed text-4xl"
      style={{ fontSize: `${randomSize}rem` }}
      initial={{
        x: `${randomX}vw`,
        y: "110vh",
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay + index * 0.15,
        ease: "easeOut",
      }}
    >
      {emoji}
    </motion.div>
  )
}

interface GreetingOverlayProps {
  type: GreetingType
  employeeName: string
  isVisible: boolean
  onClose: () => void
}

export function GreetingOverlay({
  type,
  employeeName,
  isVisible,
  onClose,
}: GreetingOverlayProps) {
  const config = greetingConfigs[type]
  const timeGreeting = getTimeGreeting()
  const firstName = employeeName.split(" ")[0]

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, handleClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} backdrop-blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Radial glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${config.accentColor}33 0%, transparent 70%)`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Floating particles */}
          {config.particles.map((emoji, index) => (
            <FloatingParticle key={index} emoji={emoji} index={index} />
          ))}
          {config.particles.map((emoji, index) => (
            <FloatingParticle
              key={`second-${index}`}
              emoji={emoji}
              index={index + config.particles.length}
            />
          ))}

          {/* Main content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-8 text-center"
            initial={{ scale: 0.3, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
          >
            {/* Big emoji */}
            <motion.div
              className="text-8xl md:text-9xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {config.emoji}
              </motion.span>
            </motion.div>

            {/* Time-based greeting */}
            <motion.p
              className="text-xl text-white/70 font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {type === "check-in" ? timeGreeting : ""}
            </motion.p>

            {/* Main title with name */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {type === "check-in"
                ? `${config.title}, ${firstName}!`
                : type === "check-out"
                  ? `${config.title}, ${firstName}!`
                  : `${config.title}, ${firstName}!`}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl text-white/80 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              {config.subtitle}
            </motion.p>

            {/* Timestamp */}
            <motion.div
              className="mt-4 rounded-2xl bg-white/10 px-8 py-4 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-lg text-white/60 font-mono">
                {new Date().toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </motion.div>

            {/* Tap to dismiss */}
            <motion.p
              className="mt-6 text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Toca para cerrar
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
