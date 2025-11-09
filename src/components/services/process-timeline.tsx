import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Clock, Users, FileText, Rocket, Handshake } from 'lucide-react'

const processSteps = [
  {
    step: 1,
    title: 'Discovery & Consultation',
    description: 'We start with a deep dive into your requirements, challenges, and goals. This initial consultation helps us understand your vision and technical constraints.',
    duration: '1-2 days',
    icon: Users,
    activities: [
      'Requirements gathering workshop',
      'Technical assessment',
      'Goal alignment session',
      'Initial timeline discussion'
    ]
  },
  {
    step: 2,
    title: 'Proposal & Planning',
    description: 'Based on our discovery, we create a detailed project proposal with scope, timeline, deliverables, and cost estimates.',
    duration: '3-5 days',
    icon: FileText,
    activities: [
      'Technical proposal development',
      'Resource allocation planning',
      'Risk assessment',
      'Milestone definition'
    ]
  },
  {
    step: 3,
    title: 'Development & Iteration',
    description: 'Our team executes the project with regular check-ins, demos, and feedback loops to ensure we stay aligned with your expectations.',
    duration: 'Varies by project',
    icon: Rocket,
    activities: [
      'Agile development sprints',
      'Weekly progress reviews',
      'Iterative feedback cycles',
      'Quality assurance testing'
    ]
  },
  {
    step: 4,
    title: 'Testing & Validation',
    description: 'Comprehensive testing including unit tests, integration tests, and real-world validation to ensure robust performance.',
    duration: '1-2 weeks',
    icon: CheckCircle,
    activities: [
      'Automated testing suite',
      'Performance benchmarking',
      'User acceptance testing',
      'Documentation review'
    ]
  },
  {
    step: 5,
    title: 'Deployment & Handover',
    description: 'We deploy the solution and provide comprehensive handover including documentation, training, and ongoing support.',
    duration: '2-5 days',
    icon: Handshake,
    activities: [
      'Production deployment',
      'Team training sessions',
      'Documentation delivery',
      'Support plan setup'
    ]
  }
]

export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060e] via-[#08132b] to-[#02050b]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"220\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 220 220\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.35\"%3E%3Cpath d=\"M0 55h220M0 110h220M0 165h220M55 0v220M110 0v220M165 0v220\"/%3E%3C/g%3E%3C/svg%3E')",
        }}
      />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Delivery</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Development Process
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A transparent, collaborative approach that carries your program from concept to deployment with measurable gates.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-white/30 hidden lg:block" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/30 bg-white/10 text-white font-bold text-lg relative z-10 mx-auto lg:mx-0">
                  {step.step}
                </div>

                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                  <Card className="p-6 glass-card border border-white/15 bg-white/5 text-white">
                    <CardContent className="p-0">
                      <div
                        className={`flex items-center gap-3 mb-4 lg:justify-start lg:flex-row ${
                          index % 2 === 0 ? '' : 'lg:ml-auto'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-cyber-teal" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-white/70">
                            <Clock className="w-3 h-3" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-white/70 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-electric-blue mt-2 flex-shrink-0" />
                            <span className="text-sm text-white/70">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden lg:block lg:w-12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white">
            <CheckCircle className="w-4 h-4" />
            <span>Average project timeline: 8-16 weeks</span>
          </div>
        </div>
      </div>
    </section>
  )
}
