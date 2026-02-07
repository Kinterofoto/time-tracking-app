import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider-wrapper"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Damascus - Control de Tiempo",
  description: "Sistema de control y seguimiento de tiempo para empleados",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-inter antialiased">
        <ClerkProviderWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
