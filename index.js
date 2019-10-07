const puppeteer = require('puppeteer');

let instance = null;

async function getInstance() {
    instance = await puppeteer.launch({headless: false});

    return instance;
}

const classes = {
    time: '2019-09-15T12:00:00',
    classname:'Express Core',
}


async function book() {
    const browser = await getInstance();

    const page = await browser.newPage();
    await page.goto('https://mylocker.virginactive.com.sg/#/login', {waitUntil: 'networkidle2'});

    await page.type('#memberID', 'yuhan');
    await page.type('#password', '1234');

    //await page.waitFor('form[name="loginForm"] button[type="submit"]:not([disabled])');
    await page.waitFor(2000)
    await page.click('form[name="loginForm"] button[type="submit"]');

    await page.waitFor(2000)

    await page.click('.bookAClass')

    await page.waitFor(2000)

    // await page.click('.vaClassDatePicker a:last-child')
    await page.click('.vaClassDatePicker a:nth-last-child(2)')

    const latestClass = await page.waitForResponse('https://hal.virginactive.com.sg/api/classes/bookableclassquery') 

    const availableClasses = await latestClass.json() 

    // console.log(await availableClasses.filter(x=> x.ClassName == classes.classname))  

    //console.log(await availableClasses.filter(x=> availableClasses.StartDateTime == classes.time && availableClasses.ClassName == classes.classname)) 

    const rows = await page.$$('.vaTable > tbody > tr');

    console.log(await Promise.all(rows.map(async row => await row.$('td:nth-child(2)'))));

    await browser.close();
}

book();
