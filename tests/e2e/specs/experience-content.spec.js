import { test, expect } from '@playwright/test';

const CASES = [
  {
    path: '/experience',
    position: 'Computer Engineer - AIT Department Internship',
    description: /Information and Technology \(AIT\) Department of Propilven/i,
  },
  {
    path: '/es/experience',
    position: 'Ingeniero en Computación - Pasantía en el departamento AIT',
    description: /departamento de Información y Tecnología \(AIT\) de Propilven/i,
  },
];

test.describe('Experience content keeps the Propilven internship', () => {
  for (const experience of CASES) {
    test(`${experience.path} renders the full company and internship details`, async ({ page }) => {
      await page.goto(experience.path);

      const tab = page.locator('slice-experience-section .tab-button', { hasText: /PROPILVEN/ });
      await expect(tab).toBeVisible({ timeout: 15_000 });
      await tab.click();

      const card = page.locator('slice-experience-card', { hasText: /PROPILVEN/ });
      await expect(card).toBeVisible();
      await expect(card).toContainText('Polipropileno de Venezuela (PROPILVEN, S.A.)');
      await expect(card).toContainText(experience.position);
      await expect(card).toContainText(experience.description);
      await expect(card).toContainText('Windows Server');
      await expect(card).toContainText('System Administration');
    });
  }
});
