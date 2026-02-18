// '../pageObjects/POManager.js' - import poManager in test
const { LoginPage } = require('./LoginPage');// import page to get LoginPage object  lagtchya folder madhe he page ahe mhanun./
const { DashboardPage } = require('./DashboardPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');

class POManager {
    constructor(page) // create variables(object) for created objects 
    {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);// constructor(page)-constructor madhil page yachyat yete ,pan page cha variable ithe add kara. 
        this.DashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);

    }

    getLoginPage()//  Login Page चा Object मागण्यासाठी मेथड //get varible(object) using getPage()
    {
        return this.LoginPage;

    }

    getDashboardPage()// get varible(object) using getPage()
    {
        return this.DashboardPage;

    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

}
module.exports = { POManager };