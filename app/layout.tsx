import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Time Tracking App',
  description: 'Time tracking application with facial recognition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
