const { test, expect } = require('@playwright/test');

test('Locating multiple anchor elements on LDB', async ({ page }) => {

  // Navigate to LDB Container Search page
  await page.goto('https://www.ldb.co.in/ldb/containersearch');

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