import { test, expect } from './fixtures';

test('@smoke Verify user can view product details', async ({ app }) => {
  await test.step('Open home page', async () => {
    await app.homePage.openHomePage();
  });

  await test.step('Click on product', async () => {
    await app.homePage.clickOnProduct('Combination Pliers');
  });

  await test.step('Verify product details', async () => {
    await expect(app.page).toHaveURL(/\/product/);
    await expect(app.productPage.productName).toHaveText('Combination Pliers');
    await expect(app.productPage.price).toContainText('14.15');
  });
});

test('@regression E2E: Add product to cart and verify checkout', async ({ app }) => {
  await test.step('Open homepage', async () => {
    await app.homePage.openHomePage();
  });

  await test.step('Click product', async () => {
    await app.homePage.clickOnProduct('Slip Joint Pliers');
  });

  await test.step('Verify product page details', async () => {
    await expect(app.page).toHaveURL(/\/product/);
    await expect(app.productPage.productName).toHaveText('Slip Joint Pliers');
    await expect(app.productPage.price).toContainText('9.17');
  });

  await test.step('Add product to cart', async () => {
    await app.productPage.addToCart();
    await expect(app.productPage.alert).toBeVisible();
    await expect(app.productPage.alert).toContainText('Product added to shopping cart.');
  });

  await test.step('Verify cart quantity', async () => {
    await expect(app.productPage.cartQty).toHaveText('1');
  });

  await test.step('Open cart and verify', async () => {
    await app.homePage.openCart();
    await expect(app.page).toHaveURL('/checkout');
    await expect(app.cartPage.rows).toHaveCount(1);
    await expect(app.cartPage.productTitle).toHaveText('Slip Joint Pliers');
    await expect(app.cartPage.checkoutBtn).toBeVisible();
  });
});
