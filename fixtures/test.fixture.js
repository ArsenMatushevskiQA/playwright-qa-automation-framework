import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  authenticatedUser: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isLoaded();
    await use(inventoryPage);
  },
});

export const expect = test.expect;
