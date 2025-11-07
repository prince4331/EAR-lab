import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'

const latestPosts = [
  {
    id: 1,
    title: 'How to Architect a Modular Autonomy Stack for Warehouse Robots',
    excerpt: 'Learn the key principles and best practices for building scalable, modular autonomy systems that can adapt to different warehouse environments and requirements.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-03-15',
    readingTime: 12,
    tags: ['Autonomy', 'ROS2', 'Architecture', 'Warehouse'],
    featuredImage: '/blog/autonomy-stack.jpg',
    slug: 'modular-autonomy-stack-warehouse-robots'
  },
  {
    id: 2,
    title: 'Choosing the Right Battery Monitoring Approach for Mobile Robots',
    excerpt: 'A comprehensive guide to battery management systems, from basic voltage monitoring to advanced predictive health analytics for robotic applications.',
    author: 'Mark Rodriguez',
    publishedAt: '2024-03-10',
    readingTime: 8,
    tags: ['Power', 'BMS', 'Battery', 'Mobile Robots'],
    featuredImage: '/blog/battery-monitoring.jpg',
    slug: 'battery-monitoring-mobile-robots'
  },
  {
    id: 3,
    title: 'Open-source Sensor Fusion Libraries Compared',
    excerpt: 'We benchmark and compare popular open-source sensor fusion frameworks, analyzing their performance, ease of use, and suitability for robotics applications.',
    author: 'Alex Kumar',
    publishedAt: '2024-03-05',
    readingTime: 15,
    tags: ['Sensor Fusion', 'Open Source', 'Benchmark', 'Review'],
    featuredImage: '/blog/sensor-fusion-libraries.jpg',
    slug: 'open-source-sensor-fusion-libraries'
  }
]

export function LatestBlog() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest from the Lab
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, research findings, and technical deep-dives from our team of robotics experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Post Image */}
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">Blog Post</p>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Published Date */}
                <div className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                {/* CTA */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary group-hover:text-primary/80 w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}