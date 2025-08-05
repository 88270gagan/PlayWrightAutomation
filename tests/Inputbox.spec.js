const { test, expect } = require('@playwright/test');

test('handle input box interactions', async ({ page }) => {
  // Navigate to Flipkart
  await page.goto('https://www.flipkart.com/');

  // Wait for potential popup and close it
  const closeBtn = page.locator('button', { hasText: '✕' });
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  // Replace this XPath with a real input field on Flipkart.
  // For demonstration, let’s try with the search bar instead.
  const inputBox = page.locator("input[title='Search for Products, Brands and More']");

  // Wait for input box to be visible
  await expect(inputBox).toBeVisible();

  // Check it's empty (optional)
  const value = await inputBox.inputValue();
  expect(value).toBe('');

  // Check it's editable and enabled
  await expect(inputBox).toBeEditable();
  await expect(inputBox).toBeEnabled();

  // Fill with name
  await inputBox.fill('John Doe');

  // Wait so you can visually confirm in headed mode
  await page.waitForTimeout(5000);
});