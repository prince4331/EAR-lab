'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' },
  { name: 'Mentoring', href: '/mentoring' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050b18]/90 backdrop-blur supports-[backdrop-filter]:bg-[#050b18]/80 border-b border-white/10 shadow-[0_10px_40px_rgba(5,10,20,0.75)]">
      <nav className="container max-w-[1600px] flex min-h-[96px] sm:min-h-[110px] items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_45px_rgba(15,98,254,0.85)]">
              <Image
                src="/logo.png"
                alt="EAR Lab Logo"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-heading font-medium text-white/70 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          <Button variant="outline" size="sm" asChild className="font-heading tracking-wide border-white/30 text-white hover:bg-white/10">
            <Link href="/subscribe">Subscribe</Link>
          </Button>
          <Button size="sm" asChild className="font-heading tracking-wide bg-gradient-to-r from-[#0f82fe] to-[#00bcd8] text-white">
            <Link href="/contact" className="text-sm">Request Collaboration</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0 bg-[#050b18] text-white">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate to different sections of EAR Lab website
            </SheetDescription>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <div className="relative w-16 h-16 drop-shadow-[0_0_35px_rgba(15,98,254,0.8)]">
                    <Image
                      src="/logo.png"
                      alt="EAR Lab Logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer CTAs */}
              <div className="p-6 border-t border-white/10 space-y-3 bg-white/5">
                <Button variant="outline" size="default" className="w-full border-white/30 text-white" asChild>
                  <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                    Subscribe to Newsletter
                  </Link>
                </Button>
                <Button size="default" className="w-full bg-gradient-to-r from-[#0f82fe] to-[#00bcd8] text-white" asChild>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Request Collaboration
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
