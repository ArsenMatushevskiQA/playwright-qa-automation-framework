import { test, expect } from '../../fixtures/test.fixture.js';

test('successful login with standard_user / secret_sauce', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.isLoaded();
});

test('invalid login with standard_user and wrong password', async ({ loginPage, page }) => {
  await loginPage.login('standard_user', 'wrong_password');

  await loginPage.verifyErrorMessage(
    'Epic sadface: Username and password do not match any user in this service',
  );
  await loginPage.verifyLoginPage();
  await expect(page.locator('.inventory_item')).toHaveCount(0);
});

test('invalid login with locked_out_user', async ({ loginPage, page }) => {
  await loginPage.login('locked_out_user', 'secret_sauce');

  await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  await loginPage.verifyLoginPage();
  await expect(page.locator('.inventory_item')).toHaveCount(0);
});
