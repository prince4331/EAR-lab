/**
 * Blog Service
 * Handles blog post operations, publishing, and queries
 */

import { prisma } from '@/lib/db';

export interface BlogPostData {
  title: string;
  slug: string;
  excerpt?: string;
  contentMarkdown: string;
  tags?: string[];
  status?: 'draft' | 'published';
  readingTime?: number;
  featuredImage?: string;
  publishedAt?: Date;
  authorId: string;
}

export interface BlogPostFilters {
  status?: 'draft' | 'published';
  tag?: string;
  authorId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

class BlogService {
  /**
   * Create a new blog post
   */
  async createPost(data: BlogPostData) {
    try {
      // Calculate reading time if not provided
      const readingTime = data.readingTime || this.calculateReadingTime(data.contentMarkdown);

      const post = await prisma.blogPost.create({
        data: {
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          contentMarkdown: data.contentMarkdown,
          tags: JSON.stringify(data.tags || []),
          status: data.status || 'draft',
          readingTime,
          featuredImage: data.featuredImage,
          publishedAt: data.status === 'published' ? (data.publishedAt || new Date()) : null,
          authorId: data.authorId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return { success: true, post };
    } catch (error) {
      console.error('Error creating blog post:', error);
      return { success: false, error: 'Failed to create blog post' };
    }
  }

  /**
   * Update blog post
   */
  async updatePost(id: string, data: Partial<BlogPostData>) {
    try {
      const updateData: any = { ...data };

      // Recalculate reading time if content changed
      if (data.contentMarkdown) {
        updateData.readingTime = this.calculateReadingTime(data.contentMarkdown);
      }

      // Convert tags array to JSON string
      if (data.tags) {
        updateData.tags = JSON.stringify(data.tags);
      }

      // Set publishedAt when publishing
      if (data.status === 'published' && !data.publishedAt) {
        const existingPost = await prisma.blogPost.findUnique({ where: { id } });
        if (existingPost && !existingPost.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }

      const post = await prisma.blogPost.update({
        where: { id },
        data: updateData,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return { success: true, post };
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { success: false, error: 'Failed to update blog post' };
    }
  }

  /**
   * Delete blog post
   */
  async deletePost(id: string) {
    try {
      await prisma.blogPost.delete({
        where: { id },
      });

      return { success: true };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: 'Failed to delete blog post' };
    }
  }

  /**
   * Get blog post by ID
   */
  async getPostById(id: string) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (post) {
        return {
          ...post,
          tags: JSON.parse(post.tags),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Get blog post by slug
   */
  async getPostBySlug(slug: string) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (post) {
        return {
          ...post,
          tags: JSON.parse(post.tags),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  /**
   * Get all blog posts with filters
   */
  async getPosts(filters?: BlogPostFilters) {
    try {
      const where: any = {};

      if (filters?.status) {
        where.status = filters.status;
      }

      if (filters?.authorId) {
        where.authorId = filters.authorId;
      }

      if (filters?.tag) {
        where.tags = {
          contains: filters.tag,
        };
      }

      if (filters?.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { excerpt: { contains: filters.search, mode: 'insensitive' } },
          { contentMarkdown: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { publishedAt: 'desc' },
          take: filters?.limit || 50,
          skip: filters?.offset || 0,
        }),
        prisma.blogPost.count({ where }),
      ]);

      // Parse tags JSON for each post
      const postsWithParsedTags = posts.map(post => ({
        ...post,
        tags: JSON.parse(post.tags),
      }));

      return { posts: postsWithParsedTags, total };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { posts: [], total: 0 };
    }
  }

  /**
   * Get published posts (public API)
   */
  async getPublishedPosts(filters?: {
    tag?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.getPosts({
      ...filters,
      status: 'published',
    });
  }

  /**
   * Get latest published posts
   */
  async getLatestPosts(limit: number = 3) {
    const { posts } = await this.getPublishedPosts({ limit });
    return posts;
  }

  /**
   * Get all tags
   */
  async getAllTags(): Promise<string[]> {
    try {
      const posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: { tags: true },
      });

      const tagsSet = new Set<string>();
      posts.forEach(post => {
        const tags = JSON.parse(post.tags);
        tags.forEach((tag: string) => tagsSet.add(tag));
      });

      return Array.from(tagsSet).sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  /**
   * Get related posts
   */
  async getRelatedPosts(postId: string, limit: number = 3) {
    try {
      const post = await this.getPostById(postId);
      if (!post) return [];

      const tags = JSON.parse(post.tags);

      const relatedPosts = await prisma.blogPost.findMany({
        where: {
          AND: [
            { id: { not: postId } },
            { status: 'published' },
            {
              OR: tags.map((tag: string) => ({
                tags: { contains: tag },
              })),
            },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
      });

      return relatedPosts.map(p => ({
        ...p,
        tags: JSON.parse(p.tags),
      }));
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  /**
   * Calculate reading time (words per minute)
   */
  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, minutes);
  }

  /**
   * Generate slug from title
   */
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Check if slug is unique
   */
  async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    try {
      const where: any = { slug };
      if (excludeId) {
        where.id = { not: excludeId };
      }

      const existing = await prisma.blogPost.findFirst({ where });
      return !existing;
    } catch (error) {
      console.error('Error checking slug uniqueness:', error);
      return false;
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();
