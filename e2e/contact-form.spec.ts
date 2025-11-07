import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should display contact form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible()
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/subject/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Check for validation messages
    await expect(page.getByText(/name.*required/i)).toBeVisible()
    await expect(page.getByText(/email.*required/i)).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/name/i).click() // Trigger blur

    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('should submit contact form successfully', async ({ page }) => {
    // Fill out the form
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/subject/i).fill('Project Inquiry')
    await page.getByLabel(/message/i).fill('I would like to discuss a robotics project with your team.')

    // Submit the form
    const submitButton = page.getByRole('button', { name: /submit|send/i })
    await submitButton.click()

    // Wait for success message
    await expect(page.getByText(/success|thank you|received/i)).toBeVisible({ timeout: 10000 })
  })

  test('should handle rate limiting', async ({ page }) => {
    // Submit multiple times quickly
    for (let i = 0; i < 6; i++) {
      await page.getByLabel(/name/i).fill(`User ${i}`)
      await page.getByLabel(/email/i).fill(`user${i}@example.com`)
      await page.getByLabel(/subject/i).fill('Test')
      await page.getByLabel(/message/i).fill('Test message')
      
      const submitButton = page.getByRole('button', { name: /submit|send/i })
      await submitButton.click()
      
      if (i < 5) {
        await page.waitForTimeout(500)
      }
    }

    // Should see rate limit message
    await expect(page.getByText(/too many|rate limit|slow down/i)).toBeVisible({ timeout: 5000 })
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper ARIA labels
    await expect(page.getByLabel(/name/i)).toHaveAttribute('aria-required', 'true')
    await expect(page.getByLabel(/email/i)).toHaveAttribute('aria-required', 'true')

    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await expect(page.getByLabel(/name/i)).toBeFocused()
  })

  test('should display contact information', async ({ page }) => {
    // Check for contact details
    await expect(page.getByText(/email/i).first()).toBeVisible()
    await expect(page.getByText(/@/)).toBeVisible() // Email address
  })
})
