import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function BlogHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Robotics <span className="text-accent">Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Deep dives into robotics research, technical tutorials, and case studies from our work 
            with leading companies and research institutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/subscribe">
                Subscribe to Newsletter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/rss.xml">
                RSS Feed
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}