import { defineConfig} from '@playwright/test';

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

projects: [
    {
      name: 'auth',
      testMatch: /.*auth\.login\.spec\.ts/,
      use: {
        browserName: 'chromium',
    },
  },

    {
      name: 'chromium',
      testIgnore: /.*auth\.login\.spec\.ts/, 
      use: {
        browserName: 'chromium',
        storageState: 'storageState.json',
      },
      dependencies: ['auth'], 
      },
  ],
});
