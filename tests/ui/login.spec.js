import { test } from '../../fixtures/test.fixture.js';

test('successful login with standard_user / secret_sauce', async ({ loginPage, inventoryPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.isLoaded();
});
