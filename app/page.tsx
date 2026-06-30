import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import JourneyMap from '@/components/JourneyMap'
import ChapterScroll from '@/components/ChapterScroll'
import RPGSheet from '@/components/RPGSheet'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <JourneyMap />
      <ChapterScroll />
      <RPGSheet />
      <Projects />
      <Experience />
    </main>
  )
}
