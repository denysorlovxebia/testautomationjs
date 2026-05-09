import { test, expect } from './fixtures';

test('Verify user can view product details', async ({ app }) => {
  await app.homePage.openHomePage();
  await app.homePage.clickOnProduct('Combination Pliers');

  await expect(app.page).toHaveURL(/\/product/);
  await expect(app.productPage.productName).toHaveText('Combination Pliers');
  await expect(app.productPage.price).toContainText('14.15');
});

test('E2E: Add product to cart and verify checkout', async ({ app }) => {
  // Open homepage
  await app.homePage.openHomePage();

  // Click product
  await app.homePage.clickOnProduct('Slip Joint Pliers');

  // Assertions (product page)
  await expect(app.page).toHaveURL(/\/product/);
  await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(app.productPage.price).toContainText('9.17');  
  
  // Add to cart
  await app.productPage.addToCart();

  // Alert checks
  await expect(app.productPage.alert).toBeVisible();
  await expect(app.productPage.alert).toContainText('Product added to shopping cart.');

  // cart quantity
  await expect(app.productPage.cartQty).toHaveText('1');

  // Open cart
  await app.homePage.openCart();

  // Cart assertions
  await expect(app.page).toHaveURL('/checkout');
  await expect(app.cartPage.rows).toHaveCount(1);
  await expect(app.cartPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(app.cartPage.checkoutBtn).toBeVisible();
});
