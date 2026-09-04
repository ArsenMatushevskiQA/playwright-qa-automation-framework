import { test } from '../../fixtures/test.fixture.js';

test('add Sauce Labs Backpack to cart and verify it in the cart', async ({ authenticatedUser, cartPage }) => {
  await authenticatedUser.addProductToCart('Sauce Labs Backpack');
  await authenticatedUser.openCart();
  await cartPage.verifyProductInCart('Sauce Labs Backpack');
});
