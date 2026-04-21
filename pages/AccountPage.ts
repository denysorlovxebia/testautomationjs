import { Page } from "@playwright/test";
export class AccountPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async isAccountPage(): Promise<boolean> {
        return await this.page.getByRole('heading', { level: 1 }).isVisible();
    }
}