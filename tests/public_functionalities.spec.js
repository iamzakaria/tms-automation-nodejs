import { test, expect } from '@playwright/test';

// Define the base URL for the application
const BASE_URL = 'https://dev-training.sla.gov.bd/';

test.describe('Homepage Functionalities', () => {

  // Before each test, navigate to the base URL
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  // Test: Verify Homepage Title
  test('SLA Training Homepage', async ({ page }) => {
    const pageTitle = await page.title();
    console.log('Page Title Is: ' + pageTitle);
    expect(pageTitle).toContain('SLA TMS'); // Add an assertion to verify the page title
  });

  // Test: Explore Trainings button functionality
  test('Explore Trainings', async ({ page }) => {
    await page.getByRole('button', { name: 'Explore Trainings' }).click();
    console.log(`Explore Button is Functional at ${BASE_URL}`);
  });

  // Test: Navigate to ACMP Training
  test('Navigate to ACMP Training', async ({ page }) => {
    await page.getByRole('link', { name: 'ACMP Training' }).click();
    
    // Add an assertion to verify that the ACMP Training page is loaded
    await expect(page).toHaveURL(/.*acmp-training/);
  });

  // Test: Navigate to Student Training
  test('Navigate to Student Training', async ({ page }) => {
    await page.getByRole('link', { name: 'Student Training' }).click();
    
    // Add an assertion to verify that the Student Training page is loaded
    await expect(page).toHaveURL(/.*student-training/);
    await page.getByText('VIEW ALL TRACKS').click();
    console.log('Button visible');
    await expect(page).toHaveURL(/.*all-tracks/);
  });


  // Test: Navigate to Govt. Training
  test('Navigate to Govt. Training', async ({ page }) => {
    await page.getByRole('link', { name: 'Govt. Training' }).click();
    await expect(page).toHaveURL(/.*govt-training/);
  });

  // Test: Navigate to Hire and Train
  test('Navigate to Hire and Train', async ({ page }) => {
    await page.getByRole('link', { name: 'Hire and Train' }).click();
    await expect(page).toHaveURL(/.*hat-training/);
  });

});