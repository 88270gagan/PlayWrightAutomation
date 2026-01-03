import { test, expect } from '@playwright/test';

test('Amazon smoke test', async ({ page }) => {
  // Visit homepage
  await page.goto('https://www.amazon.in/');

  // Click on Sign In
  await page.getByRole('link', { name: /Hello, sign in/i }).click();

  // Enter mobile number (you can modify this to use fake or real number)
  const mobileField = page.getByRole('textbox', { name: /Enter your mobile number or/i });
  await expect(mobileField).toBeVisible();
  await mobileField.fill('9999999999');

  // Click Continue
  await page.getByRole('button', { name: 'Continue' }).click();

  // Navigate again to homepage
  await page.goto('https://www.amazon.in/');

  // Click on Mobiles category
  await page.getByRole('link', { name: 'Mobiles' }).click();

  // Click on Mobile Accessories
  await page.getByRole('link', { name: 'Mobile Accessories' }).click();

  // Wait for product list to load
  await page.waitForSelector('a:has-text("OnePlus")');

  // Log available OnePlus products
  const products = await page.locator('a:has-text("OnePlus")').allTextContents();
  console.log('Products found:', products);

  // Try clicking on a known product
  try {
    await page.getByText('OnePlus Bullets Z2').click();
  } catch (e) {
    console.log('OnePlus Bullets Z2 not found on the page.');
    return; // Exit if product not found
  }

  // Add to Cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Proceed to Buy (handle dynamic button name)
  try {
    await page.getByRole('button', { name: /Proceed to Buy/i }).click();
  } catch (e) {
    console.log('Proceed to Buy button not found.');
  }
});