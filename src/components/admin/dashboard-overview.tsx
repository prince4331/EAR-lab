'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, FolderKanban, Mail, Users } from 'lucide-react'

export function DashboardOverview() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/stats')
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      
      const data = await response.json()
      setStats(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchStats}>Retry</Button>
      </div>
    )
  }

  const statCards = stats ? [
    {
      title: 'Blog Posts',
      value: stats.stats.blogPosts.total,
      subtitle: `${stats.stats.blogPosts.published} published`,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Projects',
      value: stats.stats.projects.total,
      subtitle: `${stats.stats.projects.public} public`,
      icon: FolderKanban,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Contacts',
      value: stats.stats.contacts.total,
      subtitle: `${stats.stats.contacts.new} new`,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Subscribers',
      value: stats.stats.subscribers.total,
      subtitle: `${stats.stats.subscribers.verified} verified`,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ] : []

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {!stats || stats.recentActivity.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.type === 'contact' ? 'bg-green-500' :
                    activity.type === 'subscriber' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatTimestamp(activity.timestamp)}
                    </p>
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
