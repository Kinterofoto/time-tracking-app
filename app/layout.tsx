import type { Metadata } from "next"
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider-wrapper"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Damascus - Control de Tiempo",
  description: "Time tracking with facial recognition",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ClerkProviderWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProviderWrapper>
      </body>
    </html>
  )
}
