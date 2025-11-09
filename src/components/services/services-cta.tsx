import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

export function ServicesCTA() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#06152b] to-[#03050a]" />
      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>

          <p className="text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Let's discuss your project requirements and build a tailored plan that meets your technical goals, certification path, and production timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: FileText,
                title: 'Request a proposal',
                body: 'Detailed scope, timeline, and cost band for your robotics initiative.',
                href: '/contact',
                cta: 'Get proposal',
              },
              {
                icon: Calendar,
                title: 'Schedule a consultation',
                body: 'Book a 30-minute working session with our technical directors.',
                href: '/contact?consultation=true',
                cta: 'Book call',
              },
              {
                icon: MessageCircle,
                title: 'Quick question?',
                body: 'Send context or RFIs and we will respond within one business day.',
                href: '/contact?quick=true',
                cta: 'Send message',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/20 bg-white/5 p-6 text-left">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/75 mb-5">{item.body}</p>
                <Button variant="secondary" size="sm" className="w-full" asChild>
                  <Link href={item.href}>
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-sm text-white/70">
            <p>No commitment required &bull; Response time: 1-2 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}
