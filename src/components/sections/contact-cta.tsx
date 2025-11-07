import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Accelerate Your Robotics Project?
          </h2>
          
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our expertise can help you bring your robotics vision to life. 
            From initial concept to production deployment, we're here to support your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/subscribe">
                Subscribe to Updates
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-sm text-white/70">
            <p>Typical response time: 2 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}