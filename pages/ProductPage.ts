import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly price: Locator;
  readonly addToCartBtn: Locator;
  readonly alert: Locator;
  readonly cartQty: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.price = page.getByTestId('unit-price');
    this.addToCartBtn = page.getByTestId('add-to-cart');
    this.alert = page.locator('#toast-container .toast-message');
    this.cartQty = page.getByTestId('cart-quantity');
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }
}