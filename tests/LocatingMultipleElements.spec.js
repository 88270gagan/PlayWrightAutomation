const { test, expect } = require('@playwright/test');

test('Locating multiple anchor elements on IRCTC', async ({ page }) => {

  // Navigate to IRCTC main page
  await page.goto('https://www.irctc.co.in/nget/train-search');

  // Wait for all network activity to finish
  await page.waitForLoadState('networkidle');

  // Locate all anchor tags
  const links = await page.$$('a');

  // Loop through and log each link's visible text (ignore empty or whitespace)
  for (const link of links) {
    const linkText = await link.innerText();
    if (linkText.trim() !== '') {
      console.log(linkText);
    }
  }

});    