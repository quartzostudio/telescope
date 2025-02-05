// server.js

const express = require('express');
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Initialize cache with a default TTL of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

app.get('/', async (req, res) => {
    const { url, width = 1280, height = 800 } = req.query;

    if (!url) {
        return res.status(400).json({ error: "A valid URL is required" });
    }

    const viewportWidth = parseInt(width);
    const viewportHeight = parseInt(height);

    //Check if the screenshot is cached
    const cachedScreenshot = cache.get(url);
    if (cachedScreenshot) {
        return res.set('Content-Type', 'image/png').send(cachedScreenshot);
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Set the viewport size based on query parameters
        await page.setViewport({
            width: viewportWidth,
            height: viewportHeight,
            deviceScaleFactor: 1, // You can adjust this if needed
        });

        await page.goto(url, { waitUntil: 'networkidle0' });
        
        const screenshot = Buffer.from(await page.screenshot());

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(screenshot);
        
        // Cache the screenshot
        cache.set(url, screenshot);
        await browser.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to capture screenshot" });
    }
});

app.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}`);
});
