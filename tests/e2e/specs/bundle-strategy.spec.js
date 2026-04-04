import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;

test.describe('Bundle loading strategy', () => {

  test('dev mode: framework bundle is NOT requested', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3001'), 'Only runs against the dev-mode server');

    const frameworkBundleRequests = [];
    page.on('response', resp => {
      if (resp.url().includes('slice-bundle.framework')) {
        frameworkBundleRequests.push(resp.url());
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    expect(frameworkBundleRequests).toHaveLength(0);
  });

  test('production mode: framework bundle IS requested and returns 200', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    const frameworkBundleResponses = [];
    page.on('response', resp => {
      if (resp.url().includes('slice-bundle.framework')) {
        frameworkBundleResponses.push({ url: resp.url(), status: resp.status() });
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    expect(frameworkBundleResponses.length).toBeGreaterThan(0);
    expect(frameworkBundleResponses[0].status).toBe(200);
  });

  test('production mode: criticalBundleLoaded flag is true after init', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    const flagsSet = await page.evaluate(() => ({
      criticalBundleLoaded: window.slice?.controller?.criticalBundleLoaded === true,
      loadedBundlesHasCritical: window.slice?.controller?.loadedBundles?.has('critical') === true,
    }));

    expect(flagsSet.criticalBundleLoaded).toBe(true);
    expect(flagsSet.loadedBundlesHasCritical).toBe(true);
  });

  test('production mode: bundle.config.json is fetched exactly once', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    const configFetches = [];
    page.on('request', req => {
      if (req.url().includes('bundle.config.json')) {
        configFetches.push(req.url());
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    expect(configFetches.length).toBe(1);
  });

});

