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

    // Get products BEFORE filtering
    const allProducts = await page
      .getByTestId('product-name')
      .allTextContents();

    // Apply filters
    await filters.getByLabel(data.category).check();
    await filters.getByLabel(data.subCategory).check();

    // Wait for UI update
    const productNamesLocator = page.getByTestId('product-name');
    await expect(productNamesLocator.first()).toBeVisible();

    // Get products AFTER filtering
    const filteredProducts = await productNamesLocator.allTextContents();

    // Ensure list is not empty
    expect(filteredProducts.length).toBeGreaterThan(0);

    // Ensure list changed
    expect(filteredProducts).not.toEqual(allProducts);

    // so we check that AT LEAST one product matches expected filter
    const hasMatchingProduct = filteredProducts.some(name =>
      name.includes(data.subCategory)
    );

    expect(hasMatchingProduct).toBeTruthy();
  });
}