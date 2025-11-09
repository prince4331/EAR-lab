import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import BlogPostImage from './BlogPostImage'
import Link from 'next/link'
import { BlogPostRecord } from '@/types/blog'
import { MEDIA_FALLBACK } from '@/lib/media'

type LatestBlogProps = {
  posts: BlogPostRecord[]
}

export function LatestBlog({ posts }: LatestBlogProps) {
  const displayed = posts.slice(0, 3)

  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040915] to-[#0B0F19]" />
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">Insights</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-5">
            Latest from the Lab
          </h2>
          <p className="text-xl text-white/70">
            Research notes, build logs, and benchmarks from our engineers in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayed.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border border-white/15 bg-white/5"
            >
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <BlogPostImage src={post.featuredImage || MEDIA_FALLBACK} alt={post.title} />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author?.name || post.author?.email || 'EAR Lab'}</span>
                  </div>
                  <span aria-hidden="true">&bull;</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 font-heading text-white">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3 text-white/70">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="text-sm text-white/60 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Unpublished'}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-medium text-primary group-hover:text-white w-full"
                  asChild
                >
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
          <Button size="lg" className="px-10 bg-gradient-to-r from-[#0f82fe] to-[#00c2a8]" asChild>
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
