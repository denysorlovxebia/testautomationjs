import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('[data-test^="product-"]');
  }

  async openHomePage() {
    await this.page.goto('/');
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