'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

type Pose = 'walk1' | 'walk2' | 'idle' | 'victory' | 'wave' | 'jump'

const Character = ({ pose }: { pose: Pose }) => (
  <svg width="48" height="72" viewBox="0 0 48 72" fill="none">
    {/* Head */}
    <rect x="16" y="4" width="16" height="16" rx="3" fill="#e2e8f0" />
    {/* Eyes */}
    <rect x="19" y="9" width="3" height="3" fill="#0b0f14" />
    <rect x="26" y="9" width="3" height="3" fill="#0b0f14" />
    {/* Hair */}
    <rect x="16" y="4" width="16" height="4" rx="2" fill="#1a1209" />
    {/* Body */}
    <rect x="14" y="22" width="20" height="22" rx="2" fill="#38bdf8" />
    {/* Belt/detail */}
    <rect x="14" y="36" width="20" height="3" fill="#0ea5e9" />

    {/* Arms — change per pose */}
    {pose === 'walk1' && (
      <>
        <rect x="6" y="22" width="8" height="14" rx="2" fill="#e2e8f0" />
        <rect x="34" y="28" width="8" height="14" rx="2" fill="#e2e8f0" />
      </>
    )}
    {pose === 'walk2' && (
      <>
        <rect x="6" y="28" width="8" height="14" rx="2" fill="#e2e8f0" />
        <rect x="34" y="22" width="8" height="14" rx="2" fill="#e2e8f0" />
      </>
    )}
    {(pose === 'idle' || pose === 'jump') && (
      <>
        <rect x="6" y="24" width="8" height="14" rx="2" fill="#e2e8f0" />
        <rect x="34" y="24" width="8" height="14" rx="2" fill="#e2e8f0" />
      </>
    )}
    {pose === 'victory' && (
      <>
        <rect x="6" y="24" width="8" height="14" rx="2" fill="#e2e8f0" />
        <rect x="34" y="8" width="8" height="14" rx="2" fill="#e2e8f0" />
        {/* Star above raised hand */}
        <text x="38" y="8" fontSize="10" fill="#f59e0b">★</text>
      </>
    )}
    {pose === 'wave' && (
      <>
        <rect x="6" y="14" width="8" height="14" rx="2" fill="#e2e8f0" transform="rotate(-30 10 21)" />
        <rect x="34" y="24" width="8" height="14" rx="2" fill="#e2e8f0" />
      </>
    )}

    {/* Legs — change per pose */}
    {(pose === 'idle' || pose === 'victory' || pose === 'wave') && (
      <>
        <rect x="16" y="44" width="8" height="20" rx="2" fill="#1e3a5f" />
        <rect x="26" y="44" width="8" height="20" rx="2" fill="#1e3a5f" />
        {/* Shoes */}
        <rect x="14" y="62" width="10" height="6" rx="2" fill="#0b0f14" />
        <rect x="24" y="62" width="10" height="6" rx="2" fill="#0b0f14" />
      </>
    )}
    {pose === 'walk1' && (
      <>
        <rect x="16" y="44" width="8" height="20" rx="2" fill="#1e3a5f" transform="rotate(15 20 44)" />
        <rect x="26" y="44" width="8" height="20" rx="2" fill="#1e3a5f" transform="rotate(-15 30 44)" />
        <rect x="12" y="60" width="10" height="6" rx="2" fill="#0b0f14" />
        <rect x="28" y="58" width="10" height="6" rx="2" fill="#0b0f14" />
      </>
    )}
    {pose === 'walk2' && (
      <>
        <rect x="16" y="44" width="8" height="20" rx="2" fill="#1e3a5f" transform="rotate(-15 20 44)" />
        <rect x="26" y="44" width="8" height="20" rx="2" fill="#1e3a5f" transform="rotate(15 30 44)" />
        <rect x="14" y="58" width="10" height="6" rx="2" fill="#0b0f14" />
        <rect x="26" y="60" width="10" height="6" rx="2" fill="#0b0f14" />
      </>
    )}
    {pose === 'jump' && (
      <>
        <rect x="14" y="44" width="8" height="16" rx="2" fill="#1e3a5f" transform="rotate(-30 18 44)" />
        <rect x="28" y="44" width="8" height="16" rx="2" fill="#1e3a5f" transform="rotate(30 32 44)" />
        <rect x="8" y="56" width="10" height="6" rx="2" fill="#0b0f14" />
        <rect x="32" y="56" width="10" height="6" rx="2" fill="#0b0f14" />
      </>
    )}
  </svg>
)

