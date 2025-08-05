import { test, expect } from '@playwright/test';

test('Built-in locators on Amazon.in', async ({ page }) => {

  await page.goto('https://www.amazon.in/ap/signin');

const logo= page.getByAltText('Amazon');
  await expect(logo).toBeVisible();

  await page.getbyPlaceholder('username').fill('Admin');
  await page.getByPlaceholder('password').fill('Admin@123');

  await page.getByRole('button', { name: 'Sign-In' }).click();


});



  