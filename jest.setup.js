// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variables
process.env.DATABASE_URL = 'file:./test.db'
process.env.SMTP_HOST = 'smtp.test.com'
process.env.SMTP_PORT = '587'
process.env.SMTP_USER = 'test@example.com'
process.env.SMTP_PASSWORD = 'test-password'
process.env.SMTP_FROM_EMAIL = 'noreply@test.com'
process.env.SMTP_FROM_NAME = 'Test'
process.env.NEWSLETTER_SECRET = 'test-secret-key-for-newsletter-tokens'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
