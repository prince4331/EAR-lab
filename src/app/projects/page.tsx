import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProjectsHero } from '@/components/projects/projects-hero'
import { ProjectsGrid } from '@/components/projects/projects-grid'
import { ProjectsCTA } from '@/components/projects/projects-cta'

export const metadata: Metadata = {
  title: 'Projects - EAR Lab | Robotics Case Studies & Portfolio',
  description: 'Explore our portfolio of robotics projects including autonomous systems, embedded controllers, sensor fusion, and battery management solutions.',
  openGraph: {
    title: 'Projects - EAR Lab',
    description: 'Case studies and portfolio of our robotics development work.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ProjectsHero />
        <ProjectsGrid />
        <ProjectsCTA />
      </main>
      <Footer />
    </div>
  )
}