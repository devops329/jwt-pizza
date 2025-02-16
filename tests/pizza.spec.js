import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.go
  await page.goto('chrome-error://chromewebdata/');to('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('buy pizza with login', async ({ page }) => {
  
});