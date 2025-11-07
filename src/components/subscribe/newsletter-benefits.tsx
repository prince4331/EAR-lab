import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, BookOpen, TrendingUp, Award, Calendar, Star } from 'lucide-react'

export function NewsletterBenefits() {
  return (
    <div className="space-y-6">
      {/* Newsletter Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Join Our Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Open Rate</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3 years</div>
                <div className="text-sm text-muted-foreground">Publishing</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Subscribe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Why Subscribe?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Expert Content</p>
                <p className="text-xs text-muted-foreground">
                  Curated by robotics researchers and engineers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <TrendingUp className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Stay Current</p>
                <p className="text-xs text-muted-foreground">
                  Latest trends and breakthroughs in robotics
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-3 h-3 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Exclusive Access</p>
                <p className="text-xs text-muted-foreground">
                  Early access to research and whitepapers
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Types */}
      <Card>
        <CardHeader>
          <CardTitle>Content Types</CardTitle>
          <CardDescription>
            What you'll find in our newsletter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Research</Badge>
              <span className="text-sm">Latest papers and findings</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Tutorials</Badge>
              <span className="text-sm">Step-by-step technical guides</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Case Studies</Badge>
              <span className="text-sm">Real-world project insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Tools</Badge>
              <span className="text-sm">Libraries and frameworks</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Events</Badge>
              <span className="text-sm">Workshops and webinars</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Careers</Badge>
              <span className="text-sm">Job opportunities</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonial */}
      <Card>
        <CardHeader>
          <CardTitle>What Our Readers Say</CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-sm italic text-muted-foreground">
            "The EAR Lab newsletter is my go-to source for staying current with robotics research. 
            The content is always insightful and practical, helping me apply new concepts in my work."
          </blockquote>
          <div className="mt-4">
            <div className="font-medium text-sm">Dr. Sarah Chen</div>
            <div className="text-xs text-muted-foreground">Robotics Researcher, Stanford University</div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Publishing Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Weekly Digest</span>
              <span className="font-medium">Every Tuesday</span>
            </div>
            <div className="flex justify-between">
              <span>Deep Dive</span>
              <span className="font-medium">1st of month</span>
            </div>
            <div className="flex justify-between">
              <span>Case Study</span>
              <span className="font-medium">3rd Friday</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}