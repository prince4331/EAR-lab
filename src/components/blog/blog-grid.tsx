'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ArrowRight, Calendar, Clock, User, Search, Filter as FilterIcon } from 'lucide-react'
import Link from 'next/link'
import BlogPostImage from '@/components/sections/BlogPostImage'
import { BlogPostRecord } from '@/types/blog'
import { MEDIA_FALLBACK } from '@/lib/media'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'autonomy', label: 'Autonomy & AI' },
  { value: 'embedded', label: 'Embedded Systems' },
  { value: 'sensors', label: 'Sensor Integration' },
  { value: 'power', label: 'Power Systems' }
]

const getCategoryColor = (category?: string | null) => {
  const colors = {
    autonomy: 'bg-secondary/10 text-secondary',
    embedded: 'bg-primary/10 text-primary',
    sensors: 'bg-chart-3/10 text-chart-3',
    power: 'bg-chart-4/10 text-chart-4'
  }
  if (!category) return 'bg-muted/50 text-muted-foreground'
  return colors[category as keyof typeof colors] || 'bg-muted/50 text-muted-foreground'
}

type BlogGridProps = {
  posts: BlogPostRecord[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [posts, searchTerm, selectedCategory])

  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-[#071530] to-[#030715]" />
      <div className="container relative z-10 px-4 max-w-[1800px]">
        {/* Filters */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6 md:mb-8 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white/70 w-full lg:w-auto">
              <FilterIcon className="w-4 h-4 text-cyan-300" />
              <span className="text-xs sm:text-sm font-medium">
                Showing {filteredPosts.length} of {posts.length} articles
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dialog-surface border-white/10">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="text-white data-[state=checked]:bg-white/10"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-2">
              {/* Post Image */}
              <div className="aspect-video bg-muted/50 relative overflow-hidden">
                <BlogPostImage
                  src={post.featuredImage || MEDIA_FALLBACK}
                  alt={post.title}
                />
                <Badge 
                  className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                  variant="secondary"
                >
                  {post.category ?? 'general'}
                </Badge>
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
                <CardTitle className="font-heading text-xl text-white group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3 text-white/70">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Published Date */}
                <div className="text-sm text-white/60">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Unpublished'}
                </div>

                {/* CTA */}
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary group-hover:text-white w-full" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
