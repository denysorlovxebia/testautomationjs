import { test, expect } from '@playwright/test';

test.describe('Desktop Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('login test', async ({ page }) => {
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    await expect(page).toHaveURL(/\/account/);
    await expect(page).toHaveTitle(/Overview/);
    await expect(page.getByRole('navigation')).toContainText('Jane Doe');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

});