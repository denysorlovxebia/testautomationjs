import { Page, Locator, expect } from '@playwright/test';
import { DEFAULT_PAYMENT_CARD_NUMBER, DEFAULT_PAYMENT_CVV, DEFAULT_PAYMENT_CARDHOLDER, PaymentDetails } from '../test-data/payment';

export class PaymentPage {
  readonly page: Page;
  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderInput: Locator;
  readonly confirmBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.cardNumberInput = page.getByLabel('Credit Card Number');
    this.expirationDateInput = page.getByLabel('Expiration Date');
    this.cvvInput = page.getByLabel('CVV');
    this.cardHolderInput = page.getByLabel('Card Holder Name');
    this.confirmBtn = page.getByTestId('finish');
  }

  async selectCreditCard() {
    await this.paymentMethodSelect.selectOption('credit-card');
  }

  static getDefaultExpirationDate(): string {
    const today = new Date();
    const expirationDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    return `${String(expirationDate.getMonth() + 1).padStart(2, '0')}/${expirationDate.getFullYear()}`;
  }

  static getDefaultPaymentDetails(): PaymentDetails {
    return {
      cardNumber: DEFAULT_PAYMENT_CARD_NUMBER,
      expirationDate: PaymentPage.getDefaultExpirationDate(),
      cvv: DEFAULT_PAYMENT_CVV,
      cardholderName: DEFAULT_PAYMENT_CARDHOLDER,
    };
  }

  async fillPaymentDetails(details: Partial<PaymentDetails> = {}) {
    const paymentDetails = {
      ...PaymentPage.getDefaultPaymentDetails(),
      ...details,
    };

    await this.cardNumberInput.fill(paymentDetails.cardNumber);
    await this.expirationDateInput.fill(paymentDetails.expirationDate);
    await this.cvvInput.fill(paymentDetails.cvv);
    await this.cardHolderInput.fill(paymentDetails.cardholderName);
  }

  async completePayment() {
    await expect(this.confirmBtn).toBeEnabled();
    await this.confirmBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}
