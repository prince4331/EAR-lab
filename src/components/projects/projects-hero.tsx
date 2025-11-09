import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden py-28 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#03060d] via-[#07132b] to-[#01030a]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(15,98,254,0.35), transparent 50%), radial-gradient(circle at 80% 0%, rgba(0,194,168,0.3), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"320\" height=\"320\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 320\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.4\"%3E%3Cpath d=\"M0 80h320M0 160h320M0 240h320M80 0v320M160 0v320M240 0v320\"/%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-sm text-white/60 mb-6">Portfolio</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-tight text-white">
            Embedded, autonomous, and perception systems shipped with precision
          </h1>
          <p className="text-xl text-white/70 mt-6">
            Browse field-tested programs across logistics, aerospace, mobility, and advanced manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="px-10 py-6 text-base font-heading bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow"
              asChild
            >
              <Link href="/contact">
                Start your project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-base text-white border-white/40 hover:bg-white/10" asChild>
              <Link href="/services">Explore services</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
              { label: 'Autonomy deployments', value: '18' },
              { label: 'Embedded controllers', value: '26' },
              { label: 'Sensor stacks', value: '14' },
              { label: 'Client uptime avg', value: '99.5%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-5 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="text-3xl font-heading text-white">{stat.value}</div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
