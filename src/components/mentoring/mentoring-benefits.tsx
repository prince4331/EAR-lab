import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  BookOpen,
  Zap,
  Shield
} from 'lucide-react'

const benefits = [
  {
    title: 'Accelerated Learning',
    description: 'Learn 3x faster with personalized guidance from industry experts who have worked on cutting-edge robotics projects.',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    stats: ['3x faster learning', 'Personalized curriculum', 'Real-world projects']
  },
  {
    title: 'Career Advancement',
    description: 'Get insider access to job opportunities, industry connections, and career guidance tailored to the robotics sector.',
    icon: Users,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    stats: ['95% job placement', 'Industry network', 'Career coaching']
  },
  {
    title: 'Expert Knowledge',
    description: 'Learn from mentors with PhD-level expertise and experience at leading robotics companies and research institutions.',
    icon: Award,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    stats: ['PhD-level mentors', 'Industry experience', 'Research insights']
  },
  {
    title: 'Practical Skills',
    description: 'Gain hands-on experience with real robotics projects, code reviews, and practical implementation guidance.',
    icon: Target,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    stats: ['Real projects', 'Code reviews', 'Implementation skills']
  },
  {
    title: 'Ongoing Support',
    description: 'Get continuous support even after program completion with our alumni network and resources.',
    icon: Shield,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    stats: ['Lifetime access', 'Alumni network', 'Continuous support']
  }
]

const successStories = [
  {
    name: 'Alex Chen',
    role: 'Robotics Engineer',
    before: 'Struggling with autonomous navigation concepts',
    after: 'Lead engineer at autonomous vehicle startup',
    program: '1:1 Mentoring',
    image: '/testimonials/alex.jpg'
  },
  {
    name: 'Sarah Johnson',
    role: 'Embedded Systems Developer',
    before: 'Limited career growth opportunities',
    after: 'Senior embedded engineer at major robotics company',
    program: 'Corporate Training',
    image: '/testimonials/sarah.jpg'
  },
  {
    name: 'Mike Williams',
    role: 'Research Scientist',
    before: 'Difficulty transitioning from academia to industry',
    after: 'Research lead at AI robotics lab',
    program: 'Workshops',
    image: '/testimonials/mike.jpg'
  }
]

export function MentoringBenefits() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Mentoring?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our mentoring programs are designed to accelerate your career growth 
              and provide you with the skills and connections needed to succeed in the robotics industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${benefit.color}`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {benefit.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-3">
                    {benefit.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{stat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Stories */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">
                Success Stories
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how our mentoring programs have helped professionals advance their careers in robotics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2">{story.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {story.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong>Before:</strong> {story.before}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      <strong>After:</strong> {story.after}
                    </div>
                    <div className="text-xs text-muted-foreground mt-3">
                      Program: {story.program}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}