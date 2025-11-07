import { Button } from '@/components/ui/button'
import { ArrowRight, Users, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'

export function MentoringHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Mentoring &{' '}
            <span className="text-accent">
              Training
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Accelerate your robotics career with personalized guidance from industry experts. 
            From 1:1 mentoring to corporate training, we're committed to your professional growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="#programs">
                Explore Programs
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact?mentoring=true">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Mentees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Workshops</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </div>
          </div>

          {/* Featured Programs Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1:1 Mentoring</h3>
              <p className="text-sm text-muted-foreground">
                Personalized guidance for your career
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Corporate Training</h3>
              <p className="text-sm text-muted-foreground">
                Team workshops and skill development
              </p>
            </div>
            <div className="text-center p-6 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Online Courses</h3>
              <p className="text-sm text-muted-foreground">
                Self-paced learning programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}