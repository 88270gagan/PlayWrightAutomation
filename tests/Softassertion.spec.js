const {test, expect} = require('@playwright/test');

test("Soft Assertion Example", async ({page}) => {

    await page.goto("https://www.demoblaze.com/index.html");

    //Hard Assertion
    await expect(page).toHaveTitle("STORE");
    await expect(page).toHaveURL("https://www.demoblaze.com/index.html");
    await expect(page.locator('.navbar-brand')).toBeVisible();


});

