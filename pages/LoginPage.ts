import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submitButton = page.getByTestId('login-submit');
  }

  async open(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}