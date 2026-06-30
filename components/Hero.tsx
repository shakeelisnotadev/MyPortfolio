'use client'

import { useRef, useState } from 'react'
import { Mail } from 'lucide-react'
import Navbar from './Navbar'

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const FADE_DURATION = 500
const FADE_OUT_THRESHOLD = 0.55

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const [photoError, setPhotoError] = useState(false)

  const cancelFade = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }

  const runFade = (to: number, duration = FADE_DURATION) => {
    cancelFade()
    const video = videoRef.current
    if (!video) return
    const from = parseFloat(video.style.opacity || '0')
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const value = from + (to - from) * t
      if (videoRef.current) videoRef.current.style.opacity = String(value)
      if (t < 1) {
        rafIdRef.current = requestAnimationFrame(step)
      } else {
        rafIdRef.current = null
      }
    }

    rafIdRef.current = requestAnimationFrame(step)
  }

  const handlePlay = () => {
    fadingOutRef.current = false
    runFade(1)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const remaining = video.duration - video.currentTime
    if (!fadingOutRef.current && remaining <= FADE_OUT_THRESHOLD && remaining > 0) {
      fadingOutRef.current = true
      runFade(0)
    }
  }

  const handleEnded = () => {
    const video = videoRef.current
    if (!video) return
    cancelFade()
    video.style.opacity = '0'
    setTimeout(() => {
      if (!videoRef.current) return
      videoRef.current.currentTime = 0
      videoRef.current.play()
      fadingOutRef.current = false
      runFade(1)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handlePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          style={{ opacity: 0 }}
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white tracking-tight italic"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          not a dev. just a builder.
        </h1>

        <div className="max-w-xl w-full space-y-5 mx-auto mt-8">
          <div className="liquid-glass rounded-full px-6 py-3 inline-flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white/10 shrink-0">
              {photoError ? (
                <span
                  className="text-white text-xs"
                  style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
                >
                  SM
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/photo.jpg"
                  alt="Shakeel Mulla"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              )}
            </div>
            <span className="text-left">
              <span
                className="text-white text-sm"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700 }}
              >
                SHAKEEL MULLA
              </span>
              <span className="text-white/60 text-xs ml-2">
                · Academic Delivery Associate · Emeritus
              </span>
            </span>
          </div>

          <p className="text-white/70 text-sm italic">
            Ops specialist. Self-taught builder. Ships tools that actually work.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="#journey"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="liquid-glass rounded-full px-7 py-3 text-white text-sm font-medium"
            >
              VIEW MY JOURNEY
            </a>
            <a
              href="https://github.com/shakeelmulla"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-7 py-3 text-white text-sm font-medium"
            >
              OPEN GITHUB
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-10">
        <a
          href="https://linkedin.com/in/shakeelmulla"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-4 text-white/70 hover:text-white"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={20} />
        </a>
        <a
          href="https://github.com/shakeelmulla"
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass rounded-full p-4 text-white/70 hover:text-white"
          aria-label="GitHub"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href="mailto:smshakeel78@gmail.com"
          className="liquid-glass rounded-full p-4 text-white/70 hover:text-white"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>
    </div>
  )
}
