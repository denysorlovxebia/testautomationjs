import { Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    constructor(page: Page) {
    this.page = page;
        
    }
async open() {
    await this.page.goto('https://practicesoftwaretesting.com/login');
}
    async login(email: string, password: string): Promise<void> {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-submit').click();
}
}