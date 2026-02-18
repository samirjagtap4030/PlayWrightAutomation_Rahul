const { test, expect } = require('@playwright/test');

// 16_93-run tests parallely from the same file by extending test option behaviour 
         // Parallel and Serial Execution Modes
         // parallel mode- 1 test file madhe 3 tests ahet.(running 3 tests with 3 workers)-3 passed = line 38:top cha p lava   
         // seriel mode -  1 test file madhe 3 tests ahet.,1st pass, 2nd fail, tyamule 3rd skip hote  1 pass.1 skip,1 fail
                         //line 38-2nd test fail honyasthi mouse hover madhe top cha p kadha 

//test.describe.configure({ mode: 'parallel' });  // ही ओळ लिहिल्यामुळे या फाइलमधील सर्व टेस्ट एकाच वेळी (Parallel) रन होतील
test.describe.configure({ mode: 'serial' });   // Serial मोडमुळे, जर एक टेस्ट फेल झाली, तर पुढच्या स्किप होतील.
test('Popup Validation', async ({ page }) => {  // default mode madhe 1st fail zali tari 2nd pass hou shakte
    // टेस्ट कोड...
    console.log("Running Popup Test");
});


test('@Web More Validations - Navigation and Visibility ', async ({ page }) => {
                       
    // Handling Dialogs and Hover
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); // 1. Practice Website वर जा
    await page.goto("http://google.com"); // 2. Google वर जा (Navigating to another URL)
    await page.goBack(); // 3. परत मागे येणे (Back button simulation)
    await page.goForward(); // 4. पुन्हा पुढे जाणे (Forward button simulation)
    await page.goBack(); // 5. टेस्टसाठी पुन्हा Practice page वर येणे गरजेचे आहे
    // --- Visibility Check (दिसणे आणि लपणे तपासणे) ---
    await expect(page.locator("#displayed-text")).toBeVisible();// तपासणी करा की 'displayed-text' बॉक्स सुरुवातीला स्क्रीनवर दिसत आहे. (Visible) hide/show example he disat ahe ki nahi paha.dista asel tar test pass kara
    await page.locator("#hide-textbox").click(); // आता 'Hide' बटणावर क्लिक करा ज्यामुळे hide/show example बॉक्स लपला जाईल
    await expect(page.locator("#displayed-text")).toBeHidden();//line 12 nanatr have hote ka आता तो बॉक्स स्क्रीनवरून गायब झाला आहे का (Hidden) हे तपासा
    
    // select-option static dropdown
    await page.locator('#dropdown-class-example').selectOption('option2'); //static drpdwn -select option 2 from drpdwn.then inspect select cha locator and selectOption madhe drpdwn option
    

    // 1. Handling Dialog (Pop-up)
    page.on('dialog', dialog => dialog.accept()); // Playwright ला सांगणे: जर Dialog आला तर तो Accept (OK) कर.// ही लाइन Dialog येण्याआधी लिहावी लागते (Listener).Cancel करायचे असेल तर:dismiss()
    await page.locator('#confirmbtn').click();    // ज्या (confirm)बटनामुळे Pop-up येणार आहे, त्यावर क्लिक करा.// आता Playwright ऑटोमॅटिकली OK क्लिक करेल.
    // 2. Mouse Hover Action
    await page.locator('#mousehover').hover();    // ज्या Element वर माउस नेल्यावर ऑप्शन्स दिसतात, तिथे .hover() वापरा
    await page.locator("//a[text()='Top']").click(); // Hover केल्यावर जे ऑप्शन्स दिसतील (उदा. Top), त्यावर आता क्लिक करू शकतो

    //2nd test fail honyasthi mouse hover madhe top cha p kadha -line 38

    //3.Handling Frames and Text Parsing                       1.go to website
    const framesPage = page.frameLocator('#courses-iframe');// 2. फ्रेमचा लोकेटर मिळवा (Identify the frame[inspect frame]) // ज्या फ्रेमचा ID किंवा Name 'courses-iframe' आहे, तिथे स्विच करा.
    await framesPage.locator('a[href*="lifetime-access"]:visible').click();// 3. फ्रेमच्या आतल्या एलिमेंटवर क्लिक करा. // इथे 'All Access Plan' नावाचे दोन एलिमेंट्स असू शकतात, म्हणून आपण ':visible' वापरले.// म्हणजे जो एलिमेंट स्क्रीनवर दिसतोय, फक्त त्यावरच क्लिक होईल.
    const textCheck = await framesPage.locator('.text h2').textContent();// 4. टेक्स्ट मिळवा (Get Text)   // फ्रेमच्या आतल्या दुसऱ्या पेजवरील टेक्स्ट मिळवत आहोत.
    console.log("Full Text:", textCheck);// उदा. टेक्स्ट असेल: "Join 13,522 happy subscribers"
    const subscribersCount = textCheck.split(" ")[1]; // 5. नंबर वेगळा करा (String Manipulation)
    console.log(textCheck.split(" ")[1]);
});

// 12_69,70
test('Screenshot & Visual Comparison', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();//  hide/show example textbox ha element  disat ahe ki nahi paha.dista asel tar test pass kara
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' });// Element Screenshot- page.locator().screenshot({path: 'fileName.png'});
    await page.locator("#hide-textbox").click(); // आता 'Hide' बटणावर क्लिक करा ज्यामुळे hide/show example textBox बॉक्स लपला जाईल
    await page.screenshot({path: 'screenshot.png'});// Full Page Screenshot -page.screenshot({path: 'fileName.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();// ss project folder left la disel
      
    // generally we take full page ss
});




/*
test('Visual testing', async ({ page }) => {  // test.only
    await page.goto("https://www.google.com/");//
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
}); */


    /*
    	tumchyakade initially image nasel tari chalel,first run fail hote v image store hote v ti expected image rahte .sarv automatic hote
        First Run Failure: पहिल्यांदा टेस्ट फेल होणे अपेक्षित आहे, कारण तेव्हाच 'Baseline Image'hi more validation test madhe तयार होते \landing-win32.png. Error: A snapshot doesn't exist at C:\PlaywrightAutomation\tests\MoreValidation_9_47_48.spec.js-snapshots
        punha test run kara ,junya image (expected image) shi actual image compare karun test pass hote 
        test result folder madhe tumhi expected,actual,diff pahu shakta

        jar juni imageshi navi image match hot nasel tar ,tar juni image delete in tests/your test/.png folder  kara punha 2 vela test run kara
        juni image test madhe aste \landing-win32.png.
        image madhe kahi tari phirat ahe tyamule test fail hot ahe

        https://www.rediff.com/  - news update test fail hote 
        https://www.flightaware.com/live/ -time satat badalat asto test fail hoil 
        image static asel tar test pass hote.
        dynamic badal sangitle nahi -doc madhe ne ai ne diley 
    */


