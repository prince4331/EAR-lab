import { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'About Us - EAR Lab',
  description: 'Learn about EAR Lab - our mission, team, and expertise in embedded systems, autonomous vehicles, and robotics research.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About EAR Lab</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              EAR Lab is a leading research laboratory specializing in Embedded systems, 
              Autonomous vehicles, and Robotics. We push the boundaries of what's possible 
              in intelligent systems and automation.
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To advance the field of robotics and autonomous systems through cutting-edge 
                research, innovative solutions, and collaborative partnerships. We strive to 
                bridge the gap between academic research and real-world applications.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <strong>Research & Development:</strong> Pioneering work in autonomous 
                  navigation, sensor fusion, and embedded AI systems.
                </li>
                <li>
                  <strong>Consulting Services:</strong> Expert guidance on robotics projects, 
                  system architecture, and technology selection.
                </li>
                <li>
                  <strong>Education & Mentoring:</strong> Training the next generation of 
                  robotics engineers through workshops and mentorship programs.
                </li>
                <li>
                  <strong>Industry Collaboration:</strong> Partnering with companies to solve 
                  complex automation and robotics challenges.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Embedded Systems</h3>
                  <p className="text-muted-foreground">
                    Microcontroller programming, RTOS, IoT devices, and low-level hardware integration.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Autonomous Systems</h3>
                  <p className="text-muted-foreground">
                    Self-driving vehicles, SLAM, path planning, and decision-making algorithms.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">Robotics</h3>
                  <p className="text-muted-foreground">
                    Mobile robots, manipulators, sensor integration, and control systems.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">AI & Machine Learning</h3>
                  <p className="text-muted-foreground">
                    Computer vision, deep learning, reinforcement learning for robotics applications.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-6">
                Interested in collaborating or learning more about our work? 
                We'd love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
