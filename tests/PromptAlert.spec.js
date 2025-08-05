const { test, expect } = require('@playwright/test');

test('Prompt Alert - Accept with Text', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Handle the prompt alert
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.accept('Lovepreet'); // Replace with any name
  });

  // Wait for the button to be visible
  const promptButton = page.locator('//button[@onclick="myFunctionPrompt()"]');
  await promptButton.waitFor({ state: 'visible' });

  // Click the prompt box button
  await promptButton.click();

  // Verify the result text
  await expect(page.locator('#demo')).toHaveText('Hello Lovepreet! How are you today?');

  // Optional wait to see result before browser closes
  await page.waitForTimeout(3000);
});