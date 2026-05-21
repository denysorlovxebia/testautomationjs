import { test, expect } from './fixtures';

// SORT BY NAME
const nameSortOptions = [
  { label: 'Name (A - Z)', value: 'name,asc', order: 'asc' },
  { label: 'Name (Z - A)', value: 'name,desc', order: 'desc' },
];

for (const option of nameSortOptions) {
  test(`@smoke Sort by ${option.label}`, async ({ app }) => {
    await test.step('Open home page', async () => {
      await app.homePage.openHomePage();
    });

    await test.step(`Apply sort: ${option.label}`, async () => {
      await app.homePage.sortBy(option.value);
    });

    await test.step('Verify product names are sorted correctly', async () => {
      const productNames = await app.homePage.getProductNames();

      const sorted = [...productNames].sort((a, b) =>
        option.order === 'asc'
          ? a.localeCompare(b)
          : b.localeCompare(a)
      );

      expect(productNames).toEqual(sorted);
    });
  });
}

// SORT BY PRICE
const priceSortOptions = [
  { label: 'Price (Low - High)', value: 'price,asc', order: 'asc' },
  { label: 'Price (High - Low)', value: 'price,desc', order: 'desc' },
];

for (const option of priceSortOptions) {
  test(`@regression Sort by ${option.label}`, async ({ app }) => {
    await test.step('Open home page', async () => {
      await app.homePage.openHomePage();
    });

    await test.step(`Apply sort: ${option.label}`, async () => {
      await app.homePage.sortBy(option.value);
    });

    await test.step('Verify prices are sorted correctly', async () => {
      const prices = await app.homePage.getProductPrices();

      const sorted = [...prices].sort((a, b) =>
        option.order === 'asc' ? a - b : b - a
      );

      expect(prices).toEqual(sorted);
    });
  });
}