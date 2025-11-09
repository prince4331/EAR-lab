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
    color: 'text-secondary',
    stats: ['3x faster learning', 'Personalized curriculum', 'Real-world projects']
  },
  {
    title: 'Career Advancement',
    description: 'Get insider access to job opportunities, industry connections, and career guidance tailored to the robotics sector.',
    icon: Users,
    color: 'text-primary',
    stats: ['95% job placement', 'Industry network', 'Career coaching']
  },
  {
    title: 'Expert Knowledge',
    description: 'Learn from mentors with PhD-level expertise and experience at leading robotics companies and research institutions.',
    icon: Award,
    color: 'text-success',
    stats: ['PhD-level mentors', 'Industry experience', 'Research insights']
  },
  {
    title: 'Practical Skills',
    description: 'Gain hands-on experience with real robotics projects, code reviews, and practical implementation guidance.',
    icon: Target,
    color: 'text-chart-4',
    stats: ['Real projects', 'Code reviews', 'Implementation skills']
  },
  {
    title: 'Ongoing Support',
    description: 'Get continuous support even after program completion with our alumni network and resources.',
    icon: Shield,
    color: 'text-destructive',
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
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#05142c] to-[#03060d]" />
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Benefits</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Choose Our Mentoring?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Programs designed to accelerate your growth and plug you into the robotics community with actionable guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group glass-card border border-white/15 bg-white/5 text-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 ${benefit.color}`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-heading text-xl group-hover:text-cyber-teal transition-colors">
                      {benefit.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-white/70">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-3">
                    {benefit.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center gap-2 text-sm text-white/75">
                        <CheckCircle className="w-4 h-4 text-lime-green" />
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
              <h3 className="font-heading text-3xl font-bold mb-4 text-white">
                Success Stories
              </h3>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                See how our mentoring programs have helped professionals advance their careers in robotics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center glass-card border border-white/15 bg-white/5 text-white">
                  <CardHeader className="pb-4">
                    <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <CardTitle className="font-heading text-lg mb-2">{story.name}</CardTitle>
                    <CardDescription className="text-sm text-white/70">
                      {story.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-white/70 mb-2">
                      <strong>Before:</strong> {story.before}
                    </div>
                    <div className="text-sm text-cyber-teal font-medium">
                      <strong>After:</strong> {story.after}
                    </div>
                    <div className="text-xs text-white/60 mt-3">
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
