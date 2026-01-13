import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth/auth.json' });

test('Check room management columns', async ({ page }) => {
    await page.goto('https://automationintesting.online/admin/rooms');

    await expect(page.getByText('Room #')).toBeVisible();
    await expect(page.getByText('Type')).toBeVisible();
    await expect(page.getByText('Accessible')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Room details')).toBeVisible();
});

test('Check add room button', async ({ page }) => {
    await page.goto('https://automationintesting.online/admin/rooms');
    const addRoomButton = page.getByRole('button').and(page.locator('#createRoom'));
    await expect(addRoomButton).toBeVisible();
    await expect(addRoomButton).toBeEnabled();
});
