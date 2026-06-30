'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'JOURNEY', id: 'journey' },
  { label: 'CHAPTERS', id: 'chapters' },
  { label: 'CHARACTER', id: 'character' },
  { label: 'MISSIONS', id: 'missions' },
  { label: 'INTEL', id: 'intel' },
  { label: 'COMMS', id: 'comms' },
]

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    )

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-black/20' : ''
        }`}
      >
        <div className="liquid-glass rounded-full px-6 py-3 max-w-5xl mx-auto mt-4 flex items-center justify-between">
          <span
            className="text-white text-lg flex items-center gap-1"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
          >
            <span style={{ color: 'var(--accent)' }}>·</span>shakeelnotadev
          </span>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[11px] uppercase transition-colors duration-200 ${
                  activeId === link.id ? '' : 'text-white/50 hover:text-white'
                }`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '2px',
                  color: activeId === link.id ? 'var(--accent)' : undefined,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button className="liquid-glass rounded-full px-5 py-2 text-white text-sm hidden md:inline-flex">
            HIRE ME
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0b0f14]/95 flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(link.id)}
                className="text-white/70 hover:text-white text-sm uppercase"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '2px' }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
              className="liquid-glass rounded-full px-6 py-3 text-white text-sm mt-4"
            >
              HIRE ME
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
