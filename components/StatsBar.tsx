'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Stat =
  | { value: number; suffix: string; label: string }
  | { display: string; label: string }

const STATS: Stat[] = [
  { value: 3, suffix: '', label: 'Tools in Production' },
  { value: 2200, suffix: '+', label: 'Learners Served' },
  { value: 2000, suffix: '+', label: 'Sessions / Month' },
  { display: '8h → 5m', label: 'Daily Effort Saved' },
  { display: '₹0', label: 'Build Cost' },
]

function CountUpValue({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const start = performance.now()

    let rafId: number
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(value * t))
      if (t < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section
      className="w-full"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '32px 24px',
      }}
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '2rem',
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              {'value' in stat ? (
                <CountUpValue value={stat.value} suffix={stat.suffix} />
              ) : (
                stat.display
              )}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginTop: '4px',
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
