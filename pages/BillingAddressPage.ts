import { Page, Locator, expect } from '@playwright/test';

export type BillingAddress = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const DEFAULT_BILLING_ADDRESS: BillingAddress = {
  firstName: 'John',
  lastName: 'Doe',
  address: '98 Test street',
  city: 'Vienna',
  state: 'Vienna',
  postalCode: '1010',
  country: 'Austria',
};

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
    if (await this.alreadyLoggedInMessage.isVisible().catch(() => false)) {
      return;
    }

    const {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
    } = {
      ...DEFAULT_BILLING_ADDRESS,
      ...billingAddress,
    };

    void firstName;
    void lastName;

    const billingCountry = country;
    const billingPostalCode = postalCode;
    const billingHouseNumber = (address.match(/\d+/)?.[0] || '98').trim();
    const billingStreet = (address.replace(/\d+/g, '').trim() || 'Test street');
    const billingCity = city;
    const billingState = state;

    if (await this.countryInput.isVisible().catch(() => false)) {
      if (/united states/i.test(billingCountry)) {
        await this.countryInput.selectOption('US');
      } else if (/austria/i.test(billingCountry)) {
        await this.countryInput.selectOption('AT');
      } else {
        await this.countryInput.selectOption({ label: billingCountry });
      }
    }

    if (await this.postalCodeInput.isVisible().catch(() => false)) {
      await this.postalCodeInput.fill(billingPostalCode);
    }

    if (await this.houseNumberInput.isVisible().catch(() => false)) {
      await this.houseNumberInput.fill(billingHouseNumber);
      await this.houseNumberInput.press('Tab');
    }

    if (await this.streetInput.isVisible().catch(() => false)) {
      await this.streetInput.fill(billingStreet);
    }

    if (await this.cityInput.isVisible().catch(() => false)) {
      await this.cityInput.fill(billingCity);
    }

    if (await this.stateInput.isVisible().catch(() => false)) {
      await this.stateInput.fill(billingState);
      await this.stateInput.press('Tab');
    }
  }

  async proceedToPayment() {
    if (await this.alreadyLoggedInMessage.isVisible().catch(() => false)) {
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
    if (await this.alreadyLoggedInMessage.isVisible().catch(() => false)) {
      await this.loggedInProceedBtn.click();
    }

    await this.fillBillingAddress(billingAddress);

    if (await this.formProceedBtn.isVisible().catch(() => false)) {
      await expect(this.formProceedBtn).toBeEnabled({ timeout: 15000 });
      await this.formProceedBtn.click();
    }
  }

  async isUserLoggedIn() {
    const hasLoggedInMessage = await this.alreadyLoggedInMessage.isVisible().catch(() => false);
    if (hasLoggedInMessage) {
      return true;
    }

    const signInLinkVisible = await this.page
      .getByRole('link', { name: 'Sign in' })
      .first()
      .isVisible()
      .catch(() => false);

    return !signInLinkVisible;
  }
}
