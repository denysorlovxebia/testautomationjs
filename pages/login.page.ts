import { Page } from "@playwright/test";

export class LoginPage {

    async login(page: Page): Promise<void> {
    await page.getByLabel('email address').fill('customer@practicesoftwaretesting.com');
    await page.getByLabel('Password').fill('welcome01');
    await page.getByRole('button', { name: 'Sign in' }).click();
}
}