// WebApiPart1_Refactor_10_51.spec.js - 10_51 -combine UI+Api test
// WebApiPart1_Refactor_10_51.spec.js - 11_61 -how to debug api test (--debug cmd and playw.inspector is not able to inspect api step)

const {test, expect, request} = require('@playwright/test');// all refactor code available from part 1
const {ApiUtils} = require('../utils/ApiUtils'); // import  ApiUtils class from utils folder 
const loginPayLoad = {userEmail:"postman4075@gmail.com",userPassword:"Hello123@"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};// 6960eae1c941646b7a8b3ed3  // 6964af52c941646b7a919472
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();     //create new context
   const apiUtils = new ApiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);// call createOrder api then you will get response// jya method la async lavlele  ahe ani ti method jar call karaychi asel tar tyachyasamor await lavane 
                                                        // ata tumchyakde token and orderId donhi ahet.te test madhe vapra.
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );  // use  response.token to get token
await page.goto("https://rahulshettyacademy.com/client");// landing on page 
 await page.locator("button[routerlink*='myorders']").click();// clicking on orders button
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId)) // use response.orderId here to compare
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();// use response.orderId here to compare
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -