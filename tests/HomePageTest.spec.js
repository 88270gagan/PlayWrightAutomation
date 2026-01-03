// @ts-check
const { test, expect } = require('@playwright/test');

test('Blinkit Home Page', async ({ page }) => {
  // Navigate to Blinkit home page
  await page.goto('https://blinkit.com/', {
    waitUntil: 'domcontentloaded',
  });

  // Wait until the network is idle
  await page.waitForLoadState('networkidle');

  // Check page title
  const title = await page.title();
  console.log('Page Title:', title);
  await expect(page).toHaveTitle(/Blinkit/i);

  // Check URL
  const url = page.url();
  console.log('Page URL:', url);
  await expect(page).toHaveURL(/blinkit\.com/);

  // Check that the main heading is visible (Blinkit uses a dynamic homepage)
  const heading = page.locator('h1, h2').first(); // First main heading
  await expect(heading).toBeVisible();

  // Print heading text
  console.log('Main Heading:', await heading.innerText());

  // Optional: wait for visual observation
  await page.waitForTimeout(2000);
});