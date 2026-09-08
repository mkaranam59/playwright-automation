# Playwright Automation

All the Playwright implementations. End-to-end UI test automation using [Playwright Test](https://playwright.dev/) with TypeScript/JavaScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (bundled with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mkaranam59/playwright-automation.git
cd playwright-automation
npm install
```

Install the browser binaries required by Playwright:

```bash
npx playwright install
```

## Project Structure

```
playwright_automaton/
├── tests/                  # Test specs
│   ├── example.spec.ts
│   └── ttcart.spec.js
├── playwright.config.ts    # Playwright configuration
├── package.json
└── playwright-report/      # HTML report output (generated)
```

## Running Tests

Run all tests (headless, Chromium by default):

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/ttcart.spec.js
```

Run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

Run tests with the interactive UI mode:

```bash
npx playwright test --ui
```

Debug a test:

```bash
npx playwright test --debug
```

## Viewing Reports

After a test run, an HTML report is generated. View it with:

```bash
npx playwright show-report
```

## Notes

- Playwright is installed as a local project dependency (`@playwright/test`), not globally. Always invoke it via `npx playwright ...` from the project directory rather than running the bare `playwright` command, otherwise PowerShell/CMD will report it as "not recognized".
- Configuration (test directory, browsers, reporter, tracing, etc.) lives in [`playwright.config.ts`](./playwright.config.ts).
