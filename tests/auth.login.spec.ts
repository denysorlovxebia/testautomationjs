import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  await page.waitForURL(/\/account/);

  // await expect(page.getByText('My account')).toBeVisible();
  await expect(page.getByTestId('page-title')).toBeVisible();
  await page.context().storageState({ path: 'storageState.json' });
});