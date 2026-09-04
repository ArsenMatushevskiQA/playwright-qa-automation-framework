import { test } from '../../fixtures/test.fixture.js';

test('add Sauce Labs Backpack to cart and verify it in the cart', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.isLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await cartPage.verifyProductInCart('Sauce Labs Backpack');
});
