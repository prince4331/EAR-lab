import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, BookOpen, Rss } from 'lucide-react'
import Link from 'next/link'

export function BlogCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Stay Updated with Robotics Insights
          </h2>
          
          <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Get the latest robotics research, technical tutorials, and case studies delivered to your inbox. 
            Join thousands of robotics professionals and researchers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Weekly Newsletter</h3>
              <p className="text-sm text-white/80 mb-4">
                Curated robotics insights, research highlights, and exclusive content delivered weekly.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/subscribe">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold mb-2">Deep-Dive Articles</h3>
              <p className="text-sm text-white/80 mb-4">
                Comprehensive technical guides and case studies from our real-world projects.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/blog">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rss className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold mb-2">RSS Feed</h3>
              <p className="text-sm text-white/80 mb-4">
                Subscribe to our RSS feed for instant updates on new articles and research.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/rss.xml">
                  RSS Feed
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-sm text-white/70">
            <p>No spam, unsubscribe anytime • Join 5,000+ robotics professionals</p>
          </div>
        </div>
      </div>
    </section>
  )
}