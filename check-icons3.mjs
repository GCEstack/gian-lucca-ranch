import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const svgCount = await page.locator('svg').count();
const useCount = await page.locator('svg use').count();
console.log('SVGs:', svgCount, 'social sprite uses:', useCount);
await browser.close();
