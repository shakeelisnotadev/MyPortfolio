'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type BadgeType = 'default' | 'award' | 'builder' | 'accent'

type Badge = { text: string; type: BadgeType }

type Chapter = {
  num: string
  icon: string
  accentColor: string
  year: string
  title: string
  org: string
  body: string
  badges: Badge[]
}

const chapters: Chapter[] = [
  {
    num: 'CH · 01', icon: '🏫', accentColor: '#38bdf8',
    year: '2008 — 2009',
    title: 'The Beginning',
    org: 'Abhyudaya English Society High School · SSC · Mumbai',
    body: 'Where the journey started. Completed SSC with 65.84%. First real exposure to computers sparked a curiosity that would define everything that followed — long before anyone expected it to matter.',
    badges: [
      { text: 'SSC', type: 'accent' },
      { text: '65.84%', type: 'default' },
      { text: 'Mumbai', type: 'default' },
    ],
  },
  {
    num: 'CH · 02', icon: '💻', accentColor: '#38bdf8',
    year: '2009 — 2012',
    title: 'Science & Computers',
    org: 'JK Knowledge Centre College · HSC — Computer Science · Mumbai University',
    body: 'Chose Computer Science as specialisation in HSC. The technical foundation quietly begins. Affiliated to Mumbai University, accredited by NAAC.',
    badges: [
      { text: 'HSC', type: 'accent' },
      { text: 'Computer Science', type: 'default' },
      { text: '48%', type: 'default' },
      { text: 'Mumbai University', type: 'default' },
    ],
  },
  {
    num: 'CH · 03', icon: '🎓', accentColor: '#38bdf8',
    year: '2012 — 2017',
    title: 'The CS Degree',
    org: 'SST College of Arts, Commerce & Science · B.Sc Computer Science · CGPA 3.37',
    body: 'Five years building a foundation in Computer Science. The knowledge that would eventually power three production-grade internal tools — long before anyone gave him a developer title or a team to build with.',
    badges: [
      { text: 'B.Sc CS', type: 'accent' },
      { text: 'CGPA 3.37', type: 'default' },
      { text: 'Mumbai University', type: 'default' },
    ],
  },
  {
    num: 'CH · 04', icon: '⚕️', accentColor: '#64748b',
    year: 'May 2015 — Sep 2018',
    title: 'The Claim Files',
    org: 'Intelenet Global Services · Sr Claim Adjudicator · Vitality Health UK · Thane',
    body: 'Scrutinised health insurance claims across Gynaecology, Orthopaedics, Cancer, Maternity, and Arthritis. Joined as Associate and promoted to Senior in just 12 months. Conducted Internal Quality Audits and Training for a full year. Successfully onboarded and transitioned 20 new advisors from OJT to production floor. Sent EOD and process reports to supervisors and UK clients for forecasting.',
    badges: [
      { text: '🏆 Best Idea of Quarter 2016', type: 'award' },
      { text: '🏆 Best Performer 2017', type: 'award' },
      { text: '🏆 Best Performer 2018', type: 'award' },
      { text: 'Promoted in 12 months', type: 'accent' },
      { text: 'Trained 20 Advisors', type: 'accent' },
      { text: 'Vitality Health UK', type: 'default' },
    ],
  },
  {
    num: 'CH · 05', icon: '🏥', accentColor: '#64748b',
    year: 'Oct 2018 — Apr 2019',
    title: 'US Medical Billing',
    org: 'GeBBS Healthcare Solutions · Sr Accounts Receivable · Navi Mumbai',
    body: "US Medical Billing RCM — coordinating with insurance companies on behalf of doctors to obtain accurate claim status. Maintained precise records of claim denial details in CRM. Generated coding reports and resubmitted to insurers. Prepared payment receipts and submitted to doctor's offices. Managed 120+ daily calls while maintaining exceptional customer service standards.",
    badges: [
      { text: '120+ calls/day', type: 'accent' },
      { text: 'US Healthcare', type: 'default' },
      { text: 'RCM', type: 'default' },
      { text: 'GeBBS', type: 'default' },
    ],
  },
  {
    num: 'CH · 06', icon: '📱', accentColor: '#64748b',
    year: 'Aug 2019 — Dec 2019',
    title: 'Telecom — Verizon US',
    org: 'Accenture Services · Sr Chat Executive · Navi Mumbai',
    body: 'Dual-chat support for US-based Verizon customers. Simultaneously handled dual chats while consistently meeting TAT. Successfully promoted loyalty programs and offered discounts. Part of a new pilot batch — achieved the highest CSAT streak of the entire team. 7+ positive surveys for 3 consecutive days, a record in the process.',
    badges: [
      { text: '🏆 Highest CSAT Streak', type: 'award' },
      { text: '7+ surveys × 3 days', type: 'award' },
      { text: 'Verizon US', type: 'default' },
      { text: 'Pilot Batch', type: 'accent' },
    ],
  },
  {
    num: 'CH · 07', icon: '📚', accentColor: '#10b981',
    year: 'Dec 2020 — Jun 2023',
    title: 'EdTech — upGrad',
    org: 'upGrad Education Pvt Ltd · Web-Chat Counselor · Mumbai',
    body: 'Handled 100+ concurrent chats daily across Drift and WhatsApp Business. Served India, US, and APAC regions. Conducted phone-based profiling and pre-sales connects to qualify leads. Pitched suitable courses and routed hot leads to Senior Counselors. Generated referral pipelines from existing learners. Managed dual platforms simultaneously — max 5 chats on Drift, chat load of 30 on Freshchat.',
    badges: [
      { text: '100+ chats/day', type: 'accent' },
      { text: 'India · US · APAC', type: 'default' },
      { text: 'Drift + Freshchat', type: 'default' },
      { text: 'Lead Generation', type: 'default' },
    ],
  },
  {
    num: 'CH · 08', icon: '📊', accentColor: '#10b981',
    year: 'Apr 2022 — Jun 2023',
    title: 'Caltech Data Analytics',
    org: 'California Institute of Technology · Certificate Programme · Online',
    body: "Enrolled in Caltech's Data Analytics Certificate Programme while working full-time. Graduated with CGPA 4.81. Followed up immediately with a Data Analytics internship at Trainity. The deliberate pivot towards data and technology begins in earnest — this is where the builder mindset starts taking shape.",
    badges: [
      { text: 'Caltech', type: 'accent' },
      { text: 'CGPA 4.81', type: 'accent' },
      { text: 'Data Analytics', type: 'default' },
      { text: 'Trainity Internship', type: 'default' },
    ],
  },
  {
    num: 'CH · 09', icon: '🎙️', accentColor: '#8b5cf6',
    year: 'Dec 2023 — May 2025',
    title: 'The Builder Awakens',
    org: 'Emeritus (Erulearning Solutions) · Webinar Specialist · Mumbai',
    body: 'Managing 30+ live sessions per week, 70+ learners per session on average. Owned end-to-end webinar operations — scheduling, Zoom admin, platform setup, content publishing, learner communications, stakeholder management. Spotted a critical bottleneck: 8 associates spending 8 hours daily generating feedback reports manually from raw Zoom data. Built and deployed the Feedback Automation Tool — reduced that 8-hour effort to 5 minutes. The moment the operator became the builder.',
    badges: [
      { text: '🔥 First Tool Shipped', type: 'builder' },
      { text: '30+ sessions/week', type: 'accent' },
      { text: '70+ learners/session', type: 'default' },
      { text: '8 hrs → 5 min', type: 'builder' },
      { text: '300+ reports/day', type: 'accent' },
      { text: 'Zoom + Airtable + Streamlit', type: 'default' },
    ],
  },
  {
    num: 'CH · 10', icon: '🚀', accentColor: '#8b5cf6',
    year: 'Jun 2025 — Present',
    title: 'Vibecoder — Full Stack',
    org: 'Emeritus · Academic Delivery Associate · IIT-Madras Pravartak + AIM Philippines',
    body: 'Managing executive education and professional certification programmes in Cybersecurity, GenAI, Machine Learning, and Agentic AI. Overseeing 12+ Programme Leaders across IIT-Madras Pravartak and Asian Institute of Management, Philippines. Cross-functional collaboration daily with Design, Product, Marketing, and Sales. Built and shipped two full-stack production tools during this period — PULSE (4–5 hrs/associate → 10 minutes, 2000+ sessions/month) and myAttendanceBook (2 days manual → 5–10 minutes, 2200+ learners, ₹0 build cost). No developer title. Just a refusal to accept inefficiency.',
    badges: [
      { text: '🚀 PULSE Deployed', type: 'builder' },
      { text: '🚀 myAttendanceBook Live', type: 'builder' },
      { text: '12+ Programme Leaders', type: 'accent' },
      { text: 'IIT-Madras Pravartak', type: 'default' },
      { text: 'AIM Philippines', type: 'default' },
      { text: '2200+ learners', type: 'accent' },
      { text: '₹0 build cost', type: 'builder' },
    ],
  },
]

