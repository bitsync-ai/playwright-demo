import { test, expect } from '@playwright/test';

test('saucedemo demo flow with delays for recording', async ({ page }) => {
  // ▶️ 1. Navigate to site
  await page.goto('https://www.saucedemo.com');
  await page.waitForTimeout(1000);

  // ▶️ 2. Fill in login form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.waitForTimeout(500);
  await page.click('#login-button');
  await page.waitForTimeout(1500);

  // ✔️ 3. Verify inventory page
  await expect(page).toHaveURL(/.*inventory/);
  await page.waitForTimeout(1000);

  // ▶️ 4. Sort products by Price (low to high)
  const sort = page.locator('select.product_sort_container');
  await sort.waitFor({ state: 'visible' });
  await sort.selectOption('lohi');
  await page.waitForTimeout(1500);

  // ▶️ 5. Add the first two items
  const addButtons = page.locator('button:text("Add to cart")');
  await addButtons.first().click();
  await page.waitForTimeout(1500);
  await addButtons.nth(1).click();
  await page.waitForTimeout(1500);

  // ▶️ 6. Open the details of the first item
  await page.locator('.inventory_item_name').first().click();
  await page.waitForTimeout(2000);

  // ▶️ 7. Go back to inventory
  await page.goBack();
  await page.waitForTimeout(1000);

  // ✔️ 8. Confirm cart badge (should show "2")
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('2');
  await page.waitForTimeout(1000);

  // ▶️ 9. Visit cart page
  await page.click('.shopping_cart_link');
  await page.waitForTimeout(1500);
  await expect(page).toHaveURL(/.*cart/);

  // ▶️ 10. Remove one item
  await page.click('button:text("Remove")');
  await page.waitForTimeout(1500);

  // ✔️ 11. Confirm only 1 item remains
  const items = page.locator('.cart_item');
  await expect(items).toHaveCount(1);
  await page.waitForTimeout(1000);

  // 🧾 12. Capture final screenshot
  await page.screenshot({ path: 'saucedemo_record_demo.png', fullPage: true });
});
