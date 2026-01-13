import { test as base } from '@playwright/test';

type LoginFixture = {
  loggedInPage: any;
};

export const test = base.extend<LoginFixture>({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: '/auth/sauce/user.json'
    });
    
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    await use(page);
    
    await context.close();
  },
});
