'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'

type Project = {
  id: string
  name: string
  status: 'DEPLOYED' | 'LIVE'
  gradient: string
  stat1val: string
  stat1label: string
  stat2val: string
  stat2label: string
  mission: string
  before: string
  after: string
  stack: string[]
  github: string
  live: string
}

const projects: Project[] = [
  {
    id: '01',
    name: 'PULSE — Session Intelligence Dashboard',
    status: 'DEPLOYED',
    gradient: 'linear-gradient(90deg, #38bdf8, #8b5cf6)',
    stat1val: '10 min', stat1label: 'was 4–5 hrs/associate/day',
    stat2val: '2000+', stat2label: 'sessions automated/month',
    mission: 'Eliminate manual post-session data entry across 2000+ monthly sessions for all LOBs at Emeritus.',
    before: 'Associates spending 4–5 hours daily updating Airtable manually — ratings, survey responses, learner counts, feedback reports, session runtime. 24-hour TAT regularly missed. Data unreliable due to human entry errors. Task pending until associate logged in.',
    after: 'Manager logs in to PULSE, fetches Zoom data via API, auto-matches sessions to Airtable entries. One click pushes all data — ratings, responses, learner count, runtime, reports. 100% accuracy from Zoom API. Zero PII stored.',
    stack: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Zoom API', 'Airtable API', 'JWT Auth', 'Render'],
    github: '',
    live: '',
  },
  {
    id: '02',
    name: 'myAttendanceBook',
    status: 'LIVE',
    gradient: 'linear-gradient(90deg, #10b981, #38bdf8)',
    stat1val: '5–10 min', stat1label: 'was 2 full days/week',
    stat2val: '2200+', stat2label: 'learners auto-marked weekly',
    mission: 'Replace manual Excel-based attendance tracking with an automated dual-portal platform for 2200+ learners.',
    before: '4 associates spending 2 full days every week updating attendance manually from Zoom dumps into Excel sheets uploaded to Canvas LMS. Frequent learner tickets for missed entries. All learners could see each other\'s records — no personalisation, no privacy.',
    after: 'Attendance auto-marked every weekend in 5–10 minutes via Zoom API. Admin Panel for full management control — CSV upload, Canvas API sync, manual overrides, audit trail, activity logs. Learner Portal — personal dashboard, attendance ring, session history, mobile-first. Fallback: raw Zoom file upload marks all in 15 min. ₹0 build cost.',
    stack: ['Vanilla JS', 'Firebase Auth', 'Firestore', 'Firebase Storage', 'Firebase Hosting', 'Canvas API', 'SheetJS'],
    github: '',
    live: 'https://myattendancebook-admin.web.app',
  },
  {
    id: '03',
    name: 'Feedback Automation Tool',
    status: 'DEPLOYED',
    gradient: 'linear-gradient(90deg, #f59e0b, #10b981)',
    stat1val: '5 min', stat1label: 'was 8 hrs of daily manual effort',
    stat2val: '300+', stat2label: 'reports generated per day',
    mission: 'Automate daily feedback report generation for 150+ weekend sessions and 60–70+ weekday sessions across all LOBs at Emeritus.',
    before: '8 associates spending 8 hours daily generating individual Excel feedback reports from raw Zoom data dumps. Reports sent manually to faculty, speakers, and stakeholders. TAT frequently missed as programme volume kept growing. No scalability.',
    after: 'All reports generated in under 5 minutes from Zoom data dump. Packaged into LOB-specific ZIP files automatically. Auto-uploaded to Airtable and distributed to all stakeholders instantly. Manager-only access, credential-gated. Fully cloud deployed.',
    stack: ['Python', 'Streamlit', 'Zoom API', 'Airtable', 'GitHub', 'Cloud Deployment'],
    github: '',
    live: '',
  },
]

const STATUS_STYLES: Record<Project['status'], { background: string; color: string; border: string }> = {
  DEPLOYED: { background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' },
  LIVE: { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' },
}

const NUMBER_SPLIT = /(\d[\d,.]*%?\+?)/g
const NUMBER_TEST = /^\d[\d,.]*%?\+?$/

function Highlighted({ text }: { text: string }) {
  const parts = text.split(NUMBER_SPLIT)
  return (
    <>
      {parts.map((part, i) =>
        NUMBER_TEST.test(part) ? (
          <Fragment key={i}>
            <span style={{ color: 'var(--white)', fontWeight: 600 }}>{part}</span>
          </Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}

function ProjectRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="project-row">
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: '#38bdf8',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          paddingTop: '2px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: 'var(--text)',
          lineHeight: 1.6,
        }}
      >
        <Highlighted text={value} />
      </span>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="missions" style={{ background: 'var(--bg)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            color: '#38bdf8',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          ACTIVE MISSIONS
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'var(--white)',
            marginBottom: '8px',
          }}
        >
          Tools I built. Problems I solved.
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'var(--muted)',
            fontStyle: 'italic',
            marginBottom: '36px',
          }}
        >
          No developer title. No team. Just Claude Code and a refusal to accept inefficiency.
        </p>

        <div className="project-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={i === 2 ? 'project-card project-card-wide' : 'project-card'}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: project.gradient,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--white)',
                  }}
                >
                  {project.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '8px',
                    letterSpacing: '1px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    ...STATUS_STYLES[project.status],
                  }}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-stats">
                <div
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '18px', color: '#38bdf8' }}>
                    {project.stat1val}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'var(--muted)', marginTop: '3px' }}>
                    {project.stat1label}
                  </div>
                </div>
                <div
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '18px', color: '#38bdf8' }}>
                    {project.stat2val}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: 'var(--muted)', marginTop: '3px' }}>
                    {project.stat2label}
                  </div>
                </div>
              </div>

              <ProjectRow label="MISSION" value={project.mission} />
              <ProjectRow label="BEFORE" value={project.before} />
              <ProjectRow label="AFTER" value={project.after} />

              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '12px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                      padding: '3px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(project.github || project.live) && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '8px',
                        border: '1px solid var(--border)',
                        color: 'var(--muted)',
                        padding: '5px 14px',
                        borderRadius: '4px',
                      }}
                    >
                      GITHUB
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '8px',
                        border: '1px solid rgba(56,189,248,0.3)',
                        color: '#38bdf8',
                        padding: '5px 14px',
                        borderRadius: '4px',
                      }}
                    >
                      LIVE
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .project-card-wide {
          grid-column: 1 / -1;
        }
        .project-card {
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .project-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 14px 0;
        }
        .project-row {
          display: grid;
          grid-template-columns: 68px 1fr;
          gap: 8px 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
          }
          .project-card-wide {
            grid-column: auto;
          }
          .project-stats {
            grid-template-columns: 1fr;
          }
          .project-row {
            grid-template-columns: 56px 1fr;
          }
        }
      `}</style>
    </section>
  )
}
