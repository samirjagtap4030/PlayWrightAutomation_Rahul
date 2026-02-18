const {test, expect} =  require('@playwright/test') // 1test contain 2test then run sequencially
                                                    // 2 test seperate in test folderruns parallely
/* 
npx playwright test tests/UIBasic.spec.js  => correct
npx playwright test tests\UIBasic.spec.js  => wrong   you will get error
Error: No tests found.
Make sure that arguments are regular expressions matching test files.
Make sure that arguments are regular expressions matching test files.
You may need to escape symbols like "$" or "*" and quote the arguments.

sol => when you copy relative path of test,it will give you by default backword slash path.
so change backword slash() to forword slash.

i want to run 4 tests insted 7tests that time you can use test.skip()

run test both work-1.npx playwright test tests/UIBasic.spec.js
                   2.npx playwright test UIBasic.spec.js

sec 8-46 
-run any 4 tests:1.UIBasic.spec.js -2 tests,2.ClientApp.Spec.js -2 tests =>4 test passed
-if you want to see traces make 1 test fail-in clintapp,Browser context test,line 38 Incorrect write Incorrects
-then see traces for failure tests only in test results.
-here you want traces for each test then make off- retain-off-failure(jar fail test cha trace nako asel tar),trace:on (passed tests cha trace hava asel tar)

-trace
he sarv log dete
pratek step cha screenshot v time dete

how to see traces for failure tests in test-results:
test result madhil zip file hi trace.playwrite.dev var upload (from project folder) kara,n paha exact error kay yete
(from project folder-C:\PlaywrightAutomation\test-results\UIBasic-Browser-context-Playwright-test)
(report madhun je distey tech trace dista ahe)

how to see traces for failure tests in test-results:
-refresh project
-in playwright-report you have index.html.right click on select copy path.paste path in browser.see report
-here you can see each step with code ,error

*/

