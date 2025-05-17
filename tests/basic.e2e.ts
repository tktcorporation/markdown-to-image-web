import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows initial markdown', async ({ page }) => {
  await expect(page.locator('div.prose h1')).toHaveText('Welcome to Markdown to Image');
});

test('updates preview when typing', async ({ page }) => {
  const textarea = page.locator('textarea[placeholder="Enter your markdown here..."]');
  await textarea.fill('# Hello');
  await expect(page.locator('div.prose h1')).toHaveText('Hello');
});

test('changes theme via selector', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Light' });
  await button.click();
  await page.getByRole('option', { name: 'Dark' }).click();
  await expect(page.getByRole('button', { name: 'Dark' })).toBeVisible();
});

test('downloads image on export', async ({ page }) => {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.png$/);
});

test('shows toast when copying image', async ({ page }) => {
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Image copied to clipboard')).toBeVisible();
});
