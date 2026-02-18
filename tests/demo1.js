"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message1 = "Hello";          // 1. String (फक्त शब्द)
// message1 = 2;                 // हे चुकीचे आहे, इथे एरर येईल कारण आपण वरती 'string' ठरवले आहे.
console.log(message1);
var age1 = 20; // 2. Number (फक्त आकडे)
console.log(age1);
var isActive = true; // 3. Boolean (खरे किंवा खोटे)
var numbers1 = [1, 2, 3]; // 4. Array (नंबर्स् ची लिस्ट) // इथे आपण सांगतोय की 'numbers' हा फक्त number चा array आहे (`number[]`)
var data = "Playwright"; // 5. Any (काहीही चालेल - JS सारखे)
data = 42; // इथे एरर येणार नाही, कारण टाईप 'any' आहे.
// declare function,object,class,constructor
// 1. Functions in TypeScript
// इथे आपण a आणि b दोन्ही 'number' आहेत हे सांगत आहोत आणि return type सुद्धा 'number' आहे.
function add1(a, b) {
    return a + b;
}
// add1(3, "4"); // हे एरर देईल कारण "4" string आहे. yane compile error dili tari (typescript convert ts into js) it execute code.
console.log(add1(3, 4)); // हे बरोबर आहे.
// 2. Objects in TypeScript
// इथे आपण सांगतोय की user ऑब्जेक्टमध्ये name (string) आणि age (number) असाच डेटा पाहिजे.
var user = { name: "Bob", age: 34, location: "Delhi" };
var CartPage = /** @class */ (function () {
    function CartPage(page) {
        this.page = page;
        this.cartProducts = page.locator("div.cartSection h3"); // JavaScript मध्ये आपण हे वर डिक्लेअर करत नव्हतो, पण TS मध्ये ते अनिवार्य आहे.
    }
    return CartPage;
}());
