// @ts-check
import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

const setBrowerContext = async () => {
  const browser = await chromium.launch();
  return await browser.newContext();
}

test.describe('Tests avec Playwright', () => {
  
  test.describe('En mode hors-ligne', () => {
    
    test.only('test de la stratégie Stale While Revalidate', async () => {
      // Stocke le contexte du navigateur
      const context = await setBrowerContext();
      const page = await context.newPage();
      
      // Va sur la page
      await page.goto('http://localhost:5173/');

      await expect(page.getByRole('heading', { name: 'Ma liste de livres' })).toBeVisible();

      // Simule le mode hors-ligne
      await context.setOffline(true);
      
      //await page.reload();
      
      await expect(page.getByRole('heading', { name: 'Ma liste de livres' })).toBeVisible();

      // Clique sur le bouton
      await page.getByRole('button', { name: 'Télécharger la liste de livres'}).click();

      // On veut une erreur 
      await expect(page.getByTestId('error-message')).toBeVisible();
      
      
      // Simule le mode online
      await context.setOffline(false);

      // Clique sur le bouton
      await page.getByRole('button', { name: 'Télécharger la liste de livres' }).click();

      // On veut le livre Harry Potter
      await expect(page.getByText('Harry Potter')).toBeVisible();

      // Rafraichit la page
      await page.goto('http://localhost:5173/');

      // Simule le mode hors-ligne
      await context.setOffline(true);

      // Clique sur le bouton
      await page.getByRole('button', { name: 'Télécharger la liste de livres' }).click();

      // On veut le livre Harry Potter
      await expect(page.getByText('Harry Potter')).toBeVisible();
    });
    
    /*test('Au click sur le lien "Details", on est redirigé vers la page de détails', async ({ page }) => {
      // Va sur la page
      await page.goto('http://localhost:5173/');

      // Clique sur le bouton
      await page.getByRole('button', { name: 'Télécharger la liste de livres' }).click();

      // Simule le mode hors-ligne
      const context = await setBrowerContext();
      await context.setOffline(true);
      
      await page.getByRole('link', { name: 'Details' }).nth(0).click();

      await expect(page.getByRole('heading', { name: 'ISBN' })).toBeVisible();
    });*/
  })
})
