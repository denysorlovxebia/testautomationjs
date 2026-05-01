import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  async openHomePage() {
    await this.page.goto('/');
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const priceTexts = await this.productPrices.allTextContents();

    return priceTexts.map(t =>
      parseFloat(t.replace('$', '').trim())
    );
  }
}