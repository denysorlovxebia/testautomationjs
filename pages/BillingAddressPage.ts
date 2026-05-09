import { Page, Locator, expect } from '@playwright/test';
import { BillingAddress, DEFAULT_BILLING_ADDRESS } from '../test-data/billing';

export class BillingAddressPage {
  readonly page: Page;
  readonly alreadyLoggedInMessage: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly formProceedBtn: Locator;
  readonly loggedInProceedBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alreadyLoggedInMessage = page.getByText(/already logged in/i);
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.formProceedBtn = page.getByTestId('proceed-3');
    this.loggedInProceedBtn = page.getByRole('button', { name: /^Proceed to checkout$/i });
  }

  async fillBillingAddress(
    billingAddress: Partial<BillingAddress> = DEFAULT_BILLING_ADDRESS
  ) {
    const {
      address,
      city,
      state,
      postalCode,
      country,
    } = {
      ...DEFAULT_BILLING_ADDRESS,
      ...billingAddress,
    };

    const billingCountry = country;
    const billingPostalCode = postalCode;
    const billingHouseNumber = (address.match(/\d+/)?.[0] || '98').trim();
    const billingStreet = (address.replace(/\d+/g, '').trim() || 'Test street');

    if (await this.countryInput.isVisible()) {
      if (/united states/i.test(billingCountry)) {
        await this.countryInput.selectOption('US');
      } else if (/austria/i.test(billingCountry)) {
        await this.countryInput.selectOption('AT');
      } else {
        await this.countryInput.selectOption({ label: billingCountry });
      }
    }

    await this.fillIfVisible(this.postalCodeInput, billingPostalCode);
    await this.fillIfVisible(this.houseNumberInput, billingHouseNumber, async () => {
      await this.houseNumberInput.press('Tab');
    });
    await this.fillIfVisible(this.streetInput, billingStreet);
    await this.fillIfVisible(this.cityInput, city);
    await this.fillIfVisible(this.stateInput, state, async () => {
      await this.stateInput.press('Tab');
    });
  }

  private async fillIfVisible(locator: Locator, value: string, postFill?: () => Promise<void>) {
    if (!(await locator.isVisible())) return;
    await locator.fill(value);
    if (postFill) await postFill();
  }

  async proceedToPayment() {
    if (await this.alreadyLoggedInMessage.isVisible()) {
      await this.loggedInProceedBtn.click();
      return;
    }

    await expect(this.formProceedBtn).toBeEnabled({ timeout: 15000 });
    await this.formProceedBtn.click();
  }

  async completeBillingAddress(
    billingAddress: Partial<BillingAddress> = DEFAULT_BILLING_ADDRESS
  ) {
    // Some sessions show "already logged in" gate before the address form.
    if (await this.alreadyLoggedInMessage.isVisible()) {
      await this.loggedInProceedBtn.click();
    }

    await this.fillBillingAddress(billingAddress);

    if (await this.formProceedBtn.isVisible()) {
      await expect(this.formProceedBtn).toBeEnabled({ timeout: 15000 });
      await this.formProceedBtn.click();
    }
  }

  async isUserLoggedIn() {
    if (await this.alreadyLoggedInMessage.isVisible()) {
      return true;
    }

    const signInLinkVisible = await this.page
      .getByRole('link', { name: 'Sign in' })
      .first()
      .isVisible();

    return !signInLinkVisible;
  }
}
