// File: ConfrimationDialog.spec.js
const { test, expect } = require('@playwright/test');

test('Confirmation Dialog - Alert with OK and Cancel', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Handle the confirmation dialog
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Press a button!');
    await dialog.accept(); // Accepts the confirmation (like pressing OK)
  });

  // Click the confirm box button
  await page.click('//button[@onclick="myFunctionConfirm()"]');
  // Verify the result text
  await expect(page.locator('#demo')).toHaveText('You pressed OK!');

  // Optional wait
  await page.waitForTimeout(3000);
});