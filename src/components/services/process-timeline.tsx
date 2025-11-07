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
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A transparent, collaborative approach that ensures your project succeeds from concept to deployment.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden lg:block"></div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12`}
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg relative z-10 mx-auto lg:mx-0">
                  {step.step}
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-4 lg:justify-start lg:flex-row">
                        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${
                          index % 2 === 0 ? '' : 'lg:ml-auto'
                        }`}>
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{step.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        {step.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <CheckCircle className="w-4 h-4" />
            <span>Average project timeline: 8-16 weeks</span>
          </div>
        </div>
      </div>
    </section>
  )
}