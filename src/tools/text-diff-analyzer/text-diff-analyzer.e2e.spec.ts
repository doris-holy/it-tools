import { test, expect } from '@playwright/test';

test.describe('Tool - Text diff analyzer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/text-diff-analyzer');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Text diff analyzer - IT Tools');
  });

  test('', async ({ page }) => {

  });
});