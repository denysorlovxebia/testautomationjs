import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';
import { AccountPage } from './AccountPage';
import { BillingAddressPage } from './BillingAddressPage';
import { PaymentPage } from './PaymentPage';
import { ConfirmationPage } from './ConfirmationPage';

export class App {
    readonly page: Page;
    readonly homePage: HomePage;
    readonly loginPage: LoginPage;
    readonly productPage: ProductPage;
    readonly cartPage: CartPage;
    readonly accountPage: AccountPage;
    readonly billingAddressPage: BillingAddressPage;
    readonly paymentPage: PaymentPage;
    readonly confirmationPage: ConfirmationPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.accountPage = new AccountPage(page);
        this.billingAddressPage = new BillingAddressPage(page);
        this.paymentPage = new PaymentPage(page);
        this.confirmationPage = new ConfirmationPage(page);
    }
}
