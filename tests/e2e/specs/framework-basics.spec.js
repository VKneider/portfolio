import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;

test.describe('Framework basics', () => {

  test('App loads at / without fatal console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // Include location URL so we can filter by origin
        const loc = msg.location();
        errors.push({ text: msg.text(), url: loc?.url ?? '' });
      }
    });
    page.on('pageerror', err => errors.push({ text: err.message, url: '' }));

    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    // Filter out known non-fatal network errors that don't affect functionality
    const fatalErrors = errors.filter(({ text, url }) =>
      !url.includes('favicon') &&
      !text.includes('favicon') &&
      !url.includes('manifest') &&
      !text.includes('manifest') &&
      !url.includes('service-worker') &&
      !text.includes('service-worker')
    );
    expect(fatalErrors).toHaveLength(0);
  });

  test('window.slice is initialized with required properties', async ({ page }) => {
    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    const sliceState = await page.evaluate(() => ({
      hasController: !!window.slice.controller,
      hasStylesManager: !!window.slice.stylesManager,
      hasPaths: !!window.slice.paths,
      modeIsString: typeof window.slice._mode === 'string',
      isProductionIsBoolean: typeof window.slice.isProduction() === 'boolean',
    }));

    expect(sliceState.hasController).toBe(true);
    expect(sliceState.hasStylesManager).toBe(true);
    expect(sliceState.hasPaths).toBe(true);
    expect(sliceState.modeIsString).toBe(true);
    expect(sliceState.isProductionIsBoolean).toBe(true);
  });

  test('Direct route /experience is accessible via SPA fallback', async ({ page }) => {
    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    await page.goto('/experience');
    expect(page.url()).toContain('/experience');

    // SPA fallback serves index.html — page should have a title, not a 404
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).not.toBe('');
  });

});
