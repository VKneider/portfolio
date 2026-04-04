import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;

test.describe('Mode detection', () => {

  test('/slice-env.json returns correct response per mode', async ({ request }, testInfo) => {
    const isDev = testInfo.project.name === 'dev-mode';
    const response = await request.get('/slice-env.json');

    if (isDev) {
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toEqual({ mode: 'development' });
    } else {
      // In production the endpoint is not registered — security middleware returns 404
      expect(response.status()).toBe(404);
    }
  });

  test('window.slice.isProduction() reflects the current mode', async ({ page }, testInfo) => {
    const isDev = testInfo.project.name === 'dev-mode';

    await page.goto('/');

    // Wait for Slice.init() to complete and set _mode on the instance
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    const isProduction = await page.evaluate(() => window.slice.isProduction());
    expect(isProduction).toBe(!isDev);
  });

  test('window.slice._mode is set to the correct string', async ({ page }, testInfo) => {
    const isDev = testInfo.project.name === 'dev-mode';
    const expectedMode = isDev ? 'development' : 'production';

    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    const mode = await page.evaluate(() => window.slice._mode);
    expect(mode).toBe(expectedMode);
  });

});
