# fingerprint_scraper
this bot visit a site and bypasses the fingerprinting dictation

the assignment was completed

1. using normal puppeteer the site dicted the runing as but, the i try using puppeter plug in and puppeteer
extra still on running the site also dicted it  as bot
on deep research i found a documentation on gthub which provide guide on how to bypass the git dictation

This the link to the repo 
https://github.com/CheshireCaat/puppeteer-with-fingerprints

my code 

```js
import { plugin } from 'puppeteer-with-fingerprints';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

(async () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get a fingerprint from the server:
    const fingerprint = await plugin.fetch('', {
        tags: ['Microsoft Windows', 'Chrome'],
    });

    // Apply fingerprint:
    plugin.useFingerprint(fingerprint);

    // Launch the browser instance:
    const browser = await plugin.launch({ headless: false, 
        defaultViewport: null });

    try {
        // The rest of the code is the same as for a standard `puppeteer` library:
        const page = await browser.newPage();
        await page.goto('https://www.browserscan.net/', { waitUntil: 'networkidle2' });

        // Initial wait
        await sleep(10000);
        // Take the first screenshot
        await page.screenshot({ path: 'screenshot0.png', fullPage: true });

        // Wait for the selector and click
        // await page.waitForSelector("._1rbf5rt");
        // await page.click("._1rbf5rt");
        // Ensure the action is complete
        await sleep(20000);
        // page2 = await browser.newPage
        await page.goto('https://www.browserscan.net/feedback', { waitUntil: 'networkidle2' });
        await sleep(5000)
        // Take the second screenshot
        // await page.screenshot({ path: 'screenshot1.png', fullPage: true });

        // Fill in the feedback
        await page.type('._fspq3n', `Browser Scan is a free, web-based tool that lets you quickly check your browser's security settings for weaknesses. It's easy to use and great for a basic security check, but it might not be enough for comprehensive protection. Consider it a starting point, especially for non-technical users, but you might need additional security software for full protection.`, { delay: 100 });
        await sleep(2000);

        // Type in the contact and email
        await page.type('input[type="number"]', `${process.env.CONTACT}`, { delay: 100 });
        await sleep(4000);

        await page.type('input[type="mail"]', `${process.env.EMAIL}`, { delay: 100 });
        await sleep(5000);
        await page.screenshot({ path: 'screenshot1.png', fullPage: true });
        // Click the submit button
        await page.click('._14z6rud');
        await sleep(3000);

        await page.goto('https://www.browserscan.net/', { waitUntil: 'networkidle2' });
        await sleep(6000);
        await page.screenshot({ path: 'screenshot2.png', fullPage: true });

        // Print the browser viewport size:
        console.log(
            'Viewport:',
            await page.evaluate(() => ({
                deviceScaleFactor: window.devicePixelRatio,
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            }))
        );
        
       
    } catch (error) {
        console.error('An error occurred:', error);
    }

    // Optionally close the browser
    await browser.close();
     

})();
```

Dependencies
To run the provided code, you will need to install the following dependencies:

1. puppeteer-with-fingerprints: A Puppeteer plugin that helps in evading fingerprint detection.
dotenv: A module that loads environment variables from a .env file into process.env.
Installation
First, create a package.json file if you don't already have one:
 npm init -y

2.Next, install the required dependencies:
npm install puppeteer-with-fingerprints dotenv

3. Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:
CONTACT=your_contact_number
EMAIL=your_email_address

4. What the Script Does
Launches a browser instance with fingerprint evasion.
Navigates to the BrowserScan website.
Waits for the page to load and takes an initial screenshot.
Clicks on a specified element and navigates to the feedback page.
Fills in a feedback form with a predefined message, contact number, and email address.
Takes screenshots after each significant action.
Submits the form and navigates back to the main page, taking a final screenshot.

Important Notes
Ensure the .env file contains valid contact and email information.
Adjust the sleep durations as needed based on the website's response times.

iclluding this repo there is a screenshort of all the stages of the code runing instancies


