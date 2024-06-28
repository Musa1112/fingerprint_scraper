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
