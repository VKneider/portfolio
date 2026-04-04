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
    // Wait directly for the flags to be set — init() now relies on the bundle's
    // auto-registration block (not an explicit registerBundle() call), so we must
    // wait for the flag itself rather than the earlier _mode sentinel.
    await page.waitForFunction(
      () => window.slice?.controller?.criticalBundleLoaded === true,
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

  test('production mode: no duplicate bundle registration (registerBundle called once per bundle)', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    // Intercept console.log to count "Registering bundle:" messages
    const registrationLogs = [];
    page.on('console', msg => {
      if (msg.text().includes('Registering bundle:')) {
        registrationLogs.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    // Each bundle should be registered exactly once — no duplicates
    const uniqueLogs = new Set(registrationLogs);
    expect(registrationLogs.length).toBe(uniqueLogs.size);
  });

  // Intentionally runs against both dev-mode and production-mode servers — parallelism
  // applies to both since init() always fetches both JSON files regardless of mode.
  test('parallel fetch: slice-env.json and bundle.config.json are fetched in parallel', async ({ page }) => {
    let configRequestedAt = null;
    let envCompletedAt = null;

    // Delay slice-env.json by 300ms to create a detectable sequential gap
    await page.route('**/slice-env.json', async route => {
      await new Promise(r => setTimeout(r, 300));
      envCompletedAt = Date.now();
      await route.continue();
    });

    page.on('request', req => {
      if (req.url().includes('bundle.config.json')) {
        configRequestedAt = Date.now();
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    expect(configRequestedAt).not.toBeNull();
    // If sequential: bundle.config.json starts AFTER env.json finishes (configRequestedAt > envCompletedAt)
    // If parallel:   bundle.config.json starts BEFORE env.json finishes (configRequestedAt < envCompletedAt)
    expect(configRequestedAt).toBeLessThan(envCompletedAt);
  });

  test('production mode: critical bundle download starts in parallel with framework bundle', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    let criticalRequestedAt = null;
    let frameworkCompletedAt = null;

    // Delay framework bundle response by 300ms to create a detectable sequential gap
    await page.route('**/slice-bundle.framework*', async route => {
      await new Promise(r => setTimeout(r, 300));
      frameworkCompletedAt = Date.now();
      await route.continue();
    });

    page.on('request', req => {
      // Guard: capture only the first request (the pre-fetch from init()).
      // Without this, the second request triggered by await import(criticalUrl)
      // would overwrite criticalRequestedAt with a later timestamp, making the
      // parallel assertion pass even if the pre-fetch never actually fired.
      if (req.url().includes('slice-bundle.critical') && criticalRequestedAt === null) {
        criticalRequestedAt = Date.now();
      }
    });

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice?.controller?.criticalBundleLoaded === true,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    expect(criticalRequestedAt).not.toBeNull();
    // If sequential: critical bundle starts AFTER framework finishes (criticalRequestedAt > frameworkCompletedAt)
    // If parallel:   critical bundle starts BEFORE framework finishes (criticalRequestedAt < frameworkCompletedAt)
    expect(criticalRequestedAt).toBeLessThan(frameworkCompletedAt);
  });

});


