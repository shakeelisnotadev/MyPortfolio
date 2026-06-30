'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type LevelType = 'accent' | 'builder' | 'locked'

type Level = {
  level: string
  type: LevelType
  title: string
  sub: string
  desc: string
  locked: boolean
}

const levels: Level[] = [
  { level: 'LVL 1', type: 'accent', title: 'SSC Cleared', sub: 'Abhyudaya School · 2009 · 65.84%', desc: 'The origin story. Computers enter the picture for the first time.', locked: false },
  { level: 'LVL 2', type: 'accent', title: 'HSC — Computer Science', sub: 'JK Knowledge Centre · 2012 · 48%', desc: 'Doubled down on CS. The specialisation begins.', locked: false },
  { level: 'LVL 3', type: 'accent', title: 'B.Sc Computer Science', sub: 'SST College · 2012–2017 · CGPA 3.37', desc: 'Five years. The foundation that would power everything built later.', locked: false },
  { level: 'LVL 4', type: 'accent', title: 'Sr Claim Adjudicator — Vitality Health UK', sub: 'Intelenet · May 2015 – Sep 2018 · 🏆 Best Idea + Best Performer x2', desc: 'Promoted Associate → Senior in 12 months. Trained 20 advisors. Won 3 awards.', locked: false },
  { level: 'LVL 5', type: 'accent', title: 'US Medical Billing + Verizon Telecom', sub: 'GeBBS + Accenture · 2018–2019 · 🏆 Highest CSAT Streak', desc: '120+ daily calls. 7+ CSAT surveys × 3 consecutive days. Record in pilot batch.', locked: false },
  { level: 'LVL 6', type: 'accent', title: 'Web-Chat Counselor — upGrad', sub: 'upGrad · Dec 2020 – Jun 2023 · 100+ chats/day', desc: 'India, US, APAC. Lead gen, pre-qualification, dual platform, referral pipelines.', locked: false },
  { level: 'LVL 7', type: 'accent', title: 'Caltech Data Analytics Certificate', sub: 'Caltech · Apr 2022 – Mar 2023 · CGPA 4.81', desc: 'Full-time job + certification simultaneously. The data pivot. Trainity internship.', locked: false },
  { level: 'LVL 8', type: 'builder', title: '🔥 UNLOCKED: Builder Mode — First Tool', sub: 'Emeritus Webinar Specialist · Dec 2023', desc: 'Feedback Automation Tool. 8 hrs → 5 min. 300+ reports/day. The operator becomes the builder.', locked: false },
  { level: 'LVL 9', type: 'builder', title: '🚀 UNLOCKED: Full Stack — PULSE', sub: 'Emeritus ADA · 2024', desc: 'React + Vite + FastAPI + PostgreSQL + Zoom API + Airtable. 4–5 hrs/associate → 10 min. 2000+ sessions/month.', locked: false },
  { level: 'LVL 10', type: 'builder', title: '🚀 UNLOCKED: Full Stack — myAttendanceBook', sub: 'Emeritus ADA · 2025', desc: 'Firebase dual portal. 2200+ learners. 2 days manual → 5–10 min every weekend. ₹0 build cost.', locked: false },
  { level: 'LVL 11', type: 'locked', title: '??? — NEXT MISSION', sub: 'Unlocks when you reach out', desc: '', locked: true },
]

const statsData = [
  { value: '3', label: 'TOOLS BUILT' },
  { value: '2200+', label: 'USERS SERVED' },
  { value: '10', label: 'YRS EXPERIENCE' },
  { value: '₹0', label: 'BUILD COST' },
]

const BADGE_STYLES: Record<LevelType, { background: string; color: string; border: string }> = {
  accent: { background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' },
  builder: { background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.2)' },
  locked: { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' },
}

export default function RPGSheet() {
  const sectionRef = useRef<HTMLElement>(null)
  const xpFillRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [photoError, setPhotoError] = useState(false)

  useGSAP(
    () => {
      gsap.fromTo(
        xpFillRef.current,
        { width: '0%' },
        {
          width: '78%',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: xpFillRef.current,
            start: 'top 85%',
          },
        }
      )

      const items = gsap.utils.toArray<HTMLElement>('.level-item', listRef.current ?? undefined)
      gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="character"
      ref={sectionRef}
      style={{ background: 'var(--surface)', padding: '64px 24px' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            color: '#38bdf8',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          CHARACTER SHEET
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'var(--white)',
            marginBottom: '32px',
          }}
        >
          You are looking at the player.
        </h2>

        <div
          className="player-card"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div className="player-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #38bdf8, #8b5cf6, #38bdf8)',
                padding: '2px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {photoError ? (
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      color: 'var(--white)',
                    }}
                  >
                    SM
                  </span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/photo.jpg"
                    alt="Shakeel Mulla"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setPhotoError(true)}
                  />
                )}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  color: 'var(--white)',
                }}
              >
                SHAKEEL MULLA
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  color: '#38bdf8',
                  letterSpacing: '2px',
                }}
              >
                CLASS: VIBECODER · OPS-TURNED-BUILDER
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: 'var(--muted)',
                }}
              >
                Mumbai, India · Emeritus
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '40px',
                  color: '#38bdf8',
                  lineHeight: 1,
                }}
              >
                11
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: 'var(--muted)',
                }}
              >
                YRS EXP
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: 'var(--muted)',
                }}
              >
                EXPERIENCE POINTS
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  color: '#38bdf8',
                }}
              >
                78 / 100 XP
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'var(--border)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginTop: '6px',
              }}
            >
              <div
                ref={xpFillRef}
                style={{
                  width: '0%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #38bdf8, #8b5cf6)',
                  borderRadius: '3px',
                }}
              />
            </div>
          </div>

          <div className="player-stats" style={{ marginTop: '20px' }}>
            {statsData.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '20px',
                    color: '#38bdf8',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '8px',
                    color: 'var(--muted)',
                    letterSpacing: '1px',
                    marginTop: '4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={listRef}>
          {levels.map((lvl) => (
            <div
              key={lvl.level}
              className="level-item"
              style={{
                display: 'flex',
                gap: '14px',
                marginBottom: '12px',
                borderRadius: '8px',
                background: lvl.locked ? 'transparent' : 'var(--card)',
                border: lvl.locked ? '1px dashed var(--border)' : '1px solid var(--border)',
                opacity: lvl.locked ? 0.4 : 1,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '8px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  flexShrink: 0,
                  marginTop: '2px',
                  height: 'fit-content',
                  ...BADGE_STYLES[lvl.type],
                }}
              >
                {lvl.level}
              </span>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    color: lvl.locked ? 'var(--muted)' : 'var(--white)',
                  }}
                >
                  {lvl.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: 'var(--muted)',
                    marginTop: '3px',
                  }}
                >
                  {lvl.sub}
                </div>
                {lvl.desc && (
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: 'var(--muted)',
                      marginTop: '5px',
                      lineHeight: 1.6,
                    }}
                  >
                    {lvl.desc}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .player-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .level-item {
          padding: 12px 16px;
        }
        @media (max-width: 768px) {
          .player-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .player-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .level-item {
            padding: 10px 12px;
          }
        }
      `}</style>
    </section>
  )
}
