import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.open();
  await loginPage.login(
    'customer@practicesoftwaretesting.com',
    'welcome01'
  );

  await page.waitForURL(/\/account/);

  await accountPage.isLoaded();

  await page.context().storageState({ path: 'storageState.json' });
});