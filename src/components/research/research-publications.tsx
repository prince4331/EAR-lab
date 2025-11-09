import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar, User, FileText, Quote } from 'lucide-react'

const publications = [
  {
    id: 1,
    title: 'Multi-Robot Coordination Using Distributed SLAM',
    authors: ['Dr. Sarah Chen', 'Dr. Michael Park'],
    journal: 'IEEE Robotics and Automation Letters',
    year: 2024,
    doi: '10.1109/LRA.2024.123456',
    abstract: 'We present a novel approach to multi-robot coordination using distributed SLAM with adaptive map merging...',
    category: 'autonomy',
    featured: true,
    citations: 15
  },
  {
    id: 2,
    title: 'Real-Time Battery Management for Mobile Robots',
    authors: ['Mark Rodriguez', 'Dr. Lisa Wang'],
    journal: 'Journal of Power Electronics',
    year: 2024,
    doi: '10.1109/JPE.2024.789012',
    abstract: 'An advanced battery management system that combines predictive health monitoring with adaptive charging strategies...',
    category: 'power',
    featured: true,
    citations: 23
  },
  {
    id: 3,
    title: 'Edge-Based Computer Vision for Robotics',
    authors: ['Dr. Alex Kumar', 'Dr. Sarah Chen'],
    journal: 'Computer Vision and Image Understanding',
    year: 2023,
    doi: '10.1109/CVIU.2023.456789',
    abstract: 'A novel edge-based vision system that reduces computational requirements while maintaining accuracy...',
    category: 'perception',
    featured: false,
    citations: 8
  },
  {
    id: 4,
    title: 'Safety-Critical Embedded Controllers for Medical Robotics',
    authors: ['Dr. Emily Johnson', 'Mark Rodriguez'],
    journal: 'IEEE Transactions on Industrial Informatics',
    year: 2023,
    doi: '10.1109/TII.2023.234567',
    abstract: 'Design and implementation of safety-critical embedded controllers for medical robotic applications...',
    category: 'embedded',
    featured: false,
    citations: 12
  },
  {
    id: 5,
    title: 'Thermal Management in High-Power Robot Systems',
    authors: ['Dr. James Wilson', 'Dr. Lisa Wang'],
    journal: 'IEEE Transactions on Power Electronics',
    year: 2023,
    doi: '10.1109/TPEL.2023.567890',
    abstract: 'Comprehensive thermal management strategies for high-power robotic systems with active cooling...',
    category: 'power',
    featured: false,
    citations: 6
  }
]

const getCategoryColor = (category: string) => {
  const colors = {
    autonomy: 'bg-secondary/10 text-secondary',
    perception: 'bg-primary/10 text-primary',
    embedded: 'bg-success/10 text-success',
    power: 'bg-chart-4/10 text-chart-4',
    testing: 'bg-destructive/10 text-destructive'
  }
  return colors[category as keyof typeof colors] || 'bg-white/10 text-white/80'
}

export function ResearchPublications() {
  return (
    <section id="publications" className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020309] via-[#06132b] to-[#02040a]" />
      <div className="container relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Publications</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
              Recent Publications
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Our research contributes to the academic community through peer-reviewed publications 
              in leading robotics and computer vision journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <Card key={pub.id} className="group glass-card border border-white/15 bg-white/5 text-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="font-heading text-xl group-hover:text-cyber-teal transition-colors line-clamp-2">
                        {pub.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getCategoryColor(pub.category)}>
                          {pub.category}
                        </Badge>
                        {pub.featured && (
                          <Badge variant="outline" className="text-xs border-white/30 text-white/80">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70 mt-2">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{pub.authors.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{pub.year}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-white/30 text-white/80">
                        {pub.citations} citations
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed line-clamp-3 text-white/80">
                    {pub.abstract}
                  </CardDescription>

                  <div className="flex flex-col gap-4 pt-4 border-t border-white/15 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-white/70 text-center md:text-left">
                      <div className="font-medium">{pub.journal}</div>
                      <div>DOI: {pub.doi}</div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
                        asChild
                      >
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Paper
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
                        asChild
                      >
                        <a href={`/contact?publication=${pub.id}`}>
                          <Quote className="w-4 h-4 mr-1" />
                          Discuss Research
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white/10" asChild>
              <a href="https://scholar.google.com/citations?user=EARLab" target="_blank" rel="noopener noreferrer">
                View All Publications on Google Scholar
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
