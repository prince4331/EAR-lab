'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2 } from 'lucide-react'
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
      case 'embedded':
        return 'bg-electric-blue/20 text-electric-blue'
      case 'autonomy':
        return 'bg-cyber-teal/20 text-cyber-teal'
      case 'sensors':
        return 'bg-lime-green/20 text-lime-green'
      case 'power':
        return 'bg-red-neon/20 text-red-neon'
      default:
        return 'bg-white/10 text-white/80'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <p className="text-white/70">Manage your project portfolio</p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#0f82fe] to-[#00c2a8] btn-glow"
          onClick={() =>
            toast({
              title: 'Coming Soon',
              description: 'Project creation form will be available soon',
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card className="glass-card border border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse border border-white/10 rounded-lg p-4 bg-white/5">
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-white/70 text-center py-8">
              No projects yet. Create your first project!
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold truncate text-white">{project.title}</h3>
                        <Badge className={getCategoryColor(project.category)}>
                          {project.category}
                        </Badge>
                        <Badge variant={project.isPublic ? 'default' : 'secondary'}>
                          {project.isPublic ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
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
