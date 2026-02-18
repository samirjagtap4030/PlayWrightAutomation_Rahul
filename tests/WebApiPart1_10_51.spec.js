const { test, expect, request } = require('@playwright/test'); // rough code given 
let token;// if you use variable direct globaly then use let.let allows you to create later also.
let orderId;// when you initialise (value)something immediately  then use const

test.beforeAll(      async()=> 
{    
    const apiContext = await request.newContext();  // 1. API Context तयार करणे
    const loginPayload = { userEmail: "postman4075@gmail.com",userPassword: "Hello123@" };//payload in js object  // 2. Login Payload (डेटा) तयार करणे
    const orderPayload = {orders:[{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };// Product ID बदला (you can take any product id-> go to home -c/o view of any product-go to url-copy product id only)
    
    // LOGIN API     
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",   // 3. Login API ला POST Request पाठवणे
    {                                       
      data: loginPayload
    });// 200,201
    await expect(loginResponse.ok()).toBeTruthy();//login api madhe apn token milavato tyamule yachi garaj nahi// 4. Response Success आहे का ते तपासणे (Status 200 OK).// .ok() हे true देईल जर status code 200,201 दरम्यान असेल
    const loginResponseJson = await loginResponse.json();// we get response body in json format
    token = loginResponseJson.token; // 5. Response मधून Token काढणे // Token वेगळा काढून ठेवला
    console.log(token);// print token in console
   
    // CREATE ORDER API 
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,                     
        headers: {
            'Authorization': token, // Token इथे वापरला
            'Content-Type': 'application/json' // sometimes by default js object is not convert into json object.so you can give this line.
        }
    });
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];// productOrderId[0] ghyacha nahi orderId[0] ghyacha ahe // Response मधून Order ID काढणे  // Response structure: { productOrderId: ["order_id_123"], message: "..." } // पहिला Order ID घेतला
    console.log("Order Created with ID:", orderId);
  });

// when to use ui and api testing (khali paha)


// 'how to skip login (Bypass Login) using API Token'by combining playwright ui+api testing
// check order is created successfully-api testing
test('Place the order', async ({ page }) => { //@Webst Client App login clientappotherway madhil test ahe 
    await page.addInitScript((value) => {  // 2. Browser मध्ये टोकन इंजेक्ट करणे (Inject Token) // page.addInitScript पेज लोड होण्याआधी ही JavaScript रन करते.
    
        window.localStorage.setItem('token', value); // ही JavaScript ब्राउझरच्या आत रन होते // 'token' ही Key आहे आणि 'value' हे आपले API कडून आलेले टोकन आहे
    }, token); // 'token' हा व्हेरिएबल आपण फंक्शनला पास करत आहोत
      
   await page.goto('https://rahulshettyacademy.com/client');// 3. आता थेट डॅशबोर्ड किंवा क्लायंट पेजवर जा // इथे Login Page येणार नाही, कारण Local Storage मध्ये टोकन ऑलरेडी आहे.
   await page.locator("button[routerlink*='myorders']").click(); // c/o orders button,orders page will open.Now we are finding all rows.  
   await page.locator("tbody").waitFor();                        // orders page takes time to load table.so before finding all rows,we will tell wait for to load table.
   const rows = await page.locator("tbody tr");                  // then we will find all rows(all tr) in table to get rows count
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();// then go to first row(using for loop) and order id column.then extract rowOrderId
      if (orderId.includes(rowOrderId)) {                              // then compare orderId (| 697b12d2c941646b7ac284d0 |) with rowOrderId (697b12d2c941646b7ac284d0).here .include() ignores delimeter(pipes) and spaces
         await rows.nth(i).locator("button").first().click(); // if orderId matches then we click on views.here we are in same row.we want to travel view button(locator chaining).but we have 2 buttons.we slect first button 
         break;                                               
      }
   }                                                                    //order summary page will open.but here we dont use waitFor() beacause auto wait is availaible for textContent()
   //await page.locator(".col-text").waitFor();
   const orderIdDetails = await page.locator(".col-text").textContent();// here we extract orderIdDetails from order summary page 
   //await page.pause();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();// and Assert that orderId with orderIdDetails,if it is correct ,then make test pass

});

/*
 when to use ui and api testing
 create order successfully-use ui testing
 check order is created successfully-api testing
    here we can do with Ui manually
      ui -> search product -add to cart-go to cart-c/o checkout-add country-c/o place order
      -validate text-get orderId - c/o order history page-check order id is present in order history page
    then check check order is created successfully using (with help of product id) in Api testing
      api-> here we go directly get orderid 
      get orderId - c/o order history page-check order id is present in order history page

      in this way skip all previous page 
      depending on requirement we do this tasks and it will save lot of time.

*/