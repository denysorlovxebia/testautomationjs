import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly filters: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('sort');
    this.filters = page.locator('#filters');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.cartButton = page.getByTestId('nav-cart');
  }

  async openHomePage() {
    await this.page.goto('/');
  }

  async getFirstProduct() {
    await this.productNames.first().waitFor({ state: 'visible' });
    const name = (await this.productNames.first().textContent()) ?? '';

    const priceText = await this.productPrices.first().textContent();
    const price = parseFloat(priceText?.replace('$', '').trim() || '0');

    return {
      name,
      price,
    };
  }

  async openFirstProduct() {
    await this.productNames.first().click();
  }

  async clickOnProduct(productName: string) {
    await this.productNames.filter({ hasText: productName }).first().click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace('$', '').trim()));
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async applyFilters(category: string, subCategory: string) {
    await this.filters.getByLabel(category).check();
    await this.filters.getByLabel(subCategory).check();
  }
}