/*
konti request url send keli ani konti response url milali v tyacha staus code pahu shakto 
yacha upyog kay :
ekhadi test fail zalyas ,konti api call/url fail hot ahe kalte v status code kalto

*/

const { test, expect } = require('@playwright/test');
test('E-commerce Login and Order Flow', async ({ page }) => {

    // 1. kontihi url Interception सेट करणे
    // '**/*' म्हणजे कोणतीही URL. जर ती .jpg, .png किंवा .jpeg ने संपत असेल, तर ती रिक्वेस्ट Abort (रद्द) करा
    // context.newPage() nanatr (or before .goto()) lihavi
    //await page.route('**/*.css', route => {route.abort()}); // css tumchi test fail karel ,jar test fail hot asel tar vapru naka
     await page.route('**/*.{jpg,png,jpeg}', route => {route.abort()});// image load hot nahit v test fast chalte
 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    await page.locator('.card-body').first().waitFor();

    page.on('request',request=> console.log(request.url()));// 1. रिक्वेस्ट जाताना URL प्रिंट करा
    page.on('response',response=>console.log(response.url(), response.status()));// 2. रिस्पॉन्स आल्यावर URL आणि Status Code प्रिंट करा

    await page.locator('app-card').filter({ hasText: 'iPhone X' })
        .getByRole('button', { name: 'Add' }).click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8' })
        .getByRole('button', { name: 'Add' }).click();
    await page.locator('a.nav-link.btn-primary').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('#country').pressSequentially('ind',);// { delay: 150 }
    const dropdown = page.locator('.suggestions');
    await dropdown.waitFor();
    await dropdown.locator("a", { hasText: 'India' }).click();
    await page.locator("label[for='checkbox2']").click();//   label[for="checkbox2"]
    await page.getByRole('button', { name: 'Purchase' }).click();
    const successMessage = page.locator('.alert-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Success! Thank you! Your order will be delivered in next few weeks :-)');

});


/*
mi swath test lihili ahe 
 1. वेबसाईटवर जा
 2. लॉगिन करा (क्रेडेंशियल्स इमेजमधून घेतले आहेत)
 3. "I Agree" चेकबॉक्सवर क्लिक करा (लॉगिन करण्यासाठी हे अनेकदा गरजेचे असते)
 4. Sign In बटनवर क्लिक करा
 5. पेज लोड होण्याची वाट पहा (प्रॉडक्ट्स कार्ड दिसू द्या)
 6. iPhone X आणि Samsung Note 8 कार्टमध्ये ॲड करा.  लॉजिक: सर्व कार्ड्समधुन ज्या कार्डवर 'iPhone X' लिहिले आहे, ते शोधा आणि त्याचे 'Add' बटन दाबा
                                                  लॉजिक: 'Samsung Note 8' शोधा आणि ॲड करा
 7. Checkout (नेव्हिगेशन बार) वर क्लिक करा
 8. Checkout (कार्ट पेज) वर पुन्हा क्लिक करा
 9. देश सिलेक्ट करा                        'ind' हळूहळू टाईप करा (जसे माणूस टाईप करतो) म्हणजे सजेशन्स लोड होतील
 10.  
 11. सजेशन्सची वाट पहा आणि 'India' वर क्लिक करा
 12. Terms & Conditions (Purchase Page)
 13. चेकबॉक्सवर क्लिक करा (Label वर क्लिक करणे जास्त सुरक्षित असते)
 14. Purchase बटन दाबा
 15. सक्सेस मेसेज व्हेरिफाय करा




*/