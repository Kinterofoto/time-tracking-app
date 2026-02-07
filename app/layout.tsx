import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Time Tracking App",
  description: "Sistema de registro de asistencia con reconocimiento facial",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
