import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Open login page
  await loginPage.open();

  // Perform login via UI
  await loginPage.login(
    'customer@practicesoftwaretesting.com',
    'welcome01'
  );

  // Wait for account page UI (stable, no waitForURL)
  await accountPage.isLoaded();

  // Save authenticated session
  await page.context().storageState({ path: 'storageState.json' });
});