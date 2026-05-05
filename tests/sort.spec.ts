import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.use({ storageState: 'storageState.json' });

// SORT BY NAME
const nameSortOptions = [
  { label: 'Name (A - Z)', value: 'name,asc', order: 'asc' },
  { label: 'Name (Z - A)', value: 'name,desc', order: 'desc' },
];

for (const option of nameSortOptions) {
  test(`Sort by ${option.label}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.sortBy(option.value);

    const productNames = await homePage.getProductNames();

    const sorted = [...productNames].sort((a, b) =>
      option.order === 'asc'
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );

    expect(productNames).toEqual(sorted);
  });
}

// SORT BY PRICE
const priceSortOptions = [
  { label: 'Price (Low - High)', value: 'price,asc', order: 'asc' },
  { label: 'Price (High - Low)', value: 'price,desc', order: 'desc' },
];

for (const option of priceSortOptions) {
  test(`Sort by ${option.label}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.openHomePage();
    await homePage.sortBy(option.value);

    const prices = await homePage.getProductPrices();

    const sorted = [...prices].sort((a, b) =>
      option.order === 'asc' ? a - b : b - a
    );

    expect(prices).toEqual(sorted);
  });
}