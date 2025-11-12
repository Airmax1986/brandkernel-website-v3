# CI/CD Setup Instructions

## GitHub Actions Workflow

A GitHub Actions workflow has been prepared for this project but cannot be added through automated tools due to GitHub App permission restrictions.

### Workflow Configuration

To enable automated testing on GitHub, manually create the following file:

**`.github/workflows/ci.yml`:**

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run type check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm test -- --run

      - name: Upload coverage reports
        if: always()
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          fail_ci_if_error: false

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Build project
        run: npm run build
        env:
          # Add build-time environment variables if needed
          NODE_ENV: production

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next
          retention-days: 7

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

### Manual Setup Steps

1. **Create the workflow directory:**
   ```bash
   mkdir -p .github/workflows
   ```

2. **Create the workflow file:**
   ```bash
   # Copy the configuration above into:
   .github/workflows/ci.yml
   ```

3. **Commit and push:**
   ```bash
   git add .github/workflows/ci.yml
   git commit -m "ci: add GitHub Actions workflow for automated testing"
   git push
   ```

### What This Workflow Does

1. **Test Job** - Runs on every push and pull request
   - Installs dependencies
   - Runs TypeScript type checking
   - Runs ESLint
   - Executes unit tests with Vitest
   - Uploads coverage reports to Codecov (optional)

2. **Build Job** - Runs after tests pass
   - Builds the Next.js application
   - Uploads build artifacts for inspection
   - Validates production build configuration

3. **E2E Job** - Runs after build succeeds
   - Installs Playwright browsers
   - Runs end-to-end tests
   - Uploads test reports for debugging

### Environment Variables

If your tests or build require environment variables, add them as GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add required secrets (e.g., `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`)
3. Reference them in the workflow:
   ```yaml
   env:
     CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
     CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
   ```

### Benefits

- ✅ Automated testing on every push
- ✅ Prevents broken code from being merged
- ✅ Validates builds in CI environment
- ✅ E2E tests ensure user flows work
- ✅ Code coverage tracking
- ✅ Build artifacts for debugging

### Status Badge

After the workflow is active, add a status badge to your README:

```markdown
[![CI/CD](https://github.com/Airmax1986/brandkernel-website-v3/actions/workflows/ci.yml/badge.svg)](https://github.com/Airmax1986/brandkernel-website-v3/actions/workflows/ci.yml)
```

---

## Alternative: Vercel Integration

If you're deploying to Vercel, you can also configure build checks:

1. Go to your Vercel project settings
2. Enable "Automatically expose System Environment Variables"
3. Add any required environment variables
4. Vercel will automatically run `npm run build` and `npm test` on deployment

The GitHub Actions workflow provides more control and faster feedback than Vercel's built-in checks.
