import {test, expect} from '@playwright/test';

test('CURA Healthcare Service Appointment', async ({ page }) => {

    
        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await page.locator("#btn-make-appointment").click();
        await page.locator("#txt-username").fill("John Doe");
        await page.locator("#txt-password").fill("ThisIsNotAPassword");
        await page.locator("#btn-login").click();
        const appointment_heading = page.locator('section h2');
        //const appointment_heading = page.locator('#appointment > div > div > div > h2');
        console.log(await appointment_heading.textContent());
        const page_url = page.url();
        expect(page_url).toBe("https://katalon-demo-cura.herokuapp.com/#appointment");
        await page.pause()
        
    });
