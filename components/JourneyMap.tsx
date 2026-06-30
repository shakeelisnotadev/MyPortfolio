'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type TagType = 'default' | 'award' | 'builder'

type Node = {
  era: string | null
  year: string
  role: string
  org: string
  title: string
  detail: string
  tag: string | null
  tagType: TagType
}

const nodes: Node[] = [
  { era: 'Education', year: '2009', role: 'SSC', org: 'Abhyudaya School', title: 'First Step', detail: '65.84% · Mumbai', tag: null, tagType: 'default' },
  { era: null, year: '2009–12', role: 'HSC — CS', org: 'JK Knowledge Centre', title: 'Science + CS', detail: '48% · Mumbai', tag: null, tagType: 'default' },
  { era: null, year: '2012–17', role: 'B.Sc CS', org: 'SST College', title: 'CS Degree', detail: 'CGPA 3.37 · Mumbai', tag: null, tagType: 'default' },
  { era: 'Career', year: '2015', role: 'Claim Adjudicator', org: 'Intelenet · Vitality UK', title: 'UK Insurance', detail: 'Promoted in 12 months', tag: '🏆 2 Awards', tagType: 'award' },
  { era: null, year: '2018', role: 'Sr AR', org: 'GeBBS Healthcare', title: 'US Billing', detail: '120+ calls/day', tag: null, tagType: 'default' },
  { era: null, year: '2019', role: 'Sr Chat Exec', org: 'Accenture · Verizon', title: 'US Telecom', detail: 'Highest CSAT streak', tag: '🏆 Top CSAT', tagType: 'award' },
  { era: 'EdTech', year: '2020', role: 'Chat Counselor', org: 'upGrad', title: 'EdTech Sales', detail: '100+ chats/day · India US APAC', tag: null, tagType: 'default' },
  { era: null, year: '2022–23', role: 'Caltech Cert', org: 'Data Analytics', title: 'Upskilling', detail: 'CGPA 4.81 · Caltech', tag: null, tagType: 'default' },
  { era: 'Builder Era', year: 'Dec 2023', role: 'Webinar Specialist', org: 'Emeritus', title: '30+ sessions/wk', detail: 'Built first tool → 8h to 5min', tag: '🔥 Builder ON', tagType: 'builder' },
  { era: null, year: '2024', role: 'Built PULSE', org: 'Emeritus', title: 'Full Stack', detail: 'React·FastAPI·PostgreSQL', tag: '🚀 Deployed', tagType: 'builder' },
  { era: null, year: '2025', role: 'ADA + Builder', org: 'Emeritus · IIT + AIM', title: 'myAttendanceBook', detail: '2200+ learners · ₹0 cost', tag: '🚀 Live', tagType: 'builder' },
  { era: null, year: 'NEXT', role: '???', org: 'Your org?', title: 'Open', detail: 'Reach out to unlock', tag: '🤝 Hire Me', tagType: 'default' },
]

const TAG_STYLES: Record<TagType, { background: string; color: string }> = {
  default: { background: 'rgba(56,189,248,0.1)', color: '#38bdf8' },
  award: { background: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  builder: { background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' },
}

function getDotStyle(node: Node, isLast: boolean) {
  if (isLast) {
    return {
      border: '2px dashed #38bdf8',
      background: 'var(--surface)',
    }
  }
  if (node.tagType === 'builder') {
    return {
      border: '2px solid #8b5cf6',
      background: 'rgba(139,92,246,0.1)',
    }
  }
  if (node.tagType === 'award') {
    return {
      border: '2px solid #38bdf8',
      background: 'rgba(56,189,248,0.1)',
    }
  }
  return {
    border: '2px solid var(--border)',
    background: 'var(--surface)',
  }
}

function getInnerDotColor(node: Node, isLast: boolean) {
  if (isLast) return '#38bdf8'
  if (node.tagType === 'builder') return '#8b5cf6'
  if (node.tagType === 'award') return '#38bdf8'
  return 'var(--border)'
}

export default function JourneyMap() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!progressLineRef.current) return
      gsap.fromTo(
        progressLineRef.current,
        { width: '0%' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: '64px 0' }}
    >
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: '#38bdf8',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          padding: '0 32px',
          marginBottom: '8px',
        }}
      >
        YOUR COMPLETE JOURNEY
      </p>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.6rem',
          color: 'var(--white)',
          padding: '0 32px',
          marginBottom: '32px',
        }}
      >
        2009 → Present
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: 'var(--muted)',
          padding: '0 32px',
          marginBottom: '24px',
        }}
      >
        Scroll the timeline →
      </p>

      <motion.div
        className="md:hidden"
        style={{ padding: '0 32px', marginBottom: '12px' }}
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowRight size={16} color="var(--muted)" />
      </motion.div>

      <div className="journey-scroll" style={{ overflowX: 'auto' }}>
        <div
          style={{
            display: 'flex',
            minWidth: 'max-content',
            padding: '0 32px 32px',
            position: 'relative',
            alignItems: 'flex-start',
            gap: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '88px',
              left: '32px',
              right: '32px',
              height: '2px',
              background: 'var(--border)',
              zIndex: 0,
            }}
          />
          <div
            ref={progressLineRef}
            style={{
              position: 'absolute',
              top: '88px',
              left: '32px',
              right: '32px',
              height: '2px',
              background: 'linear-gradient(90deg, #38bdf8, #8b5cf6)',
              width: '0%',
              zIndex: 0,
            }}
          />

          {nodes.map((node, i) => {
            const isLast = node.year === 'NEXT'
            return (
              <div
                key={`${node.year}-${i}`}
                className="journey-node"
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                  padding: '0 8px',
                }}
              >
                {node.era && (
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '9px',
                      color: 'var(--muted)',
                      position: 'absolute',
                      top: '-28px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.era}
                  </span>
                )}

                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: '#38bdf8',
                    marginBottom: '8px',
                  }}
                >
                  {node.year}
                </span>

                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...getDotStyle(node, isLast),
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: getInnerDotColor(node, isLast),
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--white)',
                    textAlign: 'center',
                    marginTop: '8px',
                  }}
                >
                  {node.role}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '9px',
                    color: 'var(--muted)',
                    textAlign: 'center',
                  }}
                >
                  {node.org}
                </span>

                <div
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    width: '132px',
                    marginTop: '10px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '10px',
                      color: 'var(--white)',
                    }}
                  >
                    {node.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '9px',
                      color: 'var(--muted)',
                      lineHeight: 1.5,
                      marginTop: '3px',
                    }}
                  >
                    {node.detail}
                  </div>
                  {node.tag && (
                    <span
                      style={{
                        fontSize: '8px',
                        padding: '2px 7px',
                        borderRadius: '10px',
                        marginTop: '5px',
                        display: 'inline-block',
                        ...TAG_STYLES[node.tagType],
                      }}
                    >
                      {node.tag}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .journey-scroll {
          scrollbar-width: none;
        }
        .journey-scroll::-webkit-scrollbar {
          display: none;
        }
        .journey-node {
          min-width: 148px;
        }
        @media (max-width: 768px) {
          .journey-node {
            min-width: 120px;
          }
        }
      `}</style>
    </section>
  )
}
