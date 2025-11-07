import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogGrid } from '@/components/blog/blog-grid'
import { BlogCTA } from '@/components/blog/blog-cta'

export const metadata: Metadata = {
  title: 'Blog - EAR Lab | Robotics Insights & Research',
  description: 'Stay updated with the latest in robotics research, technology insights, and case studies from our team of experts.',
  openGraph: {
    title: 'Blog - EAR Lab',
    description: 'Robotics insights, research findings, and technical deep-dives from our experts.',
    type: 'website',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <BlogHero />
        <BlogGrid />
        <BlogCTA />
      </main>
      <Footer />
    </div>
  )
}