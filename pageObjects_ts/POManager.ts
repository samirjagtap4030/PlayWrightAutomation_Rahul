import { LoginPage } from './LoginPage'; // import LoginPage.ts 
import { DashboardPage } from './DashboardPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import { Page } from '@playwright/test';

export class POManager {

    LoginPage:LoginPage;// loginPage (variable) cha dataType (return dataType)ha LoginPage class object asel.
    DashboardPage:DashboardPage;
    ordersHistoryPage:OrdersHistoryPage;
    ordersReviewPage:OrdersReviewPage;
    cartPage:CartPage;
    page:Page; // page(variable)cha dataType Page import from playwrite

    constructor(page:Page) // mention page variable dataType is Page 
    {
        this.page = page;
        this.LoginPage = new LoginPage(this.page);
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

/*
how to export and import in typescript and how it is different from js

how do you export LoginPage.js class or  import LoginPage.js class into POMangager class-
 - at the end of .js class we write module.exports(so it will export class) 
   and use 'require()' keyword to import class




*/