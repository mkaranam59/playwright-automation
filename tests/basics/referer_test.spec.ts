import { test, expect} from '@playwright/test';

test("set referer for entire context", async ({ browser }) => {
    
    let context = await browser.newContext({
        extraHTTPHeaders: {
            "Referer": "https://thetestingacademy.com"
        }
    });
    let page = await context.newPage();
await page.goto("https://app.vwo.com/#login");
    page.on('request', async (request) => {
    console.log(`\n--- Headers for Request: ${request.url()} ---`);
    
    // allHeaders() returns an object with lower-cased header names
    const headers = await request.allHeaders(); 
    console.log(headers);

    // Alternative: Use request.headersArray() if you need original casing
    // const headersArray = await request.headersArray();
    // console.log(headersArray);
  });
    
    
    //console.log(await page.getAttribute('header', 'Referer')); // Outputs: https://thetestingacademy.com
    console.log("Page 1 — partner referer included");
    await page.goto("https://katalon-demo-cura.herokuapp.com/profile.php#login");
    console.log("Page 2 — partner referer included");


});