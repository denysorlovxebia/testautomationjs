import type { TestInfo } from '@playwright/test';
import { test, expect } from './fixtures';

test('@regression E2E: Complete checkout flow for logged-in user', async ({ loggedInApp }, testInfo: TestInfo) => {
  test.slow();
  const app = loggedInApp;

  let firstProduct: { name: string; price: number } | null = null;
  await test.step('Get first product details', async () => {
    firstProduct = await app.homePage.getFirstProduct();
    await testInfo.attach('selected-product', {
      body: Buffer.from(`Product: ${firstProduct.name}, Price: $${firstProduct.price}`),
      contentType: 'text/plain',
    });
  });

  await test.step('Add first product to cart', async () => {
    await app.homePage.openFirstProduct();
    await app.productPage.addToCart();
  });

  await test.step('Open cart and verify', async () => {
    if (!firstProduct) {
      throw new Error('First product details were not captured');
    }

    await app.homePage.openCart();
    await expect(app.page).toHaveURL(/checkout/);
    await expect(app.cartPage.productTitle).toContainText(firstProduct.name);

    const cartInfo = await app.cartPage.getCartProductInfo();
    expect(cartInfo.price).toBe(firstProduct.price);
    expect(cartInfo.total).toBe(firstProduct.price);
  });

  await test.step('Proceed to checkout', async () => {
    await app.cartPage.proceedToCheckout();
    expect(await app.billingAddressPage.isUserLoggedIn()).toBeTruthy();
  });

  await test.step('Complete billing address', async () => {
    await app.billingAddressPage.completeBillingAddress();
  });

  await test.step('Process payment', async () => {
    await app.paymentPage.selectCreditCard();
    await app.paymentPage.fillPaymentDetails();
    await app.paymentPage.completePayment();
  });

  await test.step('Verify payment success', async () => {
    expect(await app.confirmationPage.isPaymentSuccessful()).toBeTruthy();
  });
});