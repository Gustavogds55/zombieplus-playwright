# Copilot instructions for the zombieplus repo

Keep this short and actionable. Focus on Playwright E2E test patterns, the local run/debug workflow, and important file locations.

- Project purpose: end-to-end tests for the ZombiePlus frontend using Playwright (@playwright/test).

- Key locations
  - Tests/specs: `tests/e2e/*.js` (example: `tests/e2e/login.spec.js`)
  - Page objects: `tests/pages/*.js` (example: `tests/pages/loginPage.js`, `tests/pages/landingPage.js`)
  - Shared UI helpers/components: `tests/e2e/components.js` (contains `Toast` helper)
  - Playwright config: `playwright.config.js` (testDir set to `./tests`; reporter: html)
  - CI workflow: `.github/workflows/playwright.yml` (runs `npm ci`, installs browsers and runs `npx playwright test`)
  - Generated artifacts: `playwright-report/` (HTML) and `test-results/` (traces, zips)

- Big picture / architecture notes
  - This repo contains Playwright E2E tests only (no server). Tests assume a running frontend at `http://localhost:3000`.
  - Page objects live under `tests/pages` and are instantiated in specs (pattern: `loginPage = new LoginPage(page)` in `test.beforeEach`).
  - Tests use Playwright locator helpers heavily: `getByPlaceholder`, `getByRole`, `getByTestId`, and raw `locator()` with CSS selectors.
  - Traces and HTML reports are produced by Playwright and uploaded by CI. `trace: 'on-first-retry'` is enabled in config.

- Important patterns & examples (copy-edit friendly)
  - Page object example (from `tests/pages/loginPage.js`):
    - visit: `await this.page.goto('http://localhost:3000/admin/login')`
    - submit: `await this.page.getByPlaceholder('E-mail').fill(email)` and `await this.page.getByRole('button', { name: 'Entrar' }).click()`
    - validation: `await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')`
  - Component example: `Toast.haveText(message)` asserts `.toast` content and waits for it to hide.
  - Selectors: CSS ends-with is used for some alerts: `span[class$=alert]`.

- Run / debug commands (explicit, repeatable)
  - Install deps: `npm ci` (project has devDependency `@playwright/test`)
  - Install browsers: `npx playwright install --with-deps`
  - Run all tests: `npx playwright test`
  - Run a single spec: `npx playwright test tests/e2e/login.spec.js`
  - Run headed (visible) Chromium: `npx playwright test --headed --project=chromium`
  - Open HTML report: `npx playwright show-report playwright-report` or `npx playwright show-report`
  - Open a trace: `npx playwright show-trace <path/to/trace.zip>`
  - Debug interactive session: `PWDEBUG=1 npx playwright test -i` or add `test.only`/`page.pause()` in the test

- CI behaviour to be aware of
  - `playwright.config.js` sets `forbidOnly` and `retries` based on `process.env.CI`.
  - CI workflow installs browsers with `npx playwright install --with-deps` before running tests.

- Project-specific caveats and conventions
  - The page objects use hard-coded URLs (e.g. `http://localhost:3000`). The `webServer` option in `playwright.config.js` is commented out — tests expect the app to be started manually or the `webServer` setting to be enabled and wired to an npm script (e.g. `npm run start`).
  - Files mix CommonJS `require()` with `export class ...` syntax in page objects. Preserve the existing import style when editing (tests currently `require('../pages/loginPage')`).
  - Tests expect Portuguese UI messages (e.g. `Campo obrigatório`, `Email incorreto`). Use existing messages when asserting text.

- When editing tests/pages
  - Keep page objects simple: provide visit(), action methods (submit/open/etc.), and focused assertion helpers (e.g. `alertHaveText`).
  - Reuse `tests/e2e/components.js` helpers when applicable (Toast). Add similar small helpers there rather than duplicating locator logic in specs.

- If you need to enable auto-start of the app in CI
  - Uncomment and configure `webServer` in `playwright.config.js` and add a `start` script to `package.json` that launches the app on port 3000.

If anything above is unclear or you want me to expand a section (for example: canonicalize module system, add a recommended `npm start` script, or convert page objects to CommonJS/ESM consistently), tell me which part and I'll update this file.
