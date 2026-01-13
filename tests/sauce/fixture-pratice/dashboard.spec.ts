import { expect } from '@playwright/test';
import { test } from '../../fixtures/login.fixture';


test('Check dashboard showing correct', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Swag Labs')).toBeVisible();
});


test('verify sauce inventory products', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Products')).toBeVisible();

  const inventoryItems = loggedInPage.locator('[data-test="inventory-item"]');
  await expect(inventoryItems).toHaveCount(6);

  await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  await expect(loggedInPage.getByText('Sauce Labs Onesie')).toBeVisible();
  await expect(loggedInPage.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
});


test('add product to cart', async ({ loggedInPage }) => {
  // Kiểm tra giỏ hàng trống ban đầu
  await expect(loggedInPage.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();

  // Thêm Sauce Labs Backpack vào giỏ hàng
  await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Verify badge hiển thị số lượng 1
  await expect(loggedInPage.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  // Verify nút đổi thành Remove
  await expect(loggedInPage.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});


test('view cart with added product', async ({ loggedInPage }) => {
  // Thêm sản phẩm vào giỏ hàng trước
  await loggedInPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Click vào icon giỏ hàng
  await loggedInPage.locator('[data-test="shopping-cart-link"]').click();

  // Verify đang ở trang Cart
  await expect(loggedInPage.locator('[data-test="title"]')).toHaveText('Your Cart');

  // Verify sản phẩm có trong giỏ hàng
  await expect(loggedInPage.locator('[data-test="inventory-item"]')).toHaveCount(1);
  await expect(loggedInPage.getByText('Sauce Labs Backpack')).toBeVisible();

  // Verify số lượng
  await expect(loggedInPage.locator('[data-test="item-quantity"]')).toHaveText('1');

  // Verify có nút Remove
  await expect(loggedInPage.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
});
