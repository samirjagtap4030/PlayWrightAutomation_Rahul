class LoginPage
{
 constructor(page) // create loactor // intitialise page in constructor()
 {   
    this.page =page;// intitialise page in goto()
    this.username = page.locator("#userEmail")
    this.password = page.locator("#userPassword")
    this.signInButton = page.locator("[value='Login']")
 }

async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client", { waitUntil: "domcontentloaded" });
        
}

async validLogin(username,password) // write actions using methods
{                                           // paste all code, create loactor in constructor and add this locator with action 
   await this.username.fill(username);
   await this.password.fill(password);
   await this.signInButton.click();
   await this.page.waitForLoadState('networkidle');// he yatch theva
}
}
module.exports ={ LoginPage }; // make file public using module