import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Microscope, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function ResearchHero() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#02050c] via-[#061432] to-[#010208]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,194,168,0.3), transparent 45%), radial-gradient(circle at 80% 0%, rgba(15,98,254,0.35), transparent 45%)",
        }}
      />
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-4">Research</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white text-balance">
            Research &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F62FE] to-[#00C2A8]">
              Innovation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/75 mb-10 leading-relaxed max-w-3xl mx-auto text-balance">
            Pushing the boundaries of robotics technology through field-proven research that spans autonomy, embedded compute, and intelligent sensing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-10 py-6 font-heading bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow" asChild>
              <Link href="#publications">
                View Our Publications
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-white border-white/40 hover:bg-white/10" asChild>
              <Link href="#partnerships">
                Propose Joint Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Published Papers', value: '12' },
              { label: 'Active Research Areas', value: '8' },
              { label: 'Industry Partners', value: '15+' },
              { label: 'Patents Filed', value: '3' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Autonomy Systems', icon: TrendingUp, caption: 'Advanced navigation and perception algorithms' },
              { title: 'Sensor Fusion', icon: Microscope, caption: 'Multi-sensor integration and calibration' },
              { title: 'Embedded AI', icon: BookOpen, caption: 'Edge AI and embedded machine learning' },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6 glass-card border border-white/15 bg-white/5 text-white">
                <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">
                  {item.caption}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



