import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Radar, 
  Battery, 
  Cpu, 
  TestTube, 
  Eye,
  ArrowRight,
  Calendar,
  Users
} from 'lucide-react'

const researchAreas = [
  {
    id: 'autonomy',
    title: 'Autonomous Navigation',
    description: 'Developing cutting-edge algorithms for robot navigation, path planning, and obstacle avoidance in complex environments.',
    icon: Brain,
    color: 'text-secondary',
    projects: [
      'SLAM in Dynamic Environments',
      'Multi-robot Coordination',
      'Predictive Path Planning',
      'Visual-inertial Odometry'
    ],
    status: 'active',
    publications: 4
  },
  {
    id: 'perception',
    title: 'Perception & Sensing',
    description: 'Advanced sensor fusion, computer vision, and environmental understanding for robust robot perception.',
    icon: Eye,
    color: 'text-primary',
    projects: [
      'Multi-sensor Fusion',
      'Object Detection & Tracking',
      '3D Scene Understanding',
      'Edge-based Vision Systems'
    ],
    status: 'active',
    publications: 3
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    description: 'High-performance embedded controllers, real-time operating systems, and optimized firmware for robotics applications.',
    icon: Cpu,
    color: 'text-success',
    projects: [
      'Real-time Control Systems',
      'Low-power Design',
      'Safety-critical Systems',
      'Hardware Acceleration'
    ],
    status: 'active',
    publications: 2
  },
  {
    id: 'power',
    title: 'Power & Energy',
    description: 'Innovative battery management systems, energy harvesting, and power optimization for mobile robotics.',
    icon: Battery,
    color: 'text-chart-4',
    projects: [
      'Smart BMS Development',
      'Wireless Power Transfer',
      'Energy Harvesting',
      'Thermal Management'
    ],
    status: 'active',
    publications: 2
  },
  {
    id: 'testing',
    title: 'Testing & Validation',
    description: 'Comprehensive testing frameworks, simulation environments, and validation methodologies for robotics systems.',
    icon: TestTube,
    color: 'text-destructive',
    projects: [
      'Hardware-in-the-loop Testing',
      'Digital Twin Development',
      'Safety Validation',
      'Performance Benchmarking'
    ],
    status: 'planning',
    publications: 1
  }
]

export function ResearchAreas() {
  return (
    <section id="research-areas" className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#03050b] via-[#07122b] to-[#02040a]" />
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Domains</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
              Research Areas
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
              Our programs span fundamental algorithms through production-ready implementations. Each cell below outlines the missions currently in flight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area) => (
              <Card key={area.id} className="group glass-card border border-white/15 bg-white/5 text-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 ${area.color}`}>
                      <area.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading text-xl group-hover:text-cyber-teal transition-colors line-clamp-2 text-balance">
                        {area.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={area.status === 'active' ? 'bg-white/15 text-white' : 'bg-white/5 text-white/70'}>
                          {area.status === 'active' ? 'Active' : 'Planning'}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-white/30 text-white/80">
                          {area.publications} publications
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-white/70 text-balance">
                    {area.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                  <div>
                    <h4 className="font-heading font-semibold mb-3 flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4 text-cyber-teal" />
                      Current Projects
                    </h4>
                    <ul className="space-y-2">
                      {area.projects.map((project, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                          <div className="w-2 h-2 bg-electric-blue rounded-full" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/15">
                    <Button variant="outline" className="w-full text-white border-white/40 hover:bg-white/10" asChild>
                      <a href={`/contact?research=${area.id}`} aria-label={`Start a research conversation about ${area.title}`}>
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="glass-card border border-white/15 bg-white/5 rounded-2xl p-8">
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">Research Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/70">
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-white mb-1">50+</div>
                  <div className="uppercase tracking-wider">Citations</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-white mb-1">15</div>
                  <div className="uppercase tracking-wider">Industry Partners</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-white mb-1">8</div>
                  <div className="uppercase tracking-wider">Open Source Projects</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-white mb-1">3</div>
                  <div className="uppercase tracking-wider">Patents Filed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
