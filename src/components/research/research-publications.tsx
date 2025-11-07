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
    autonomy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    perception: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    embedded: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    power: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    testing: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  }
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
}

export function ResearchPublications() {
  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our research contributes to the academic community through peer-reviewed publications 
              in leading robotics and computer vision journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <Card key={pub.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {pub.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getCategoryColor(pub.category)}>
                          {pub.category}
                        </Badge>
                        {pub.featured && (
                          <Badge variant="outline" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
                      <Badge variant="outline" className="text-xs">
                        {pub.citations} citations
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {pub.abstract}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <div className="font-medium">{pub.journal}</div>
                      <div>DOI: {pub.doi}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Paper
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
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
            <Button variant="outline" size="lg" asChild>
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