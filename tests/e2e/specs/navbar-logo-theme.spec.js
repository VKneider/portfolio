import { test, expect } from '@playwright/test';

test('navbar swaps to the brand mark that matches the active theme', async ({ page }) => {
  await page.goto('/');

  const lightMark = page.locator('slice-nav-bar .logo-mark--light');
  const darkMark = page.locator('slice-nav-bar .logo-mark--dark');

  await expect(lightMark).toBeVisible({ timeout: 15_000 });
  await expect(darkMark).toBeHidden();

  await page.locator('slice-theme-selector .theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Dark');
  await expect(darkMark).toBeVisible();
  await expect(lightMark).toBeHidden();

  await page.locator('slice-theme-selector .theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-slice-theme', 'Light');
  await expect(lightMark).toBeVisible();
  await expect(darkMark).toBeHidden();
});
