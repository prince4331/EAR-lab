'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { Plus, Edit, Trash2, Search } from 'lucide-react'
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

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  contentMarkdown: '',
  tags: '',
  status: 'draft',
  readingTime: 5,
  featuredImage: '',
}

const statusBadge: Record<string, string> = {
  published: 'bg-electric-blue/25 text-electric-blue border-transparent',
  draft: 'bg-white/10 text-white/80 border-white/20',
}

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()
  const [formData, setFormData] = useState(emptyForm)

  const inputClasses =
    'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white/40'
  const textareaClasses = `${inputClasses} min-h-[140px] resize-y`

  useEffect(() => {
    fetchPosts()
  }, [statusFilter])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const url =
        statusFilter === 'all'
          ? '/api/admin/blog'
          : `/api/admin/blog?status=${statusFilter}`

      const response = await fetch(url, {
        cache: 'no-store',
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to fetch posts')

      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: 'Unable to load posts',
        description:
          'We could not reach the blog API. Please refresh or verify your admin session.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingPost(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      const slug =
        formData.slug ||
        formData.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')

      const payload = {
        ...formData,
        slug,
        tags: tagsArray,
      }

      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog'
      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to save post')

      toast({
        title: editingPost ? 'Post updated' : 'Post created',
        description: editingPost
          ? 'The blog post has been updated successfully.'
          : 'Your blog post is ready. Publish it when you are satisfied.',
      })

      setDialogOpen(false)
      resetForm()
      fetchPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: 'Unable to save',
        description: 'Double‑check your content and try again.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      toast({
        title: 'Post removed',
        description: 'The blog post has been deleted.',
      })

      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Unable to delete',
        description: 'Please try again in a moment.',
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

  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.slug.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))

      return matchesSearch
    })
  }, [posts, searchTerm])

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 animate-pulse space-y-3"
        >
          <div className="h-5 w-2/3 rounded-full bg-white/10" />
          <div className="h-4 w-1/3 rounded-full bg-white/10" />
          <div className="h-4 w-full rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-heading font-semibold text-white">Blog</h2>
          <p className="text-white/70">Create, edit, and publish new research notes.</p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-electric-blue to-cyber-teal text-white btn-glow">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="dialog-surface max-h-[90vh] overflow-y-auto border-white/15 text-white">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit post' : 'Create post'}</DialogTitle>
              <DialogDescription>
                {editingPost
                  ? 'Update the content and save to refresh the live post.'
                  : 'Fill out the post details and publish when ready.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    className={inputClasses}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="slug">Slug (optional)</Label>
                  <Input
                    id="slug"
                    className={inputClasses}
                    value={formData.slug}
                    placeholder="auto-generated-from-title"
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    className={textareaClasses}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    className={textareaClasses}
                    value={formData.contentMarkdown}
                    onChange={(e) => setFormData({ ...formData, contentMarkdown: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    className={inputClasses}
                    placeholder="robotics, autonomy"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="readingTime">Reading time (minutes)</Label>
                  <Input
                    id="readingTime"
                    type="number"
                    min={1}
                    className={inputClasses}
                    value={formData.readingTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readingTime: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dialog-surface border-white/15 text-white">
                      <SelectItem value="draft" className="text-white data-[state=checked]:bg-white/10">
                        Draft
                      </SelectItem>
                      <SelectItem
                        value="published"
                        className="text-white data-[state=checked]:bg-white/10"
                      >
                        Published
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="featuredImage">Featured image URL</Label>
                  <Input
                    id="featuredImage"
                    className={inputClasses}
                    placeholder="/blog/autonomy-lab.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      setFormData({ ...formData, featuredImage: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter className="pt-2">
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? 'Save changes' : 'Create post'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            placeholder="Search by title, slug, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputClasses} pl-10`}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-full lg:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="dialog-surface border-white/15 text-white">
            <SelectItem value="all" className="text-white">
              All posts
            </SelectItem>
            <SelectItem value="published" className="text-white">
              Published
            </SelectItem>
            <SelectItem value="draft" className="text-white">
              Draft
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="admin-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">
            {loading ? 'Loading posts' : `Posts (${filteredPosts.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading
            ? renderSkeleton()
            : filteredPosts.length === 0
            ? (
              <p className="text-center text-white/70 py-8">
                No posts match your filters. Create a new article to get started.
              </p>
              )
            : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-electric-blue/40"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                          <Badge className={statusBadge[post.status] ?? statusBadge.draft}>
                            {post.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                            {post.readingTime} min read
                          </Badge>
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-white/70 line-clamp-2">{post.excerpt}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                          <span>{post.author.name || post.author.email}</span>
                          <span aria-hidden="true">&bull;</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          {post.tags.length > 0 && (
                            <>
                              <span aria-hidden="true">&bull;</span>
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-[11px] bg-white/10">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-[11px] bg-white/10">
                                    +{post.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                          <Edit className="w-4 h-4" />
                          <span className="sr-only">Edit {post.title}</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                          <span className="sr-only">Delete {post.title}</span>
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
