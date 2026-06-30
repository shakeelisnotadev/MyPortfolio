'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { GraduationCap, Monitor, MessageCircle, Phone, HeartPulse, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type ExperienceItem = {
  role: string
  badge: string
  company: string
  icon: 'graduation' | 'monitor' | 'chat' | 'phone' | 'health' | 'shield'
  bullets: string[]
}

const experience: ExperienceItem[] = [
  {
    role: 'Academic Delivery Associate',
    badge: "Jun '25 – Present",
    company: 'Emeritus (Erulearning Solutions Pvt. Ltd.) · Mumbai, Maharashtra',
    icon: 'graduation',
    bullets: [
      'Managing end-to-end delivery operations for executive education and professional certification programmes across India and APAC — including IIT-Madras Pravartak programmes in Cybersecurity, GenAI, ML, and Agentic AI, and AIM Philippines\' Postgraduate Certificate in GenAI and Agentic AI',
      'Overseeing 12+ Programme Leaders — planning workloads, assigning responsibilities, monitoring performance, and maintaining delivery quality standards across multiple programmes simultaneously',
      'Cross-functional collaboration daily with Instructional Design, Marketing, Admissions, Student Support, Product, Sales, and external university stakeholders to ensure seamless programme execution',
      'Conducting programme performance analysis using learner engagement, attendance, feedback, and operational data to support decision-making and continuous improvement',
      'Built and shipped PULSE Session Intelligence Dashboard and myAttendanceBook during this period — two full-stack production tools actively used by the organisation',
      'Resolved complex learner, faculty, and operational escalations by identifying root causes and coordinating resolutions with minimal impact on delivery',
    ],
  },
  {
    role: 'Webinar Specialist',
    badge: "Dec '23 – May '25",
    company: 'Emeritus (Erulearning Solutions Pvt. Ltd.) · Mumbai, Maharashtra',
    icon: 'monitor',
    bullets: [
      'Managed end-to-end delivery of 30+ live virtual learning sessions per week, averaging 70+ learners per session, across India and APAC regions',
      'Owned full webinar operations — session scheduling, Zoom platform administration, content publishing, learner communications, and stakeholder management',
      'Administered Zoom environments including technical setup, troubleshooting, breakout rooms, polls, Q&A, and real-time engagement activities',
      'Monitored attendance, engagement, learner feedback, and operational metrics to generate actionable insights and improve programme delivery',
      'Created post-session reports, dashboards, and performance analyses supporting data-driven decision-making across the delivery team',
      'Identified critical operational bottleneck — 8 associates spending 8 hours daily generating feedback reports manually. Built and deployed Feedback Automation Tool reducing effort to 5 minutes',
    ],
  },
  {
    role: 'Web-Chat Counselor',
    badge: "Dec '20 – Jun '23",
    company: 'upGrad Education Pvt Ltd · Mumbai, Maharashtra',
    icon: 'chat',
    bullets: [
      'Handled 100+ concurrent prospect lead queries daily across Drift and WhatsApp Business platforms serving India, US, and APAC regions',
      'Conducted phone-based profiling and pre-sales connects to qualify leads; pitched suitable courses based on learner interests and requirements',
      'Routed qualified leads to Senior Counselors for sales closure; generated referral pipelines from existing learners',
      'Managed dual platforms simultaneously — maximum 5 chats on Drift, chat load of 30 on Freshchat — while meeting all TATs',
      'Persuaded potential leads to participate in Video Counseling Sessions, enhancing their programme journey experience',
    ],
  },
  {
    role: 'Sr Chat Executive – Verizon',
    badge: "Aug '19 – Dec '19",
    company: 'Accenture Services Pvt Ltd · Navi Mumbai, Maharashtra',
    icon: 'phone',
    bullets: [
      'Provided efficient solutions to US-based Verizon customer queries on chat while simultaneously handling dual chats and consistently meeting TAT',
      'Successfully promoted loyalty programs and offered discounts on new purchases',
      'Achieved the highest CSAT streak in the pilot batch — 7+ positive surveys for 3 consecutive days, a record for the new process',
    ],
  },
  {
    role: 'Sr Accounts Receivable – RTI',
    badge: "Oct '18 – Apr '19",
    company: 'GeBBS Healthcare Solutions Pvt Ltd · Navi Mumbai, Maharashtra',
    icon: 'health',
    bullets: [
      'Proactively coordinated with US insurance companies to obtain accurate claim status for patients on behalf of doctors',
      'Maintained precise records of claim denial details in CRM; generated coding reports and resubmitted to insurance companies',
      "Prepared payment receipts for patients and submitted to doctor's offices in a timely manner",
      'Managed 120+ daily calls while maintaining exceptional customer service standards and ensuring accuracy in all financial transactions',
    ],
  },
  {
    role: 'Sr Claim Adjudicator – Vitality Health UK',
    badge: "May '15 – Sep '18",
    company: 'Intelenet Global Services Pvt Ltd · Thane, Maharashtra',
    icon: 'shield',
    bullets: [
      'Accurately handled complex health insurance claim reports and finalised decisions per Vitality Health UK policy guidelines across Gynaecology, Back Pain, Shoulder Pain, Knee Pain, Arthritis, Skin Disease, Osteo-Arthritis, Maternity, and Cancer',
      'Joined as Associate and promoted to Sr Claim Adjudicator within 12 months based on performance',
      'Successfully handled onboarding of 20 new advisors — transitioned them from OJT phase to production floor ensuring readiness',
      'Conducted Internal Quality Audit and Training for a period of 1 year',
      'Sent EOD and process reports to supervisors and UK clients for forecasting purposes',
      'Awarded Best Idea of the Quarter 2016, Best Performer of the Quarter 2017 and 2018',
    ],
  },
]

