import { test, expect, Page, Locator } from '@playwright/test';

export class CartPage {     
    
    cartProducts:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;
    page:Page;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div li ").first(); // .cartSection h3  // div li   first paryant loacator ghya
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName:string) // VerifyProductIsDisplayed and Checkout
    {
        await this.cartProducts.waitFor();// { state: 'visible', timeout: 60000 }
        const bool = await this.getProductLocator(productName).isVisible();// yat productName sudha takyche mhnun getProductLocator() tayar keli
        expect(bool).toBeTruthy();                                        // con..product name chang hot astat.dynamic product ghetla
    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName:string) {
        return this.page.locator("h3:has-text('" + productName + "')");// page evji this.page ghetle
    }

}
module.exports = { CartPage };