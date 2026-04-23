import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  reporter: 'html',

  use: {
  baseURL: 'https://practicesoftwaretesting.com',
  headless: !!process.env.CI,
  trace: 'on-first-retry',
  testIdAttribute: 'data-test',
},
});
