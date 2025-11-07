import { Button } from '@/components/ui/button'
import { ArrowRight, Microscope, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function ResearchHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Research &{' '}
            <span className="text-accent">
              Innovation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Pushing the boundaries of robotics technology through cutting-edge research and development. 
            From autonomous navigation algorithms to embedded system optimization, we're solving the 
            most challenging problems in modern robotics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="#publications">
                View Our Publications
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#partnerships">
                Propose Joint Research
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Published Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Active Research Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Patents Filed</div>
            </div>
          </div>

          {/* Key Research Areas Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Autonomy Systems</h3>
              <p className="text-sm text-muted-foreground">
                Advanced navigation and perception algorithms
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Sensor Fusion</h3>
              <p className="text-sm text-muted-foreground">
                Multi-sensor integration and calibration
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Embedded AI</h3>
              <p className="text-sm text-muted-foreground">
                Edge AI and embedded machine learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}