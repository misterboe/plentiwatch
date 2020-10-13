const puppeteer = require('puppeteer');
const globalConfig = require('../global.config');

async function getData() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(
    `${globalConfig.plentiURL}/#/login`,
  );
  await page.waitForSelector('#gid_2736fab2_4');
  await page.type('#gid_2736fab2_4', globalConfig.plentiPass);

  await page.evaluate(() => {
    let btn = document.querySelector('#gid_2736fab2_7');
    btn.click();
  });
  const waitSec = 3;
  await page.waitForTimeout(waitSec * 1000);

  const battery = await page.$eval('#text-battery',
    elem => elem.textContent.trim());
  const batteryStatus = await page.$eval('#indicator-battery-color',
    elem => elem.classList);
  const pv = await page.$eval('#text-dc',
    elem => elem.textContent.trim());
  const provider = await page.$eval('#text-grid',
    elem => elem.textContent.trim());
  const providerStatus = await page.$eval('#indicator-grid-color',
    elem => elem => elem.classList);
  const home = await page.$eval('#text-home',
    elem => elem.textContent.trim());

  const values = {
    battery: {
      value: battery,
      status: ((batteryStatus[0] === 'svg-green') ? 'discharge' : 'charge'),
    },
    pv:{
      value: pv
    },
    provider: {
      value: provider,
      status: ((providerStatus[0] === 'svg-green') ? 'feed' : 'receive'),
    },
    home:{
      value: home
    },
  };
  await browser.close();
  return values;
}

exports.getData = getData;
