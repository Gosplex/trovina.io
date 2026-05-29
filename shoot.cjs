const puppeteer = require('puppeteer');
const BASE = 'http://localhost:4790';
const shots = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/services/ai-automation-workflow-systems', name: 'service-detail' },
];
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  for (const theme of ['light', 'dark']) {
    for (const s of shots) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.evaluateOnNewDocument((t) => { localStorage.setItem('trovina-theme', t); }, theme);
      await page.goto(BASE + s.path, { waitUntil: 'networkidle0', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1200));
      const file = `/tmp/shot-${s.name}-${theme}.png`;
      await page.screenshot({ path: file });
      console.log('saved', file);
      await page.close();
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
