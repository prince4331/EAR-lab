import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ResearchHero } from '@/components/research/research-hero'
import { ResearchAreas } from '@/components/research/research-areas'
import { ResearchPublications } from '@/components/research/research-publications'
import { ResearchPartnerships } from '@/components/research/research-partnerships'

export const metadata: Metadata = {
  title: 'Research - EAR Lab | Robotics Innovation & Development',
  description: 'Explore our cutting-edge research in autonomous systems, embedded controllers, sensor fusion, and robotics innovation. Partner with us for joint research initiatives.',
  openGraph: {
    title: 'Research - EAR Lab',
    description: 'Cutting-edge robotics research and innovation.',
    type: 'website',
  },
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ResearchHero />
        <ResearchAreas />
        <ResearchPublications />
        <ResearchPartnerships />
      </main>
      <Footer />
    </div>
  )
}