import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Users, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'

export function MentoringHero() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#03060e] via-[#041536] to-[#010308]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,194,168,0.4), transparent 45%), radial-gradient(circle at 85% 0%, rgba(15,98,254,0.35), transparent 45%)",
        }}
      />
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Mentoring</p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Mentoring &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F62FE] to-[#00C2A8]">
              Training
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/75 mb-10 leading-relaxed max-w-3xl mx-auto">
            Accelerate your robotics career with personalized guidance from industry experts. From 1:1 mentoring to corporate training, we're committed to your professional growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="px-10 py-6 font-heading bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow" asChild>
              <Link href="#programs">
                Explore Programs
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-6 text-white border-white/40 hover:bg-white/10" asChild>
              <Link href="/contact?mentoring=true">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Mentees', value: '100+' },
              { label: 'Success Rate', value: '95%' },
              { label: 'Workshops', value: '25+' },
              { label: 'Expert Mentors', value: '15' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '1:1 Mentoring', icon: Users, caption: 'Personalized guidance for your career' },
              { title: 'Corporate Training', icon: Award, caption: 'Team workshops and skill development' },
              { title: 'Online Courses', icon: GraduationCap, caption: 'Self-paced learning programs' },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6 glass-card border border-white/15 bg-white/5 text-white">
                <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.caption}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
