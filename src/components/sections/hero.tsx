'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Cpu, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050b18] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#040916] via-[#071b3d] to-[#021126]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,194,168,0.3), transparent 45%), radial-gradient(circle at 80% 0%, rgba(15,130,254,0.35), transparent 40%)",
        }}
      />
      <svg className="absolute inset-0 w-full h-full text-white/10" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      <div className="relative z-10 container px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2 text-xs font-heading tracking-[0.35em] uppercase text-white/80 bg-white/10 rounded-full border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              Capabilities
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 leading-tight">
              EAR Lab. Embedded. Autonomous. Robotics.
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto lg:mx-0">
              Innovating the future of modular robotics with aerospace-grade rigor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base px-8 py-6 font-heading tracking-wide bg-gradient-to-r from-[#0f82fe] to-[#00c2a8]"
                asChild
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 font-heading tracking-wide border-white/40 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/projects">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_25px_80px_rgba(1,4,12,0.75)] flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-3xl border border-white/20 flex items-center justify-center animate-spin" style={{ animationDuration: '28s' }}>
                <div className="w-[70%] h-[70%] rounded-2xl border border-white/30 flex items-center justify-center bg-white/5">
                  <Cpu size={64} className="text-white/80" />
                </div>
              </div>
            </div>

            <div className="absolute top-8 left-0 bg-white/10 rounded-2xl shadow-lg border border-white/15 px-4 py-3 flex items-center space-x-3 backdrop-blur">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-white">3 Active Programs</span>
            </div>

            <div className="absolute bottom-8 right-0 bg-white/10 rounded-2xl shadow-lg border border-white/15 px-4 py-3 flex items-center space-x-3 backdrop-blur">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-sm font-semibold text-white">12 Research Papers</span>
            </div>

            <div className="absolute bottom-24 left-[-3rem] bg-white/10 rounded-2xl shadow-lg border border-white/15 px-4 py-3 flex items-center space-x-3 backdrop-blur">
              <Code size={22} className="text-cyan-400" />
              <span className="text-sm font-semibold text-white">Firmware Dev</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