type SectionDef = { id: string; pose: Pose; label: string }

const SECTIONS: SectionDef[] = [
  { id: 'journey', pose: 'walk1', label: 'JOURNEY' },
  { id: 'chapters', pose: 'walk1', label: 'CHAPTERS' },
  { id: 'character', pose: 'jump', label: 'LVL UP' },
  { id: 'missions', pose: 'victory', label: 'MISSIONS' },
  { id: 'intel', pose: 'walk1', label: 'INTEL' },
  { id: 'skills', pose: 'walk1', label: 'SKILLS' },
  { id: 'origins', pose: 'walk1', label: 'ORIGINS' },
  { id: 'comms', pose: 'wave', label: 'COMMS' },
]

const HERO_SECTION: SectionDef = { id: 'hero', pose: 'idle', label: 'START' }

export default function ScrollCharacter() {
  const [pose, setPose] = useState<Pose>('idle')
  const [flipped, setFlipped] = useState(false)
  const [label, setLabel] = useState('START')
  const [showXP, setShowXP] = useState(false)
  const prevSectionIdRef = useRef('hero')

  useEffect(() => {
    let walkFrame = 0
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let xpTimer: ReturnType<typeof setTimeout> | undefined

    const getActiveSection = (): SectionDef => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) return s
      }
      return HERO_SECTION
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const scrollingDown = self.direction === 1
        walkFrame = walkFrame === 0 ? 1 : 0
        const active = getActiveSection()

        if (active.pose === 'victory' || active.pose === 'wave' || active.pose === 'jump') {
          setPose(active.pose)
        } else {
          setPose(walkFrame === 0 ? 'walk1' : 'walk2')
          setFlipped(!scrollingDown)
        }

        setLabel(active.label)

        if (active.id === 'character' && prevSectionIdRef.current !== 'character') {
          setShowXP(true)
          clearTimeout(xpTimer)
          xpTimer = setTimeout(() => setShowXP(false), 1200)
        }
        prevSectionIdRef.current = active.id

        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => setPose('idle'), 800)
      },
    })

    return () => {
      trigger.kill()
      clearTimeout(idleTimer)
      clearTimeout(xpTimer)
    }
  }, [])

  return (
    <div className="scroll-character">
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          height: '2px',
          background: 'rgba(56,189,248,0.15)',
          zIndex: 29,
        }}
      />

      <div
        style={{
          position: 'fixed',
          left: '16px',
          bottom: '2px',
          zIndex: 30,
          width: '48px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-26px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(11,15,20,0.8)',
            border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: '4px',
            padding: '2px 8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '8px',
            color: '#38bdf8',
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>

        <AnimatePresence>
          {showXP && (
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -40, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '80px',
                left: '4px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: '#8b5cf6',
                fontWeight: 700,
                pointerEvents: 'none',
              }}
            >
              +XP ▲
            </motion.div>
          )}
        </AnimatePresence>

        {label === 'COMMS' && (
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '0',
              background: '#161d27',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '8px',
              color: '#38bdf8',
              whiteSpace: 'nowrap',
              letterSpacing: '1px',
            }}
          >
            HIRE ME? 👋
            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: '12px',
                width: '8px',
                height: '8px',
                background: '#161d27',
                border: '1px solid rgba(56,189,248,0.3)',
                borderTop: 'none',
                borderLeft: 'none',
                transform: 'rotate(45deg)',
              }}
            />
          </div>
        )}

        <div className={pose === 'idle' ? 'breathe' : undefined}>
          <div style={{ transform: flipped ? 'scaleX(-1)' : 'scaleX(1)', transition: 'transform 0.1s' }}>
            <Character pose={pose} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .breathe {
          animation: breathe 2s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .scroll-character {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