test('@web Browser context Playwright test', async ({browser}) =>  //test.only phkt eka test madhech have
{
    const context = await browser.newContext();
    const page = await context.newPage();
    // lect 11_68 part 1
    //await page.route('**/*.css', route => {route.abort()});
     await page.route('**/*.{jpg,png,jpeg}', route => {route.abort()});

    const userName = page.locator('#username');//globally declare mhnu shakto
    const signIn = page.locator("#signInBtn");
   
    // lect 11_68 part 2
    page.on('request',request=> console.log(request.url()));
    page.on('response',response=>console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");// this site is not working
    console.log(await page.title())

 await userName.fill('rahulshetty');   // wrong username n correct pd taka    selector is mandatory,x path is not working
 await page.locator("#password").fill('Hello123@');// [name='password']// type() is depreciated,use fill()
 await signIn.click();
 console.log(await page.locator("[style*='block']").textContent());// [attribute='value'],reg exp used to take partial value
 await expect(page.locator("[style*='block']")).toContainText('Incorrect');// Incorrects-wrong written, Incorrect-correct
 await userName.fill(""); // हे आधीचा 'wrongUser' काढून टाकेल
 await userName.fill("postman4075@gmail.com"); // योग्य Username
 await signIn.click();// पुन्हा Sign In करणे

});

test('@Web Page Playwright test', async ({page}) =>
{
  await page.goto("https://google.com");
  console.log(await page.title())//get title
  await expect(page).toHaveTitle("Google");

});

test('UI Controls: Static Dropdown & Radio Buttons', async ({ page }) => {
    
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");    
    await userName.fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("learning");
   
    // we dont use await for storing locator
    // we use await inside locator if locator with action
    // we use await outside locator if (locator is not with action and)action is outside  
    await dropdown.selectOption("consult");// select consultant.use value attribute  // --- Handling Static Dropdown (select-options tag)---    / 
    await page.locator(".radiotextsty").last().click();// .first ghetlyas ADMIN select hoil.// --- Handling Radio Buttons ---.// इथे .radiotextsty क्लास दोन बटन्सना आहे (Admin & User).// आपल्याला दुसरे (User) बटण हवे आहे, म्हणून .last() वापरले.
    await page.locator("#okayBtn").click();    // User सिलेक्ट केल्यावर एक sadha web पॉप-अप येतो, त्याला 'Okay' करणे/
    console.log(await page.locator(".radiotextsty").last().isChecked());//(admin by default selected) c/o user don padhti isChecked() -it will return true or false
    await expect(page.locator(".radiotextsty").last()).toBeChecked();//toBeChecked()-it will reurn fail if radiobutton is not checked(not return true or false)

    await page.locator("#terms").click();// चेकबॉक्स I agree सिलेक्ट करणे
    await expect(page.locator("#terms")).toBeChecked(); 
    await page.locator("#terms").uncheck();// Uncheck Checkbox
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //toBeTruethy()-it return true and check with true and make test pass// Validation for Unchecked state //isChecked() आता false रिटर्न करेल.toBeFalsy()-it will check return false or not
    await expect(documentLink).toHaveAttribute("class", "blinkingText");// check link is blinking or not class=blinkingText must name,value provide

    //await page.pause(); // डीबगिंगसाठी स्क्रीन थांबवणे (फक्त प्रॅक्टिससाठी) check select box is slected consultant before browser close
});


test('Child Window Handling', async ({ browser }) => {  // browser -open brower 
    
    // 1. नवीन Context तयार करणे
    const context = await browser.newContext();         // newContext() - create new session 
    const page = await context.newPage();               // newPage() - create new page
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");// ती लिंक शोधणे जिच्यावर क्लिक केल्यावर नवीन टॅब उघडणार आहे
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Parent Page वर जाणे
    // 2. Handling New Tab (Promise.all वापरून)
    // एकाच वेळी दोन गोष्टी होत आहेत: लिंकवर क्लिक करणे आणि नवीन पेजची वाट पाहणे.
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Listener: नवीन पेज ओपन होण्याची वाट पहा
        documentLink.click(),         // Action: लिंकवर क्लिक करा
    ]); // link var click karnya agother sanga create new page and wait,so it will open documentLink in new page together
    //(mala donhi code ekach veli execute zala pahije),donhi code successful execute zalyavar it will give [newpage] because waitForEvent() return type[]
    //Promise.all()-it promisses for all method execute (it will repeated until executed )
    // finally we get child page(newPage)

    // आता 'newPage' म्हणजे Child Window आणि 'page' म्हणजे Parent Window.

    // 3. Child Window वर काम करणे
    // नवीन पेजवरील टेक्स्ट वाचणे
    const text = await newPage.locator(".red").textContent();
    console.log("Full Text:", text);

    // 4. String Manipulation (फक्त डोमेन नेम काढण्यासाठी)
    // टेक्स्ट असा आहे: "Please email us at mentor@rahulshettyacademy.com with below template"
    // आपल्याला फक्त "rahulshettyacademy.com" हवे आहे.
    const arrayText = text.split("@"); // @ च्या आधारे दोन भाग केले
    const domain = arrayText[1].split(" ")[0]; // पुढच्या भागातील स्पेस काढून डोमेन घेतले
    console.log("Extracted Domain:", domain);

    // 5. Parent Window वर परत काम करणे
    // आता आपण मूळ 'page' ऑब्जेक्ट वापरून Username मध्ये डोमेन टाकणार आहोत
    await page.bringToFront();// tumhala parent tab disel.rahul ne sangitle nahi gemini ahe.hi method n vaprlyas parent tab dist nahi pan parent tab playwrite ne vaprleli aste
    await page.locator("#username").fill(domain); // Parent Window वर ॲक्शन
    await page.pause();                                      // textContent()- browser launch kelyavr by default textBox madhe ji value aste ti capture karnyasathi hi method vaprtat.
    console.log(await page.locator("#username").inputValue());// inputValue()- browser launch kara.tyanantar apn textbox madhe value lihito,ti capture karnyasathi hi method vaprtat.

    // टीप: Playwright मध्ये 'Switch' करण्याची गरज नसते, फक्त योग्य ऑब्जेक्ट वापरा.
});

test(' Client App login', async ({ page }) => {  // test.skip() you can add if you want skip
   //js file- Login js, DashboardPage
   const email = "postman4075@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Hello123@");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');// for the loading page and get all text elements add this method and wait for first element.
   await page.locator(".card-body b").first().waitFor();// wait for first element.
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









