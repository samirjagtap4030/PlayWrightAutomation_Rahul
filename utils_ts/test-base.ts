import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {                    // 2. आपले स्वतःचे Fixture तयार करणे //JS object direct send karu shakto // JS object la nav dile
        username: string;
        password: string;
        productName: string;    
};                            
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{                                                                // import base (means test) and export customTest for all tests // 1. मूळ test ला extend करून customTest बनवणे
   testDataForOrder: {                                           // 2. आपले स्वतःचे Fixture तयार करणे //JS object direct send karu shakto // JS object la nav dile
        username: "postman4075@gmail.com",
        password: "Hello123@",
        productName: "ZARA COAT 3"
    }
});

/*
// base.test.extend astana extend var mouse nya interface disel or testDataForOrder var mouse over over kara(interface keyword add kara n T capital ghya TestDataForOrder madhe)
// testDataForOrder JS Object sathi datatype ha interface TestDataForOrder tayar kara
// extend madhe survatila he add kara <{testDataForOrder:TestDataForOrder}>,then it will understand dataType
// this is updated test-base.ts

(test-base.js(just recap what did)-we extended test annotation for adding few things like driving test data.
you can do that by adding customTest annotation,then we send testDataForOrder in test as fixture.)

modification in test-base.js:
(why-to remove confusion between actual test and custum test,so doing)
remove const base,import test as baseTest (referenceName) from playwright
instead base.test use baseTest.here baseTest extending with testDataForOrder fixture
first convert test-base.js into .ts
you will get error testDataForOrder JS Object.how to define datatype of JS Object
if you over-over on extend they are showing interface.Apply (write)it.
then after extend write JS object Name: Interference Name
.extend< testDataForOrder: TestDataForOrder >
(Ignore-then TestDataForOrder will check testDataForOrder is following contract(or dataType) or not)  







*/
