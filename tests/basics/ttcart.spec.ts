import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('test');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('mkaran');
  await page.locator('[data-test="login-button"]').click();
});

test('QA profile form - filling details', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page')
  await page.getByTestId('first-name').fill('Muralidhar');
  await page.getByTestId('last-name').fill('Karanam');
  await page.getByRole('radiogroup', { name: 'Gender' }).getByText('Male', { exact: true }).click();
  await page.getByRole('combobox', { name: 'Years of experience', exact: true }).selectOption('6');
  //professional details
  await page.getByTestId('profile-date').fill('2026-09-22');

  await page.getByRole("radio", { name: 'Automation Tester' }).click();
  //technical details
  await page.getByRole("checkbox", { name: 'Selenium Webdriver', exact: true }).check();
  //Continents you have worked from
  //await page.pause();

  //page.getByLabel("Continents").getByRole("checkbox", {name:'EUROPE'})
  //const asia = page.getByLabel("Continents").locator('label.control-chip').filter({ hasText: 'Asia' });
  //await asia.getByRole('checkbox').check();
  /* for (const continent of continents){
    console.log(`checkbox content: ${continent}`);
    console.log(`checkbox content: ${await continent.filter()}`);

  } */
  const wanted = ['Europe', 'Asia'];
  for (const continent of wanted) {
    await page.getByLabel('Continents').getByRole('checkbox', { name: continent }).check();

  }
  await page.getByLabel('Continents').getByText('South America').check();
  await page.getByTestId('profile-submit').click();
  //console.log(await page.locator('#submission-output').ariaSnapshot())
  console.log(await page.locator('#submission-output').textContent())
  //console.log(await page.getByLabel('Continents').ariaSnapshot());

  await page.pause();
})

test('QA profile form submission - filling details', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/tables/practice#page')
  await page.getByTestId('first-name').fill('Muralidhar');
  await page.getByTestId('last-name').fill('Karanam');
  await page.getByRole('radiogroup', { name: 'Gender' }).getByText('Male', { exact: true }).click();
  await page.getByRole('combobox', { name: 'Years of experience', exact: true }).selectOption('6');
  //professional details
  await page.getByTestId('profile-date').fill('2026-09-22');
  await page.getByRole("radio", { name: 'Automation Tester' }).click();
  //technical details
  await page.getByRole("checkbox", { name: 'Selenium Webdriver', exact: true }).check();
  const wanted = ['Europe', 'Asia'];
  for (const continent of wanted) {
    await page.getByLabel('Continents').getByRole('checkbox', { name: continent }).check();
  }
  await page.getByLabel('Continents').getByText('South America').check();
  await page.getByTestId('profile-submit').click();
  console.log(await page.locator('#submission-output').textContent());
  await page.pause();
})

test('Employee Directory, checking/unchecking a record', async({page})=>{

 await page.goto('https://app.thetestingacademy.com/playwright/webtable');
//console.log(await page.getByRole('searchbox').nth(1).ariaSnapshot());
//await page.getByRole('searchbox',{name:'Search employee table'}).fill('Rohan Mehta');
//console.log(await page.getByLabel('Employee Management System table').ariaSnapshot());

const usernames = ['Vikram.Singh', 'Rohan.Mehta', 'Priya.Nair'];
const table = page.getByLabel('Employee Management System table');
const results = [];

for (const username of usernames) {
  const row = table.getByRole('row').filter({ hasText: username });
  await row.getByRole('checkbox').check();
  console.log(await row.getByRole('cell').first().ariaSnapshot());

  const cells = await row.getByRole('cell').allTextContents();
 for (const cell of cells){
  console.log(cell.toString());
 }
  const empIdMatch = cells.join(' ').match(/EMP-\d+/);

  results.push({
    username: cells[1]?.trim(),
    empId: empIdMatch ? empIdMatch[0] : null,
    role: cells[3]?.trim(),
  });
}

console.log(results);
await page.pause();

})