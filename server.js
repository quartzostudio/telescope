// server.js

const express = require('express');
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const cache = new NodeCache({ stdTTL: 600 });

const getCacheKey = (url, width, height, dpi) => url + width + height + dpi

app.get('/', async (req, res) => {
    const { url, width = '1280', height = '800', dpi = '1' } = req.query;

    if (!url) {
        return res.status(400).json({ error: "A valid URL is required" });
    }

    const viewportWidth = parseInt(width);
    const viewportHeight = parseInt(height);
    const deviceScaleFactor = parseInt(dpi);
    
    const cacheKey = getCacheKey(url,width,height,dpi)

    //Check if the screenshot is cached
    const cachedScreenshot = cache.get(cacheKey);
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
            deviceScaleFactor,
        });

        await page.goto(url, { waitUntil: 'networkidle0' });
        
        const screenshot = Buffer.from(await page.screenshot());

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(screenshot);
        
        cache.set(cacheKey, screenshot);
        await browser.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to capture screenshot" });
    }
});

app.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}`);
});
