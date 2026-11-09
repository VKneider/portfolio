import { test, expect } from '@playwright/test';

// The Icon component moved from the two-style `slc` font to Lucide inline SVG.
// A font-based regression is silent (the records load, the glyphs just stay
// blank), so this walks the public routes and checks the rendered geometry.
const ROUTES = [
  '/',
  '/experience',
  '/education',
  '/projects',
  '/slice-js',
  '/teaching',
  '/contact',
];

test('every icon renders as an inline SVG with real geometry', async ({ page }) => {
  const warnings = [];
  const fontRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'warning' && msg.text().includes('[Icon]')) warnings.push(msg.text());
  });
  page.on('request', (request) => {
    if (/\/fonts\/slc\//.test(request.url())) fontRequests.push(request.url());
  });

  for (const route of ROUTES) {
    await page.goto(route);
    await page.waitForFunction(
      () => window.slice && window.slice._mode !== undefined,
      { timeout: 15_000 }
    );

    const icons = page.locator('slice-icon');
    const count = await icons.count();

    for (let index = 0; index < count; index += 1) {
      const shape = await icons.nth(index).evaluate((host) => {
        const svg = host.querySelector('svg');
        return {
          hasSvg: Boolean(svg),
          children: svg ? svg.childElementCount : 0,
          viewBox: svg?.getAttribute('viewBox') ?? '',
          stroke: svg?.getAttribute('stroke') ?? '',
          ariaHidden: host.getAttribute('aria-hidden'),
          role: host.getAttribute('role'),
          ariaLabel: host.getAttribute('aria-label'),
          fontSize: getComputedStyle(host).fontSize,
        };
      });

      expect(shape.hasSvg, `${route}: icon has no <svg>`).toBe(true);
      expect(shape.children, `${route}: icon has an empty <svg>`).toBeGreaterThan(0);
      expect(shape.viewBox, `${route}: icon has no viewBox`).toMatch(/^0 0 \d+ \d+$/);
      expect(shape.fontSize, `${route}: icon has no size`).not.toBe('0px');
      expect(
        shape.ariaHidden === 'true' || (shape.role === 'img' && Boolean(shape.ariaLabel)),
        `${route}: icon is neither hidden nor labelled`
      ).toBe(true);
    }
  }

  expect(warnings, 'unknown icon names were requested').toEqual([]);
  expect(fontRequests, 'the old slc font must not be requested').toEqual([]);
});
