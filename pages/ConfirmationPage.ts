import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly orderNumber: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator('text=/payment/i, text=/successful/i, text=/thank/i').first();
    this.orderNumber = page.getByTestId('order-number');
    this.pageHeading = page.getByTestId('page-title');
  }

  async isPaymentSuccessful() {
    await this.page.waitForLoadState('networkidle');
    const url = this.page.url();
    if (url.includes('order-received') || url.includes('confirmation')) {
      return true;
    }
    const successLocator = this.page.getByText(/payment was successful/i)
      .or(this.page.getByText(/thank you/i))
      .or(this.page.getByTestId('order-success'))
      .or(this.page.getByTestId('payment-success'));

    try {
      await successLocator.first().waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getOrderNumber() {
    return this.orderNumber.textContent();
  }
}
