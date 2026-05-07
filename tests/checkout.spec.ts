import { test, expect } from './fixtures';

test('E2E: Complete checkout flow for logged-in user', async ({ loggedInApp }) => {
  test.slow();
  const app = loggedInApp;

  await app.homePage.openHomePage();

  // Step 2: Get first product details
  const firstProduct = await app.homePage.getFirstProduct();

  console.log(`Product: ${firstProduct.name}, Price: $${firstProduct.price}`);

  // Open product page
  await app.homePage.openFirstProduct();

  // Add to cart
  await app.productPage.addToCart();

  // Open cart
  await app.homePage.openCart();
  await expect(app.page).toHaveURL(/checkout/);

  // Verify cart
  const cartInfo = await app.cartPage.getCartProductInfo();

  expect(cartInfo.productName?.trim()).toContain(firstProduct.name.trim());
  expect(cartInfo.price).toBe(firstProduct.price);
  expect(cartInfo.total).toBe(firstProduct.price);

  // Proceed to checkout
  await app.cartPage.proceedToCheckout();

  // Verify logged in
  expect(await app.billingAddressPage.isUserLoggedIn()).toBeTruthy();

  // Complete billing step for both variants: logged-in gate + address form
  await app.billingAddressPage.completeBillingAddress();

  // Payment: select credit card from dropdown
  await app.paymentPage.selectCreditCard();

  await app.paymentPage.fillPaymentDetails();

  await app.paymentPage.completePayment();

  expect(await app.confirmationPage.isPaymentSuccessful()).toBeTruthy();
});