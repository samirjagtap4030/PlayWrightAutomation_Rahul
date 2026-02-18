class OrdersHistoryPage 
{
    constructor(page) 
    {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
     async searchOrderAndSelect(orderId) {

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
