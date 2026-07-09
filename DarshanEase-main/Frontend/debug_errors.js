const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching Puppeteer...");
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        let logs = [];
        page.on('console', msg => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
                logs.push(`[${msg.type()}] ${msg.text()}`);
            }
        });

        page.on('pageerror', error => {
            logs.push(`[pageerror] ${error.message}`);
        });

        console.log("Navigating to http://localhost:5173/...");
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });

        // Try clicking Interactive Map if it exists
        try {
            console.log("Clicking 'Interactive Map'...");
            const mapButton = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                const btn = btns.find(b => b.textContent && b.textContent.includes('Interactive Map'));
                if (btn) { btn.click(); return true; }
                return false;
            });
            if (mapButton) {
                await page.waitForTimeout(2000);
            } else {
                console.log("Could not find Interactive Map button.");
            }
        } catch (e) { }

        // Look for Watch Live if it exists
        try {
            console.log("Clicking 'WATCH LIVE'...");
            const liveButton = await page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                for (let b of btns) {
                    if (b.textContent && b.textContent.includes('WATCH LIVE')) {
                        b.click(); return true;
                    }
                }
                return false;
            });
            if (liveButton) {
                await page.waitForTimeout(2000);
            } else {
                console.log("Could not find WATCH LIVE button.");
            }
        } catch (e) { }

        console.log("=== BROWSER LOGS ===");
        if (logs.length === 0) console.log("No errors found!");
        logs.forEach(l => console.log(l));
        console.log("====================");

        await browser.close();
    } catch (error) {
        console.error("Puppeteer Script Error:", error);
    }
})();
