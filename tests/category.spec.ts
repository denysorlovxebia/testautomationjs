import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

enum Category {
  HAND_TOOLS = 'Hand Tools',
  POWER_TOOLS = 'Power Tools',
  OTHER = 'Other',
}

const testData = [
  { category: Category.POWER_TOOLS, subCategory: 'Sander' },
];

test.use({ storageState: 'storageState.json' });

for (const data of testData) {
  test(`Verify filtering by "${data.subCategory}" in ${data.category}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.openHomePage();

    // BEFORE filtering
    const allProducts = await homePage.getProductNames();

    // Apply filters (перенесено в Page Object)
    await homePage.applyFilters(data.category, data.subCategory);

    // AFTER filtering
    const filteredProducts = await homePage.getProductNames();

    // Assertions
    expect(filteredProducts.length).toBeGreaterThan(0);
    expect(filteredProducts).not.toEqual(allProducts);

    const hasMatchingProduct = filteredProducts.some(name =>
      name.includes(data.subCategory)
    );

    expect(hasMatchingProduct).toBeTruthy();
  });
}