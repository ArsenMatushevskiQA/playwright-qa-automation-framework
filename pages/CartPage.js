import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async verifyProductInCart(productName) {
    await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
  }
}
