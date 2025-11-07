import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Award, 
  Calendar,
  Target,
  ArrowRight,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react'

const mentoringPrograms = [
  {
    id: 'one-on-one',
    title: '1:1 Mentoring',
    description: 'Personalized guidance from industry experts tailored to your career goals and technical challenges.',
    icon: Users,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    duration: '3-12 months',
    price: '$500-2000/month',
    level: 'intermediate-to-advanced',
    features: [
      'Weekly 1-hour sessions',
      'Personalized learning plan',
      'Code reviews and feedback',
      'Career guidance and networking',
      'Access to exclusive resources'
    ],
    outcomes: [
      'Accelerated skill development',
      'Industry insights and trends',
      'Portfolio enhancement',
      'Career advancement opportunities'
    ],
    popular: true
  },
  {
    id: 'team-mentoring',
    title: 'Team Mentoring',
    description: 'Group mentoring for robotics teams looking to improve their processes and technical capabilities.',
    icon: Users,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    duration: '6-12 months',
    price: '$2000-8000/month',
    level: 'beginner-to-intermediate',
    features: [
      'Bi-weekly team sessions',
      'Architecture reviews',
      'Process optimization',
      'Technical best practices',
      'Team building activities'
    ],
    outcomes: [
      'Improved team collaboration',
      'Better development processes',
      'Enhanced technical skills',
      'Project delivery acceleration'
    ],
    popular: false
  },
  {
    id: 'corporate-training',
    title: 'Corporate Training',
    description: 'Customized training programs for corporate teams on specific robotics technologies and methodologies.',
    icon: Award,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    duration: '1-5 days',
    price: '$5000-15000/day',
    level: 'all-levels',
    features: [
      'Custom curriculum design',
      'Hands-on workshops',
      'Real-world project examples',
      'Post-training support',
      'Certificate of completion'
    ],
    outcomes: [
      'Enhanced team capabilities',
      'Improved development quality',
      'Faster time-to-market',
      'Better problem-solving skills'
    ],
    popular: false
  },
  {
    id: 'workshops',
    title: 'Intensive Workshops',
    description: 'Focused 2-3 day intensive workshops on specific robotics topics and technologies.',
    icon: Calendar,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    duration: '2-3 days',
    price: '$1500-5000',
    level: 'beginner-to-advanced',
    features: [
      'Intensive hands-on learning',
      'Small group sizes (8-12 people)',
      'All materials included',
      'Project-based learning',
      'Networking opportunities'
    ],
    outcomes: [
      'Deep technical understanding',
      'Practical implementation skills',
      'Industry connections',
      'Certificate of completion'
    ],
    popular: true
  },
  {
    id: 'online-courses',
    title: 'Online Courses',
    description: 'Self-paced online courses with video lectures, exercises, and community support.',
    icon: BookOpen,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    duration: '4-12 weeks',
    price: '$299-999',
    level: 'beginner-to-advanced',
    features: [
      'Video lectures and demos',
      'Interactive exercises and projects',
      'Downloadable resources',
      'Community forum access',
      'Lifetime access to materials'
    ],
    outcomes: [
      'Flexible learning schedule',
      'Comprehensive understanding',
      'Practical skills development',
      'Portfolio-worthy projects'
    ],
    popular: false
  }
]

export function MentoringPrograms() {
  return (
    <section id="programs" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mentoring Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the program that best fits your learning style, career goals, and schedule. 
              All programs are taught by industry experts with real-world experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentoringPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${program.color}`}>
                      <program.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {program.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {program.level}
                        </Badge>
                        {program.popular && (
                          <Badge variant="default" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="font-semibold">{program.price}</div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">What's Included</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Expected Outcomes</h4>
                    <ul className="space-y-2">
                      {program.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Target className="w-4 h-4 text-primary mt-1" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t">
                    <Button className="w-full" asChild>
                      <a href={`/contact?mentoring=${program.id}`}>
                        Get Started with {program.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Program Comparison */}
          <div className="mt-16">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Not Sure Which Program to Choose?
              </h3>
              <p className="text-center text-muted-foreground mb-8">
                Schedule a free 30-minute consultation with our mentoring team to discuss your goals 
                and find the perfect program for your needs.
              </p>
              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <a href="/contact?consultation=true">
                    Schedule Free Consultation
                    <Calendar className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}