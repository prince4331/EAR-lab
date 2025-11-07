import { EmailService } from '../email.service'
import nodemailer from 'nodemailer'

// Mock nodemailer
jest.mock('nodemailer')

describe('EmailService', () => {
  let emailService: EmailService
  let mockSendMail: jest.Mock

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Create mock sendMail function
    mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' })

    // Mock createTransport to return a transporter with our mock sendMail
    ;(nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    })

    emailService = new EmailService()
  })

  describe('sendEmail', () => {
    it('should send email with correct parameters', async () => {
      const emailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test content</p>',
      }

      const result = await emailService.sendEmail(emailOptions)

      expect(mockSendMail).toHaveBeenCalledWith({
        from: expect.any(String),
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test content</p>',
      })
      expect(result).toEqual({ messageId: 'test-message-id' })
    })

    it('should throw error when email sending fails', async () => {
      mockSendMail.mockRejectedValueOnce(new Error('SMTP error'))

      await expect(
        emailService.sendEmail({
          to: 'test@example.com',
          subject: 'Test',
          html: '<p>Test</p>',
        })
      ).rejects.toThrow('SMTP error')
    })
  })

  describe('sendContactNotification', () => {
    it('should send contact notification email', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I would like to discuss a project.',
      }

      await emailService.sendContactNotification(contactData)

      expect(mockSendMail).toHaveBeenCalledTimes(1)
      const callArgs = mockSendMail.mock.calls[0][0]
      
      expect(callArgs.subject).toContain('New Contact Form Submission')
      expect(callArgs.html).toContain('John Doe')
      expect(callArgs.html).toContain('john@example.com')
      expect(callArgs.html).toContain('Project Inquiry')
    })
  })

  describe('sendContactConfirmation', () => {
    it('should send confirmation email to contact', async () => {
      await emailService.sendContactConfirmation(
        'john@example.com',
        'John Doe'
      )

      expect(mockSendMail).toHaveBeenCalledTimes(1)
      const callArgs = mockSendMail.mock.calls[0][0]
      
      expect(callArgs.to).toBe('john@example.com')
      expect(callArgs.subject).toContain('received your message')
      expect(callArgs.html).toContain('John Doe')
    })
  })

  describe('sendNewsletterVerification', () => {
    it('should send newsletter verification email with token', async () => {
      const token = 'test-verification-token'
      
      await emailService.sendNewsletterVerification(
        'subscriber@example.com',
        token
      )

      expect(mockSendMail).toHaveBeenCalledTimes(1)
      const callArgs = mockSendMail.mock.calls[0][0]
      
      expect(callArgs.to).toBe('subscriber@example.com')
      expect(callArgs.subject).toContain('Confirm')
      expect(callArgs.html).toContain(token)
      expect(callArgs.html).toContain('/newsletter/verify')
    })
  })

  describe('sendNewsletterWelcome', () => {
    it('should send welcome email to verified subscriber', async () => {
      await emailService.sendNewsletterWelcome('subscriber@example.com')

      expect(mockSendMail).toHaveBeenCalledTimes(1)
      const callArgs = mockSendMail.mock.calls[0][0]
      
      expect(callArgs.to).toBe('subscriber@example.com')
      expect(callArgs.subject).toContain('Welcome')
      expect(callArgs.html).toContain('subscribed')
    })
  })
})
