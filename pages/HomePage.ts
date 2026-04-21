import { Page } from "@playwright/test";

export class HomePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

   async openHomePage() {
    await this.page.goto('https://practicesoftwaretesting.com');
}
 
async clickOnProduct() {
    const product = this.page.getByAltText('Combination Pliers');
    await product.waitFor({ state: 'visible' });

    await Promise.all([
        this.page.waitForURL(/.*\/product/),
        product.click()
    ]);
 }
}