const BADGE_STYLES: Record<BadgeType, { background: string; border: string; color: string }> = {
  default: { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted)' },
  award: { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' },
  builder: { background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#8b5cf6' },
  accent: { background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', color: '#38bdf8' },
}

function ChapterRow({ chapter, index }: { chapter: Chapter; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
      gsap.fromTo(
        spineRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    { scope: rowRef }
  )

  const background = index % 2 === 0 ? 'var(--bg)' : 'var(--surface)'

  return (
    <div
      ref={rowRef}
      className="chapter-row"
      style={{
        display: 'flex',
        minHeight: '200px',
        borderBottom: '1px solid var(--border)',
        background,
      }}
    >
      <div
        ref={spineRef}
        className="chapter-spine"
        style={{
          flexShrink: 0,
          background: 'var(--card)',
          borderRight: '1px solid var(--border)',
          borderLeft: `3px solid ${chapter.accentColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: '#38bdf8',
            writingMode: 'vertical-rl',
            letterSpacing: '3px',
          }}
        >
          {chapter.num}
        </span>
        <span style={{ fontSize: '20px' }}>{chapter.icon}</span>
      </div>

      <div ref={contentRef} className="chapter-content" style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: '#38bdf8',
            letterSpacing: '2px',
            marginBottom: '6px',
          }}
        >
          {chapter.year}
        </div>
        <h3
          className="chapter-title"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            color: 'var(--white)',
            marginBottom: '4px',
          }}
        >
          {chapter.title}
        </h3>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'var(--muted)',
            marginBottom: '12px',
          }}
        >
          {chapter.org}
        </div>
        <p
          className="chapter-body"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--text)',
            lineHeight: 1.75,
            maxWidth: '620px',
          }}
        >
          {chapter.body}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
          {chapter.badges.map((badge) => (
            <span
              key={badge.text}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '9px',
                padding: '3px 12px',
                borderRadius: '20px',
                ...BADGE_STYLES[badge.type],
              }}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ChapterScroll() {
  return (
    <section id="chapters">
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '9px',
          color: '#38bdf8',
          letterSpacing: '4px',
          padding: '48px 0 0 0',
          textAlign: 'center',
        }}
      >
        FULL STORY
      </p>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.6rem',
          color: 'var(--white)',
          textAlign: 'center',
          marginBottom: 0,
        }}
      >
        Chapter by Chapter
      </h2>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'var(--muted)',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: 0,
          paddingBottom: 0,
        }}
      >
        Every role. Every award. Nothing skipped.
      </p>

      {chapters.map((chapter, i) => (
        <ChapterRow key={chapter.num} chapter={chapter} index={i} />
      ))}

      <style jsx global>{`
        .chapter-spine {
          width: 80px;
        }
        .chapter-content {
          padding: 28px 32px;
        }
        .chapter-body {
          font-size: 13px;
        }
        @media (max-width: 768px) {
          .chapter-spine {
            width: 60px;
          }
          .chapter-content {
            padding: 16px 20px;
          }
          .chapter-body {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  )
}