const ICONS: Record<ExperienceItem['icon'], LucideIcon> = {
  graduation: GraduationCap,
  monitor: Monitor,
  chat: MessageCircle,
  phone: Phone,
  health: HeartPulse,
  shield: Shield,
}

function TimelineItem({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const Icon = ICONS[item.icon]

  useGSAP(
    () => {
      gsap.fromTo(
        itemRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
          },
        }
      )
      gsap.to(dotRef.current, {
        borderColor: '#38bdf8',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: itemRef }
  )

  return (
    <div
      ref={itemRef}
      className="timeline-item"
      style={{
        position: 'relative',
        marginBottom: isLast ? 0 : '32px',
        paddingBottom: isLast ? 0 : '32px',
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
      }}
    >
      <div
        ref={dotRef}
        className="timeline-dot"
        style={{
          position: 'absolute',
          top: '6px',
          width: '28px',
          height: '28px',
          background: 'var(--surface)',
          border: '2px solid var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={13} color="var(--accent)" />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '6px',
          gap: '10px',
        }}
      >
        <span className="timeline-role" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--white)' }}>
          {item.role}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '8px',
            background: 'rgba(56,189,248,0.08)',
            color: '#38bdf8',
            border: '1px solid rgba(56,189,248,0.15)',
            padding: '3px 10px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}
        >
          {item.badge}
        </span>
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>
        {item.company}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {item.bullets.map((bullet, i) => (
          <li key={i} className="timeline-bullet" style={{ paddingLeft: '16px', position: 'relative', marginBottom: '6px' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '8px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#38bdf8',
              }}
            />
            <span className="bullet-text" style={{ fontFamily: "'Inter', sans-serif", color: 'var(--text)', lineHeight: 1.7 }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        fillRef.current,
        { height: '0%' },
        {
          height: '100%',
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
    <section id="intel" ref={sectionRef} style={{ background: 'var(--surface)', padding: '64px 24px' }}>
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
          FIELD INTEL
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'var(--white)',
            marginBottom: '36px',
          }}
        >
          Every role. Full detail.
        </h2>

        <div className="timeline" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'var(--border)',
            }}
          />
          <div
            ref={fillRef}
            style={{
              position: 'absolute',
              left: 0,
              top: '8px',
              width: '2px',
              height: '0%',
              background: 'linear-gradient(180deg, #38bdf8, #8b5cf6)',
            }}
          />

          {experience.map((item, i) => (
            <TimelineItem key={item.role} item={item} isLast={i === experience.length - 1} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline {
          padding-left: 32px;
        }
        .timeline-dot {
          left: -39px;
        }
        .timeline-role {
          font-size: 1rem;
        }
        .bullet-text {
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .timeline {
            padding-left: 20px;
          }
          .timeline-dot {
            left: -27px;
          }
          .bullet-text {
            font-size: 11px;
          }
          .timeline-role {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  )
}
