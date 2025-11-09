export type BlogAuthor = {
  id: string
  name: string | null
  email: string
}

export type BlogPostRecord = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  contentMarkdown: string
  tags: string[]
  status: 'draft' | 'published'
  readingTime: number
  featuredImage: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: BlogAuthor | null
  category?: string | null
}
