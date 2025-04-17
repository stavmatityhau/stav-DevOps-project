// tests/e2e/e2eTests.test.js
const { test, expect } = require('@playwright/test');

test.describe('React App E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // נווט לדף הבית לפני כל בדיקה
    await page.goto('http://localhost:3000');
  });

  test('should load homepage successfully', async ({ page }) => {
    // בדוק שכותרת הדף היא "My DevOps Project"
    await expect(page).toHaveTitle('My DevOps Project');
    
    // בדוק שה-header מכיל את הכותרת "My Website"
    const headerHeading = page.locator('header h1');
    await expect(headerHeading).toBeVisible();
    await expect(headerHeading).toHaveText('My Website');
    
    // בדוק שהתוכן הראשי מכיל את הכותרת "Welcome to My Website"
    const mainHeading = page.locator('main h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Welcome to My Website');
  });

  test('should have navigation links', async ({ page }) => {
    // בדוק שיש קישורי ניווט בדף
    const homeLinks = page.locator('a:text("Home")');
    const aboutLinks = page.locator('a:text("About")');
    const contactLinks = page.locator('a:text("Contact")');
    
    // בדוק שהקישורים קיימים (יש מהם שניים בגלל הניווט הכפול)
    await expect(homeLinks).toHaveCount(2);
    await expect(aboutLinks).toHaveCount(2);
    await expect(contactLinks).toHaveCount(2);
    
    // בדוק שהקישורים מובילים ליעדים הנכונים
    await expect(homeLinks.first()).toHaveAttribute('href', '/');
    await expect(aboutLinks.first()).toHaveAttribute('href', '/about');
    await expect(contactLinks.first()).toHaveAttribute('href', '/contact');
  });

  test('should navigate to about page', async ({ page }) => {
    // לחץ על קישור About הראשון
    await page.locator('a:text("About")').first().click();
    
    // בדוק שה-URL השתנה
    await expect(page).toHaveURL(/.*\/about/);
  });

  test('should navigate to contact page', async ({ page }) => {
    // לחץ על קישור Contact הראשון
    await page.locator('a:text("Contact")').first().click();
    
    // בדוק שה-URL השתנה
    await expect(page).toHaveURL(/.*\/contact/);
  });

  test('should navigate back to home', async ({ page }) => {
    // נווט לדף About
    await page.locator('a:text("About")').first().click();
    
    // נווט בחזרה לדף הבית
    await page.locator('a:text("Home")').first().click();
    
    // בדוק שה-URL חזר לדף הבית
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('should have footer with copyright', async ({ page }) => {
    // בדוק שיש footer עם טקסט זכויות יוצרים
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('© 2025 My DevOps Project');
  });

  test('should have correct styling applied', async ({ page }) => {
    // בדוק שה-header משתמש ב-class הנכון
    const header = page.locator('header');
    await expect(header).toHaveClass(/header/);
    await expect(header).toHaveClass(/App-header/);
    
    // בדוק שה-footer משתמש ב-class הנכון
    const footer = page.locator('footer');
    await expect(footer).toHaveClass(/App-footer/);
  });

  test('should have correct page structure', async ({ page }) => {
    // בדוק שכל האלמנטים העיקריים קיימים
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // וודא שיש תוכן בדף
    const content = await page.textContent('body');
    expect(content.length).toBeGreaterThan(0);
  });
  
  // בדיקת רספונסיביות בסיסית
  test('should be responsive', async ({ page }) => {
    // שנה את גודל החלון לגודל נייד
    await page.setViewportSize({ width: 375, height: 667 });
    
    // בדוק שהאלמנטים העיקריים עדיין נראים
    const header = page.locator('header');
    const footer = page.locator('footer');
    
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
    
    // שנה את גודל החלון בחזרה לגודל דסקטופ
    await page.setViewportSize({ width: 1280, height: 720 });
  });
});