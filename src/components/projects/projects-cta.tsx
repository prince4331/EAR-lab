import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Download, FileText } from 'lucide-react'
import Link from 'next/link'

export function ProjectsCTA() {
  return (
    <section className="relative py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#04060b] via-[#071225] to-[#04132b]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-cyber-teal/10 blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Engagements</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Share your requirements and we will scope architecture, validation, and manufacturing readiness with you in a single sprint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Start a conversation</h3>
              <p className="text-sm text-white/70 mb-5">
                Schedule a working session with our engineers to define success criteria and delivery milestones.
              </p>
              <Button variant="secondary" size="sm" className="w-full bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] text-white" asChild>
                <Link href="/contact">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/5 p-8 text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Download our portfolio</h3>
              <p className="text-sm text-white/70 mb-5">
                Review detailed case studies, technical stacks, and verification approaches from recent deployments.
              </p>
              <Button variant="secondary" size="sm" className="w-full bg-white/10 text-white hover:bg-white/20">
                Download PDF
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-white/60">
            <p>Turnaround time for project proposals: 3-5 business days</p>
          </div>
        </div>
      </div>
    </section>
  )
}
