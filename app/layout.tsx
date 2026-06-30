import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shakeel Mulla — shakeelnotadev',
  description: 'Ops-turned-builder. Shipped PULSE, myAttendanceBook, and Feedback Automation Tool at Emeritus. 2200+ learners served. Built with Claude Code.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
