import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Handshake, 
  Users, 
  Award, 
  Target,
  ArrowRight,
  Building,
  University,
  Factory
} from 'lucide-react'

const partnershipOpportunities = [
  {
    id: 'joint-research',
    title: 'Joint Research Projects',
    description: 'Collaborate with us on cutting-edge research projects in autonomous systems, sensor fusion, and embedded AI.',
    icon: Handshake,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    type: 'academic',
    benefits: [
      'Access to cutting-edge research facilities',
      'Co-authorship on high-impact publications',
      'Industry collaboration opportunities',
      'Grant application support'
    ],
    status: 'open'
  },
  {
    id: 'industry-sponsorship',
    title: 'Industry Sponsorship',
    description: 'Sponsor our research initiatives and gain early access to breakthrough technologies and talent.',
    icon: Building,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    type: 'industry',
    benefits: [
      'First access to research outcomes',
      'Technology licensing opportunities',
      'Recruitment pipeline access',
      'Brand association with innovation'
    ],
    status: 'open'
  },
  {
    id: 'technology-transfer',
    title: 'Technology Transfer',
    description: 'License our patented technologies and research outcomes for commercial applications.',
    icon: Target,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    type: 'commercial',
    benefits: [
      'Ready-to-use intellectual property',
      'Technical support and training',
      'Customization opportunities',
      'Joint development possibilities'
    ],
    status: 'available'
  },
  {
    id: 'talent-partnership',
    title: 'Talent Partnership',
    description: 'Partner with us to access top robotics talent and collaborative research opportunities.',
    icon: Users,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    type: 'academic',
    benefits: [
      'Access to skilled researchers and engineers',
      'Internship and recruitment programs',
      'Collaborative project opportunities',
      'Conference and workshop participation'
    ],
    status: 'open'
  }
]

const currentPartners = [
  {
    name: 'Stanford Robotics Lab',
    type: 'academic',
    logo: '/partners/stanford.png',
    description: 'Collaborative research in autonomous navigation'
  },
  {
    name: 'MIT CSAIL',
    type: 'academic',
    logo: '/partners/mit.png',
    description: 'Joint research in computer vision and AI'
  },
  {
    name: 'TechCorp Robotics',
    type: 'industry',
    logo: '/partners/techcorp.png',
    description: 'Industry sponsor for embedded systems research'
  },
  {
    name: 'InnoLabs',
    type: 'industry',
    logo: '/partners/innolabs.png',
    description: 'Technology transfer partner for sensor fusion'
  }
]

export function ResearchPartnerships() {
  return (
    <section id="partnerships" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe in the power of collaboration. Partner with us to advance robotics research 
              and bring innovative technologies to market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {partnershipOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${opportunity.color}`}>
                      <opportunity.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {opportunity.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={opportunity.status === 'open' ? 'default' : 'secondary'}>
                          {opportunity.status === 'open' ? 'Accepting Proposals' : opportunity.status === 'available' ? 'Available' : 'Closed'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {opportunity.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {opportunity.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full" asChild>
                        <a href={`/contact?partnership=${opportunity.id}`}>
                          Propose {opportunity.type === 'academic' ? 'Collaboration' : 'Partnership'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Partners */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">
                Current Research Partners
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're proud to collaborate with leading academic institutions and industry partners 
                to advance robotics research and innovation.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentPartners.map((partner, index) => (
                <div key={index} className="text-center p-6 bg-muted/30 rounded-lg">
                  <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center mx-auto mb-3">
                    {partner.type === 'academic' ? (
                      <University className="w-8 h-8 text-primary" />
                    ) : (
                      <Factory className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <h4 className="font-semibold text-sm">{partner.name}</h4>
                  <Badge variant="outline" className="text-xs mb-2">
                    {partner.type}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're interested in joint research, technology licensing, or talent partnership, 
                we're excited to explore how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact?partnership=general">
                    Discuss Partnership
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/research#research-areas">
                    Explore Research Areas
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