import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Brain, Wrench } from 'lucide-react'

const services = [
  {
    icon: Cpu,
    title: 'R&D as a Service',
    description: 'Rapid prototyping and feasibility studies for robotics components. From concept validation to proof-of-concept demonstrations.',
    features: ['Feasibility Studies', 'Rapid Prototyping', 'Technology Assessment', 'Risk Analysis'],
    color: 'text-primary'
  },
  {
    icon: Brain,
    title: 'Custom Component Development',
    description: 'Bespoke robotics modules designed for your specific application. Embedded controllers, sensor fusion, and autonomy stacks.',
    features: ['Custom PCB Design', 'Firmware Development', 'Sensor Integration', 'AI/ML Implementation'],
    color: 'text-secondary'
  },
  {
    icon: Wrench,
    title: 'Mentoring & Training',
    description: 'Hands-on workshops and 1:1 mentorship for robotics teams. Accelerate your development with expert guidance.',
    features: ['Technical Workshops', 'Code Reviews', 'Architecture Design', 'Best Practices'],
    color: 'text-success'
  }
]

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-[#07132c] to-[#030716]" />
      <div className="absolute inset-x-0 top-0 h-52 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(15,130,254,0.45), transparent 65%)" }} />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60 mb-4">Capabilities</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-5">
            Robotics programs built with aerospace-grade rigor
          </h2>
          <p className="text-lg md:text-xl text-white/70">
            From embedded compute to autonomy stacks, our multidisciplinary teams move ideas from concept studies to field-ready systems with precision and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="relative h-full overflow-hidden border border-white/15 bg-white/5 text-white"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3aa0ff] via-[#0f62fe] to-[#37ffe0]" />
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-heading text-white">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-white/70">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-white/30 text-white/80 bg-white/5">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Delivered', value: '50+' },
            { label: 'Research Papers', value: '12' },
            { label: 'Industry Partners', value: '25+' },
            { label: 'Years in Operation', value: '5' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-lg">
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
