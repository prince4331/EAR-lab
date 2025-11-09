import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden py-28 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#05080f] via-[#061229] to-[#040812]" />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"260\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 260\"%3E%3Cg fill=\"none\" stroke=\"%2300C2A8\" opacity=\"0.4\" stroke-width=\"0.45\"%3E%3Cpath d=\"M0 65h260M0 130h260M0 195h260M65 0v260M130 0v260M195 0v260\"/%3E%3C/g%3E%3C/svg%3E')" }} />
      <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-electric-blue/20 blur-3xl" />

      <div className="container relative z-10 px-4 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Capabilities</p>
        <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-tight text-white">
          Full-stack robotics teams on demand
        </h1>
        <p className="text-xl text-white/75 mt-6 max-w-3xl mx-auto">
          Embedded compute, perception, autonomy, validation, and manufacturing readiness delivered through accountable engineering pods.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button size="lg" className="btn-glow btn-hover-gradient px-10 py-6" asChild>
            <Link href="/contact">
              Request a proposal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="px-10 py-6 text-white border-white/50 hover:bg-white/10" asChild>
            <Link href="/projects">View our work</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
