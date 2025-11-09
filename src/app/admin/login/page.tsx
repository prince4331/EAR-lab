'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050b18] p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#02060f] via-transparent to-[#03163a]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(15,98,254,0.45), transparent 55%), radial-gradient(circle at 70% 0%, rgba(0,194,168,0.25), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"280\" height=\"280\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 280\"%3E%3Cg fill=\"none\" stroke=\"%230A1A34\" stroke-width=\"0.35\" opacity=\"0.6\"%3E%3Cpath d=\"M0 70h280M0 140h280M0 210h280M70 0v280M140 0v280M210 0v280\"/%3E%3C/g%3E%3C/svg%3E')",
        }}
      />
      <Card className="relative w-full max-w-md border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_40px_140px_rgba(2,6,18,0.65)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white font-heading">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/85">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@earlab.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue focus-visible:ring-electric-blue/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/85">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue focus-visible:ring-electric-blue/30"
              />
            </div>

            <Button type="submit" className="w-full text-white btn-hover-gradient btn-glow" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
