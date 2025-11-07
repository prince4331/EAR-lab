'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Mail, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { toast } from 'sonner'

export function SubscribeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      toast.error('Please consent to the privacy policy and terms.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubscribed(true)
        toast.success('Almost there! Please check your email to confirm your subscription.')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubscribed) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Check Your Email!</h3>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation email to <strong>{formData.email}</strong>. 
            Please click the confirmation link to complete your subscription.
          </p>
          <div className="space-y-2 text-sm text-left max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Confirmation email sent</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Check your spam folder if needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Link expires in 24 hours</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Subscribe to Our Newsletter</CardTitle>
        <CardDescription>
          Get weekly robotics insights, research highlights, and exclusive content delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                placeholder="e.g., Robotics Engineer, Researcher"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="text"
                placeholder="Your company or organization"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => handleInputChange('consent', checked)}
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="text-sm font-normal">
                  I agree to receive the EAR Lab newsletter and understand I can unsubscribe at any time.
                </Label>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Read our{' '}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>{' '}
                  and{' '}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe to Newsletter
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="border-t pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Mail className="w-4 h-4" />
            <span>What you'll receive:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Weekly</Badge>
              <span className="text-sm">Research highlights</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Weekly</Badge>
              <span className="text-sm">Technical tutorials</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Monthly</Badge>
              <span className="text-sm">Case studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Special</Badge>
              <span className="text-sm">Event announcements</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}