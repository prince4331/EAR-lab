import { test, expect } from '@playwright/test'

test.describe('Newsletter Subscription', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/subscribe')
  })

  test('should display newsletter subscription form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /newsletter|subscribe/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByRole('button', { name: /subscribe/i }).click()

    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('should subscribe to newsletter successfully', async ({ page }) => {
    const testEmail = `test${Date.now()}@example.com`
    
    await page.getByLabel(/email/i).fill(testEmail)
    await page.getByRole('button', { name: /subscribe/i }).click()

    // Wait for success message
    await expect(page.getByText(/check.*email|verification|confirm/i)).toBeVisible({ timeout: 10000 })
  })

  test('should handle duplicate subscription', async ({ page }) => {
    const testEmail = 'duplicate@example.com'
    
    // First subscription
    await page.getByLabel(/email/i).fill(testEmail)
    await page.getByRole('button', { name: /subscribe/i }).click()
    await page.waitForTimeout(2000)

    // Reload and try again
    await page.reload()
    await page.getByLabel(/email/i).fill(testEmail)
    await page.getByRole('button', { name: /subscribe/i }).click()

    // Should show already subscribed message
    await expect(page.getByText(/already.*subscribed|verification/i)).toBeVisible({ timeout: 10000 })
  })

  test('should handle rate limiting for newsletter', async ({ page }) => {
    // Submit multiple times quickly
    for (let i = 0; i < 4; i++) {
      await page.getByLabel(/email/i).fill(`test${i}@example.com`)
      await page.getByRole('button', { name: /subscribe/i }).click()
      await page.waitForTimeout(500)
    }

    // Should see rate limit message
    await expect(page.getByText(/too many|rate limit|slow down/i)).toBeVisible({ timeout: 5000 })
  })

  test('should display newsletter benefits', async ({ page }) => {
    // Check for benefits/features section
    await expect(page.getByText(/weekly|monthly|updates/i)).toBeVisible()
  })
})

test.describe('Newsletter on Homepage', () => {
  test('should have newsletter signup on homepage', async ({ page }) => {
    await page.goto('/')
    
    const newsletterSection = page.locator('section', { has: page.getByText(/newsletter|subscribe/i) })
    await expect(newsletterSection).toBeVisible()
    
    const emailInput = newsletterSection.getByLabel(/email/i)
    await expect(emailInput).toBeVisible()
  })

  test('should subscribe from homepage', async ({ page }) => {
    await page.goto('/')
    
    const testEmail = `homepage${Date.now()}@example.com`
    const newsletterSection = page.locator('section', { has: page.getByText(/newsletter|subscribe/i) })
    
    await newsletterSection.getByLabel(/email/i).fill(testEmail)
    await newsletterSection.getByRole('button', { name: /subscribe/i }).click()

    await expect(page.getByText(/check.*email|verification|success/i)).toBeVisible({ timeout: 10000 })
  })
})
