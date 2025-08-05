const { test, expect } = require('@playwright/test');

test('Alert with OK', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Listen to alert dialog
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
  });

  // Click the alert button
  await page.click('//button[@onclick="myFunctionAlert()"]');

  // Optional wait to see the result
  await page.waitForTimeout(3000);
});