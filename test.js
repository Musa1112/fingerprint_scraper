import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

(async () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Launch the browser instance:
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-blink-features=AutomationControlled',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-web-security'
        ]
    });

    const page = await browser.newPage();

    // Set User Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');

    // Set Custom Headers
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
    });

    // Set Viewport and Screen Size
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    });

    // Set Timezone
    await page.emulateTimezone('Africa/Lagos');

    // Set Permissions
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ? Promise.resolve({ state: Notification.permission }) : originalQuery(parameters)
        );
    });

    // Set Geolocation
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://www.example.com', ['geolocation']);
    await page.setGeolocation({
        latitude: 9.6140,
        longitude: 6.5568
    });

    // Disable WebDriver flag
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    // Spoof WebGL Vendor and Renderer
    await page.evaluateOnNewDocument(() => {
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
            if (parameter === 37445) {
                return 'Google Inc. (Intel)';
            }
            if (parameter === 37446) {
                return 'ANGLE (Intel, Intel(R) HD Graphics 620 (0x00005916) Direct3D11 vs_5_0 ps_5_0, D3D11)';
            }
            return getParameter(parameter);
        };
    });

    // Spoof Plugins
    await page.evaluateOnNewDocument(() => {
        const mockPlugins = [
            {
                name: 'Chrome PDF Viewer',
                filename: 'internal-pdf-viewer',
                description: 'Portable Document Format'
            },
            {
                name: 'Chromium PDF Viewer',
                filename: 'internal-pdf-viewer',
                description: 'Portable Document Format'
            },
            {
                name: 'Microsoft Edge PDF Viewer',
                filename: 'internal-pdf-viewer',
                description: 'Portable Document Format'
            }
        ];

        Object.defineProperty(navigator, 'plugins', {
            get: () => mockPlugins,
        });

        Object.defineProperty(navigator, 'mimeTypes', {
            get: () => mockPlugins.map(plugin => ({
                type: 'application/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: plugin,
            })),
        });
    });

    // Open a webpage
    await page.goto('https://www.example.com', { waitUntil: 'networkidle2' });

    // Perform actions on the page...

    // Print the browser viewport size:
    console.log(
        'Viewport:',
        await page.evaluate(() => ({
            deviceScaleFactor: window.devicePixelRatio,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }))
    );

    await browser.close();
})();
