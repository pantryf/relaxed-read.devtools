const fs        = require('fs');
const puppeteer = require('puppeteer');
const {sleep}   = require('extra-sleep');

const E = process.env;
const READ_URL  = 'http://learnyouahaskell.com/types-and-typeclasses';
const BREAK_URL = 'https://www.youtube.com/shorts';




// Main function.
async function main() {
  // Configuration details.
  var {executablePath, userDataDir} = chromePath();
  var browser = await puppeteer.launch({executablePath, userDataDir, defaultViewport: null, headless: false});
  let page    = await browser.newPage();
  // Read something.
  await page.goto(READ_URL);
  await sleep(5000);
  for (var i=0; i<10; ++i) {
    await page.mouse.wheel({deltaY: 100});
    await sleep(2000);
  }
  await sleep(5000);
  // Take a break.
  do {
    let page = await browser.newPage();
    await page.goto(BREAK_URL);
    await sleep(5000);
    await page.close();
  } while (false);
  // Finish up.
  await sleep(5000);
  await browser.close();
}


// Get chrome path.
function chromePath() {
  var e = `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`;
  var e = fs.existsSync(e)? e : e.replace(/Program Files/, 'Program Files (x86)');
  var u = `C:\\Users\\${E.USERNAME}\\AppData\\Local\\Google\\Chrome\\User Data`;
  return {executablePath: e, userDataDir: u};
}


// Run main function.
main();
