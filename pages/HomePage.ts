import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly products: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('[data-test^="product-"]');
    this.cartIcon = this.page.getByTestId('nav-cart');
  }
async getProductNames() {
  return await this.page.locator('[data-test="product-name"]').allTextContents();
}
  async openHomePage() {
    await this.page.goto('/');
  }
  async openCart() {
  await this.cartIcon.click();
}

 async clickOnProduct(productName: string) {
  const product = this.page.locator('a[data-test^="product-"]', {
    has: this.page.getByText(productName),
  });

  await expect(product).toBeVisible();

  await Promise.all([
    this.page.waitForURL(/\/product/),
    product.click(),
  ]);
}
}