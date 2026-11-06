import { test, expect } from '@playwright/test';

test('PWA uses the official brand icons and theme colors', async ({ page }) => {
  await page.goto('/');

  const themeColor = page.locator('meta[name="theme-color"]');
  const colorScheme = page.locator('meta[name="color-scheme"]');
  await expect(themeColor).toHaveAttribute('content', '#FAF7EE');
  await expect(colorScheme).toHaveAttribute('content', 'light');

  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]'))
    .toHaveAttribute('href', '/images/favicon.svg');
  await expect(page.locator('link[rel="icon"][type="image/x-icon"]'))
    .toHaveAttribute('href', '/images/favicon.ico');
  await expect(page.locator('link[rel="apple-touch-icon"]'))
    .toHaveAttribute('href', '/images/apple-touch-icon.png');

  const manifest = await page.evaluate(async () => (await fetch('/manifest.json')).json());
  expect(manifest.background_color).toBe('#FAF7EE');
  expect(manifest.theme_color).toBe('#FAF7EE');
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ src: '/images/pwa/icon-192.png', sizes: '192x192' }),
    expect.objectContaining({ src: '/images/pwa/icon-512.png', sizes: '512x512' }),
    expect.objectContaining({ src: '/images/pwa/icon-maskable-192.png', purpose: 'maskable' }),
    expect.objectContaining({ src: '/images/pwa/icon-maskable-512.png', purpose: 'maskable' }),
  ]));

  const assetStatuses = await page.evaluate(async (urls) => {
    const entries = await Promise.all(urls.map(async (url) => {
      const response = await fetch(url, { cache: 'no-store' });
      return [url, response.status];
    }));
    return Object.fromEntries(entries);
  }, [
    '/images/favicon.svg',
    '/images/favicon.ico',
    '/images/apple-touch-icon.png',
    ...manifest.icons.map((icon) => icon.src),
  ]);
  expect(Object.values(assetStatuses).every((status) => status === 200)).toBe(true);

  await page.locator('slice-theme-selector .theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Dark');
  await expect(themeColor).toHaveAttribute('content', '#1E1B4B');
  await expect(colorScheme).toHaveAttribute('content', 'dark');
});
