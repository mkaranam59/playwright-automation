import { test, expect } from '@playwright/test';
import { getTotal, getTotalSpent, getTotalEarned } from '../../utils/calclations';

test('Test menu with right click', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');
    await page.getByTestId('nav-add-ons').hover();
    await page.getByRole('menuitem', { name: 'Wi-Fi', exact: false }).click();
    await page.getByTestId('hover-output').isVisible();
    expect(await page.getByTestId('hover-output').textContent()).toContain('Wi-Fi');
    console.log(await page.getByTestId('hover-output').textContent());

    await page.pause();

});

test('Appli tools test with amounts', async ({ page }) => {
    await page.goto('https://demo.applitools.com');
    await page.getByPlaceholder('Username').fill('admin');       // verify selector against live page
    await page.getByPlaceholder('Password').fill('Password@123')
    await page.getByRole('link', { name: 'Sign in' }).click();
    const rows = await page.getByRole('row');
    const rowCount = await rows.count();
    console.log(`Number of rows: ${rowCount}`);
    const amounts: number[] = [];
    for (let i = 1; i < rowCount; i++) {
        const cells = await rows.nth(i).getByRole('cell').allTextContents();
        //console.log(`Row ${i} cells: ${cells}`);
        const rawAmount = cells[cells.length - 1]; // Assuming the last cell contains the amount
        const value = parseFloat(rawAmount.replace(/[^0-9.-]+/g, ""));
        amounts.push(value);
    }
    console.log(`Amounts: ${amounts}`);
    const totalAmount = await getTotal(amounts);
    const totalSpent = await getTotalSpent(amounts);
    const totalEarned = await getTotalEarned(amounts);
    console.log(`Total Spent: ${totalSpent}`);
    console.log(`Total Earned: ${totalEarned}`);
    console.log(`Total Amount: ${totalAmount}`);
    expect(totalAmount).toBeCloseTo(totalEarned + totalSpent, 2); // Adjust precision as needed
    await page.pause();

})

test('Amazon for keyboard and mouse events', async ({ page }) => {

    await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('searchbox').pressSequentially('Playwright wi', { delay: 10 });
    await page.getByRole('button', { name: 'playwright with', exact: false }).filter({ hasText: 'playwright with typescript' }).first().click();
    await page.pause();
});

test.describe('Test for JS alert', () => {
    test('JS alert test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.once('dialog',async(dialog)=>{
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();

        });
        await page.getByRole('button', { name: 'Click for JS Alert' }).click();
        await page.pause();
    });

    test('JS confirm test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');  
        page.once('dialog',async(dialog)=>{ 
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        }  );
        await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
        await page.pause(); 

    })

    test('JS Prompt for input test',async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        const inputText = 'Playwright is awesome';
        page.once('dialog',async(dialog)=>{
            console.log(`Dialog message: ${dialog.message()}`);
            console.log(`Dialog type: ${dialog.type()}`);
            //await dialog.type('Playwright is awesome');
            await dialog.accept(inputText);
        })
        await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
        await expect(page.locator('#result')).toHaveText(`You entered: ${inputText}`);
        //await expect (page.getByRole('paragraph', { name: `You entered: ${inputText}` })).toBeVisible();
        await page.pause();
    })
})
