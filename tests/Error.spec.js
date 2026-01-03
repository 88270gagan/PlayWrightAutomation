import { test, expect } from '@playwright/test';

test('Search for a video on YouTube', async ({ page }) => {
  // Navigate to YouTube
  await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });

  // Accept cookies if the popup appears (optional for some regions)
  const acceptBtn = page.locator('button:has-text("Accept all")');
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
  }

  // Locate the search input
  const searchInput = page.locator('input#search');
  await expect(searchInput).toBeVisible({ timeout: 10000 });

  // Type your search term
  await searchInput.fill('Playwright automation tutorial');

  // Click the search button
  await page.locator('button#search-icon-legacy').click();

  // Wait for results
  const videoResults = page.locator('ytd-video-renderer');
  await expect(videoResults.first()).toBeVisible({ timeout: 10000 });

  // Log the title of the first result
  const firstTitle = await videoResults.first().locator('#video-title').innerText();
  console.log('First video title:', firstTitle);

  // Expect the title to contain our keyword
  expect(firstTitle.toLowerCase()).toContain('playwright');
});