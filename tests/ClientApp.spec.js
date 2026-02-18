const {test, expect} =  require('@playwright/test') // 1test contain 2test then run sequencially
                                                    // 2 test seperate in test folderruns parallely
test('Browser context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail');//globally declare mhnu shakto
    const signIn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client");//https://rahulshettyacademy.com/loginpagePractise/
    console.log(await page.title())//Let's Shop

 await userName.fill('rahulshetty');   //u n pd taka    selector is mandatory,x path is not working
 await page.locator("#userPassword").fill('Hello123@');// [name='password']// type() is depreciated,use fill()
 await signIn.click();
 //console.log(await page.locator("[style*='block']").textContent());// [attribute='value'],reg exp used to take partial value
 //await expect(page.locator("[style*='block']")).toContainText('Incorrect');
 await userName.fill(""); // हे आधीचा 'wrongUser' काढून टाकेल
 await userName.fill("postman4075@gmail.com"); // योग्य Username 
 await signIn.click();// पुन्हा Sign In करणे

    // 4. Multiple Elements मधून डेटा काढणे
    // page.locator(".card-body a").textContent() वापरल्यास एरर येईल कारण 4 elements आहेत.// हा लोकेटर 4 प्रॉडक्ट्स शोधतो
    
//console.log(await cardTitles.first().textContent());//first() or last()     पहिला प्रॉडक्ट (Automation 8) मिळवण्यासाठी 
//console.log(await cardTitles.nth(1).textContent()); // (start from 0,1,2),2nd प्रॉडक्ट (Automation 8) मिळवण्यासाठी (Index 1)

//await page.waitForLoadState('networkidle');// method use: its wait for specific network activity donekahinchya system madhe chalte kahinchya system madhe nahi.khalil method or ahe.
await cardTitles.first().waitFor();    
console.log(await cardTitles.allTextContents());// all product list array madhe bhetate.  first() mule api load vhayla vel milto pan direct method vaprlyas load vhayla vel milat nahi
// textContent()-jar ekch product title print karayche asel tar.yala error yet nahi.page load hote.
// allTextContents()-sarv products( page) load hot nahit v agotherch page cut hote,flaky test hote- 'Error-not found' ase mhnte

});

test('Page Playwright test', async ({page}) =>
{
  await page.goto("https://google.com");
  console.log(await page.title())//get title
  await expect(page).toHaveTitle("Google");

});