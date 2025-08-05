const { test, expect } = require('@playwright/test');

test('List products on Amazon.in for search term', async ({ page }) => {
  // Navigate to Amazon India
  await page.goto('https://www.amazon.in/');

  // Search for a product (e.g., "laptop")
  const searchTerm = 'laptop';
  await page.fill('input#twotabsearchtextbox', searchTerm);
  await page.click('input#nav-search-submit-button');

  // Wait for search results to appear
  await page.waitForSelector('div.s-main-slot');

  // Get all product containers
  const products = await page.$$('div.s-main-slot div[data-component-type="s-search-result"]');

  console.log(`\n🔍 Found ${products.length} products for "${searchTerm}":\n`);

  let count = 1;

  for (const product of products) {
    try {
      const titleElement = await product.$('h2 a span');
      if (titleElement) {
        const title = await titleElement.innerText();
        console.log(`${count++}. 🛒 ${title}`);
      } else {
        console.log('⚠️ Skipped a product without a title element');
      }
    } catch (error) {
      console.log('❌ Error reading product title:', error.message);
    }
  }
});