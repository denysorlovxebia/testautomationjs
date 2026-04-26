import { HomePage} from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.openHomePage();
  await homePage.clickOnProduct('Combination Pliers');

  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText('Combination Pliers');
  await expect(productPage.price).toHaveText('14.15');
});