import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Clock, Users, Award } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card className="glass-card border border-white/15 bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2 text-white">
            <Mail className="w-5 h-5 text-cyber-teal" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white/60" />
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="text-sm text-white/70">hello@earlab.tech</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/60" />
              <div>
                <p className="font-medium text-white">Phone</p>
                <p className="text-sm text-white/70">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/60" />
              <div>
                <p className="font-medium text-white">Office</p>
                <p className="text-sm text-white/70">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="glass-card border border-white/15 bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyber-teal" />
            Response Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Initial Response</span>
              <Badge className="bg-white/10 text-white border-white/20">2 business days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Project Proposal</span>
              <Badge className="bg-white/10 text-white border-white/20">3-5 business days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Emergency Support</span>
              <Badge className="bg-red-neon/20 text-red-neon border border-red-neon/40">24/7 for clients</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Work With Us */}
      <Card className="glass-card border border-white/15 bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-teal" />
            Why Work With Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Expert Team</p>
                <p className="text-xs text-white/70">
                  PhD-level engineers with industry experience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Proven Track Record</p>
                <p className="text-xs text-white/70">
                  50+ successful projects across industries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Fast Delivery</p>
                <p className="text-xs text-white/70">
                  Agile development with rapid iterations
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Office Hours */}
      <Card className="glass-card border border-white/15 bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="font-heading">Office Hours</CardTitle>
          <CardDescription className="text-white/70">
            We're available to discuss your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-white/75">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span className="font-medium">9:00 AM - 6:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span className="font-medium">10:00 AM - 2:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span className="text-white/50">Closed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
