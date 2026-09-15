import {test, expect} from '@playwright/test';

test('Navigate to home page', async ({page}) =>{

    await page.goto('https://app.thetestingacademy.com/playwright');


})

test('Navigate using multiple roles', async({browser})=>{

    let adminContext = await browser.newContext();
    let userContext = await browser.newContext();
    let guestContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    let userPage = await userContext.newPage();
    let guestPage = await guestContext.newPage();

    await adminPage.goto('https://app.thetestingacademy.com/playwright');
    await userPage.goto('https://sdet.live/');
    await guestPage.goto('https://scrolltest.com/');

    await adminPage.waitForTimeout(2000);
    await adminPage.close();
    await userPage.waitForTimeout(2000);
    await userPage.close();
    await guestPage.waitForTimeout(2000);
    await guestPage.close();



})