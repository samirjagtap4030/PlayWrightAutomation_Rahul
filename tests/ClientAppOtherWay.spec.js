const { test, expect } = require('@playwright/test');// 39 npx playwright test --ui // ata pass hotey.jar test fail zalyas u n pd phkt badla

test('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();//getByText-text ahe ka or getByRole-button click hot ahe ka) 
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();  // ya don step saman ch rahtil
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();// check zaracart 3 in product list and click on add to cart
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();// click on cart menu bar // listitem(parent) madhe button ahe // listitem kase lihile pahu ghya
                                    //jar cart chi button jast astil tr to confuse hoil mhnun parent tag deu shakta                                          // li tag ahe  v listitem ha area role ahe jase button ,link,checkbox ,heading
   //await page.pause();
   await page.locator("div li").first().waitFor();// wait for page load
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();//check zara coat 3is visible or not
 
   await page.getByRole("button",{name :"Checkout"}).click();// c/o checkout button
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");// select country india from drpdn
 
   await page.getByRole("button",{name :"India"}).nth(1).click();// class=btn or button tag asel tar getByRole with button vapru shakta
   await page.getByText("PLACE ORDER").click();//c/o place order button,getByRole(button) or getByText() vapru shakta.but prefer getByRole()

 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();// validate text
});