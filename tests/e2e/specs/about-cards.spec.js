import { test, expect } from '@playwright/test';

test('About cards use the current Card and do not clip their content', async ({ page }) => {
  await page.goto('/');

  const cards = page.locator('.about-content slice-card');
  await expect(cards).toHaveCount(3, { timeout: 15_000 });

  await cards.first().scrollIntoViewIfNeeded();
  await expect(cards.first()).toBeVisible();

  await expect(page.locator('.about-content slice-card .slice-card__mark slice-icon')).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('Software engineering');
  await expect(cards.nth(1)).toContainText('Teaching');
  await expect(cards.nth(2)).toContainText('Research & tooling');

  const layout = await cards.evaluateAll((elements) =>
    elements.map((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }))
  );

  for (const card of layout) {
    expect(card.scrollHeight).toBeLessThanOrEqual(card.clientHeight + 1);
    expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth + 1);
  }
});
