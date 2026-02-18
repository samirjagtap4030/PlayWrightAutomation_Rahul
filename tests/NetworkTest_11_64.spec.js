/*
11_64. Understand the playwright route method and its parameters in intercepting - demo
jevha tumhi clik on order button karta tevha get order ya api la call karta(network tab madhe diste.)
ya api madhe 7 products ahet.

.route(get orders api "url"pathva, async route he (asynchronous function) vapara.
route madhe actual response-use .fetch() with (route.request()) 
.fulfill()-browser la 'actual response' evji 'fake response' pathva using fulfil()
           remember: fake Response ha Jeson object asava.(convert JS object into JO using JSON.stringify(fakePayLoadOrders))
then click on order button.
then Use waitforResponce("url"):actual responce change karun fake responce browser la pathvnaya sathi playwrite time ghete.tyamule waitforResponce(same api "url") vaprto.
          jar wait vaprle nahi tar (कधीकधी) fake रिस्पॉन्स येण्याआधीच Playwright पुढे जाऊ शकतो आणि "Network Disposed" असा एरर येतो 
inspect ‘no order’ text on order page and print it        (You have No Orders to show at this time. Please Visit Back Us )
Wildcard (*): URL मध्ये डायनॅमिक आयडी (Dynamic ID) बदलत असतात, म्हणून हार्डकोड करण्याऐवजी * वापरणे सुरक्षित आहे.
*/

const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils'); 
const loginPayLoad = { userEmail: "postman4075@gmail.com", userPassword: "Hello123@" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };// latest product add to cart kara. tyacha product id ithe ya line la add kara
const fakePayLoadOrders = { data: [], message: "No Orders" };                                         // karn order page var jo 1st product asel to ha add to cart ata apn kela to asel 
 
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);// call login api
 
})
 
//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);// get token and setting in browser 
  await page.goto("https://rahulshettyacademy.com/client");// landing on page // WebApiPart1_Refactor ithparyant same test ahe,ithun changes chalu 
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();// clicking on orders button
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
 
  console.log(await page.locator(".mt-4").textContent());// You have No Orders to show at this time. Please Visit Back Us 
 
});