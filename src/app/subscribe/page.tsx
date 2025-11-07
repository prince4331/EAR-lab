import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SubscribeForm } from '@/components/subscribe/subscribe-form'
import { NewsletterBenefits } from '@/components/subscribe/newsletter-benefits'

export const metadata: Metadata = {
  title: 'Subscribe - EAR Lab | Robotics Newsletter',
  description: 'Subscribe to our weekly newsletter for the latest robotics insights, research highlights, and exclusive content from our experts.',
  openGraph: {
    title: 'Subscribe - EAR Lab',
    description: 'Get weekly robotics insights and research highlights delivered to your inbox.',
    type: 'website',
  },
}

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="container px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Stay Ahead of the
                <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                  {' '}Robotics Curve
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands of robotics professionals and researchers. Get weekly insights, 
                research highlights, and exclusive content delivered straight to your inbox.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <SubscribeForm />
              </div>
              <div className="lg:col-span-1">
                <NewsletterBenefits />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}