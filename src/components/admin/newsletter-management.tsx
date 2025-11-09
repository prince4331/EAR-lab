'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Mail, Trash2, Download, Search, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Subscriber {
  id: string
  email: string
  name: string | null
  role: string | null
  company: string | null
  isVerified: boolean
  subscribedAt: string
  source: string
}

export function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/subscribers')
      
      if (!response.ok) throw new Error('Failed to fetch subscribers')
      
      const data = await response.json()
      setSubscribers(data.subscribers)
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      toast({
        title: 'Error',
        description: 'Failed to load subscribers',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return

    try {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete subscriber')

      toast({
        title: 'Success',
        description: 'Subscriber removed successfully',
      })

      fetchSubscribers()
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      toast({
        title: 'Error',
        description: 'Failed to remove subscriber',
        variant: 'destructive',
      })
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Role', 'Company', 'Verified', 'Subscribed Date', 'Source']
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      sub.name || '',
      sub.role || '',
      sub.company || '',
      sub.isVerified ? 'Yes' : 'No',
      new Date(sub.subscribedAt).toLocaleDateString(),
      sub.source,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'Subscribers exported to CSV',
    })
  }

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const verifiedCount = subscribers.filter(s => s.isVerified).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Newsletter Subscribers</h2>
          <p className="text-white/70">
            Manage your newsletter subscriber list
          </p>
        </div>
        <Button onClick={exportToCSV} disabled={subscribers.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="admin-card border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card className="admin-card border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyber-teal">{verifiedCount}</div>
          </CardContent>
        </Card>
        <Card className="admin-card border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Unverified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-neon">
              {subscribers.length - verifiedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
        <Input
          placeholder="Search subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card className="admin-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">All Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="h-6 w-3/4 rounded-full bg-white/15 mb-2" />
                  <div className="h-4 w-1/2 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <p className="text-white/70 text-center py-8">
              {searchTerm ? 'No subscribers found matching your search' : 'No newsletter subscribers yet'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur-xl transition hover:border-electric-blue/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-white/60 flex-shrink-0" />
                        <span className="font-medium truncate text-white">{subscriber.email}</span>
                        {subscriber.isVerified ? (
                          <CheckCircle className="w-4 h-4 text-cyber-teal flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-neon flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                        {subscriber.name && <span>{subscriber.name}</span>}
                        {subscriber.role && (
                          <>
                            {subscriber.name && <span>•</span>}
                            <span>{subscriber.role}</span>
                          </>
                        )}
                        {subscriber.company && (
                          <>
                            <span>•</span>
                            <span>{subscriber.company}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{new Date(subscriber.subscribedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {subscriber.source}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(subscriber.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

