import { Button } from '@/components/ui/button'
import { ArrowRight, Filter } from 'lucide-react'
import Link from 'next/link'

export function ProjectsHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Our <span className="text-accent">Projects</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Explore our portfolio of innovative robotics solutions. From autonomous navigation systems 
            to advanced battery management, see how we've helped partners achieve their technical goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}