import { test, expect } from '@playwright/test';

const HERO_ITEMS = [
  '.profile-image',
  '.hero-text h1',
  '.hero-tablist',
  '.hero-lede',
  '.cta-buttons',
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'short laptop', width: 1280, height: 600 },
  { name: 'portrait phone', width: 375, height: 667 },
  { name: 'small portrait phone', width: 320, height: 568 },
  { name: 'landscape phone', width: 667, height: 375 },
];

test.describe('Hero fits inside the first viewport', () => {
  for (const viewport of VIEWPORTS) {
    test(`${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const hero = page.locator('.hero-section');
      await expect(hero).toBeVisible({ timeout: 15_000 });
      await expect(page.locator('.cta-buttons')).toBeVisible({ timeout: 15_000 });

      // fitHeroToViewport() runs after the hero content is built and the web
      // fonts settle; measure once that pass has landed, not on first paint.
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(250);

      const result = await page.evaluate((selectors) => {
        const heroRect = document.querySelector('.hero-section').getBoundingClientRect();
        const items = selectors.map((selector) => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return {
            selector,
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
          };
        });

        return {
          heroTop: heroRect.top,
          heroBottom: heroRect.bottom,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          outside: items.filter((item) =>
            item.top < -1
            || item.bottom > window.innerHeight + 1
            || item.left < -1
            || item.right > window.innerWidth + 1
          ),
        };
      }, HERO_ITEMS);

      expect(result.heroTop).toBeGreaterThanOrEqual(0);
      expect(result.heroBottom).toBeLessThanOrEqual(result.viewportHeight + 1);
      expect(result.outside).toEqual([]);
    });
  }
});
