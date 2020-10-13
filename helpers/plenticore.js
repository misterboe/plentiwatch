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
  const waitSec = 5;
  await page.waitForTimeout(waitSec * 1000);

  const battery = await page.$eval('#text-battery',
      elem => elem.textContent.trim());
  const dc = await page.$eval('#text-dc',
      elem => elem.textContent.trim());
  const grid = await page.$eval('#text-grid',
      elem => elem.textContent.trim());
  const home = await page.$eval('#text-home',
      elem => elem.textContent.trim());

  const values = {
    battery: battery,
    dc: dc,
    grid: grid,
    home: home,
  };
  await browser.close();
  return values;
}

exports.getData = getData;
