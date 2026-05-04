import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly filters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.filters = page.locator('#filters');
  }

  async openHomePage() {
    await this.page.goto('/');
  }

  async sortBy(
    value: "Name (A - Z)" | "Name (Z - A)" | "Price (Low - High)" | "Price (High - Low)"
  ) {
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

  async applyFilters(category: string, subCategory: string) {
    await this.filters.getByLabel(category).check();
    await this.filters.getByLabel(subCategory).check();

    // wait for UI update
    await expect(this.productNames.first()).toBeVisible();
  }
}