import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { MentoringHero } from '@/components/mentoring/mentoring-hero'
import { MentoringPrograms } from '@/components/mentoring/mentoring-programs'
import { MentoringBenefits } from '@/components/mentoring/mentoring-benefits'
import { MentoringCTA } from '@/components/mentoring/mentoring-cta'

export const metadata: Metadata = {
  title: 'Mentoring & Training - EAR Lab | Robotics Education',
  description: 'Accelerate your robotics career with our expert mentoring programs, workshops, and training courses. Learn from industry professionals.',
  openGraph: {
    title: 'Mentoring & Training - EAR Lab',
    description: 'Expert mentoring and training programs for robotics professionals.',
    type: 'website',
  },
}

export default function MentoringPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <MentoringHero />
        <MentoringPrograms />
        <MentoringBenefits />
        <MentoringCTA />
      </main>
      <Footer />
    </div>
  )
}