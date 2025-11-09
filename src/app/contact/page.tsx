import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'

export const metadata: Metadata = {
  title: 'Contact - EAR Lab | Start Your Robotics Project',
  description: 'Get in touch with EAR Lab to discuss your robotics project. Our team of experts is ready to help you bring your vision to life.',
  openGraph: {
    title: 'Contact - EAR Lab',
    description: 'Start your robotics project with us. Expert consultation and development services.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden py-24 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-[#03060d] via-[#071632] to-[#020509]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"240\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 240\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.3\"%3E%3Cpath d=\"M0 60h240M0 120h240M0 180h240M60 0v240M120 0v240M180 0v240\"/%3E%3C/g%3E%3C/svg%3E')" }} />
          <div className="container relative z-10 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-sm uppercase tracking-[0.4em] text-white/60 mb-4">Contact</p>
              <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Let's Build Something{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F62FE] to-[#00C2A8]">
                  Remarkable
                </span>
              </h1>
              <p className="text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
                Tell us about the systems you're building. From initial consultation to production validation, our teams plug into your roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
