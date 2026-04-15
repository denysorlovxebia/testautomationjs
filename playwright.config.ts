import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    headless: true,
    trace: 'on-first-retry',
  },
});