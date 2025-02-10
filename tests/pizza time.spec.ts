// import { test, expect } from '@playwright/test';
import { test, expect } from 'playwright-test-coverage';

test('load', async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

