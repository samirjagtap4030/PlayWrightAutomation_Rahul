const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => { // first it do login and close browser
                                        // then open browser execute 1st test and close browser
                                        // then open browser execute 2nd test and close browser
    const context = await browser.newContext();// 1. नवीन Context आणि Page तयार करा
    const page = await context.newPage();    
    await page.goto("https://rahulshettyacademy.com/client");// 2. UI वरून एकदा Login करा
    await page.locator("#userEmail").fill("postman4075@gmail.com");
    await page.locator("#userPassword").fill("Hello123@");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle'); // पूर्ण लोड होण्याची वाट पहा
    await context.storageState({ path: 'state.json' });// 3. Login झालेली State (Cookies/Storage) एका JSON फाईलमध्ये सेव्ह करा.create josn file 
    webContext = await browser.newContext({ storageState: 'state.json' });// 4. आता ही State वापरून नवीन Context तयार करा जो आपण टेस्ट्समध्ये वापरू.add json file in browser to store session cookies and multiple cokkies
});

test('Client App Login Bypass Test', async () => {
    const email = "postman4075@gmail.com";
    const productName = 'ZARA COAT 3';

    const page = await webContext.newPage();// 5. इथे 'page' fixture न वापरता, आपल्या 'webContext' पासून पेज बनवा
    await page.goto("https://rahulshettyacademy.com/client");// 6. आता थेट डॅशबोर्डवर जा (Login करण्याची गरज नाही, कारण State इंजेक्ट केली आहे)
    await page.locator(".card-body b").first().waitFor();// wait for first element.
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); // itheparyant agother pahile ahe magchya sec 6 madhe
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {  // .locator vaprun chaining keli. same as selenium(locator chaining)
         //add to cart                                                         // sarv product(.cartBody-5element) array madhe milale. 
         await products.nth(i).locator("text= Add To Cart").click();           // <div></div> madhech locator b add kara,text extract kara v zaracot shi match kara,
         break;                                                                // jar match zale tar add to cart var click kara.playwrite madhe direct text vaprun karu shakto.
      }                                                                        //maza kontrol zaracoat box madhil add to cart text var click kara ase mhtle ahe.
   }
 // await page.pause();    // before run test,delete all items in cart,after run test check 1 item is present in cart
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
                                                         // playwrite java autowait search on google some limited method have autowait https://playwright.dev/java/docs/actionability
   await page.locator("div li").first().waitFor();       // when you c/o add to cart,cart Page take time to load elements.so we take some elements.div li has elements(how much product added to cart).
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();//identify item in cart page //isVisible() is not available in autowait.  //conti.. but it will throw exeption strict mode violation.playwrite take atleast 1 element at time.so wait for load page and at least 1 element loading.
   expect(bool).toBeTruthy();                                                                                              // then only you can visible zaracoat 3 element.and you will not get exception for zaracot 3 element   
   await page.locator("text=Checkout").click();

// 3. Assignment: PAYMENT FORM भरणे (इमेजमधील माहितीनुसार)
    await page.locator(".field input").first().fill("4542 9931 9292 2293");
    const dropdowns = page.locator("select.input");
    await dropdowns.first().selectOption("01");// to select attributeValue,we use selectOption() //// पहिला Dropdown (Month) -> 01
    await dropdowns.last().selectOption("25"); // दुसरा Dropdown (Year) -> 25 
    await page.locator(".field.small input").first().fill("123");
    await page.locator(".field input").nth(2).fill("Nishant Vishal Deshmukh");
    await page.locator("input[name='coupon']").fill("1234");
    await page.locator("button:has-text('Apply Coupon')").click();
    await expect(page.locator("p.mt-1")).toBeVisible(); // valid/invalid coupn message validate (Error or Success message)
    console.log(await page.locator("p.mt-1").textContent());
    //await page.pause();
                                                                                           // if you copy n paste ind directly then autosuggestive drowpdown will not show india. 
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });  // you have to press keys one by one using pressSequentially(),after pressing each key i will wait 150 ms.
   const dropdown = page.locator(".ta-results");                                           // so we will see dropdown. auto.drpdn take time 1 or 2 sec show drpdown.so will use waitFor() for dropdown.
   await dropdown.waitFor();                                                               // how to use:for that we capture whole drpdwn using page.locator() and use waitFor() 
   const optionsCount = await dropdown.locator("button").count();                          // then using locator() chaining, we count number of elements in drpdown.(.ta-results button)
   for (let i = 0; i < optionsCount; ++i) {                                                // using for loop and locator chaining, we extract all texts from drpdwn 
      const text = await dropdown.locator("button").nth(i).textContent();                  // then we matches text with India.(here we give triple equal remember,before " india" have space or you can use text.trim()="India" or use includes() text.includes(India) withought giving space ))
      if (text === " India") {                                                             // once element is matched then click on India button and break the loop
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
  //await page.pause(); only for you ,it is not needed ignore it

   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);        // assertion-validate your email is showing in that element.css selector baghun ghya kasa lihilay.you can try toHaveEmpty() as well.    
   await page.locator(".action__submit").click();                                      // click on place order button
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // extract text Thankyou for the order. on thank you page
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();  // extract orderId and print it 
   console.log(orderId);

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
   const orderIdDetails = await page.locator(".col-text").textContent();// here we extract orderIdDetails from order summary page 
   expect(orderId.includes(orderIdDetails)).toBeTruthy();// and Assert that orderId with orderIdDetails,if it is correct ,then make test pass

    
});

test('@API Test Case 2', async () => {
    
    const page = await webContext.newPage();// 5. इथे 'page' fixture न वापरता, आपल्या 'webContext' पासून पेज बनवा
    await page.goto("https://rahulshettyacademy.com/client");// 6. आता थेट डॅशबोर्डवर जा (Login करण्याची गरज नाही, कारण State इंजेक्ट केली आहे)
    await page.locator(".card-body b").first().waitFor();// wait for first element.
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); // itheparyant agother pahile ahe magchya sec 6 madhe
});
