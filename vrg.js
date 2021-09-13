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
            await page.goto('http://vrg123.com/')
            await page.$eval('input[name="pas"]', el => el.value = '4565')
            await page.click('input[type="submit"]')
            await page.waitForSelector('.username')
            const username = await page.$eval('.username', el => el.value)
            const password = await page.$eval('.password', el => el.value)
            console.log('username: %s, password: %s', username, password)
            await browser.close()
        })
        .catch((err) => {
            console.log('err:', err)
        })
}

test()