import { test, expect } from '@playwright/test';

test('WhatIsSlice renders the two 3D logos and stays theme-aware', async ({ page }) => {
  await page.goto('/slice-js');

  const stage = page.locator('slice-logostage');
  await expect(stage).toBeVisible({ timeout: 15_000 });
  await expect(stage).toHaveAttribute('data-state', 'ready', { timeout: 30_000 });

  const stageLabel = stage.locator('.logostage');
  await expect(stageLabel).toHaveAttribute('aria-label', /Slice\.js/);

  const canvas = await page.evaluate(() => {
    const element = document.querySelector('slice-logostage canvas');
    return {
      width: element.width,
      height: element.height,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
    };
  });
  expect(canvas.width).toBeGreaterThan(0);
  expect(canvas.height).toBeGreaterThan(0);
  expect(canvas.clientWidth).toBeGreaterThan(0);
  expect(canvas.clientHeight).toBeGreaterThan(0);

  await expect(stage.locator('.logostage__fallback')).toHaveCSS('opacity', '0');

  await page.locator('slice-theme-selector .theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Dark');
  await expect(stage).toHaveAttribute('data-state', 'ready');

  const darkCanvas = await page.evaluate(() => {
    const element = document.querySelector('slice-logostage canvas');
    return { width: element.width, height: element.height };
  });
  expect(darkCanvas.width).toBeGreaterThan(0);
  expect(darkCanvas.height).toBeGreaterThan(0);
});

test('the slice logo can be dragged to rotate', async ({ page }) => {
  test.slow();
  await page.goto('/slice-js');

  const stage = page.locator('slice-logostage');
  await expect(stage).toHaveAttribute('data-state', 'ready', { timeout: 30_000 });

  const canvas = stage.locator('canvas');
  const box = await canvas.boundingBox();

  let dragged = false;
  for (let x = 0.2; x <= 0.55 && !dragged; x += 0.05) {
    for (let y = 0.2; y <= 0.6 && !dragged; y += 0.05) {
      await page.mouse.move(box.x + box.width * x, box.y + box.height * y);
      await page.waitForTimeout(20);

      const hoveringSlice = await stage.locator('.logostage').evaluate((element) => element.classList.contains('is-slice-hover'));
      if (!hoveringSlice) continue;

      await page.mouse.down();
      await page.waitForTimeout(20);
      const isDragging = await stage.locator('.logostage').evaluate((element) => element.classList.contains('is-slice-dragging'));
      if (!isDragging) {
        await page.mouse.up();
        continue;
      }

      const before = await stage.evaluate((element) => element._spin);
      await page.mouse.move(box.x + box.width * x + 120, box.y + box.height * y, { steps: 10 });
      const during = await stage.evaluate((element) => element._spin);
      await page.mouse.up();

      expect(during - before).toBeGreaterThan(0.5);
      await expect(page).toHaveURL(/\/slice-js$/);
      dragged = true;
    }
  }

  expect(dragged).toBe(true);
});

test('the vkneider mark is hoverable and navigates home', async ({ page }) => {
  await page.goto('/slice-js');

  const stage = page.locator('slice-logostage');
  await expect(stage).toHaveAttribute('data-state', 'ready', { timeout: 30_000 });

  const canvas = page.locator('slice-logostage canvas');
  const box = await canvas.boundingBox();

  let hovered = false;
  let hitPoint = null;
  for (let x = 0.55; x <= 0.92 && !hovered; x += 0.05) {
    for (let y = 0.5; y <= 0.88 && !hovered; y += 0.05) {
      await page.mouse.move(box.x + box.width * x, box.y + box.height * y);
      await page.waitForTimeout(20);
      hovered = await stage.locator('.logostage').evaluate((element) => element.classList.contains('is-brand-hover'));
      if (hovered) hitPoint = { x, y };
    }
  }

  expect(hovered).toBe(true);
  await expect(stage.locator('.logostage')).toHaveCSS('cursor', 'pointer');

  await page.mouse.click(box.x + box.width * hitPoint.x, box.y + box.height * hitPoint.y);
  await expect(page).toHaveURL(/\/$/);
});
