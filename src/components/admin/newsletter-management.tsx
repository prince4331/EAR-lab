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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Subscribers</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your newsletter subscriber list
          </p>
        </div>
        <Button onClick={exportToCSV} disabled={subscribers.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{verifiedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Unverified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {subscribers.length - verifiedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">All Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              {searchTerm ? 'No subscribers found matching your search' : 'No newsletter subscribers yet'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium truncate text-gray-900 dark:text-white">{subscriber.email}</span>
                        {subscriber.isVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
