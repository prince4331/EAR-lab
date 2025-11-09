import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import ProjectImage from './ProjectImage'
import { PROJECT_MEDIA } from '@/lib/media'
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
    featuredImage: PROJECT_MEDIA.warehouseRobot,
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
    featuredImage: PROJECT_MEDIA.batteryManagement,
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
    featuredImage: PROJECT_MEDIA.sensorFusion,
    slug: 'multi-sensor-fusion'
  }
]

const getCategoryColor = (category: string) => {
  const colors = {
    autonomy: 'bg-secondary/10 text-secondary',
    embedded: 'bg-primary/10 text-primary',
    sensors: 'bg-chart-3/10 text-chart-3',
    power: 'bg-chart-4/10 text-chart-4'
  }
  return colors[category as keyof typeof colors] || 'bg-muted/50 text-muted-foreground'
}

export function FeaturedProjects() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#040812] via-[#07132b] to-[#030716]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 20%, rgba(0,194,168,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(15,98,254,0.25), transparent 50%)" }} />

      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Case Studies</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-5">
            Proven autonomy and embedded platforms
          </h2>
          <p className="text-xl text-white/70">
            Explore how we partner with teams to harden lab concepts into production robotics systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border border-white/15 bg-white/5 text-white"
            >
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <ProjectImage src={project.featuredImage} alt={project.title} />
                <Badge
                  className={`absolute top-4 left-4 ${getCategoryColor(project.category)}`}
                  variant="secondary"
                >
                  {project.category}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors font-heading text-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3 text-white/70">
                  {project.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.techTags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/80">
                      {tag}
                    </Badge>
                  ))}
                  {project.techTags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                      +{project.techTags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(project.startDate).getFullYear()}</span>
                  </div>
                  <span className="text-xs">{project.clientName}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-medium text-primary group-hover:text-white w-full"
                  asChild
                >
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
          <Button size="lg" variant="outline" className="px-8 border-white/30 text-white" asChild>
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
