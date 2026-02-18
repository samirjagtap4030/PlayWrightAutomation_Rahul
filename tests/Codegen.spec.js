import { test, expect } from '@playwright/test';// //46 Codgen-using codegen you can generate script for end to end test with help of playwright inspector
// npx playwright test Codegen1.spec.js

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await expect(page.locator('tbody')).toContainText('iphone X');
  await expect(page.getByRole('link', { name: 'Samsung Note' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByText('Please choose your delivery')).toBeVisible();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('ind');// , { delay: 250 }
  await page.getByText('India').click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
});


/*
//46 Codgen-using codegen you can generate script for end to end test with help of playwright inspector
identify end to end test 
command- npx playwright codegen https://rahulshettyacademy.com/angularpractice/   
generate script in playwrite inspector
copy script from PInsp and paste in ide
run test

*/