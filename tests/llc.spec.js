const { test, expect } = require('@playwright/test');//sec 6_35/36 37-code 38-lable info// npx playwright test --ui
                                                     // sec 8_44  playwright inspector- debug playwright script npx playwright test llc.spec.js --debug
test('Playwright Special Locators - getByLabel', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();     // 2. Checkbox सिलेक्ट करणे (Using Label) //Label: "Check me if you love ice cream"// .click() किंवा .check() दोन्ही चालतात.
    await page.getByLabel("Employed").check();                           // 3. Radio Button सिलेक्ट करणे (Using Label)
    await page.getByLabel("Gender").selectOption("Female");              //dropdown  (yat select option tag asne avshyak ahe )
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();// c/o button   // टीप: Input Fields (Typing) साठी getByLabel कधीकधी Flaky असू शकते,// त्यामुळे तिथे CSS/XPath किंवा getByRole वापरणे सेफ असते. 
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    //await page.getByRole('link', { name: 'Nokia Edge' }).click();//THIS ALSO WORK
    //locator(css) 
});
/*
// sec 8_44  playwright inspector- debug playwright script line by line [resume button, step over button]
when your test case is faied that time you can use
you can use for record and playback ,find element locator
you can cross check your getBy loactor is correct or not in script.if not then add same in script
you can also find loactor and check is correct or not




*/


