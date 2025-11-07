import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all stats in parallel
    const [
      totalBlogPosts,
      publishedBlogPosts,
      totalProjects,
      publicProjects,
      totalContacts,
      newContacts,
      totalSubscribers,
      verifiedSubscribers,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.project.count(),
      prisma.project.count({ where: { isPublic: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'new' } }),
      prisma.newsletterSubscriber.count(),
      prisma.newsletterSubscriber.count({ where: { isVerified: true } }),
    ])

    // Get recent activity
    const recentContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    const recentSubscribers = await prisma.newsletterSubscriber.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    const recentBlogPosts = await prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      stats: {
        blogPosts: { total: totalBlogPosts, published: publishedBlogPosts },
        projects: { total: totalProjects, public: publicProjects },
        contacts: { total: totalContacts, new: newContacts },
        subscribers: { total: totalSubscribers, verified: verifiedSubscribers },
      },
      recentActivity: [
        ...recentContacts.map(c => ({
          id: c.id,
          type: 'contact',
          description: `New contact from ${c.name}`,
          email: c.email,
          timestamp: c.createdAt,
        })),
        ...recentSubscribers.map(s => ({
          id: s.id,
          type: 'subscriber',
          description: `New subscriber: ${s.email}`,
          email: s.email,
          timestamp: s.createdAt,
        })),
        ...recentBlogPosts.map(b => ({
          id: b.id,
          type: 'blog',
          description: `Blog post "${b.title}" - ${b.status}`,
          timestamp: b.createdAt,
        })),
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10),
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
