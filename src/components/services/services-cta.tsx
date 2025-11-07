import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

export function ServicesCTA() {
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
            Ready to Get Started?
          </h2>
          
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project requirements and create a tailored solution that meets your technical goals and timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Request a Proposal</h3>
              <p className="text-sm text-white/80 mb-4">
                Get a detailed proposal with timeline and cost estimates for your project.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/contact">
                  Get Proposal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Schedule a Consultation</h3>
              <p className="text-sm text-white/80 mb-4">
                Book a free 30-minute consultation to discuss your project with our experts.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/contact?consultation=true">
                  Book Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Quick Question?</h3>
              <p className="text-sm text-white/80 mb-4">
                Have a quick question? Send us a message and we'll respond within 24 hours.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/contact?quick=true">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-sm text-white/70">
            <p>No commitment required • Response time: 1-2 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}