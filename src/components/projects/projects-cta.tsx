import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Download, FileText } from 'lucide-react'
import Link from 'next/link'

export function ProjectsCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help bring your robotics vision to life. 
            From concept validation to production deployment, we're your trusted partner.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Start a Conversation</h3>
              <p className="text-sm text-white/80 mb-4">
                Schedule a free consultation to discuss your project requirements and explore how we can help.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Download Our Portfolio</h3>
              <p className="text-sm text-white/80 mb-4">
                Get a detailed PDF portfolio with case studies, technical details, and client testimonials.
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                Download PDF
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-white/70">
            <p>Turnaround time for project proposals: 3-5 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}