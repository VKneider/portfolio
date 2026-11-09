import { test, expect } from '@playwright/test';

test('navbar swaps to the brand mark that matches the active theme', async ({ page }) => {
  await page.goto('/');

  await page.waitForFunction(
    () => window.slice && window.slice._mode !== undefined,
    { timeout: 15_000 }
  );

  const lightMark = page.locator('slice-nav-bar .logo-mark--light');
  const darkMark = page.locator('slice-nav-bar .logo-mark--dark');
  const themeToggle = page.locator('slice-theme-selector .theme-toggle');

  await expect(lightMark).toBeVisible({ timeout: 15_000 });
  await expect(darkMark).toBeHidden();
  await expect(themeToggle).toBeVisible({ timeout: 15_000 });

  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Dark');
  await expect(darkMark).toBeVisible();
  await expect(lightMark).toBeHidden();

  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Light');
  await expect(lightMark).toBeVisible();
  await expect(darkMark).toBeHidden();
});
