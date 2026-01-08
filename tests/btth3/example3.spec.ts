import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/sauce/login-pages';

test.describe('Practice hook execution order', () => {
  let loginPage: LoginPage;

  test.beforeAll(async () => {
    console.log('========================================');
    console.log('Start of test suite');
    console.log('========================================');
  });

  test.beforeEach(async ({ page }) => {
    console.log(`\n--- beforeEach: Logging in ---`);
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/.*inventory.html/);
    console.log('--- beforeEach: Login successful ---');
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`\n--- afterEach: Test "${testInfo.title}" - Status: ${testInfo.status} ---`);
    
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.project.name}-${testInfo.title}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    } else {
      console.log('✅ Test passed');
    }
    console.log('--- afterEach: Completed ---');
  });

  test.afterAll(async () => {
    console.log('\n========================================');
    console.log('End of test suite');
    console.log('========================================\n');
  });

  test('Check URL contains inventory.html', async ({ page }) => {
    console.log('▶ Running Test 1...');
    await expect(page).toHaveURL(/.*inventory.html/);
    console.log('✓ Test 1 completed');
  });

  test('Check product count', async ({ page }) => {
    console.log('▶ Running Test 2...');
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    console.log('Test 2 completed');
  });

  test('Test 3: Failed test for verify afterEach', async ({ page }) => {
    console.log('▶ Running Test 3 (intentionally failing)...');
    const productName = page.locator('.inventory_item_name').first();
    await expect(productName).toHaveText('Non-existent product name');
    console.log('Test 3 completed');
  });

  test('Check cart icon visibility', async ({ page }) => {
    console.log('▶ Running Test 4...');
    const cartIcon = page.locator('.shopping_cart_link');
    await expect(cartIcon).toBeVisible();
    console.log('Test 4 completed');
  });
});
