import { test, expect } from '@playwright/test';

// Define the base URL for the application
const BASE_URL = 'https://dev-training.sla.gov.bd/';

test.describe('Login Functionalities', () => {

  // Before each test, navigate to the base URL
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // Test: Sign in with invalid credentials and verify error
  test('Sign in with invalid credentials and verify error', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    
    // Fill in the login form with invalid credentials
    await page.getByPlaceholder('Email Address').fill('gov@mail.com');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'SIGN IN' }).click();
    
    // Verify the error message
    const errorMessage = page.getByText('Invalid Email Address or Password');
    await expect(errorMessage).toBeVisible();
  });

  // Test: Sign in with valid credentials
  test('Sign in with valid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    
    // Fill in the login form with valid credentials
    await page.getByPlaceholder('Email Address').fill('gov@trainee.com');
    await page.getByPlaceholder('Password').fill('123456a@R');
    await page.getByRole('button', { name: 'SIGN IN' }).click();

    // Verify successful login by checking for a dashboard URL or a specific element
    await expect(page).toHaveURL(/.*my-profile/);
  });

});