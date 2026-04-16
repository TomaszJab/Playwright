import { test, expect } from '@playwright/test';

test('Built-in locators', async ({ page }) => {

  // wejście na stronę
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    { waitUntil: 'networkidle' }
  );

  // sprawdzenie logo
  await expect(
    page.getByAltText('company-branding')
  ).toBeVisible({ timeout: 10000 });

  // logowanie
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  // klik + czekanie na przejście do dashboard
  await Promise.all([
    page.waitForURL('**/dashboard**'),
    page.getByRole('button', { type: 'submit' }).click()
  ]);

  // locator użytkownika
  const nameLocator = page.locator('.oxd-userdropdown-name');

  // czekamy aż będzie widoczny
  await expect(nameLocator).toBeVisible({ timeout: 10000 });

  // pobranie tekstu
  const name = await nameLocator.innerText();

  // finalne sprawdzenie
  await expect(page.getByText(name)).toBeVisible();

});