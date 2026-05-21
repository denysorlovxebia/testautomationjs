import { defineConfig } from '@playwright/test';
import type { ReporterDescription } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const reporters: ReporterDescription[] = [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['dot'],
  ['json', { outputFile: 'test-results/results.json' }],
];

if (process.env.TESTOMATIO_API_KEY && process.env.TESTOMATIO_PROJECT_CODE) {
  reporters.push([
    '@testomatio/reporter',
    {
      apiKey: process.env.TESTOMATIO_API_KEY,
      projectCode: process.env.TESTOMATIO_PROJECT_CODE,
      launchName: process.env.TESTOMATIO_LAUNCH_NAME || 'playwright-run',
    },
  ]);
}

if (process.env.RP_ENDPOINT && process.env.RP_PROJECT && process.env.RP_API_KEY) {
  reporters.push([
    '@reportportal/agent-js-playwright',
    {
      endpoint: process.env.RP_ENDPOINT,
      project: process.env.RP_PROJECT,
      apiKey: process.env.RP_API_KEY,
      launch: process.env.RP_LAUNCH || 'playwright-launch',
      description: 'Playwright automated run',
      attributes: [
        { key: 'framework', value: 'playwright' },
        { key: 'project', value: 'testautomationjs' },
      ],
    },
  ]);
}

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  reporter: reporters,

  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'smoke',
      use: {
        browserName: 'chromium',
      },
      grep: /@smoke/,
    },
    {
      name: 'regression',
      use: {
        browserName: 'chromium',
      },
      grep: /@regression/,
    },
  ],
});
