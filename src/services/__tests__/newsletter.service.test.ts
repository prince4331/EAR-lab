import { NewsletterService } from '../newsletter.service'
import { prisma } from '@/lib/db'
import { emailService } from '../email.service'

jest.mock('@/lib/db', () => ({
  prisma: {
    newsletterSubscriber: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

jest.mock('../email.service', () => ({
  emailService: {
    sendNewsletterVerification: jest.fn(),
    sendNewsletterWelcome: jest.fn(),
  },
}))

const mockedPrisma = prisma.newsletterSubscriber as jest.Mocked<typeof prisma.newsletterSubscriber>
const mockedEmailService = emailService as jest.Mocked<typeof emailService>

describe('NewsletterService', () => {
  let newsletterService: NewsletterService

  beforeEach(() => {
    jest.clearAllMocks()
    newsletterService = new NewsletterService()
  })

  describe('subscribe', () => {
    it('should create new subscriber and send verification email', async () => {
      mockedPrisma.findUnique.mockResolvedValue(null as any)
      mockedPrisma.create.mockResolvedValue({
        id: '1',
        email: 'newuser@example.com',
        name: null,
        role: null,
        company: null,
        source: 'website',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)

      const result = await newsletterService.subscribe({ email: 'newuser@example.com' })

      expect(mockedPrisma.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          name: undefined,
          role: undefined,
          company: undefined,
          source: 'website',
          isVerified: false,
        },
      })
      expect(mockedEmailService.sendNewsletterVerification).toHaveBeenCalled()
      expect(result).toEqual(
        expect.objectContaining({ success: true, requiresVerification: true })
      )
    })

    it('should return message when subscriber already verified', async () => {
      mockedPrisma.findUnique.mockResolvedValue({
        email: 'existing@example.com',
        isVerified: true,
      } as any)

      const result = await newsletterService.subscribe({ email: 'existing@example.com' })

      expect(result.success).toBe(false)
      expect(result.requiresVerification).toBe(false)
      expect(result.message).toContain('already')
      expect(mockedPrisma.create).not.toHaveBeenCalled()
    })

    it('should resend verification for pending subscriber', async () => {
      mockedPrisma.findUnique.mockResolvedValue({
        email: 'pending@example.com',
        name: 'Pending User',
        isVerified: false,
      } as any)

      const result = await newsletterService.subscribe({ email: 'pending@example.com' })

      expect(mockedEmailService.sendNewsletterVerification).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'pending@example.com' })
      )
      expect(result.requiresVerification).toBe(true)
    })
  })

  describe('verify', () => {
    it('should verify subscriber with valid token', async () => {
      const verifySpy = jest
        .spyOn(newsletterService as any, 'verifyToken')
        .mockReturnValue('test@example.com')

      mockedPrisma.findUnique.mockResolvedValue({
        email: 'test@example.com',
        name: 'Test',
        isVerified: false,
      } as any)

      const result = await newsletterService.verify('valid-token')

      expect(result.success).toBe(true)
      expect(mockedPrisma.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { isVerified: true },
      })
      expect(mockedEmailService.sendNewsletterWelcome).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'test@example.com' })
      )

      verifySpy.mockRestore()
    })

    it('should fail verification with invalid token', async () => {
      jest.spyOn(newsletterService as any, 'verifyToken').mockReturnValue(null)

      const result = await newsletterService.verify('invalid-token')

      expect(result.success).toBe(false)
    })

    it('should fail verification when subscriber missing', async () => {
      jest.spyOn(newsletterService as any, 'verifyToken').mockReturnValue('missing@example.com')
      mockedPrisma.findUnique.mockResolvedValue(null as any)

      const result = await newsletterService.verify('missing-token')

      expect(result.success).toBe(false)
      expect(result.message).toContain('not found')
    })
  })

  describe('unsubscribe', () => {
    it('should unsubscribe user by email', async () => {
      mockedPrisma.findUnique.mockResolvedValue({
        email: 'test@example.com',
        isVerified: true,
      } as any)

      mockedPrisma.delete.mockResolvedValue({} as any)

      const result = await newsletterService.unsubscribe('test@example.com')

      expect(result.success).toBe(true)
      expect(mockedPrisma.delete).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      })
    })

    it('should return false if subscriber not found', async () => {
      mockedPrisma.findUnique.mockResolvedValue(null as any)

      const result = await newsletterService.unsubscribe('notfound@example.com')

      expect(result.success).toBe(false)
    })
  })
})
