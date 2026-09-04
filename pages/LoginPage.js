import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async enterUsername(username) {
    await this.page.getByPlaceholder('Username').fill(username);
  }

  async enterPassword(password) {
    await this.page.getByPlaceholder('Password').fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async login(username, password) {
    await this.navigate();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async verifyErrorMessage(message) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/saucedemo\.com\/$/);
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }
}
