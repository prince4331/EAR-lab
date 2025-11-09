import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="relative py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0A1C32] to-[#04152d]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"240\" height=\"240\" viewBox=\"0 0 240 240\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%2300C2A8\" stroke-width=\"0.6\" opacity=\"0.35\"%3E%3Cpath d=\"M0 120h240M120 0v240\"/%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
              <MessageCircle className="w-8 h-8" />
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Engage</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to accelerate your robotics roadmap?
          </h2>

          <p className="text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tell us about the systems you are building and we will assemble the embedded, autonomy, and validation specialists to get you to deployment faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-[#0f82fe] to-[#00c2a8]" asChild>
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 text-white border-white/60 hover:bg-white/10"
              asChild
            >
              <Link href="/subscribe">
                Subscribe to updates
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-sm text-white/60">
            <p>Typical response time: 2 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}
