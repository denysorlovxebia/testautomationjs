import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Desktop Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('login test', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL(/\/account/);
    await expect(page).toHaveTitle(/Overview/);
    await expect(page.getByRole('navigation')).toContainText('Jane Doe');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

});