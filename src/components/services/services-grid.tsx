import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Cpu, 
  Brain, 
  Radar, 
  Battery, 
  TestTube, 
  Monitor,
  ArrowRight,
  Clock,
  DollarSign,
  Users
} from 'lucide-react'

const services = [
  {
    id: 'research',
    icon: Brain,
    title: 'Research & Feasibility',
    description: 'Comprehensive research studies and feasibility analysis to validate your robotics concepts before investment.',
    deliverables: [
      'Literature review & technology assessment',
      'Proof-of-concept demonstrations',
      'Technical feasibility report',
      'Risk analysis & mitigation strategies',
      'ROI analysis & timeline estimates'
    ],
    timeline: '2-6 weeks',
    costBand: '$10K - $25K',
    teamSize: '2-3 experts',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  },
  {
    id: 'embedded',
    icon: Cpu,
    title: 'Embedded Systems Design',
    description: 'Custom PCB design, firmware development, and real-time controllers optimized for robotics applications.',
    deliverables: [
      'Schematic & PCB design files',
      'Firmware source code & documentation',
      'Bootloader & update mechanisms',
      'Production-ready BOM',
      'Manufacturing guidelines'
    ],
    timeline: '8-16 weeks',
    costBand: '$25K - $75K',
    teamSize: '2-4 engineers',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
  },
  {
    id: 'autonomy',
    icon: Brain,
    title: 'Autonomy Modules',
    description: 'Complete autonomy stacks including localization, mapping, path planning, and decision-making algorithms.',
    deliverables: [
      'Localization & mapping system',
      'Path planning algorithms',
      'Obstacle avoidance modules',
      'Sensor fusion framework',
      'Simulation environment'
    ],
    timeline: '12-24 weeks',
    costBand: '$50K - $150K',
    teamSize: '3-5 specialists',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
  },
  {
    id: 'sensors',
    icon: Radar,
    title: 'Sensor Integration',
    description: 'Multi-sensor integration, calibration, and data processing for robust perception systems.',
    deliverables: [
      'Sensor calibration procedures',
      'Data processing pipelines',
      'Fusion algorithms',
      'Error analysis tools',
      'Performance benchmarks'
    ],
    timeline: '6-12 weeks',
    costBand: '$20K - $60K',
    teamSize: '2-3 engineers',
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
  },
  {
    id: 'power',
    icon: Battery,
    title: 'Power & Battery Monitoring',
    description: 'Advanced battery management systems, power optimization, and energy harvesting solutions.',
    deliverables: [
      'BMS hardware design',
      'Power monitoring firmware',
      'Energy optimization algorithms',
      'Battery health prediction',
      'Charging management system'
    ],
    timeline: '8-16 weeks',
    costBand: '$25K - $70K',
    teamSize: '2-4 engineers',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  },
  {
    id: 'testing',
    icon: TestTube,
    title: 'HIL/SIL Testing',
    description: 'Hardware-in-the-loop and software-in-the-loop testing frameworks for comprehensive validation.',
    deliverables: [
      'Test bench design',
      'Simulation models',
      'Automated test suites',
      'Performance metrics dashboard',
      'Regression testing framework'
    ],
    timeline: '4-10 weeks',
    costBand: '$15K - $45K',
    teamSize: '2-3 test engineers',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
  },
  {
    id: 'ui',
    icon: Monitor,
    title: 'UI/Displays',
    description: 'Human-machine interfaces, dashboards, and visualization systems for robotics applications.',
    deliverables: [
      'UI/UX design mockups',
      'Interactive dashboards',
      'Real-time visualization',
      'Mobile companion apps',
      'Accessibility compliance'
    ],
    timeline: '6-14 weeks',
    costBand: '$20K - $55K',
    teamSize: '2-3 developers',
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
  },
  {
    id: 'mentoring',
    icon: Users,
    title: 'Mentoring & Workshops',
    description: 'Hands-on training, code reviews, and architectural guidance for your robotics team.',
    deliverables: [
      'Custom training curriculum',
      '1:1 mentoring sessions',
      'Code review & best practices',
      'Architecture design reviews',
      'Team skill assessment'
    ],
    timeline: 'Ongoing',
    costBand: '$5K - $15K/month',
    teamSize: '1-2 mentors',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
  }
]

export function ServicesGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Service Offerings
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From initial research to production deployment, we provide the expertise and resources you need at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300" id={service.id}>
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Deliverables */}
                <div>
                  <h4 className="font-semibold mb-3">Key Deliverables</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-medium">{service.timeline}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <DollarSign className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-medium">{service.costBand}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Users className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-medium">{service.teamSize}</div>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full" asChild>
                  <a href={`/contact?service=${service.id}`}>
                    Request Proposal for {service.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}