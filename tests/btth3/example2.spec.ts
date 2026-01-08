import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/sauce/login-pages';

test.describe('Product check', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory.html/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.project.name}-${testInfo.title}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });

  test('Checking product count', async ({ page }) => {
    const products = page.locator('.inventory_item');
    const productCount = await products.count();
    expect(productCount).toBe(6);
  });

  test('Checking all products have names', async ({ page }) => {
    const productNames = page.locator('.inventory_item_name');
    const count = await productNames.count();
    
    for (let i = 0; i < count; i++) {
      const productName = await productNames.nth(i).textContent();
      expect(productName).not.toBe('');
      expect(productName).not.toBeNull();
    }
  });

  test('Checking all products have prices', async ({ page }) => {
    const productPrices = page.locator('.inventory_item_price');
    const count = await productPrices.count();
    
    expect(count).toBe(6);
    for (let i = 0; i < count; i++) {
      const priceText = await productPrices.nth(i).textContent();
      expect(priceText).toMatch(/^\$/);
    }
  });
});

test.describe('Cart check', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory.html/);
    
    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addToCartButton.click();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.project.name}-${testInfo.title}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });

  test('Checking cart badge shows the number of products', async ({ page }) => {
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('Checking products in the cart', async ({ page }) => {
    // Click on the cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    // Check products in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);
    
    const productName = page.locator('.inventory_item_name');
    await expect(productName).toHaveText('Sauce Labs Backpack');
  });

  test('Checking if a product can be removed from the cart', async ({ page }) => {
    // Click on the cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(/.*cart.html/);
    
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();
    
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);
  });
});
