// @ts-check
const { test, expect } = require('@playwright/test');

test('LDB Container Search Page', async ({ page }) => {
  // Navigate to LDB's container search page
  await page.goto('https://www.ldb.co.in/ldb/containersearch');

  // Wait for network to be idle
  await page.waitForLoadState('networkidle');

  // Check page title
  const title = await page.title();
  console.log('Page Title:', title);
  await expect(page).toHaveTitle(/Container Search/i);

  // Check URL
  const url = page.url();
  console.log('Page URL:', url);
  await expect(page).toHaveURL(/https:\/\/www\.ldb\.co\.in\/ldb\/containersearch/);

  // Check "Container Search" heading is visible (or use another visible element)
  const heading = page.locator('h1, h2, h3').filter({ hasText: 'Container Search' });
  await expect(heading.first()).toBeVisible();

  // Optional: wait for observation
  await page.waitForTimeout(2000);
});