import { test, expect } from '@playwright/test';

test('Check radio button inside nested iframe in frame3', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');

  // Step 1: Get the top-level frame3 (legacy <frame>)
  const outerFrame = page.frames().find(f => f.name() === 'frame3');
  await outerFrame.locator('iframe[name="frame1"]').waitFor({ state: 'visible' });
  // Step 2: Wait for the inner iframe to load inside frame3
  await outerFrame.waitForSelector('iframe[name="frame1"]');

  // Step 3: Get the nested iframe's frame handle
  const nestedFrameElement = await outerFrame.locator('iframe[name="frame1"]').elementHandle();
  const nestedFrame = await nestedFrameElement.contentFrame();
  expect(nestedFrame, 'nested frame1 should exist inside frame3').not.toBeNull();

  // Step 4: Interact with radio button inside nested iframe
  const radioButton = nestedFrame.locator('input[type="radio"][value="male"]');
  await radioButton.waitFor({ state: 'visible', timeout: 5000 });
  await radioButton.check();

  await page.waitForTimeout(2000); // Optional
});