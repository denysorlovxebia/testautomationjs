import { test as base, expect } from '@playwright/test';
import { App } from '../pages/App';

type AppFixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async ({ app }, use) => {
    // Step 1: Open login page
    await app.loginPage.open();

    // Step 2: Perform login
    await app.loginPage.login(
      'customer@practicesoftwaretesting.com',
      'welcome01'
    );

    // Step 3: Validate customer login actually succeeded
    await expect(app.page).toHaveURL(/\/account/);

    // Ensure the app starts from home after login
    await app.homePage.openHomePage();

    await use(app);
  },
});

export { expect };