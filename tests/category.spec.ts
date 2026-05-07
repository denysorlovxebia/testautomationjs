import { test, expect } from './fixtures';

enum Category {
  HAND_TOOLS = 'Hand Tools',
  POWER_TOOLS = 'Power Tools',
  OTHER = 'Other',
}

const testData = [
  { category: Category.POWER_TOOLS, subCategory: 'Sander' },
];

for (const data of testData) {
  test(`Verify filtering by "${data.subCategory}" in ${data.category}`, async ({ app }) => {
    await app.homePage.openHomePage();

    // BEFORE filtering
    const allProducts = await app.homePage.getProductNames();

    // Apply filters 
    await app.homePage.applyFilters(data.category, data.subCategory);

    // AFTER filtering
    const filteredProducts = await app.homePage.getProductNames();

    // Assertions
    expect(filteredProducts.length).toBeGreaterThan(0);
    expect(filteredProducts).not.toEqual(allProducts);
  });
}
