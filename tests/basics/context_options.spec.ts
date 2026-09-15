import {test, expect} from '@playwright/test';

test('Context options',async({browser})=>{

    const iPhone = {

        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'  ,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        browserName: 'chromium',
        

    }
    const iPhoneContext = await browser.newContext(iPhone);
    iPhoneContext.setDefaultTimeout(10000);
    const iPhonePage = await iPhoneContext.newPage();
    await iPhonePage.goto('https://app.thetestingacademy.com/playwright');
    await iPhonePage.waitForTimeout(2000);
    await iPhonePage.close();
    await iPhoneContext.close();

})

test('Context options with geolocation',async({browser})=>{

  const context = {
     viewport: { width: 1280, height: 720 },
     geolocation: { latitude: 37.7749, longitude: -122.4194 },
     permissions: ['geolocation'],
     timezoneId: 'America/Los_Angeles',
     locale: 'en-US',
     headless: true,
}
   //const browserContext = await browser.newContext()
   const browserContext = await browser.newContext(context);  
   
   const page = await browserContext.newPage();

   await page.goto('https://app.thetestingacademy.com/playwright');
   await page.waitForTimeout(2000);



})