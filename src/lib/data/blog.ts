import { prisma } from '@/lib/db'
import { BlogPostRecord } from '@/types/blog'

function mapBlogPost(post: any): BlogPostRecord {
  const tags = JSON.parse(post.tags || '[]')
  const inferredCategory =
    (typeof post.category === 'string' && post.category) ||
    (Array.isArray(tags) && tags.length > 0 ? tags[0]?.toLowerCase() : null)

  return {
    ...post,
    tags,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    category: inferredCategory,
    author: post.author
      ? {
          id: post.author.id,
          name: post.author.name,
          email: post.author.email,
        }
      : null,
  }
}

export async function getPublishedBlogPosts(limit?: number) {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: limit,
  })

  return posts.map(mapBlogPost)
}
