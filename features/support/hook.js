const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { chromium } = require('@playwright/test');

Before(async function () {
    const browser = await chromium.launch({ headless: false });// launch browser manually (कारण Cucumber मध्ये हे आपोआप मिळत नाही)// cucumber by default run test in headless mode.
    const context = await browser.newContext();// नवीन कॉन्टेक्स्ट आणि पेज तयार kara
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);// this.poManager for all methods// get page instance by setting manual launch browser.(add 3 lines code) 

});

BeforeStep( function () {
    
});

AfterStep(async function ({ result }) {
    // This hook will be executed after failing test steps and take a screenshot 
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});

After(function () {
    console.log("I am the last to execute"); 
   
});


