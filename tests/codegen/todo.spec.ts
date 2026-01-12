import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Learning playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  
  await expect(page.getByText('Learning playwright')).toBeVisible();
  
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  
  await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toBeChecked();
  
  await page.getByRole('button', { name: 'Delete' }).click();
  
  await expect(page.getByText('Learning playwright')).not.toBeVisible();
});
