import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.auditLog.deleteMany()
  await prisma.caseStudy.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.newsletterSubscriber.deleteMany()
  await prisma.workshop.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@earlab.com',
      name: 'Admin User',
      hashedPassword: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create regular user
  const user = await prisma.user.create({
    data: {
      email: 'researcher@earlab.com',
      name: 'Research Lead',
      hashedPassword: await bcrypt.hash('researcher123', 10),
      role: 'USER',
    },
  })
  console.log('✅ Regular user created:', user.email)

  // Create blog posts
  console.log('📝 Creating blog posts...')
  const blogPost1 = await prisma.blogPost.create({
    data: {
      title: 'The Future of Autonomous Robotics',
      slug: 'future-of-autonomous-robotics',
      excerpt: 'Exploring the latest trends and innovations in autonomous robotics technology.',
      contentMarkdown: 'Autonomous robotics is rapidly evolving. This article explores the latest trends in AI, machine learning, and sensor fusion that are shaping the future of autonomous systems.',
      tags: JSON.stringify(['Robotics', 'AI', 'Autonomous Systems']),
      status: 'published',
      readingTime: 8,
      featuredImage: '/images/blog/autonomous-robotics.jpg',
      publishedAt: new Date('2024-01-15'),
      authorId: admin.id,
    },
  })
  console.log('✅ Blog post created:', blogPost1.title)

  const blogPost2 = await prisma.blogPost.create({
    data: {
      title: 'Introduction to Embedded Systems Programming',
      slug: 'intro-to-embedded-systems',
      excerpt: 'A comprehensive guide to getting started with embedded systems development.',
      contentMarkdown: 'Embedded systems power countless devices around us. Learn the fundamentals of programming microcontrollers, real-time operating systems, and hardware interfacing.',
      tags: JSON.stringify(['Embedded Systems', 'Programming', 'IoT']),
      status: 'published',
      readingTime: 12,
      featuredImage: '/images/blog/embedded-systems.jpg',
      publishedAt: new Date('2024-02-01'),
      authorId: user.id,
    },
  })
  console.log('✅ Blog post created:', blogPost2.title)

  // Create projects
  console.log('🚀 Creating projects...')
  const project1 = await prisma.project.create({
    data: {
      title: 'Autonomous Delivery Robot',
      slug: 'autonomous-delivery-robot',
      summary: 'AI-powered delivery robot for campus environments',
      contentMarkdown: 'Developed an autonomous delivery robot capable of navigating complex indoor and outdoor environments. Features include obstacle avoidance, path planning, and secure package handling.',
      category: 'autonomy',
      techTags: JSON.stringify(['ROS2', 'Python', 'LiDAR', 'Computer Vision']),
      featuredImage: '/images/projects/delivery-robot.jpg',
      isPublic: true,
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-01-15'),
      clientName: 'University Campus Services',
    },
  })
  console.log('✅ Project created:', project1.title)

  const project2 = await prisma.project.create({
    data: {
      title: 'IoT Environmental Monitoring System',
      slug: 'iot-environmental-monitoring',
      summary: 'Real-time environmental monitoring with edge computing',
      contentMarkdown: 'IoT system for monitoring air quality, temperature, and humidity across multiple locations. Features edge computing for data processing and predictive analytics.',
      category: 'embedded',
      techTags: JSON.stringify(['ESP32', 'LoRaWAN', 'TensorFlow Lite', 'Cloud']),
      featuredImage: '/images/projects/environmental-monitor.jpg',
      isPublic: true,
      startDate: new Date('2023-09-01'),
      clientName: 'Environmental Research Institute',
    },
  })
  console.log('✅ Project created:', project2.title)

  // Add case study for project
  await prisma.caseStudy.create({
    data: {
      projectId: project1.id,
      challenge: 'Deliver packages safely across a busy university campus',
      solutionApproach: 'Implemented advanced SLAM and multi-sensor fusion',
      results: 'Successfully delivered over 1000 packages with 99.8% success rate',
      impactMetrics: JSON.stringify({
        deliveries: 1000,
        successRate: 99.8,
        avgTime: 12,
      }),
    },
  })
  console.log('✅ Case study created')

  // Create workshops
  console.log('🎓 Creating workshops...')
  await prisma.workshop.create({
    data: {
      title: 'Introduction to ROS2',
      slug: 'intro-to-ros2',
      description: 'Learn the basics of Robot Operating System 2',
      startTime: new Date('2024-06-15T14:00:00'),
      endTime: new Date('2024-06-15T17:00:00'),
      location: 'EAR Lab - Room 301',
      maxParticipants: 30,
      isPublic: true,
    },
  })

  await prisma.workshop.create({
    data: {
      title: 'Embedded Systems with Arduino',
      slug: 'embedded-arduino',
      description: 'Hands-on workshop on Arduino programming and electronics',
      startTime: new Date('2024-07-20T10:00:00'),
      endTime: new Date('2024-07-20T12:00:00'),
      location: 'EAR Lab - Room 201',
      maxParticipants: 25,
      isPublic: true,
    },
  })
  console.log('✅ Workshops created')

  // Create newsletter subscribers
  console.log('📧 Creating newsletter subscribers...')
  await prisma.newsletterSubscriber.create({
    data: {
      email: 'subscriber1@example.com',
      status: 'ACTIVE',
    },
  })

  await prisma.newsletterSubscriber.create({
    data: {
      email: 'subscriber2@example.com',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Newsletter subscribers created')

  // Create sample contact
  console.log('📬 Creating sample contact...')
  await prisma.contact.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Collaboration Inquiry',
      message: 'I am interested in collaborating on a robotics project.',
      status: 'NEW',
    },
  })
  console.log('✅ Sample contact created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log('- 2 users created (admin@earlab.com / admin123)')
  console.log('- 2 blog posts published')
  console.log('- 2 projects with 1 case study')
  console.log('- 2 workshops scheduled')
  console.log('- 2 newsletter subscribers')
  console.log('- 1 contact submission')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
