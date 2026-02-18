const { Given, When, Then } = require('@cucumber/cucumber');// import Given, When, Then from cucumber pkg
const { POManager } = require('../../pageObjects/POManager');//import POManager with correct path 
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');//import chromium keyword   // we keep expect and playwrit keyword seperate

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {  // cucumber by default take 5 sec but login take more than 5 sec. so we increase time using timeout argument// Timeout वाढवण्यासाठी दुसरा argument pass केला आहे
    // Write code here that turns the phrase above into concrete actions

    const loginPage = this.poManager.getLoginPage();  // world constructor- जेव्हा तुम्ही this.page किंवा this.poManager असे लिहिता, तेव्हा तो व्हेरिएबल त्या संपूर्ण Scenario साठी ग्लोबल होतो
    await loginPage.goto();                      // world constructor-1 scenario means 1 world.any variable of scenario (test step) can available for any test step of that scenario using this keyword
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions    
    this.dashboardPage = this.poManager.getDashboardPage(); // this.dashboardPage
    await this.dashboardPage.searchProductAddtCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);         // VerifyProductIsDisplayed n Checkout
    await cartPage.Checkout();
});

When('Enter valid details and Place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();          // searchCountryAndSelect n SubmitAndGetOrderId
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();                            // click on order or clik on link ordr history page same ahe
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  
    const userName = this.page.locator('#username');// we are giving wrong credentials 
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title())
    await userName.fill(username);   
    await this.page.locator("#password").fill(password);
    await signIn.click();
});



Then('Verify Error message is displayed', async function () {
    
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});