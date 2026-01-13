import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationintesting.online/admin');

  await page.getByPlaceholder('Enter username').fill('admin');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/rooms'); 

  await context.storageState({ path: 'auth/auth.json' });

  await browser.close();
})();
