'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ArrowRight, Calendar, Clock, User, Search, Filter as FilterIcon } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'How to Architect a Modular Autonomy Stack for Warehouse Robots',
    excerpt: 'Learn the key principles and best practices for building scalable, modular autonomy systems that can adapt to different warehouse environments and requirements.',
    content: 'A comprehensive guide to warehouse robotics autonomy systems...',
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-03-15',
    readingTime: 12,
    tags: ['Autonomy', 'ROS2', 'Architecture', 'Warehouse', 'SLAM'],
    featuredImage: '/blog/autonomy-stack.jpg',
    slug: 'modular-autonomy-stack-warehouse-robots',
    category: 'autonomy'
  },
  {
    id: 2,
    title: 'Choosing the Right Battery Monitoring Approach for Mobile Robots',
    excerpt: 'A comprehensive guide to battery management systems, from basic voltage monitoring to advanced predictive health analytics for robotic applications.',
    content: 'Complete guide to battery monitoring systems...',
    author: 'Mark Rodriguez',
    publishedAt: '2024-03-10',
    readingTime: 8,
    tags: ['Power', 'BMS', 'Battery', 'Mobile Robots', 'Hardware'],
    featuredImage: '/blog/battery-monitoring.jpg',
    slug: 'battery-monitoring-mobile-robots',
    category: 'power'
  },
  {
    id: 3,
    title: 'Open-source Sensor Fusion Libraries Compared',
    excerpt: 'We benchmark and compare popular open-source sensor fusion frameworks, analyzing their performance, ease of use, and suitability for robotics applications.',
    content: 'Comprehensive comparison of sensor fusion libraries...',
    author: 'Alex Kumar',
    publishedAt: '2024-03-05',
    readingTime: 15,
    tags: ['Sensor Fusion', 'Open Source', 'Benchmark', 'Review', 'Kalman Filter'],
    featuredImage: '/blog/sensor-fusion-libraries.jpg',
    slug: 'open-source-sensor-fusion-libraries',
    category: 'sensors'
  }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'autonomy', label: 'Autonomy & AI' },
  { value: 'embedded', label: 'Embedded Systems' },
  { value: 'sensors', label: 'Sensor Integration' },
  { value: 'power', label: 'Power Systems' }
]

const getCategoryColor = (category: string) => {
  const colors = {
    autonomy: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    embedded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    sensors: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    power: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
  }
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
}

export function BlogGrid() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 max-w-[1800px]">
        {/* Filters */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2 text-muted-foreground w-full lg:w-auto">
              <FilterIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
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
                <Badge 
                  className={`absolute top-4 left-4 ${getCategoryColor(post.category)}`}
                  variant="secondary"
                >
                  {post.category}
                </Badge>
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
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3}
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