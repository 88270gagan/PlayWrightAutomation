import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).dblclick();
  await page.getByRole('textbox', { name: 'Enter your mobile number or' }).dblclick();
  await page.getByRole('button', { name: 'Continue' }).dblclick();
  await page.goto('https://www.amazon.in/');
  await page.getByRole('link', { name: 'Mobiles' }).dblclick();
  await page.getByRole('link', { name: 'Mobile Accessories' }).dblclick();
  await page.getByRole('link', { name: 'OnePlus Bullets Z2 Bluetooth' }).dblclick();
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Proceed to Buy (1 item) Buy' }).click();
});