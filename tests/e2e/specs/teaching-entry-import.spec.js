import { test, expect } from '@playwright/test';

const SLICE_INIT_TIMEOUT = 15_000;
const TEACHING_PATHS = ['/', '/teaching', '/teaching/pr2', '/teaching/components'];

// Works in both modes: dev-mode has no critical bundle, so `_mode` is the only
// sentinel both servers set.
const waitForApp = (page) =>
  page.waitForFunction(
    () => window.slice && window.slice._mode !== undefined,
    { timeout: SLICE_INIT_TIMEOUT }
  );

test.describe('Teaching data import', () => {

  // Regression: src/App/index.js used to import the course data from
  // ../Components/... The entry point belongs to no route bundle, so the build
  // kept that import verbatim and the browser requested
  // /Components/AppComponents/TeachingIndex/data/teaching.js at runtime, which
  // production does not serve (404). The components that render the data now
  // own document.title instead.
  test('production mode: no runtime request to /Components/**', async ({ page, baseURL }) => {
    test.skip(!baseURL?.includes('3002'), 'Only runs against the production-mode server');

    const componentRequests = [];
    page.on('request', req => {
      const { pathname } = new URL(req.url());
      if (pathname.startsWith('/Components/')) componentRequests.push(pathname);
    });

    for (const path of TEACHING_PATHS) {
      await page.goto(path);
      await waitForApp(page);
      await page.waitForTimeout(250);
    }

    expect(
      componentRequests,
      `Unexpected /Components/** requests: ${componentRequests.join(', ')}`
    ).toHaveLength(0);
  });

  test('teaching index lists every course', async ({ page }) => {
    await page.goto('/teaching');
    await waitForApp(page);

    await expect(page.locator('.teaching-card')).toHaveCount(3);
    await expect(page.locator('.teaching-card__name')).toHaveText([
      'Programming 2',
      'Client-Side Web Development',
      'Component-Based Programming'
    ]);
  });

  test('teaching index sets its own document title', async ({ page }) => {
    await page.goto('/teaching');
    await waitForApp(page);
    await expect(page).toHaveTitle(/^Teaching \| /);
  });

  test('course page renders the syllabus and sets a course-specific title', async ({ page }) => {
    await page.goto('/teaching/pr2');
    await waitForApp(page);

    await expect(page.locator('.teaching-course__name')).toContainText('Programming 2');
    await expect(page.locator('.teaching-unit')).toHaveCount(6);
    await expect(page).toHaveTitle(/^Programming 2 \| Teaching \| /);
  });

  test('unknown course slug renders the not-found state and title', async ({ page }) => {
    await page.goto('/teaching/does-not-exist');
    await waitForApp(page);

    await expect(page.locator('.teaching-course__not-found')).toBeVisible();
    await expect(page).toHaveTitle(/^Course Not Found \| Teaching \| /);
  });

  test('client-side navigation to another course refreshes title and content', async ({ page }) => {
    await page.goto('/teaching');
    await waitForApp(page);
    await expect(page.locator('.teaching-card')).toHaveCount(3);

    await page.locator('.teaching-card__link', { hasText: 'Component-Based Programming' }).click();
    await expect(page).toHaveURL(/\/teaching\/components$/);
    await expect(page.locator('.teaching-course__name')).toContainText('Component-Based Programming');
    await expect(page).toHaveTitle(/^Component-Based Programming \| Teaching \| /);
  });

});
