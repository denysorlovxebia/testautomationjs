import type { APIRequestContext } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import { App } from '../pages/App';
import dotenv from 'dotenv';

dotenv.config();

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
    // Navigate to login page
    await app.page.goto('/auth/login');

    // Fill login form
    await app.page.fill('input[placeholder="Your email"]', process.env.USER_EMAIL || 'customer@practicesoftwaretesting.com');
    await app.page.fill('input[placeholder="Your password"]', process.env.USER_PASSWORD || 'welcome01');

    // Click login button using getByRole for better reliability
    await app.page.getByRole('button', { name: 'Login' }).click();

    // Wait for navigation after login (redirects to /account)
    await app.page.waitForURL(/\/(account|)?$/);

    // Navigate to home page
    await app.homePage.openHomePage();

    await use(app);
  },
});

export { expect };