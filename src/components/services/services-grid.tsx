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
    color: 'text-secondary'
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
    color: 'text-primary'
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
    color: 'text-success'
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
    color: 'text-chart-4'
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
    color: 'text-destructive'
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
    color: 'text-chart-3'
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
    color: 'text-primary'
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
    color: 'text-secondary'
  }
]

export function ServicesGrid() {
  return (
    <section className="relative py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050a] via-[#060d18] to-[#05070c]" />
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-3">Engagements</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white text-balance">
            Comprehensive service offerings
          </h2>
          <p className="text-xl text-white/70 text-balance">
            From initial research to production deployment, we provide accountable teams calibrated to your mission goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              className="group h-full border border-border/60 bg-card/70 glass-card lift-hover text-white"
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-deep-black/60 border border-border ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="font-heading text-2xl text-white group-hover:text-electric-blue transition-colors line-clamp-2 text-balance">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-white/75 text-balance">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-heading font-semibold mb-3 text-white">Key deliverables</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-electric-blue"></div>
                        <span className="text-sm text-white/70">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/20 bg-white/5 p-4 text-center text-xs font-medium text-white/80">
                  <div>
                    <div className="text-white/60 mb-1 flex items-center justify-center">
                      <Clock className="w-3 h-3 text-white/70" />
                    </div>
                    {service.timeline}
                  </div>
                  <div>
                    <div className="text-white/60 mb-1 flex items-center justify-center">
                      <DollarSign className="w-3 h-3 text-white/70" />
                    </div>
                    {service.costBand}
                  </div>
                  <div>
                    <div className="text-white/60 mb-1 flex items-center justify-center">
                      <Users className="w-3 h-3 text-white/70" />
                    </div>
                    {service.teamSize}
                  </div>
                </div>

                <Button className="w-full btn-hover-gradient btn-glow" asChild>
                  <a href={`/contact?service=${service.id}`} aria-label={`Request a proposal for ${service.title}`}>
                    Request proposal
                    <ArrowRight className="ml-2 h-4 w-4" />
                    <span className="sr-only">{service.title}</span>
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
