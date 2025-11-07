import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { WhatWeDo } from '@/components/sections/what-we-do'
import { ServicesList } from '@/components/sections/services-list'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { LatestBlog } from '@/components/sections/latest-blog'
import { TrustStrip } from '@/components/sections/trust-strip'
import { ContactCTA } from '@/components/sections/contact-cta'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <ServicesList />
        <FeaturedProjects />
        <LatestBlog />
        <TrustStrip />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}