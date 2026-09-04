import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async isLoaded() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
