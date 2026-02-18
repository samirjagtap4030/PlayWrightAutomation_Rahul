
let message1: string = "Hello";  // 1. String (फक्त शब्द)
// message1 = 2;                 // हे चुकीचे आहे, इथे एरर येईल कारण आपण वरती 'string' ठरवले आहे.
console.log(message1);

let age1: number = 20;           // 2. Number (फक्त आकडे)
console.log(age1);

let isActive: boolean = true;   // 3. Boolean (खरे किंवा खोटे)

let numbers1: number[] = [1, 2, 3];    // 4. Array (नंबर्स् ची लिस्ट) // इथे आपण सांगतोय की 'numbers' हा फक्त number चा array आहे (`number[]`)

let data: any = "Playwright";          // 5. Any (काहीही चालेल - JS सारखे)
data = 42;                             // इथे एरर येणार नाही, कारण टाईप 'any' आहे.

// declare function,object,class,constructor

// 1. Functions in TypeScript
// इथे आपण a आणि b दोन्ही 'number' आहेत हे सांगत आहोत आणि return type सुद्धा 'number' आहे.
function add1(a: number, b: number): number {
    return a + b;
}
// add1(3, "4"); // हे एरर देईल कारण "4" string आहे. yane compile error dili tari (typescript convert ts into js) it execute code.
console.log(add1(3, 4)); // हे बरोबर आहे.

// 2. Objects in TypeScript
// इथे आपण सांगतोय की user ऑब्जेक्टमध्ये name (string) आणि age (number) असाच डेटा पाहिजे.
let user: { name: string, age: number,location: string } = {name: "Bob", age: 34, location:"Delhi"};
// user.location = "Pune"; // हे compile एरर देईल, कारण 'location' आपल्या niyamat(कॉन्ट्रॅक्टमध्ये) नाही.



// 3. page object Classes,constructors (Page Object Model)

/* jar page cha datatype mahit nasel tar google-playwrite dev,c/o typescript,c/o search(RHS)-page object model,see page ,locator type

Page, Locator- page and locator cha type ha Playwright मधून टाइप्स import करणे
क्लासमध्ये व्हेरिएबल्स आधी डिक्लेअर करावे लागतात आणि त्यांचा टाईप सांगावा लागतो   */

import { Page, Locator } from '@playwright/test';   // Playwright मधून टाइप्स import करणे

class CartPage {   
    
    page: Page;                   
    cartProducts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div.cartSection h3");   // JavaScript मध्ये आपण हे वर डिक्लेअर करत नव्हतो, पण TS मध्ये ते अनिवार्य आहे.
    }
}


