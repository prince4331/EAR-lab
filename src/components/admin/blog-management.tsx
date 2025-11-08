'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  contentMarkdown: string
  tags: string[]
  status: string
  readingTime: number
  featuredImage: string | null
  publishedAt: string | null
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
}

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    contentMarkdown: '',
    tags: '',
    status: 'draft',
    readingTime: 5,
    featuredImage: '',
  })

  useEffect(() => {
    fetchPosts()
  }, [statusFilter])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const url = statusFilter === 'all' 
        ? '/api/admin/blog'
        : `/api/admin/blog?status=${statusFilter}`
      
      const response = await fetch(url)
      
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load blog posts',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const payload = {
        ...formData,
        slug,
        tags: tagsArray,
      }

      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog'
      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save post')

      toast({
        title: 'Success',
        description: `Blog post ${editingPost ? 'updated' : 'created'} successfully`,
      })

      setDialogOpen(false)
      resetForm()
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: 'Error',
        description: 'Failed to save blog post',
        variant: 'destructive',
      })
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      contentMarkdown: post.contentMarkdown,
      tags: post.tags.join(', '),
      status: post.status,
      readingTime: post.readingTime,
      featuredImage: post.featuredImage || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      })

      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive',
      })
    }
  }

  const resetForm = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      contentMarkdown: '',
      tags: '',
      status: 'draft',
      readingTime: 5,
      featuredImage: '',
    })
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your blog content
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit' : 'Create'} Blog Post</DialogTitle>
              <DialogDescription>
                {editingPost ? 'Update the blog post details' : 'Add a new blog post to your site'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="leave-empty-for-auto"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="content">Content (Markdown) *</Label>
                  <Textarea
                    id="content"
                    value={formData.contentMarkdown}
                    onChange={(e) => setFormData({ ...formData, contentMarkdown: e.target.value })}
                    rows={8}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="robotics, AI, embedded"
                  />
                </div>
                <div>
                  <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                  <Input
                    id="readingTime"
                    type="number"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? 'Update' : 'Create'} Post
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">All Blog Posts ({filteredPosts.length})</CardTitle>
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
          ) : filteredPosts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No blog posts found. Create your first post!
            </p>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white">{post.title}</h3>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span>By {post.author.name || post.author.email}</span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {post.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
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
