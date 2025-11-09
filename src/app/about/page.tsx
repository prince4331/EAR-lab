import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - EAR Lab',
  description: 'Learn about EAR Lab - our mission, team, and expertise in embedded systems, autonomous vehicles, and robotics research.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden py-24 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-[#03050a] via-[#07142e] to-[#040812]" />
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"260\" height=\"260\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260 260\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.35\"%3E%3Cpath d=\"M0 65h260M0 130h260M0 195h260M65 0v260M130 0v260M195 0v260\"/%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="container relative z-10 px-4 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">About</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-white">About EAR Lab</h1>
            <p className="text-xl text-white/75 max-w-3xl mx-auto">
              Embedded. Autonomous. Robotics. We design, validate, and deploy intelligent systems that bridge lab research with field-ready hardware.
            </p>
          </div>
        </section>

        <section className="relative py-20 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#050f22] to-[#030610]" />
          <div className="container relative z-10 px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <Card className="glass-card border border-white/15 bg-white/5 p-8 text-white">
                <h2 className="font-heading text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Advance robotics and autonomous systems through rigorous research, production-grade engineering, and collaborative partnerships. We close the gap between academic breakthroughs and real-world deployments.
                </p>
              </Card>

              <Card className="glass-card border border-white/15 bg-white/5 p-8 text-white">
                <h2 className="font-heading text-3xl font-bold mb-6">What We Do</h2>
                <ul className="space-y-4 text-lg text-white/75">
                  <li>
                    <strong className="text-white">Research & Development:</strong> Autonomous navigation, sensor fusion, and embedded AI systems.
                  </li>
                  <li>
                    <strong className="text-white">Consulting Services:</strong> Architecture, safety cases, and platform hardening for mission-critical robotics.
                  </li>
                  <li>
                    <strong className="text-white">Education & Mentoring:</strong> Workshops and mentorship programs that level up internal teams.
                  </li>
                  <li>
                    <strong className="text-white">Industry Collaboration:</strong> Co-developing solutions with manufacturing, aerospace, and mobility partners.
                  </li>
                </ul>
              </Card>

              <div>
                <h2 className="font-heading text-3xl font-bold mb-6 text-white">Our Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Embedded Systems', body: 'Microcontroller firmware, RTOS, mixed-signal design, and secure connectivity.' },
                    { title: 'Autonomous Systems', body: 'SLAM, state estimation, path planning, and behavior stacks for ground and aerial robots.' },
                    { title: 'Robotics Platforms', body: 'Mobility stacks, manipulator control, and sensor integration for production fleets.' },
                    { title: 'AI & ML', body: 'Perception models, data pipelines, and ML Ops tailored for robotics workloads.' },
                  ].map((item) => (
                    <Card key={item.title} className="glass-card border border-white/15 bg-white/5 p-6 text-white">
                      <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.body}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h2 className="font-heading text-3xl font-bold mb-4 text-white">Get in Touch</h2>
                <p className="text-lg text-white/70 mb-8">
                  Interested in collaborating or learning more about our work? Let’s build your next robotics program together.
                </p>
                <Button size="lg" asChild className="px-10 py-6 bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
