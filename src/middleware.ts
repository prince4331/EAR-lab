import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is accessing admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token
      
      // Allow access to login page
      if (req.nextUrl.pathname === '/admin/login') {
        // Redirect to dashboard if already logged in
        if (token) {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        return NextResponse.next()
      }

      // Require authentication for all other admin routes
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }
        // Require token for other admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token && token.role === 'admin'
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
