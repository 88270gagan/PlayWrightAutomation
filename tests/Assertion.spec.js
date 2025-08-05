const { test, expect } = require('@playwright/test');

test('Search for container and verify results on LDB', async ({ page }) => {
  // Navigate to LDB container search page
  await page.goto('https://www.ldb.co.in/ldb/containersearch');
  await page.waitForLoadState('networkidle');

  // Locate the container input box and enter a sample container number
  const searchBox = page.locator('#txtContainer');
  await expect(searchBox).toBeVisible();

  await searchBox.fill('HLXU1234567'); // Replace with a valid container number if needed

  // Click the search button
  const searchBtn = page.locator('#btnSearch');
  await expect(searchBtn).toBeVisible();
  await searchBtn.click();

  // Wait for results to load (adjust this selector to fit actual result structure)
  const resultSection = page.locator('#divTracking'); // Placeholder, adjust as needed
  await expect(resultSection).toBeVisible();

  console.log('Container search results are displayed.');
});