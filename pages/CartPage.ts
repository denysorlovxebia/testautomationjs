import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly checkoutBtn: Locator;
  readonly cartItemRow: Locator;
  readonly totalRow: Locator;
  readonly productTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.rows = page.locator('tbody tr');
    this.checkoutBtn = page.getByTestId('proceed-1');
    this.cartItemRow = page.locator('tbody tr').filter({ has: page.locator('input[type="number"]') }).first();
    this.totalRow = page.getByRole('row', { name: /^Total\s+\$/ }).first();
    this.productTitle = this.cartItemRow.locator('td').first();
  }

  async getCartProductInfo() {
    const productName = (await this.cartItemRow.locator('td').first().textContent()) || '';
    const priceText = await this.cartItemRow.locator('td').nth(2).textContent();
    const price = parseFloat(priceText?.replace('$', '').trim() || '0');

    const totalText = await this.totalRow.locator('td').nth(3).textContent();
    const total = parseFloat(totalText?.replace('$', '').trim() || '0');

    return { productName, price, total };
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
