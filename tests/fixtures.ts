import type { APIRequestContext } from '@playwright/test';
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

  loggedInApp: async ({ app, request }: { app: App; request: APIRequestContext }, use) => {
    const response = await request.post('/auth/login', {
      form: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    });

    expect(response.ok()).toBeTruthy();

    const storageState = await request.storageState();

    await app.page.context().addCookies(
      storageState.cookies.map((cookie) => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
      }))
    );

    await app.homePage.openHomePage();
    await expect(app.page).toHaveURL('/');

    await use(app);
  },
});

export { expect };