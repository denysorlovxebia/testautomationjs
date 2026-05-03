import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly productTitle: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.rows = page.locator('tbody tr');
    this.productTitle = page.getByTestId('product-title');
    this.checkoutBtn = page.getByTestId('proceed-1');
  }
}