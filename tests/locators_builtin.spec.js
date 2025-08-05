const { test, expect } = require('@playwright/test');

test('Built-in locators on Amazon.in', async ({ page }) => {

  // Go to Amazon India homepage
  await page.goto('https://www.amazon.in');

  // Search for "smartphone"
  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.fill('smartphone');
  await searchBox.press('Enter');

  // Wait for the main search results to load
  await page.waitForSelector('div.s-main-slot');

  // Locate all product result containers
  const products = page.locator('div.s-main-slot div[data-component-type="s-search-result"]');

  const total = await products.count();
  console.log(`\n🔍 Found ${total} products for "smartphone":\n`);

  let count = 1;

  for (let i = 0; i < total; i++) {
    const product = products.nth(i);
    try {
      const titleLocator = product.locator('h2 a span');
      if (await titleLocator.count() > 0) {
        const title = await titleLocator.first().innerText();
        console.log(`${count++}. 🛒 ${title}`);
      } else {
        console.log(`${i + 1}. ⚠️ No title element`);
      }
    } catch (error) {
      console.log(`${i + 1}. ❌ Error reading title: ${error.message}`);
    }
  }
});