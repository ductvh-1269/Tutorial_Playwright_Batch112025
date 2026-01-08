import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/sauce/login-pages';

test.describe('Example Setup and teardown', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Setup: Login before each test
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `screenshots/${testInfo.project.name}-${testInfo.title}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });

  test('Have URL containing inventory.html', async ({ page }) => {
    // Your test code here
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Have correct product names on the inventory page', async ({ page }) => {
    const productNames = page.locator('.inventory_item_name');
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Backpack');
  });



  test('Failed test to verify teardown work', async ({ page }) => {
    const productNames = page.locator('.inventory_item_name');
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Backpack!!!!');
  });
});

