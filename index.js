const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // configure folder and http url path
    // the folder contain all the html file
    const folderPath = './'
    const baseURL = 'https://www.bizimhesap.com/'

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: './node_modules/puppeteer/.local-chromium/mac-982053/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
    })
    const page = await browser.newPage()

    await page.goto(`${baseURL}`)

    const targetEls = await page.$$('svg');

    let count = 0;
    const dir = './svg';
    for (let target of targetEls) {
        const iHtml = await page.evaluate(el => el.outerHTML, target);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile(`${dir}/${count}.svg`, iHtml, (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`Wrote ${count}.svg`)
        })
        await delay(100);
        count++;
    }

    await browser.close()
})()

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

