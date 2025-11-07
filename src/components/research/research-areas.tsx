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
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
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
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
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
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
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
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
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
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
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
    <section id="research-areas" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our research spans multiple domains, from fundamental algorithms to practical applications. 
              Each area focuses on solving specific challenges in modern robotics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area) => (
              <Card key={area.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${area.color}`}>
                      <area.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {area.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={area.status === 'active' ? 'default' : 'secondary'}>
                          {area.status === 'active' ? 'Active' : 'Planning'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {area.publications} publications
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {area.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Current Projects
                      </h4>
                      <ul className="space-y-2">
                        {area.projects.map((project, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`/contact?research=${area.id}`}>
                          Learn More About {area.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Research Impact */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Research Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <div className="text-muted-foreground">Citations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">15</div>
                  <div className="text-muted-foreground">Industry Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">8</div>
                  <div className="text-muted-foreground">Open Source Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">3</div>
                  <div className="text-muted-foreground">Patents Filed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}