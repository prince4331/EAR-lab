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
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
  },
  {
    icon: Brain,
    title: 'Autonomy & AI',
    description: 'Computer vision, path planning, and decision-making algorithms for autonomous systems.',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
  },
  {
    icon: Radar,
    title: 'Sensor Fusion',
    description: 'Multi-sensor integration, calibration, and data processing for robust perception.',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
  },
  {
    icon: Battery,
    title: 'Power Monitoring',
    description: 'Battery management systems, power optimization, and energy harvesting solutions.',
    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
  },
  {
    icon: TestTube,
    title: 'HIL/SIL Testing',
    description: 'Hardware-in-the-loop and software-in-the-loop testing frameworks for validation.',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  },
  {
    icon: Monitor,
    title: 'UI/Displays',
    description: 'Human-machine interfaces, dashboards, and visualization systems for robotics.',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
  }
]

export function ServicesList() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Robotics Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end robotics development services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary group-hover:text-primary/80" asChild>
                  <Link href="/services">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
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