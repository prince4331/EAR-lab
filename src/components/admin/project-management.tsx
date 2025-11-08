'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Project {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  techTags: string[]
  isPublic: boolean
  startDate: string
  endDate: string | null
  clientName: string | null
  createdAt: string
}

export function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/projects')
      
      if (!response.ok) throw new Error('Failed to fetch projects')
      
      const data = await response.json()
      setProjects(data.projects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete project')

      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      })

      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'embedded': return 'bg-blue-100 text-blue-800'
      case 'autonomy': return 'bg-purple-100 text-purple-800'
      case 'sensors': return 'bg-green-100 text-green-800'
      case 'power': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your project portfolio
          </p>
        </div>
        <Button onClick={() => toast({
          title: 'Coming Soon',
          description: 'Project creation form will be available soon',
        })}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">All Projects ({projects.length})</CardTitle>
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
          ) : projects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No projects yet. Create your first project!
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white">{project.title}</h3>
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category}
                        </Badge>
                        <Badge variant={project.isPublic ? 'default' : 'secondary'}>
                          {project.isPublic ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                        {project.endDate && (
                          <>
                            <span>•</span>
                            <span>Ended: {new Date(project.endDate).toLocaleDateString()}</span>
                          </>
                        )}
                        {project.clientName && (
                          <>
                            <span>•</span>
                            <span>Client: {project.clientName}</span>
                          </>
                        )}
                        {project.techTags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {project.techTags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {project.techTags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{project.techTags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({
                          title: 'Coming Soon',
                          description: 'Project editing will be available soon',
                        })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
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
