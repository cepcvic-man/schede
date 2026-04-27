const assert = require('assert');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

(async () => {
  const fileUrl = pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(fileUrl);
  await page.waitForLoadState('domcontentloaded');

  const mobile = await page.evaluate(() => {
    const rect = selector => {
      const node = document.querySelector(selector);
      const box = node.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom, height: box.height };
    };
    return {
      title: rect('#home-title'),
      search: rect('#home-search'),
      primary: rect('.home-primary-section'),
      future: rect('.future-list')
    };
  });

  assert.ok(mobile.search.top < 360, 'mobile search appears in first viewport');
  assert.ok(mobile.primary.top < 520, 'Pulizia entry appears before long scrolling');
  assert.ok(mobile.future.top > mobile.primary.top, 'future categories appear after Pulizia');

  await page.fill('#home-search', 'mop');
  await page.waitForSelector('#search-results.active');
  assert.ok(await page.locator('#search-results .result-button').count() > 0, 'home search shows results');
  await page.click('#open-cleaning');
  await page.waitForSelector('body.manual-open');

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(fileUrl);
  await desktop.waitForLoadState('domcontentloaded');
  const desktopState = await desktop.evaluate(() => {
    const hero = document.querySelector('.hero-home').getBoundingClientRect();
    const dashboard = document.querySelector('.home-dashboard').getBoundingClientRect();
    return { heroHeight: hero.height, dashboardTop: dashboard.top };
  });
  assert.ok(desktopState.heroHeight < 260, 'desktop hero is compact');
  assert.ok(desktopState.dashboardTop < 420, 'desktop dashboard starts high enough');

  await browser.close();
  assert.deepStrictEqual(errors, [], 'no page errors');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
