/*
66. How to intercept Network request calls with Playwright - Example demo
intercept request(request tampering)-route.continue("changed url")
  (click on view hi get request ahe)
  (view var click karnyapurvi apan url change karto mag view var click karto)
  
  -land on order hisory page where you added addidas original product.clear network tab.
   clik on view button.get-all-order api call disel.tyachi url copy kara.ata apn tyacha 
   product id badalnar ahot 
  -use page.route("get-all-order api url",asyn route =>  // here root is asyncronous function
  -Use Countinue()-to change url
                  route.continue("changed url with id")

*/

const { test, expect } = require('@playwright/test');
test('@QW Security test request intercept', async ({ page }) => {

    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    //await page.pause();//
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})
/* 
how to format code 
right click on code ,c/o format document

*/