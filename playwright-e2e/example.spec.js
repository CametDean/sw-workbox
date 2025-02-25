// @ts-check
import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

const setBrowerContext = async () => {
  const browser = await chromium.launch();
  return await browser.newContext();
}

test.describe('Tests avec Playwright', () => {
  test('test sur le localhost', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Click the get started link.
    await page.getByRole('button', { name: 'Télécharger la liste de livres' }).click();

    // Expects page to have "Harry Potter" name
    await expect(page.getByText('Harry Potter')).toBeVisible();
  });

  test.describe('En mode hors-ligne', () => {

    test.beforeEach(async ({ page }) => {
      // Va sur la page
      await page.goto('http://localhost:5173/');

      // Clique sur le bouton
      await page.getByRole('button', { name: 'Télécharger la liste de livres' }).click();

      // Simule le mode hors-ligne
      const context = await setBrowerContext();
      await context.setOffline(true);

    })

    test('En mode hors-ligne, au click sur le lien "Details", on est redirigé vers la page de détails', async ({ page }) => {
      await page.getByRole('link', { name: 'Details' }).nth(0).click();

      await expect(page.getByRole('heading', { name: 'ISBN' })).toBeVisible();
    });
  })
})
