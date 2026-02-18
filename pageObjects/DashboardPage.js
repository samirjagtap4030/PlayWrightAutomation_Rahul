class DashboardPage
{
 constructor(page)
 {  
    this.page =page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");// await kadhun taka
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.toastMessage = page.locator("text=Product Added To Cart")
 }

 async searchProductAddtCart(productName)
 {    
       const titles = await this.productsText.allTextContents();
       console.log(titles); // itheparyant agother pahile ahe magchya sec 6 madhe
       const count = await this.products.count();
       for (let i = 0; i < count; ++i) {
          if ( await this.products.nth(i).locator("b").textContent() === productName) {  // .locator vaprun chaining keli. same as selenium(locator chaining)
               //add to cart                                                         // sarv product(.cartBody-5element) array madhe milale. 
              await this.products.nth(i).locator("text= Add To Cart").click();           // <div></div> madhech locator b add kara,text extract kara v zaracot shi match kara,
              await this.toastMessage.waitFor();
              break;                                                                // jar match zale tar add to cart var click kara.playwrite madhe direct text vaprun karu shakto.
          }                                                                        //maza kontrol zaracoat box madhil add to cart text var click kara ase mhtle ahe.
       }// jithe chaining locator astil te ahe ase theva or tyache locator sathi(text= Add To Cart) string banva ani tyat add kara pan garaj nahi
   }

 async navigateToCart()
 {
    await this.cart.click();

 }

 async navigateToOrders() 
 {
    await this.orders.click();
 }


}
module.exports ={DashboardPage};