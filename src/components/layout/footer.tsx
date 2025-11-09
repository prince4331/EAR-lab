import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Github, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Embedded Systems', href: '/services#embedded' },
    { name: 'Autonomy & AI', href: '/services#autonomy' },
    { name: 'Sensor Integration', href: '/services#sensors' },
    { name: 'Power Monitoring', href: '/services#power' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Research', href: '/research' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030710] text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#040812] via-[#050f1d] to-[#03060d]" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(15,98,254,0.25), transparent 45%), radial-gradient(circle at 100% 0%, rgba(0,194,168,0.25), transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"240\" height=\"240\" viewBox=\"0 0 240 240\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%230F62FE\" stroke-width=\"0.35\" opacity=\"0.35\"%3E%3Cpath d=\"M0 60h240M0 120h240M0 180h240M60 0v240M120 0v240M180 0v240\"/%3E%3C/g%3E%3C/svg%3E')" }}
      />

      <div className="container relative z-10 px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center" aria-label="EAR Lab home">
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 drop-shadow-[0_0_45px_rgba(15,98,254,0.75)]">
                <Image src="/logo.png" alt="EAR Lab Logo" fill sizes="(max-width:640px) 56px, 80px" className="object-contain" />
              </div>
            </Link>
            <p className="text-white/70 max-w-lg">
              Embedded. Autonomous. Robotics. We research, prototype, and operationalize modular robotics systems with
              aerospace-grade rigor for advanced manufacturing teams.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 bg-white/5 border-white/15 text-white placeholder:text-white/50"
                required
              />
              <Button className="bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow" type="submit">
                Subscribe
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white/90">Services</h3>
            <ul className="space-y-3 text-white/70">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white/90">Company</h3>
            <ul className="space-y-3 text-white/70">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white/90">Legal</h3>
            <ul className="space-y-3 text-white/70">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/60">&copy; {currentYear} EAR Lab. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            {socialLinks.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
