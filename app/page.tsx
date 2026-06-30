import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import JourneyMap from '@/components/JourneyMap'
import ChapterScroll from '@/components/ChapterScroll'
import RPGSheet from '@/components/RPGSheet'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import ScrollCharacter from '@/components/ScrollCharacter'

export default function Home() {
  return (
    <main>
      <ScrollCharacter />
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
