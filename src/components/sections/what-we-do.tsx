import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Brain, Wrench } from 'lucide-react'

const services = [
  {
    icon: Cpu,
    title: 'R&D as a Service',
    description: 'Rapid prototyping and feasibility studies for robotics components. From concept validation to proof-of-concept demonstrations.',
    features: ['Feasibility Studies', 'Rapid Prototyping', 'Technology Assessment', 'Risk Analysis'],
    color: 'text-blue-600'
  },
  {
    icon: Brain,
    title: 'Custom Component Development',
    description: 'Bespoke robotics modules designed for your specific application. Embedded controllers, sensor fusion, and autonomy stacks.',
    features: ['Custom PCB Design', 'Firmware Development', 'Sensor Integration', 'AI/ML Implementation'],
    color: 'text-purple-600'
  },
  {
    icon: Wrench,
    title: 'Mentoring & Training',
    description: 'Hands-on workshops and 1:1 mentorship for robotics teams. Accelerate your development with expert guidance.',
    features: ['Technical Workshops', 'Code Reviews', 'Architecture Design', 'Best Practices'],
    color: 'text-green-600'
  }
]

export function WhatWeDo() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive robotics solutions from research to production. We partner with startups, enterprises, and research institutions to accelerate innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="relative border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-muted-foreground">Research Papers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Industry Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}