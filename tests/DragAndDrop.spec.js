const { test, expect } = require('@playwright/test');

test('Drag and Drop', async ({ page }) => {
  await page.goto('https://leafground.com/drag.xhtml');

  const source = page.locator('#form\\:drag_content');
  const target = page.locator('#form\\:drop_content');

  await source.dragTo(target);

  // Optional: verify text
  await expect(target).toContainText('Dropped!');

  await page.waitForTimeout(3000);
});