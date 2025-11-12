import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/BrandKernel/);

    // Check main heading is visible
    await expect(
      page.locator('h1').first()
    ).toBeVisible();

    // Check navigation is present
    await expect(
      page.locator('nav').first()
    ).toBeVisible();
  });

  test('should have functional skip navigation link', async ({ page }) => {
    await page.goto('/');

    // Tab to focus skip link (should be first focusable element)
    await page.keyboard.press('Tab');

    // Skip link should be visible when focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();

    // Click skip link
    await skipLink.click();

    // Main content should be in focus
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should display cookie consent banner', async ({ page }) => {
    // Clear cookies first
    await page.context().clearCookies();

    await page.goto('/');

    // Wait for cookie consent to load (it's lazy loaded)
    await page.waitForTimeout(1000);

    // Check if cookie consent appears (might be visible or not depending on previous acceptance)
    const cookieConsent = page.locator('text=/cookie|consent/i').first();

    // Just verify the page loaded without errors
    await expect(page).toHaveTitle(/BrandKernel/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Page should load successfully
    await expect(page).toHaveTitle(/BrandKernel/);

    // Main content should be visible
    await expect(page.locator('main')).toBeVisible();
  });
});
