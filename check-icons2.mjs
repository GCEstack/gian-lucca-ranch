import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://gian-lucca-ranch-8v0d4x968-simplebalance89-ais-projects.vercel.app/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const svgHtml = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('svg')).map(s => s.outerHTML.slice(0, 200));
});
console.log(svgHtml.join('\n---\n'));
await browser.close();
