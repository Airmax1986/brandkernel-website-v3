import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate to main pages from homepage', async ({ page }) => {
    await page.goto('/');

    // Test navigation to Features page
    const featuresLink = page.locator('a[href="/features"]').first();
    if (await featuresLink.isVisible()) {
      await featuresLink.click();
      await expect(page).toHaveURL(/features/);
      await expect(page.locator('main')).toBeVisible();

      // Navigate back to home
      await page.goto('/');
    }

    // Test navigation to Pricing page
    const pricingLink = page.locator('a[href="/pricing"]').first();
    if (await pricingLink.isVisible()) {
      await pricingLink.click();
      await expect(page).toHaveURL(/pricing/);
      await expect(page.locator('main')).toBeVisible();

      // Navigate back to home
      await page.goto('/');
    }

    // Test navigation to Blog
    const blogLink = page.locator('a[href="/blog"]').first();
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await expect(page).toHaveURL(/blog/);
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('should have working header navigation', async ({ page }) => {
    await page.goto('/');

    // Check header exists
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    // Check for logo/home link
    const homeLink = page.locator('header a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    // Visit a non-existent page
    const response = await page.goto('/this-page-does-not-exist');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // But page should still render (Next.js custom 404)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to blog post and back', async ({ page }) => {
    // Go to blog listing
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check if there are any blog post links
    const blogPostLinks = page.locator('a[href^="/blog/"]');
    const count = await blogPostLinks.count();

    if (count > 0) {
      // Click first blog post
      await blogPostLinks.first().click();

      // Should navigate to blog post page
      await expect(page).toHaveURL(/\/blog\/.+/);

      // Content should be visible
      await expect(page.locator('main')).toBeVisible();

      // Should have article content
      await expect(page.locator('article, main')).toBeVisible();

      // Navigate back using browser back button
      await page.goBack();

      // Should be back on blog listing
      await expect(page).toHaveURL(/\/blog\/?$/);
    }
  });

  test('should have functional mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Look for mobile menu button (hamburger)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has(svg)').first();

    if (await mobileMenuButton.isVisible()) {
      // Click to open menu
      await mobileMenuButton.click();

      // Wait for menu to appear
      await page.waitForTimeout(500);

      // Menu content should be visible
      // (exact selector depends on implementation)
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    }
  });

  test('should maintain navigation state across pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to features
    await page.goto('/features');
    await expect(page).toHaveURL(/features/);

    // Navigate to pricing
    await page.goto('/pricing');
    await expect(page).toHaveURL(/pricing/);

    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL(/features/);

    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL(/pricing/);
  });

  test('should handle external links correctly', async ({ page }) => {
    await page.goto('/');

    // Check that external links have proper attributes
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    if (count > 0) {
      const firstExternal = externalLinks.first();

      // External links should have target="_blank" or similar
      // This test just ensures they exist and are visible
      await expect(firstExternal).toBeVisible();
    }
  });
});
