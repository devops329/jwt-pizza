import { test, expect } from "playwright-test-coverage";

test('register', async ({ page }) => {
  await page.goto('/');
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').click();
  await page.getByPlaceholder('Full name').fill('aws');
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('aws@jwt.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('aws');
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^Password$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});