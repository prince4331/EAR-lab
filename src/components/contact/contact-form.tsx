'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

const selectContentClass =
  'bg-[#050b18] border border-white/20 text-white shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-xl'
const selectItemClass =
  'text-white data-[state=checked]:bg-white/10 data-[state=checked]:text-cyber-teal focus:bg-white/10 focus:text-white'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectDescription: '',
    budgetRange: '',
    timeline: '',
    serviceType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Message sent successfully! We\'ll respond within 2 business days.')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full glass-card border border-white/15 bg-white/5 text-white">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h3 className="font-heading text-2xl font-semibold mb-2">Thank You!</h3>
          <p className="text-white/70 mb-6">
            Your message has been sent successfully. Our team will review your project requirements and get back to you within 2 business days.
          </p>
          <div className="space-y-2 text-sm text-left max-w-md mx-auto text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Message received and logged in our system</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Team notification sent</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Expected response: 2 business days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full glass-card border border-white/15 bg-white/5 text-white">
      <CardHeader>
        <CardTitle className="font-heading text-white">Send Us a Message</CardTitle>
        <CardDescription className="text-white/70">
          Fill out the form below and we'll get back to you within 2 business days.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/80">Company</Label>
              <Input
                id="company"
                type="text"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-white/80">Service Type</Label>
              <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="consultation" className={selectItemClass}>Initial Consultation</SelectItem>
                  <SelectItem value="development" className={selectItemClass}>Full Development</SelectItem>
                  <SelectItem value="research" className={selectItemClass}>Research Project</SelectItem>
                  <SelectItem value="mentoring" className={selectItemClass}>Mentoring & Training</SelectItem>
                  <SelectItem value="other" className={selectItemClass}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="text-white/80">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="under-25k" className={selectItemClass}>Under $25,000</SelectItem>
                  <SelectItem value="25k-75k" className={selectItemClass}>$25,000 - $75,000</SelectItem>
                  <SelectItem value="75k-150k" className={selectItemClass}>$75,000 - $150,000</SelectItem>
                  <SelectItem value="150k-plus" className={selectItemClass}>$150,000+</SelectItem>
                  <SelectItem value="discuss" className={selectItemClass}>To be discussed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-white/80">Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="asap" className={selectItemClass}>ASAP</SelectItem>
                  <SelectItem value="1-3-months" className={selectItemClass}>1-3 months</SelectItem>
                  <SelectItem value="3-6-months" className={selectItemClass}>3-6 months</SelectItem>
                  <SelectItem value="6-12-months" className={selectItemClass}>6-12 months</SelectItem>
                  <SelectItem value="flexible" className={selectItemClass}>Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-white/80">Project Description *</Label>
            <Textarea
              id="projectDescription"
              placeholder="Tell us about your project, requirements, and what you're trying to achieve..."
              className="min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-white/50"
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <AlertCircle className="w-4 h-4" />
            <span>All fields marked with * are required</span>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="border-t border-white/15 pt-6">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Upload className="w-4 h-4" />
            <span>Have files to share?</span>
          </div>
          <p className="text-sm text-white/70">
            After submitting this form, you'll receive a confirmation email with a secure link to upload any relevant files 
            (specifications, diagrams, requirements documents, etc.). Maximum file size: 10MB per file.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
