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
    color: 'text-secondary',
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
    color: 'text-primary',
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
    color: 'text-success',
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
    color: 'text-chart-4',
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
    color: 'text-destructive',
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
    <section id="programs" className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-[#061530] to-[#050912]" />
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Programs</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Our Mentoring Programs
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Choose the program that fits your learning style, career goals, and schedule. Every session is led by engineers who ship production robotics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentoringPrograms.map((program) => (
              <Card key={program.id} className="group glass-card border border-white/15 bg-white/5 text-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white/10 border border-white/20 ${program.color}`}>
                      <program.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading text-xl group-hover:text-cyber-teal transition-colors text-white">
                        {program.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs border-white/30 text-white/80">
                          {program.level}
                        </Badge>
                        {program.popular && (
                          <Badge className="text-xs bg-white/15 text-white px-3">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="font-semibold text-white">{program.price}</div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-white/70">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-heading font-semibold mb-3 text-white">What's Included</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                          <div className="w-2 h-2 bg-electric-blue rounded-full mt-2"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-semibold mb-3 text-white">Expected Outcomes</h4>
                    <ul className="space-y-2">
                      {program.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                          <Target className="w-4 h-4 text-cyber-teal mt-1" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/15">
                    <Button
                      className="w-full md:w-auto bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow justify-center"
                      asChild
                    >
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
            <div className="glass-card border border-white/15 bg-white/5 rounded-2xl p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-6 text-center">
                Not Sure Which Program to Choose?
              </h3>
              <p className="text-center text-white/70 mb-8">
                Schedule a free 30-minute consultation with our mentoring team to discuss your goals 
                and find the perfect program for your needs.
              </p>
              <div className="text-center">
                <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10" asChild>
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
