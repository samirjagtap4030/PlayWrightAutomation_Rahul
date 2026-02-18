import { test, expect, Page, Locator } from '@playwright/test';

export class OrdersHistoryPage 
{
    page:Page
    ordersTable:Locator
    rows:Locator
    orderdIdDetails:Locator

    constructor(page:Page) 
    {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
     async searchOrderAndSelect(orderId:any) { // we dont know orderId is string or number,we are not sure so we add any

        await this.ordersTable.waitFor();
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();// th-correct ts-incorrect
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    /* // gemini pro suggestion instead for loop ,u can use playwrite filter // it works good
    async searchOrderAndSelect(orderId) {
        const cleanOrderId = orderId.replace(/\|/g, "").trim();
        await this.rows.filter({ hasText: cleanOrderId }).locator("button").first().click();
}*/

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }

}
module.exports = { OrdersHistoryPage };
