const { test, expect } = require('@playwright/test');

test('Flipkart buy flow with filter and Cash on Delivery', async ({ page }) => {
  // 1. Open Flipkart
  await page.goto('https://www.flipkart.com');

  // 2. Close login popup
  const closeLogin = page.locator('button', { hasText: '✕' });
  if (await closeLogin.isVisible()) {
    await closeLogin.click();
  }

  // 3. Search for a product
  const searchBox = page.locator("input[title='Search for Products, Brands and More']");
  await searchBox.fill('Samsung Galaxy M14');
  await searchBox.press('Enter');

  // 4. Wait and select a filter (like "4★ & above")
  const fourStarFilter = page.locator("div").filter({ hasText: '4★ & above' }).first();
  await expect(fourStarFilter).toBeVisible();
  await fourStarFilter.click();
  await page.waitForTimeout(2000);

  // 5. Click on the first product
  const firstProduct = page.locator('a._1fQZEK').first();
  const [productPage] = await Promise.all([
    page.waitForEvent('popup'),
    firstProduct.click()
  ]);

  // 6. Add to cart
  await productPage.waitForLoadState();
  const addToCart = productPage.locator('button', { hasText: 'Add to cart' });
  await expect(addToCart).toBeVisible();
  await addToCart.click();

  // 7. Proceed to checkout
  await productPage.waitForTimeout(3000);
  const placeOrder = productPage.locator('button', { hasText: 'Place Order' });
  await expect(placeOrder).toBeVisible();
  await placeOrder.click();

  // 8. Wait for user to login manually (Flipkart requires OTP)
  console.log('⏳ Please complete login manually in the browser...');
  await productPage.waitForTimeout(35000); // Adjust this as needed

  // 9. After login, select "Cash on Delivery" option
  const codOption = productPage.locator('label', { hasText: 'Cash on Delivery' });
  await expect(codOption).toBeVisible();
  await codOption.click();

  console.log('✅ Cash on Delivery option selected.');
  await productPage.waitForTimeout(5000);
});