import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'Autonomous Warehouse Robot',
    summary: 'Developed a complete autonomous navigation system for warehouse logistics robots using LiDAR and computer vision.',
    techTags: ['ROS2', 'LiDAR', 'Computer Vision', 'Path Planning'],
    category: 'autonomy',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    clientName: 'LogiTech Solutions',
    featuredImage: '/projects/warehouse-robot.jpg',
    slug: 'autonomous-warehouse-robot'
  },
  {
    id: 2,
    title: 'Smart Battery Management System',
    summary: 'Designed and implemented an intelligent BMS for electric vehicle applications with predictive health monitoring.',
    techTags: ['Embedded C', 'CAN Bus', 'Machine Learning', 'IoT'],
    category: 'power',
    startDate: '2023-11-01',
    endDate: '2024-02-15',
    clientName: 'EV Motors Inc',
    featuredImage: '/projects/battery-management.jpg',
    slug: 'smart-battery-management'
  },
  {
    id: 3,
    title: 'Multi-Sensor Fusion Platform',
    summary: 'Created a sensor fusion framework combining IMU, GPS, and vision data for robust drone localization.',
    techTags: ['Sensor Fusion', 'Kalman Filter', 'Real-time Systems', 'Python'],
    category: 'sensors',
    startDate: '2023-09-15',
    endDate: '2023-12-20',
    clientName: 'AeroDynamics',
    featuredImage: '/projects/sensor-fusion.jpg',
    slug: 'multi-sensor-fusion'
  }
]

const getCategoryColor = (category: string) => {
  const colors = {
    autonomy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    embedded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    sensors: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    power: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
  }
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
}

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our latest work in robotics innovation, from autonomous systems to embedded solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Project Image */}
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">Project Showcase</p>
                  </div>
                </div>
                <Badge 
                  className={`absolute top-4 left-4 ${getCategoryColor(project.category)}`}
                  variant="secondary"
                >
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {project.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.techTags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.techTags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.techTags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Project Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(project.startDate).getFullYear()}</span>
                  </div>
                  <span className="text-xs">{project.clientName}</span>
                </div>

                {/* CTA */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary group-hover:text-primary/80 w-full" asChild>
                  <Link href={`/projects/${project.slug}`}>
                    View Case Study
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}