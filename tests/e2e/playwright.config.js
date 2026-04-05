import { defineConfig } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioRoot = path.resolve(__dirname, '../..');

export default defineConfig({
  testDir: './specs',
  globalSetup: './global-setup.js',
  reporter: 'list',
  timeout: 30_000,
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
  },

  webServer: [
    {
      command: 'node api/index.js --development',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      cwd: portfolioRoot,
      env: {
        PORT: '3001',
        NODE_ENV: 'development',
        SLICE_PUBLIC_E2E_VALUE: 'dev-e2e-visible',
      },
    },
    {
      command: 'node api/index.js --production',
      url: 'http://localhost:3002',
      reuseExistingServer: !process.env.CI,
      cwd: portfolioRoot,
      env: {
        PORT: '3002',
        NODE_ENV: 'production',
        SLICE_PUBLIC_E2E_VALUE: 'prod-e2e-visible',
      },
    },
  ],

  projects: [
    {
      name: 'dev-mode',
      use: { baseURL: 'http://localhost:3001' },
    },
    {
      name: 'production-mode',
      use: { baseURL: 'http://localhost:3002' },
    },
  ],
});
