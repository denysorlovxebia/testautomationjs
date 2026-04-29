import { HomePage} from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';

test.use({ storageState: 'storageState.json' });

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.openHomePage();
  await homePage.clickOnProduct('Combination Pliers');

  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText('Combination Pliers');
  await expect(productPage.price).toContainText('14.15');
});

test.use({ storageState: 'storageState.json' });

test('E2E: Add product to cart and verify checkout', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Open homepage
  await homePage.openHomePage();

  // Click product
  await homePage.clickOnProduct('Slip Joint Pliers');

  // Assertions (product page)
  await expect(page).toHaveURL(/\/product/);
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.price).toContainText('9.17');  
  // Add to cart
  await productPage.addToCart();

  // Alert checks
  await expect(productPage.alert).toBeVisible();
  await expect(productPage.alert).toContainText('Product added to shopping cart.');

  // cart quantity
  await expect(productPage.cartQty).toHaveText('1');

  // Open cart
  await homePage.openCart();

  // Cart assertions
  await expect(page).toHaveURL('/checkout');
  await expect(cartPage.rows).toHaveCount(1);
  await expect(cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(cartPage.checkoutBtn).toBeVisible();
});