import { test as setup, expect } from '@playwright/test';

const authFile = 'auth/sauce/user.json';

setup('authenticate', async ({ page }) => {
  // Đăng nhập
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.getByText('Swag Labs')).toBeVisible();

  // Lưu authentication state
  await page.context().storageState({ path: authFile });
});