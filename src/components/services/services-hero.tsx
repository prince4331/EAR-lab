import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ServicesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            End-to-end robotics development services from concept to production. 
            We partner with you to accelerate innovation and de-risk development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Request a Proposal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}