import { test, expect } from "playwright-test-coverage";

test('guest view check static pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByText('So you want a piece of the')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^If you are already a franchisee, pleaseloginusing your franchise account$/ }).nth(1)).toBeVisible();
  await expect(page.getByRole('main').locator('img')).toBeVisible();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our employees' })).toBeVisible();
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
  await expect(page.getByRole('main').getByRole('img')).toBeVisible();
  await page.goto('/apple');
  await expect(page.getByText('It looks like we have dropped a pizza on the floor. Please try another page.')).toBeVisible();
  await page.goto('/docs');
  await expect(page.getByText('Register a new user')).toBeVisible();
  await page.goto('/');
});