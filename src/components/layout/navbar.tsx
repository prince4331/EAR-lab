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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container max-w-[1800px] flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="EAR Lab Logo"
                fill
                sizes="(max-width: 640px) 32px, 40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg sm:text-xl">EAR Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs xl:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/subscribe">Subscribe</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact" className="text-xs xl:text-sm">Request Collaboration</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate to different sections of EAR Lab website
            </SheetDescription>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-5 border-b">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.png"
                      alt="EAR Lab Logo"
                      fill
                      sizes="32px"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span className="font-bold text-xl">EAR Lab</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer CTAs */}
              <div className="p-6 border-t space-y-3 bg-muted/30">
                <Button variant="outline" size="default" className="w-full" asChild>
                  <Link href="/subscribe" onClick={() => setIsOpen(false)}>
                    Subscribe to Newsletter
                  </Link>
                </Button>
                <Button size="default" className="w-full" asChild>
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