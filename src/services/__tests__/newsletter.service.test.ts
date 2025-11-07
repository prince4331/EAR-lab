import { NewsletterService } from '../newsletter.service'
import { prisma } from '@/lib/db'
import { EmailService } from '../email.service'

// Mock dependencies
jest.mock('@/lib/db', () => ({
  prisma: {
    newsletterSubscriber: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

jest.mock('../email.service')

describe('NewsletterService', () => {
  let newsletterService: NewsletterService
  let mockEmailService: jest.Mocked<EmailService>

  beforeEach(() => {
    jest.clearAllMocks()
    mockEmailService = new EmailService() as jest.Mocked<EmailService>
    newsletterService = new NewsletterService()
  })

  describe('subscribe', () => {
    it('should create new subscriber and send verification email', async () => {
      const email = 'newuser@example.com'
      
      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.newsletterSubscriber.create as jest.Mock).mockResolvedValue({
        id: '1',
        email,
        status: 'PENDING',
        verificationToken: 'token',
        createdAt: new Date(),
      })

      const result = await newsletterService.subscribe(email)

      expect(prisma.newsletterSubscriber.create).toHaveBeenCalledWith({
        data: {
          email,
          status: 'PENDING',
          verificationToken: expect.any(String),
          verificationTokenExpiry: expect.any(Date),
        },
      })
      expect(result.status).toBe('PENDING')
    })

    it('should return existing subscriber if already exists', async () => {
      const existingSubscriber = {
        id: '1',
        email: 'existing@example.com',
        status: 'VERIFIED',
        verificationToken: null,
        verificationTokenExpiry: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(existingSubscriber)

      const result = await newsletterService.subscribe('existing@example.com')

      expect(result.status).toBe('VERIFIED')
      expect(prisma.newsletterSubscriber.create).not.toHaveBeenCalled()
    })

    it('should resend verification if subscriber is pending', async () => {
      const pendingSubscriber = {
        id: '1',
        email: 'pending@example.com',
        status: 'PENDING',
        verificationToken: 'old-token',
        verificationTokenExpiry: new Date(Date.now() - 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(pendingSubscriber)
      ;(prisma.newsletterSubscriber.update as jest.Mock).mockResolvedValue({
        ...pendingSubscriber,
        verificationToken: 'new-token',
      })

      const result = await newsletterService.subscribe('pending@example.com')

      expect(prisma.newsletterSubscriber.update).toHaveBeenCalled()
      expect(result.status).toBe('PENDING')
    })
  })

  describe('verify', () => {
    it('should verify subscriber with valid token', async () => {
      const subscriber = {
        id: '1',
        email: 'test@example.com',
        status: 'PENDING',
        verificationToken: 'valid-token',
        verificationTokenExpiry: new Date(Date.now() + 3600000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(subscriber)
      ;(prisma.newsletterSubscriber.update as jest.Mock).mockResolvedValue({
        ...subscriber,
        status: 'VERIFIED',
      })

      const result = await newsletterService.verify('valid-token')

      expect(result.success).toBe(true)
      expect(prisma.newsletterSubscriber.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          status: 'VERIFIED',
          verificationToken: null,
          verificationTokenExpiry: null,
        },
      })
    })

    it('should fail verification with invalid token', async () => {
      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await newsletterService.verify('invalid-token')

      expect(result.success).toBe(false)
      expect(result.message).toContain('Invalid')
    })

    it('should fail verification with expired token', async () => {
      const subscriber = {
        id: '1',
        email: 'test@example.com',
        status: 'PENDING',
        verificationToken: 'expired-token',
        verificationTokenExpiry: new Date(Date.now() - 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(subscriber)

      const result = await newsletterService.verify('expired-token')

      expect(result.success).toBe(false)
      expect(result.message).toContain('expired')
    })
  })

  describe('unsubscribe', () => {
    it('should unsubscribe user by email', async () => {
      const subscriber = {
        id: '1',
        email: 'test@example.com',
        status: 'VERIFIED',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(subscriber)
      ;(prisma.newsletterSubscriber.update as jest.Mock).mockResolvedValue({
        ...subscriber,
        status: 'UNSUBSCRIBED',
      })

      const result = await newsletterService.unsubscribe('test@example.com')

      expect(result.success).toBe(true)
      expect(prisma.newsletterSubscriber.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { status: 'UNSUBSCRIBED' },
      })
    })

    it('should return false if subscriber not found', async () => {
      ;(prisma.newsletterSubscriber.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await newsletterService.unsubscribe('notfound@example.com')

      expect(result.success).toBe(false)
    })
  })
})
