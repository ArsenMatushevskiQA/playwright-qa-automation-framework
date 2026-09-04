# playwright-qa-automation-framework

End-to-end and API test automation suite built with [Playwright](https://playwright.dev) and JavaScript.
The project targets [SauceDemo](https://www.saucedemo.com) and the JSONPlaceholder API, uses the Page Object Model, custom test fixtures, and GitHub Actions CI.

## Tech stack

- [Playwright](https://playwright.dev) (`@playwright/test` ^1.62.1)
- JavaScript ES modules (`"type": "module"`)
- Node.js LTS

## Project structure

```
.
├── fixtures/
│   └── test.fixture.js       # Custom fixtures and authenticated user helper
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CartPage.js
├── tests/
│   ├── ui/
│   │   ├── login.spec.js
│   │   └── shopping.spec.js
│   └── api/
│       ├── healthcheck.spec.js
│       └── users.spec.js
├── specs/
│   └── saucedemo-shopping-flow-test-plan.md
├── .github/
│   ├── workflows/
│   │   ├── playwright.yml
│   │   └── copilot-setup-steps.yml
│   └── agents/
│       ├── playwright-test-planner.agent.md
│       ├── playwright-test-generator.agent.md
│       └── playwright-test-healer.agent.md
├── .vscode/
│   └── mcp.json              # Playwright MCP server configuration
├── playwright.config.js
└── package.json
```

## Implemented tests

### UI (project `ui`) — base URL `https://www.saucedemo.com`

- `tests/ui/login.spec.js`
  - Successful login with `standard_user` / `secret_sauce`
  - Invalid login with `standard_user` and wrong password
  - Invalid login with `locked_out_user`
- `tests/ui/shopping.spec.js`
  - Add `Sauce Labs Backpack` to cart and verify it on the cart page

### API (project `api`) — base URL `https://jsonplaceholder.typicode.com`

- `tests/api/healthcheck.spec.js`
  - Verify `https://www.saucedemo.com/` returns `200`, `text/html`, and contains `Swag Labs`
- `tests/api/users.spec.js`
  - POST `/posts` creates a post and returns `201`
  - GET `/posts/1` retrieves an existing post and returns `200`
  - PATCH `/posts/1` updates a post and returns `200`
  - DELETE `/posts/1` removes a post and returns `200`

## Configuration

`playwright.config.js` defines two projects:

| Project | Pattern | Base URL |
| --- | --- | --- |
| `ui` | `ui/**/*.spec.{js,ts}` | `https://www.saucedemo.com` |
| `api` | `api/**/*.spec.{js,ts}` | `https://jsonplaceholder.typicode.com` |

Other settings:

- HTML reporter enabled
- Trace on first retry; screenshot only on failure
- Fully parallel locally; single worker and 2 retries on CI
- Desktop Chrome profile for UI tests

## Running locally

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run only UI or API tests
npx playwright test --project=ui
npx playwright test --project=api

# Open the HTML report
npx playwright show-report
```

## CI

`.github/workflows/playwright.yml` runs the suite on pushes and pull requests to `main`/`master`,
installs dependencies and browsers, runs `npx playwright test`, and uploads the `playwright-report/`
artifact for 30 days.

`.github/workflows/copilot-setup-steps.yml` only installs dependencies and Playwright browsers;
it does not execute tests.

`.github/agents/` contains prompt files for GitHub Copilot / AI agent workflows (test planner,
test generator, test healer). They are not executed as part of CI.

## Notes

- JSONPlaceholder is a mock REST API. POST, PATCH, and DELETE requests return the expected status codes and response bodies, but writes are simulated and not persisted between requests.
- `specs/saucedemo-shopping-flow-test-plan.md` is the test-planning artifact behind the implemented SauceDemo scope.
- `tests/seed.spec.ts` is an empty placeholder and is not included in the `ui` or `api` projects.
- Environment-variable loading from `.env` is commented out in `playwright.config.js`.
