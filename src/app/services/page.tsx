import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ServicesHero } from '@/components/services/services-hero'
import { ServicesGrid } from '@/components/services/services-grid'
import { ProcessTimeline } from '@/components/services/process-timeline'
import { ServicesCTA } from '@/components/services/services-cta'

export const metadata: Metadata = {
  title: 'Services - EAR Lab | Robotics Development & Consulting',
  description: 'Comprehensive robotics services including embedded systems, autonomy modules, sensor fusion, power monitoring, HIL/SIL testing, and expert mentoring.',
  openGraph: {
    title: 'Services - EAR Lab',
    description: 'Comprehensive robotics services for startups, enterprises, and research institutions.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ProcessTimeline />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  )
}