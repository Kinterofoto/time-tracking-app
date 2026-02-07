import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Time Tracking App
      </h1>
      <p className="text-lg text-muted-foreground">
        Sistema de registro de asistencia con reconocimiento facial
      </p>
      <Link
        href="/time-clock"
        className="mt-4 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
      >
        Ir al Reloj de Registro
      </Link>
    </main>
  )
}
