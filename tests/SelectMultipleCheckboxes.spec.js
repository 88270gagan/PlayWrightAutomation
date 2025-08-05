// tests/SelectMultipleBrandCheckboxes.spec.js

const { test, expect } = require('@playwright/test');

test('SelectMultipleCheckboxes on Flipkart', async ({ page }) => {
  await page.goto('https://www.flipkart.com');

  // Close the login popup if it appears
  const closeBtn = page.locator('button', { hasText: '✕' });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  // Search for mobiles
  const searchBox = page.locator("input[title='Search for Products, Brands and More']");
  await searchBox.fill('mobiles');
  await searchBox.press('Enter');

  await page.waitForLoadState('networkidle');

  // Select brand filters
  const brands = ['SAMSUNG', 'realme'];
  for (const brand of brands) {
    const checkbox = page.locator("div._3879cV").filter({ hasText: brand }).first();
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await page.waitForTimeout(2000); // wait for filter to apply
  }

  await page.waitForTimeout(3000); // view filtered results
});