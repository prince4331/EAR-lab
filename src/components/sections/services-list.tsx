import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Cpu,
  Brain,
  Radar,
  Battery,
  TestTube,
  Monitor,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const serviceItems = [
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Custom PCB design, firmware development, and real-time controllers for robotics applications.',
    color: 'text-primary'
  },
  {
    icon: Brain,
    title: 'Autonomy & AI',
    description: 'Computer vision, path planning, and decision-making algorithms for autonomous systems.',
    color: 'text-secondary'
  },
  {
    icon: Radar,
    title: 'Sensor Fusion',
    description: 'Multi-sensor integration, calibration, and data processing for robust perception.',
    color: 'text-success'
  },
  {
    icon: Battery,
    title: 'Power Monitoring',
    description: 'Battery management systems, power optimization, and energy harvesting solutions.',
    color: 'text-chart-4'
  },
  {
    icon: TestTube,
    title: 'HIL/SIL Testing',
    description: 'Hardware-in-the-loop and software-in-the-loop testing frameworks for validation.',
    color: 'text-destructive'
  },
  {
    icon: Monitor,
    title: 'UI/Displays',
    description: 'Human-machine interfaces, dashboards, and visualization systems for robotics.',
    color: 'text-chart-3'
  }
]

export function ServicesList() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-[#081430] to-[#030715]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" opacity=\"0.25\" stroke=\"%230F62FE\" stroke-width=\"0.4\"%3E%3Cpath d=\"M0 50h200M0 100h200M0 150h200M50 0v200M100 0v200M150 0v200\"/%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">Services</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-5">
            Comprehensive robotics programs under one roof
          </h2>
          <p className="text-lg text-white/70">
            From mission-planning AI to flight-ready hardware, we ship tightly integrated deliverables built for regulated environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border border-white/15 bg-white/5"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(circle at top, rgba(15,98,254,0.25), transparent 60%)" }} />
              <CardHeader className="pb-3 relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/10 border border-white/20 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-heading text-white">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-white/70">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 relative">
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary gap-2 text-white/80 hover:text-white" asChild>
                  <Link href="/services" className="flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="px-10 py-6 font-heading text-base uppercase tracking-wide bg-gradient-to-r from-[#0f82fe] to-[#00c2a8]"
            asChild
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
