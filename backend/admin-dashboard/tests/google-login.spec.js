import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'mustafamemon265789@gmail.com';
const ADMIN_PASSWORD = 'Qnbm1234';

test.describe('Google OAuth Login', () => {
  test('should login with Google account and access admin dashboard', async ({ page }) => {
    await page.goto('/login');
    
    const googleButton = page.locator('button:has-text("Sign in with Google")');
    await expect(googleButton).toBeVisible();
    await googleButton.click();
    
    await page.waitForURL('**/accounts.google.com/**');
    
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.click('#identifierNext');
    
    await page.waitForSelector('input[type="password"]', { state: 'visible' });
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('#passwordNext');
    
    await page.waitForURL('**/login**api_key=**', { timeout: 30000 });
    
    await expect(page).toHaveURL(/.*\/dashboard.*/);
    await expect(page.locator('text=BrightSmile Admin')).toBeVisible();
  });
});
