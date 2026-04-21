import { HomePage } from '../pages/HomePage';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

test('Verify user can view product details', async ({ page }) => {

    const homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.clickOnProduct();

    await expect(page).toHaveURL(/.*\/product/);

    await expect(page.getByTestId('product-name'))
        .toHaveText('Combination Pliers');

    await expect(page.getByTestId('unit-price'))
        .toHaveText('14.15');

    await expect(page.getByTestId('add-to-cart'))
        .toBeVisible();

    await expect(page.getByTestId('add-to-favorites'))
        .toBeVisible();
});