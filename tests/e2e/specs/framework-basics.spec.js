import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;

function setupErrorCollector(page) {
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const loc = msg.location();
      errors.push({ text: msg.text(), url: loc?.url ?? '' });
    }
  });

  page.on('pageerror', err => {
    errors.push({ text: err.message, url: '' });
  });

  return errors;
}

function getFatalErrors(errors) {
  return errors.filter(({ text, url }) =>
    !url.includes('favicon') &&
    !text.includes('favicon') &&
    !url.includes('manifest') &&
    !text.includes('manifest') &&
    !url.includes('service-worker') &&
    !text.includes('service-worker')
  );
}

function getDomPurifyFatalErrors(errors) {
  return errors.filter(({ text }) =>
    /sanitize\s+is\s+undefined|Error creating instance DomPurify/i.test(text)
  );
}

test.describe('Framework basics', () => {

  test('App loads at / without fatal console errors', async ({ page }) => {
    const errors = setupErrorCollector(page);

    await page.goto('/');

    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    // Filter out known non-fatal network errors that don't affect functionality
    const fatalErrors = getFatalErrors(errors);
    expect(fatalErrors).toHaveLength(0);
  });

  test('production mode: /dompurify is stable and sanitization works across revisits', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'production-mode', 'Only runs against the production-mode server');

    const errors = setupErrorCollector(page);

    await page.goto('/');
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: SLICE_INIT_TIMEOUT }
    );

    await page.goto('/dompurify');

    const demoRoot = page.locator('.dompurify');
    await expect(demoRoot).toBeVisible({ timeout: SLICE_INIT_TIMEOUT });

    const inputArea = demoRoot.locator('textarea');
    const sanitizeButton = demoRoot.getByRole('button', { name: /sanitize/i });
    await expect(inputArea).toBeVisible({ timeout: SLICE_INIT_TIMEOUT });
    await expect(sanitizeButton).toBeVisible({ timeout: SLICE_INIT_TIMEOUT });
    const status = demoRoot.getByText(/^Status:/);
    const sanitizedCodeOutput = demoRoot
      .locator('p', { hasText: 'Sanitized HTML (string output):' })
      .locator('xpath=following-sibling::pre[1]');

    const rawPayload = `<div>safe</div><script>alert('xss')</script>`;
    await inputArea.fill(rawPayload);
    await sanitizeButton.click();

    const statusText = (await status.textContent()) || '';
    expect(statusText).toMatch(/status:/i);
    expect(statusText).not.toMatch(/no suspicious changes/i);

    const sanitizedOutput = await sanitizedCodeOutput.textContent();
    expect(sanitizedOutput).toBeTruthy();
    expect(sanitizedOutput).not.toContain('<script>');
    expect(sanitizedOutput?.trim()).not.toBe(rawPayload);

    await page.goto('/');
    await page.goto('/dompurify');
    await expect(demoRoot).toBeVisible();

    const revisitPayload = `<p>revisit-check</p><img src="x" onerror="alert('revisit')" />`;
    await inputArea.fill(revisitPayload);
    await sanitizeButton.click();

    const revisitStatusText = (await status.textContent()) || '';
    expect(revisitStatusText).toMatch(/status:/i);
    expect(revisitStatusText).not.toMatch(/no suspicious changes/i);

    const revisitSanitizedOutput = await sanitizedCodeOutput.textContent();
    expect(revisitSanitizedOutput).toBeTruthy();
    expect(revisitSanitizedOutput).toContain('revisit-check');
    expect(revisitSanitizedOutput).not.toContain('onerror=');
    expect(revisitSanitizedOutput?.trim()).not.toBe(revisitPayload);

    const fatalErrors = getFatalErrors(errors);
    const domPurifyFatal = getDomPurifyFatalErrors(fatalErrors);
    expect(domPurifyFatal).toHaveLength(0);
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
