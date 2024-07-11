const puppeteer = require('puppeteer');

(async () => {
  const isInDocker = process.env['ENV'] === 'docker';

  const browser = await puppeteer.launch({
    executablePath: isInDocker ? '/usr/bin/google-chrome' : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  const timestamp = new Date().getTime();
  await page.screenshot({
    path: `screenshots/google-${timestamp}.png`,
  });

  await browser.close();
})();
