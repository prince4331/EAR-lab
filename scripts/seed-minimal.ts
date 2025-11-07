import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.user.deleteMany()

  // Create admin user
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@earlab.com',
      name: 'Admin User',
      hashedPassword: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create regular user
  const user = await prisma.user.create({
    data: {
      email: 'researcher@earlab.com',
      name: 'Research Lead',
      hashedPassword: await bcrypt.hash('researcher123', 10),
      role: 'user',
    },
  })
  console.log('✅ Regular user created:', user.email)

  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log('- Admin user: admin@earlab.com / admin123')
  console.log('- Regular user: researcher@earlab.com / researcher123')
  console.log('\n👉 You can now log in to the admin dashboard at /admin/login')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
