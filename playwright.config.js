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
    timeout: 60 * 1000, //increase time for debug100 instead 30 // 2. Global Timeout for all tests: प्रत्येक टेस्टसाठी जास्तीत जास्त वेळ (30 seconds)
    expect: {                        
     timeout: 5000                  // 3. for Assertion only Timeout: expect() साठी वेगळा टाइमआउट 5 seconds
    },
    reporter: 'html',                // 4. Reporter: रिपोर्ट HTML फॉरमॅटमध्ये हवा असल्यास
    use: {
    browserName: 'chromium',       // chromium,firefox,webkit    5. Browser configuration// टेस्ट Chrome ब्राउझरवर रन होईल     
    headless:false,  // make true for avoid flakiness and use retries in config
    screenshot:'on',
    trace:'on',// off,on  retain-on-failure  
  }, 

  });

module.exports = config;           // हे कॉन्फिगरेशन एक्सपोर्ट करा जेणेकरून Playwright ते वापरू शकेल



