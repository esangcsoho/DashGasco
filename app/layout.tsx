import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gasco Dashboard SGP',
  description: 'Sistema de Gestión de Procesos - Dashboard Gasco',
  generator: 'eric.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
