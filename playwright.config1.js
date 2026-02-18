// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({
  testDir: './tests',              // 1. Test Directory: तुमच्या टेस्ट फाईल्स कुठे आहेत ते सांगा
//  retries: 1,       // टेस्ट फेल झाल्यास किती वेळा पुन्हा प्रयत्न करायचा? // येथे 1 दिले आहे, म्हणजे फेल झाल्यावर 1 वेळा Retry होईल.
//workers: 3, // येथे आपण Workers ची संख्या ठरवतो.जर workers: 1 दिले, तर सर्व टेस्ट सिरीयल (एकामागून एक) रन होतील.जर workers: 3 दिले, तर एका वेळी 3 टेस्ट फाइल्स रन होतील.   
timeout: 60 * 1000, // 4 test chrome n safari tyaves phkt 60 theva jar safari 1 test fail hot asel tar .nahitar 30 theva//increase time for debug100 instead 30 // 2. Global Timeout for all tests: प्रत्येक टेस्टसाठी जास्तीत जास्त वेळ (30 seconds)
  expect: {
    timeout: 5000                  // 3. for Assertion only Timeout: expect() साठी वेगळा टाइमआउट 5 seconds
  },
  reporter: 'html',                // 4. Reporter: रिपोर्ट HTML फॉरमॅटमध्ये हवा असल्यास

  projects: [
    {
      name: 'safari', // safari test fail hot asel tar timeout 60 sec kara
      use: 
      {
        browserName: 'webkit',  // webkit     // chromium,firefox,webkit    5. Browser configuration// टेस्ट Chrome ब्राउझरवर रन होईल     
        headless: true,          // true it will run fast execution
        screenshot: 'off',
        trace: 'on',// off,on  retain-on-failure
 //     ...devices['iPhone 11'], //it will fail because our website is not support for browser emulation
      }
    },
    {
      name: 'chrome',
      use: 
      {
        browserName: 'chromium',       // chromium,firefox,webkit    5. Browser configuration// टेस्ट Chrome ब्राउझरवर रन होईल     
        headless: false,
        screenshot: 'on',
     //   video: 'retain-on-failure', // // 2. Video: फक्त फेल झाल्यावर व्हिडिओ जतन करा (बाकी वेळी डिलीट करा)
        ignoreHTTPSErrors: true,     // 3. SSL Error: सुरक्षित नसलेल्या साइट्स ओपन करण्यासाठी
        permissions: ['geolocation'], // 4. Permissions: Location सारख्या परवानग्या आधीच देणे

        trace: 'on',// off,on  retain-on-failure
  //    viewport: { width: 720, height: 720 },  // change browser size- responsive web testing // our website is not supported for mobile,tab,ipad.so it will fail test
                                                // diffeence between viewport and device:in viewport -you decide width and height (size) and in device -playwright decide size 
     //   ...devices[''],  you can do for android also. galaxy,pixel phone also.
      }
    },
  ]
});

module.exports = config;           // हे कॉन्फिगरेशन एक्सपोर्ट करा जेणेकरून Playwright ते वापरू शकेल



