const base = require('@playwright/test');// base mhnje test ch ahe nav vegle ahe

exports.customTest = base.test.extend({   // import base (means test) and export customTest for all tests // 1. मूळ test ला extend करून customTest बनवणे
   testDataForOrder: {                    // 2. आपले स्वतःचे Fixture तयार करणे //JS object direct send karu shakto // JS object la nav dile
        username: "postman4075@gmail.com",
        password: "Hello123@",
        productName: "ZARA COAT 3"
    }
});
