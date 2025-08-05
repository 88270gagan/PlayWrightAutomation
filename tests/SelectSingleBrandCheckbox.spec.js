const { test, expect } = require('@playwright/test');

test('Select Samsung brand checkbox', async ({ page }) => {
  await page.goto('https://www.flipkart.com');

  const closePopup = page.locator('button', { hasText: '✕' });
  if (await closePopup.isVisible()) {
    await closePopup.click();
  }

  const searchBox = page.locator("input[title='Search for Products, Brands and More']");
  await searchBox.fill('mobiles');
  await searchBox.press('Enter');
  await page.waitForLoadState('networkidle');

  const samsungCheckbox = page.locator("div._3879cV", { hasText: 'SAMSUNG' }).first();
  await expect(samsungCheckbox).toBeVisible();
  await samsungCheckbox.click();

  await page.waitForTimeout(2000);
});