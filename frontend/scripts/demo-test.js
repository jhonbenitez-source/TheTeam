const puppeteer = require('puppeteer');

(async () => {
  const TEST_EMAIL = `demo_user_${Date.now()}@example.com`;
  const TEST_PASS = 'password123';

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for login form (we render Login when no user)
    await page.waitForSelector('form', { timeout: 15000 });

    // Ensure we're on the login (Iniciar Sesión) tab; click Registrarse
    const regButton = await page.$x("//button[contains(., 'Registrarse')]");
    if (regButton.length) await regButton[0].click();

    // Fill email
    await page.waitForSelector('input[type=email]');
    await page.type('input[type=email]', TEST_EMAIL);

    // Fill password and confirm
    const pwdInputs = await page.$$('input[type=password]');
    if (pwdInputs.length >= 2) {
      await pwdInputs[0].type(TEST_PASS);
      await pwdInputs[1].type(TEST_PASS);
    } else if (pwdInputs.length === 1) {
      await pwdInputs[0].type(TEST_PASS);
    }

    // Submit
    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {}),
    ]);

    // Check localStorage for demo user
    const demoCurrent = await page.evaluate(() => localStorage.getItem('theteam_demo_current'));
    console.log('theteam_demo_current:', demoCurrent);

    // Now try logout: click Cerrar Sesión button if visible
    const logoutBtn = await page.$x("//button[contains(., 'Cerrar Sesión')]");
    if (logoutBtn.length) {
      await logoutBtn[0].click();
      console.log('Clicked logout');
    } else {
      console.log('Logout button not found');
    }

    // Now try to login with the same demo user
    await page.waitForSelector('form');
    // ensure Iniciar Sesión tab
    const loginTab = await page.$x("//button[contains(., 'Iniciar Sesión')]");
    if (loginTab.length) await loginTab[0].click();
    await page.waitForSelector('input[type=email]');
    await page.evaluate(() => { document.querySelectorAll('input[type=email]')[0].value = ''; document.querySelectorAll('input[type=password]')[0].value = ''; });
    await page.type('input[type=email]', TEST_EMAIL);
    const pwdInputs2 = await page.$$('input[type=password]');
    if (pwdInputs2.length >= 1) await pwdInputs2[0].type(TEST_PASS);

    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {}),
    ]);

    const demoCurrent2 = await page.evaluate(() => localStorage.getItem('theteam_demo_current'));
    console.log('theteam_demo_current after login:', demoCurrent2);

    console.log('\nTEST RESULT: OK - demo registration and login executed');
  } catch (err) {
    console.error('\nTEST RESULT: FAILED', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
