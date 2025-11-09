import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = category ? { category } : {}

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ])

    return NextResponse.json({
      projects: projects.map(project => ({
        ...project,
        techTags: JSON.parse(project.techTags),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      slug,
      summary,
      contentMarkdown,
      techTags,
      featuredImage,
      startDate,
      endDate,
      clientName,
      isPublic,
      category,
    } = body

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        summary,
        contentMarkdown,
        techTags: JSON.stringify(techTags || []),
        featuredImage,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        clientName,
        isPublic: isPublic !== undefined ? isPublic : true,
        category,
      },
    })

    return NextResponse.json({
      ...project,
      techTags: JSON.parse(project.techTags),
    }, { status: 201 })
  } catch (error) {
    console.error('Project create error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
