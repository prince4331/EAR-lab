'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Building, Calendar, Trash2, ExternalLink } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Contact {
  id: string
  name: string
  email: string
  company: string | null
  projectDescription: string
  budgetRange: string | null
  timeline: string | null
  fileUrl: string | null
  status: string
  createdAt: string
}

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const { toast } = useToast()

  useEffect(() => {
    fetchContacts()
  }, [statusFilter])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const url = statusFilter === 'all'
        ? '/api/admin/contacts'
        : `/api/admin/contacts?status=${statusFilter}`

      const response = await fetch(url)
      
      if (!response.ok) throw new Error('Failed to fetch contacts')
      
      const data = await response.json()
      setContacts(data.contacts)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load contacts',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast({
        title: 'Success',
        description: 'Contact status updated',
      })

      fetchContacts()
    } catch (error) {
      console.error('Error updating contact:', error)
      toast({
        title: 'Error',
        description: 'Failed to update contact status',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete contact')

      toast({
        title: 'Success',
        description: 'Contact deleted successfully',
      })

      fetchContacts()
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete contact',
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-purple-100 text-purple-800'
      case 'closed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Submissions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage contact form submissions
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Recent Contacts ({contacts.length})</CardTitle>
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
          ) : contacts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No contact submissions yet
            </p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="hover:underline">
                            {contact.email}
                          </a>
                        </div>
                        {contact.company && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <span>{contact.company}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={contact.status}
                        onValueChange={(value) => updateStatus(contact.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium mb-1 text-gray-900 dark:text-white">Project Description:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.projectDescription}
                    </p>
                    {(contact.budgetRange || contact.timeline) && (
                      <div className="flex gap-4 mt-2 text-sm">
                        {contact.budgetRange && (
                          <span className="text-gray-600 dark:text-gray-400">
                            Budget: <span className="font-medium text-gray-900 dark:text-white">{contact.budgetRange}</span>
                          </span>
                        )}
                        {contact.timeline && (
                          <span className="text-gray-600 dark:text-gray-400">
                            Timeline: <span className="font-medium text-gray-900 dark:text-white">{contact.timeline}</span>
                          </span>
                        )}
                      </div>
                    )}
                    {contact.fileUrl && (
                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto" asChild>
                        <a href={contact.fileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Attached File
                        </a>
                      </Button>
                    )}
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
