import { test, expect } from '@playwright/test';

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
    await page.goto('/');

    const filters = page.locator('#filters');

    // Get product names BEFORE applying filter
    const allProducts = await page
      .locator('[data-test="product-name"]')
      .allTextContents();

    // Select main category (Power Tools)
    await filters.getByLabel(data.category).check();

    // Select subcategory (Sander)
    await filters.getByLabel(data.subCategory).check();

    // Wait for UI update (wait for first product to be visible again)
    const productNamesLocator = page.locator('[data-test="product-name"]');
    await expect(productNamesLocator.first()).toBeVisible();

    // Get product names AFTER filtering
    const filteredProducts = await productNamesLocator.allTextContents();

    // Ensure filtered list is not empty
    expect(filteredProducts.length).toBeGreaterThan(0);

    // Ensure list has changed after applying filter
    expect(filteredProducts).not.toEqual(allProducts);
  });
}