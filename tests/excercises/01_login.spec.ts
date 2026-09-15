import {test, expect} from '@playwright/test';

test('Login validations', async ({ page }) => {

 //<input type="email" class="text-input W(100%)" name="username" vwo-html-translate-attr="placeholder" vwo-html-translate-placeholder="login:enterEmailID" id="login-username" data-qa="hocewoqisi" placeholder="Enter email ID" fdprocessedid="p0vcq">
    // Test implementation here
    await page.goto("https://app.vwo.com/#/login");
    await page.locator("#login-username").fill("test@example.com");
    await page.locator("#login-password").fill("password123");
    await page.locator("#js-login-btn").click();
    const error_message = page.locator('#js-notification-box-msg');
    await error_message.waitFor({ state: 'visible' });
    await expect(error_message).toHaveText('Your email, password, IP address or location did not match');



}); 