import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Users, Calendar, Target, Zap } from 'lucide-react'

export function MentoringCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Career?
          </h2>
          
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our mentoring programs and gain the skills, knowledge, and connections 
            needed to excel in the competitive robotics industry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur border border-white/20">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-white mb-4 mx-auto" />
                <h3 className="font-heading text-xl font-semibold mb-2">Free Consultation</h3>
                <p className="text-sm text-white/80 mb-4">
                  30-minute session to discuss your goals and find the right program
                </p>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <a href="/contact?consultation=true">
                    Schedule Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border border-white/20">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-white mb-4 mx-auto" />
                <h3 className="font-heading text-xl font-semibold mb-2">Program Comparison</h3>
                <p className="text-sm text-white/80 mb-4">
                  Not sure which program fits your needs?
                </p>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <a href="#programs">
                    Compare Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border border-white/20">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-white mb-4 mx-auto" />
                <h3 className="font-heading text-xl font-semibold mb-2">Quick Start</h3>
                <p className="text-sm text-white/80 mb-4">
                  Ready to dive in? Get started immediately
                </p>
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <a href="/contact?mentoring=quickstart">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Program Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80">
            <div className="text-center">
              <div className="font-heading text-3xl font-bold">500+</div>
              <div className="text-sm uppercase tracking-wider">Hours of Content</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold">50+</div>
              <div className="text-sm uppercase tracking-wider">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold">24/7</div>
              <div className="text-sm uppercase tracking-wider">Support</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-3xl font-bold">95%</div>
              <div className="text-sm uppercase tracking-wider">Success Rate</div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12">
            <Card className="bg-white/10 backdrop-blur border border-white/20">
              <CardContent className="p-8 text-center">
                <h3 className="font-heading text-2xl font-semibold mb-4">
                  Transform Your Robotics Career
                </h3>
                <p className="text-lg text-white/80 mb-6">
                  Whether you're just starting out or looking to advance to the next level, 
                  our expert mentoring programs provide the guidance, skills, and connections you need.
                </p>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <a href="/contact?mentoring=transform">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}