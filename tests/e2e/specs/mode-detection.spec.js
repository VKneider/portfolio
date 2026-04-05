import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;

test.describe('Mode detection', () => {

  test('/slice-env.json returns correct response per mode', async ({ request }, testInfo) => {
    const isDev = testInfo.project.name === 'dev-mode';
    const expectedMode = isDev ? 'development' : 'production';
    const expectedEnvValue = isDev ? 'dev-e2e-visible' : 'prod-e2e-visible';
    const response = await request.get('/slice-env.json');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({ mode: expectedMode });
    expect(typeof body.env).toBe('object');
    expect(body.env).not.toBeNull();
    expect(body.env.SLICE_PUBLIC_E2E_VALUE).toBe(expectedEnvValue);

    for (const key of Object.keys(body.env)) {
      expect(key.startsWith('SLICE_PUBLIC_')).toBe(true);
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

  test('runtime exposes getEnv/getPublicEnv API', async ({ page }, testInfo) => {
    const expectedEnvValue = testInfo.project.name === 'production-mode'
      ? 'prod-e2e-visible'
      : 'dev-e2e-visible';

    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    const runtimeState = await page.evaluate(() => ({
      hasGetEnv: typeof window.slice.getEnv === 'function',
      hasGetPublicEnv: typeof window.slice.getPublicEnv === 'function',
      hasDedicatedGlobalEnv: typeof window.__SLICE_ENV__ !== 'undefined',
      readMissingWithFallback: window.slice.getEnv('SLICE_PUBLIC_NOT_DEFINED', 'fallback-value'),
      readInjectedE2EValue: window.slice.getEnv('SLICE_PUBLIC_E2E_VALUE'),
      snapshotInjectedE2EValue: window.slice.getPublicEnv().SLICE_PUBLIC_E2E_VALUE,
      envSnapshotIsObject: typeof window.slice.getPublicEnv() === 'object' && window.slice.getPublicEnv() !== null
    }));

    expect(runtimeState.hasGetEnv).toBe(true);
    expect(runtimeState.hasGetPublicEnv).toBe(true);
    expect(runtimeState.hasDedicatedGlobalEnv).toBe(false);
    expect(runtimeState.readMissingWithFallback).toBe('fallback-value');
    expect(runtimeState.readInjectedE2EValue).toBe(expectedEnvValue);
    expect(runtimeState.snapshotInjectedE2EValue).toBe(expectedEnvValue);
    expect(runtimeState.envSnapshotIsObject).toBe(true);
  });

});
