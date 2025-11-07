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
        <div className="container px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Let's Build Something
                <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                  {' '}Amazing Together
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have a robotics project in mind? Our team of experts is ready to help you bring your vision to life. 
                From initial consultation to full-scale development, we're here to support your journey.
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
        </div>
      </main>
      <Footer />
    </div>
  )
}