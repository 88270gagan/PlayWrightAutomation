import { test, expect } from '@playwright/test';

test('Count total number of images on LDB container search page', async ({ page }) => {
  // Navigate to the LDB container search page
  await page.goto('https://www.hotstar.com/in/movies/sarzameen/1271428997/watch#mp-login', { waitUntil: 'domcontentloaded' });

  // Wait for a specific element that confirms the page is loaded
  await page.waitForSelector('img', { timeout: 10000 }); // Wait for at least one image or logo to appear

  // Locate all <img> elements
  const imageElements = await page.locator('img');
  const imageCount = await imageElements.count();

  console.log(`Total number of images: ${imageCount}`);

  // Optional: print all image sources
  for (let i = 0; i < imageCount; i++) {
    const src = await imageElements.nth(i).getAttribute('src');
    console.log(`Image ${i + 1}: ${src}`);
  }

  // Assert at least one image is present
  expect(imageCount).toBeGreaterThan(0);
});