const { test, expect } = require('@playwright/test');

test('Search for a product and verify results on Flipkart', async ({ page }) => {
  // Navigate to Flipkart homepage
  await page.goto('https://www.flipkart.com/', { waitUntil: 'networkidle' });

  // Close the login popup if it appears
  const closeLoginPopup = page.locator('button._2KpZ6l._2doB4z');
  if (await closeLoginPopup.isVisible()) {
    await closeLoginPopup.click();
  }

  // Locate the search box and enter a product name
  const searchBox = page.locator('input[title="Search for Products, Brands and More"]');
  await expect(searchBox).toBeVisible();
  await searchBox.fill('iPhone 14');

  // Click the search button
  await page.locator('button[type="submit"]').click();

  // Wait for the search results to appear
  const searchResults = page.locator('div._1YokD2._3Mn1Gg');
  await expect(searchResults).toBeVisible();

  console.log('✅ Flipkart search results are displayed.');
});