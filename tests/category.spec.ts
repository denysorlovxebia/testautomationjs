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
  test(`@smoke Verify filtering by "${data.subCategory}" in ${data.category}`, async ({ app }) => {
    await test.step('Open home page', async () => {
      await app.homePage.openHomePage();
      // Wait for products to be visible
      await app.page.waitForSelector('[data-test]', { timeout: 5000 }).catch(() => {
        // Fallback if data-test selector doesn't exist
      });
    });

    await test.step(`Apply filters: ${data.category} > ${data.subCategory}`, async () => {
      await app.homePage.applyFilters(data.category, data.subCategory);
    });

    await test.step('Verify filtered results', async () => {
      const filteredProducts = await app.homePage.getProductNames();
      expect(filteredProducts.length).toBeGreaterThan(0);
    });
  });
}
