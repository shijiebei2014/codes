const puppeteer = require('puppeteer')
const ncp = require('copy-paste')
const browserFetcher = puppeteer.createBrowserFetcher()

function test() {
    return browserFetcher.download('901912')
        .then((res) => {
            return puppeteer.launch({
                executablePath: res.executablePath, //chrome执行路径
                headless: false, //浏览器无头模式
            })
        }) 
        .then(async (browser) => {
            const page = await browser.newPage()        
            return [browser, page]
        })
        .then(async ([browser, page]) => {
            await page.goto('http://www.lookdiv.com/')
            await page.$eval('input[name="key"]', el => el.value = '5263')
            await page.click('button[type="submit"]')
            await page.waitForSelector('#subsModal textarea')
            const value = await page.$eval('#subsModal textarea', el => el.value)
            await ncp.copy(value)
            await browser.close()
        })
        .catch((err) => {
            console.log('err:', err)
        })
}

test()