import { test, expect } from '@playwright/test';

test('Auto-login to admin dashboard', async ({ page }) => {
  // Go to site and set API key in localStorage
  await page.goto('http://localhost:5174');
  await page.evaluate(() => {
    localStorage.setItem('adminApiKey', 'jZFBzj95wKjoQAXUkM1noxkUWsBoa2ofDWBqzRxfRqo');
  });
  await page.goto('http://localhost:5174/dashboard');
  
  // Verify we're logged in
  await expect(page.locator('text=BrightSmile')).toBeVisible({ timeout: 5000 });
  console.log('✓ Auto-logged in successfully!');
});
