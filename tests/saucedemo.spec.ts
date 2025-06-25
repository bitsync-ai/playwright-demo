import { test, expect } from '@playwright/test';

test('saucedemo flow for screen recording', async ({ page }) => {
  // Launch and go to the site
  await page.goto('https://www.saucedemo.com');
  await page.waitForTimeout(1000);

  // Log in
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.waitForTimeout(1000);

  // Verify we're on the inventory page
  await expect(page).toHaveURL(/.*inventory/);
  await page.waitForTimeout(1000);

  // Sort products by "Price (low to high)"
  const sortDropdown = page.locator('[data-test="product_sort_container"]');
  await sortDropdown.selectOption('lohi');
  await page.waitForTimeout(1000);

  // Add two items to the cart
  await page.click('text=Add to cart', { strict: false }); // First item
  await page.waitForTimeout(500);
  await page.click('(//button[text()="Add to cart"])[2]'); // Second item
  await page.waitForTimeout(1000);

  // Go to one product detail page
  await page.click('.inventory_item_name');
  await page.waitForTimeout(1000);

  // Go back
  await page.goBack();
  await page.waitForTimeout(1000);

  // Check cart has 2 items
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('2');
  await page.waitForTimeout(1000);

  // Navigate to the cart
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart/);
  await page.waitForTimeout(1000);

  // Remove one item
  await page.click('text=Remove', { strict: false });
  await page.waitForTimeout(1000);

  // Final screenshot
  await page.screenshot({ path: 'final_cart.png' });
});
