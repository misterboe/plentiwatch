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

  let battery = 'not available';
  let batteryStatus = 'not available';
  let pv = 'not available';
  let provider = 'not available';
  let providerStatus = 'not available';
  let home = 'not available';

  if (globalConfig.battery) {
    try {
      await page.waitForSelector('#text-battery', {timeout: 3000});
      battery = await page.$eval('#text-battery',
        elem => elem.textContent.trim());
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  if (globalConfig.battery) {
    try {
      await page.waitForSelector('#indicator-battery-color', {timeout: 3000});
      batteryStatus = await page.$eval('#indicator-battery-color',
        elem => elem.classList);
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  try {
    await page.waitForSelector('#text-dc', {timeout: 3000});
    pv = await page.$eval('#text-dc',
      elem => elem.textContent.trim());
  } catch (error) {
    console.log('Error: ' + error);
  }

  try {
    await page.waitForSelector('#text-grid', {timeout: 3000});
    provider = await page.$eval('#text-grid',
      elem => elem.textContent.trim());
  } catch (error) {
    console.log('Error: ' + error);
  }

  try {
    await page.waitForSelector('#indicator-grid-color', {timeout: 3000});
    providerStatus = await page.$eval('#indicator-grid-color',
      elem => elem => elem.classList);
  } catch (error) {
    console.log('Error: ' + error);
  }

  if (globalConfig.smartmeter) {
    try {
      await page.waitForSelector('#text-home', {timeout: 3000});
      home = await page.$eval('#text-home',
        elem => elem.textContent.trim());
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  const values = {
    battery: {
      value: battery,
      status: ((batteryStatus[0] === 'svg-green') ? 'discharge' : 'charge'),
    },
    pv: {
      value: pv,
    },
    provider: {
      value: provider,
      status: ((providerStatus[0] === 'svg-green') ? 'feed' : 'receive'),
    },
    home: {
      value: home,
    },
  };
  await browser.close();
  return values;
}

exports.getData = getData;
