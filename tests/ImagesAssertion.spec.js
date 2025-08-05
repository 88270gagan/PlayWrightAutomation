import { test, expect } from '@playwright/test';

test('Count total number of images on Amazon.in', async ({ page }) => {
  // Navigate to Amazon India
  await page.goto('https://www.amazon.in');

  // Wait for images to load
  await page.waitForLoadState('networkidle');

  // Find all <img> elements
  const imageElements = await page.locator('img');
  const imageCount = await imageElements.count();

  console.log(`Total number of images: ${imageCount}`);

  // Assertion: Expect at least 1 image
  expect(imageCount).toBeGreaterThan(0);
});