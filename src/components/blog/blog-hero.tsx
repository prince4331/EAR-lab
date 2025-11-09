import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function BlogHero() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040812] via-[#071732] to-[#020710]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,194,168,0.3), transparent 45%), radial-gradient(circle at 80% 0%, rgba(15,98,254,0.3), transparent 40%)",
        }}
      />
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"260\" height=\"260\" viewBox=\"0 0 260 260\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.4\" opacity=\"0.4\"%3E%3Cpath d=\"M0 65h260M0 130h260M0 195h260M65 0v260M130 0v260M195 0v260\"/%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Knowledge Base</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Robotics <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F62FE] to-[#00C2A8]">Insights</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/75 mb-10 leading-relaxed">
            Deep dives into autonomy stacks, embedded compute, and perception systems from our engineers and researchers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-10 py-6 font-heading text-base bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow"
              asChild
            >
              <Link href="/subscribe">
                Subscribe to newsletter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-6 text-white border-white/40 hover:bg-white/10"
              asChild
            >
              <Link href="/rss.xml">RSS feed</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
