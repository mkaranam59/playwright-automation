import {test,expect} from '@playwright/test';
test.describe('Login page',()=>{
    test('Validate login functionality', async ({ page }) => {

        page.goto('https://www.amazon.in/');
        page.locator('#nav-link-accountList-nav-line-1').click();
        page.locator('#ap_email_login').fill('9966355883');
        page.locator('#continue').click();


        // never executes
    });
    test('Invalid login functionality', async ({ page }) => {
         page.goto('https://www.amazon.in/');
          page.locator('#nav-link-accountList-nav-line-1').click();
        page.locator('#ap_email_login').fill('9966355883');
        page.locator('#continue').click();
        // never executes
    })
})