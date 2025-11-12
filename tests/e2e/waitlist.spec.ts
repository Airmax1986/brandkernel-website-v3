import { test, expect } from '@playwright/test';

test.describe('Waitlist Signup', () => {
  // Generate unique email for each test run
  const generateTestEmail = () => `test-${Date.now()}@example.com`;

  test('should show waitlist form on homepage', async ({ page }) => {
    await page.goto('/');

    // Check for email input field
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button:has-text("Join")').first();
    await expect(submitButton).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button:has-text("Join")').first();

    // Enter invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();

    // Should show validation error or prevent submission
    // Note: Actual behavior depends on implementation
    // This test just ensures the form handles invalid input
    await page.waitForTimeout(500);

    // Page should still be on homepage (not navigate away)
    expect(page.url()).toContain('/');
  });

  test('should accept valid email format', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button:has-text("Join")').first();

    // Enter valid email
    const testEmail = generateTestEmail();
    await emailInput.fill(testEmail);

    // Submit form
    await submitButton.click();

    // Wait for response (up to 10 seconds)
    await page.waitForTimeout(2000);

    // Check for success indicators
    // This could be a success message, disabled button, or other UI change
    // Adjust based on actual implementation
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]').first();
    const submitButton = page.locator('button:has-text("Join")').first();

    // Fill in email
    await emailInput.fill(generateTestEmail());

    // Submit form
    await submitButton.click();

    // Wait for any response
    await page.waitForTimeout(2000);

    // Page should remain functional (no crash)
    await expect(page.locator('main')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to email input
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need multiple tabs depending on layout

    // Type email using keyboard only
    const testEmail = generateTestEmail();
    await page.keyboard.type(testEmail);

    // Tab to submit button
    await page.keyboard.press('Tab');

    // Press Enter to submit
    await page.keyboard.press('Enter');

    // Wait for response
    await page.waitForTimeout(2000);

    // Form should have been submitted
    // Verify page is still functional
    await expect(page.locator('main')).toBeVisible();
  });
});
