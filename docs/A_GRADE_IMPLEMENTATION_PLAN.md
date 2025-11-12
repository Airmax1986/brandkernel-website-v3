# A-Grade Implementation Plan
## BrandKernel Website v3 - Quality Improvement Roadmap

**Goal:** Achieve A-grade (9.2/10) code quality status
**Current Grade:** B+ (8.0/10)
**Target Completion:** 8-12 weeks (accelerated implementation)
**Created:** November 12, 2025

---

## Executive Summary

This document outlines the structured implementation plan to upgrade the BrandKernel Website v3 from B+ (8.0/10) to A-grade (9.2/10) status based on 2025 web development standards.

**Key Improvements:**
- Testing coverage: 0% → 60%+ (critical)
- Accessibility: C+ → A (WCAG 2.2 AA compliant)
- Documentation: C → A- (comprehensive guides)
- Code quality: B+ → A (eliminate duplication, refactor large components)
- Security: A → A+ (add rate limiting, monitoring)

---

## Implementation Phases

### Phase 1: Critical Fixes (Weeks 1-4)
**Focus:** Testing infrastructure and error handling
**Priority:** 🔴 Critical

### Phase 2: Quality Improvements (Weeks 5-8)
**Focus:** Code quality, accessibility, documentation
**Priority:** 🟠 High

### Phase 3: Advanced Features (Weeks 9-12)
**Focus:** Monitoring, optimization, refinement
**Priority:** 🟡 Medium

---

## Phase 1: Critical Fixes (Weeks 1-4)

### Week 1: Testing Infrastructure Setup

#### Task 1.1: Install Testing Dependencies
```bash
npm install -D vitest @vitest/ui @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event \
  happy-dom @playwright/test
```

**Deliverables:**
- [ ] Vitest configuration file
- [ ] Playwright configuration file
- [ ] Test scripts in package.json
- [ ] GitHub Actions CI/CD workflow

**Files to Create:**
- `vitest.config.ts`
- `playwright.config.ts`
- `.github/workflows/test.yml`

---

#### Task 1.2: Configure Vitest

**File:** `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        '**/*.config.*',
        '**/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**File:** `vitest.setup.ts`
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

---

#### Task 1.3: Configure Playwright

**File:** `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

### Week 2: API and Utility Tests

#### Task 2.1: API Endpoint Tests (80% coverage target)

**File:** `tests/api/join-waitlist.test.ts`
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '@/app/api/join-waitlist/route';
import { addToWaitlist, isEmailInWaitlist } from '@/lib/database';

vi.mock('@/lib/database');

describe('POST /api/join-waitlist', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should accept valid email and return position', async () => {
    vi.mocked(isEmailInWaitlist).mockResolvedValue(false);
    vi.mocked(addToWaitlist).mockResolvedValue({
      success: true,
      position: 1,
      totalSignups: 1,
    });

    const request = new Request('http://localhost/api/join-waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.position).toBe(1);
  });

  it('should reject invalid email format', async () => {
    const request = new Request('http://localhost/api/join-waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Invalid email');
  });

  it('should prevent duplicate signups', async () => {
    vi.mocked(isEmailInWaitlist).mockResolvedValue(true);

    const request = new Request('http://localhost/api/join-waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'existing@example.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.success).toBe(false);
  });
});
```

**Coverage Target:** 80% for API routes

---

#### Task 2.2: Utility Function Tests (70% coverage target)

**File:** `tests/lib/utils.test.ts`
```typescript
import { describe, it, expect } from 'vitest';
import {
  cn,
  formatDate,
  slugify,
  truncate,
  capitalize
} from '@/lib/utils';

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('text-red', 'bg-blue')).toBe('text-red bg-blue');
  });

  it('should filter out falsy values', () => {
    expect(cn('text-red', false, null, undefined, 'bg-blue')).toBe('text-red bg-blue');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = '2025-01-15';
    expect(formatDate(date)).toMatch(/January 15, 2025|15 January 2025/);
  });

  it('should handle invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});

describe('slugify', () => {
  it('should convert text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify('Hello & World!')).toBe('hello-world');
  });
});

describe('truncate', () => {
  it('should truncate long text', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('should not truncate short text', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });
});
```

**Coverage Target:** 70% for utility functions

---

### Week 3: Component Tests

#### Task 3.1: Form Component Tests (60% coverage target)

**File:** `tests/components/WaitlistForm.test.tsx`
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistForm from '@/components/WaitlistForm';

global.fetch = vi.fn();

describe('WaitlistForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render email input field', () => {
    render(<WaitlistForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('should show validation error for invalid email', async () => {
    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /join/i });

    await userEvent.type(input, 'invalid-email');
    await userEvent.click(button);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('should disable submit while loading', async () => {
    vi.mocked(fetch).mockImplementation(() =>
      new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /join/i });

    await userEvent.type(input, 'test@example.com');
    await userEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('should show success message after successful submission', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { position: 1 } }),
    } as Response);

    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', { name: /join/i });

    await userEvent.type(input, 'test@example.com');
    await userEvent.click(button);

    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });
});
```

**Coverage Target:** 60% for components

---

### Week 4: E2E Tests and Error Boundaries

#### Task 4.1: E2E User Journey Tests

**File:** `tests/e2e/waitlist-signup.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Waitlist Signup Flow', () => {
  test('should complete full signup journey', async ({ page }) => {
    await page.goto('/');

    // Find and fill email input
    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill('e2e-test@example.com');

    // Submit form
    const submitButton = page.locator('button:has-text("Join")').first();
    await submitButton.click();

    // Verify success message
    await expect(page.locator('text=/successfully|success/i')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator('input[type="email"]').first();
    await emailInput.fill('invalid-email');

    const submitButton = page.locator('button:has-text("Join")').first();
    await submitButton.click();

    await expect(page.locator('text=/invalid|error/i')).toBeVisible();
  });

  test('should navigate through main pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BrandKernel|Home/);

    await page.click('text=Features');
    await expect(page).toHaveURL(/features/);

    await page.click('text=Pricing');
    await expect(page).toHaveURL(/pricing/);

    await page.click('text=Blog');
    await expect(page).toHaveURL(/blog/);
  });
});
```

---

#### Task 4.2: Add Error Boundaries

**File:** `app/error.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-brand-purple">
          Something went wrong
        </h1>
        <p className="mb-6 text-lg text-neutral-600">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-brand-purple px-6 py-3 text-white hover:opacity-90"
        >
          Try again
        </button>
        {error.digest && (
          <p className="mt-4 text-sm text-neutral-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
```

**File:** `app/blog/[slug]/error.tsx`
```typescript
'use client';

import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-neutral-600 mb-6">
          We couldn't load this blog post. It may have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-brand-purple text-white rounded-lg"
          >
            Try Again
          </button>
          <Link
            href="/blog"
            className="px-6 py-2 border border-brand-purple text-brand-purple rounded-lg"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**File:** `app/loading.tsx`
```typescript
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-purple border-t-transparent"></div>
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}
```

---

## Phase 2: Quality Improvements (Weeks 5-8)

### Week 5: Component Consolidation

#### Task 5.1: Consolidate Chatbot Components

**Strategy:** Merge 4 variants into single component with feature flags

**File:** `components/UnifiedBrandChatbot.tsx`
```typescript
'use client';

import { useState } from 'react';

interface UnifiedBrandChatbotProps {
  variant?: 'default' | 'optimized' | 'consolidated';
  enableAdvancedFeatures?: boolean;
  position?: 'bottom-right' | 'bottom-left';
}

export default function UnifiedBrandChatbot({
  variant = 'default',
  enableAdvancedFeatures = false,
  position = 'bottom-right',
}: UnifiedBrandChatbotProps) {
  // Unified implementation combining best of all variants
  // ... implementation
}
```

**Files to Delete:**
- `components/ChatbotConsolidated.tsx`
- `components/OptimizedBrandChat.tsx`

**Files to Update:**
- Update all imports to use `UnifiedBrandChatbot`

---

#### Task 5.2: Remove Duplicate Cookie Consent

**Action:**
- Delete `components/CookieConsent.tsx`
- Keep only `components/CookieConsentOptimized.tsx`
- Rename to `components/CookieConsent.tsx` for simplicity

**Files to Update:**
- `app/layout.tsx` - Update import path

---

### Week 6-7: Accessibility Improvements

#### Task 6.1: Fix Image Alt Text

**Script:** Create automated alt text checker

**File:** `scripts/check-alt-text.ts`
```typescript
import fs from 'fs';
import path from 'path';

// Recursively check all TSX files for images without alt text
// Report violations
```

**Manual Fixes:**
- Review all `<img>` and `<OptimizedImage>` components
- Add descriptive alt text
- Use empty alt (`alt=""`) only for decorative images

---

#### Task 6.2: Add Form Labels and ARIA Attributes

**Updates to:** `components/WaitlistForm.tsx`, `components/HeroWaitlistForm.tsx`

```typescript
// Before
<input type="email" placeholder="Enter your email" />

// After
<label htmlFor="email-input" className="sr-only">
  Email address for waitlist signup
</label>
<input
  id="email-input"
  type="email"
  placeholder="your@email.com"
  aria-required="true"
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && (
  <p id="email-error" className="text-error-500 text-sm" role="alert">
    {error}
  </p>
)}
```

---

#### Task 6.3: Add Skip Navigation Link

**File:** `app/layout.tsx`
```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-brand-purple focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

---

#### Task 6.4: Improve Focus Styles

**File:** `app/globals.css`
```css
/* Add visible focus indicators */
*:focus-visible {
  outline: 2px solid theme('colors.brand.purple');
  outline-offset: 2px;
  border-radius: 2px;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:not(:focus-visible) {
  position: absolute;
}
```

---

### Week 8: Documentation

#### Task 8.1: Complete README.md

**File:** `README.md`
```markdown
# BrandKernel Website v3

Modern marketing website built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 with App Router
- ⚡ React 18 with Server Components
- 🎨 Tailwind CSS 3 with custom design system
- 📝 TypeScript 5 for type safety
- 📦 Contentful CMS integration
- 🗄️ Upstash Redis for waitlist
- 📧 Resend email service
- 🎭 Framer Motion animations
- 🔒 Enterprise-grade security headers
- ♿ WCAG 2.2 Level AA accessible
- ✅ 60%+ test coverage

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14.2.3 |
| Language | TypeScript 5.4.5 |
| Styling | Tailwind CSS 3.4.1 |
| CMS | Contentful 10.12.2 |
| Database | Upstash Redis |
| Email | Resend |
| Testing | Vitest + Playwright |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Airmax1986/brandkernel-website-v3.git

# Navigate to directory
cd brandkernel-website-v3

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

See `.env.example` for required environment variables:

- `CONTENTFUL_SPACE_ID` - Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful access token
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token
- `RESEND_API_KEY` - Resend API key
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID

See `docs/vercel-database-setup.md` for detailed setup instructions.

## Development

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # Run TypeScript compiler
npm run format       # Format code with Prettier
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:coverage # Generate coverage report
\`\`\`

## Project Structure

\`\`\`
brandkernel-website-v3/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── [pages]/           # Static pages
├── components/            # React components
│   └── chat/              # Chatbot components
├── lib/                   # Utilities & business logic
│   ├── contentful/        # CMS integration
│   └── schemas/           # SEO schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── tests/                 # Test files
│   ├── api/              # API tests
│   ├── components/       # Component tests
│   ├── lib/              # Utility tests
│   └── e2e/              # E2E tests
├── public/                # Static assets
├── docs/                  # Documentation
└── scripts/               # Build scripts
\`\`\`

## Testing

We maintain 60%+ test coverage across the codebase.

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e -- --ui
\`\`\`

## Deployment

This project is optimized for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

See `docs/vercel-database-setup.md` for detailed deployment guide.

## Documentation

- [Vercel Database Setup](docs/vercel-database-setup.md)
- [Code Quality Report](docs/CODE_QUALITY_REPORT_2025.md)
- [API Documentation](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

[Your License]

## Contact

For questions or support, contact [your-email@example.com]
\`\`\`

---

#### Task 8.2: Create API Documentation

**File:** `docs/API.md`
```markdown
# API Documentation

## Endpoints

### POST /api/join-waitlist

Add an email to the waitlist.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "source": "website",
  "sendWelcomeEmail": true
}
\`\`\`

**Response (Success):**
\`\`\`json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "email": "user@example.com",
    "position": 42,
    "totalSignups": 142,
    "emailSent": true
  }
}
\`\`\`

**Response (Error):**
\`\`\`json
{
  "success": false,
  "error": "Invalid email format"
}
\`\`\`

**Status Codes:**
- `200` - Success
- `400` - Invalid request (bad email format, missing email)
- `409` - Conflict (email already registered)
- `500` - Server error

---

### POST /api/revalidate

Revalidate cached content (Contentful webhook).

**Headers:**
- `X-Contentful-Signature` - Webhook signature

**Request Body:**
\`\`\`json
{
  "sys": {
    "type": "Entry",
    "contentType": {
      "sys": {
        "id": "blogPost"
      }
    }
  },
  "fields": {
    "slug": {
      "en-US": "article-slug"
    }
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "revalidated": true,
  "paths": ["/blog", "/blog/article-slug"]
}
\`\`\`

---

### GET /api/final-email-list

Export all waitlist emails (protected endpoint).

**Authentication:** Required (environment-based)

**Response:**
\`\`\`json
{
  "emails": [
    "user1@example.com",
    "user2@example.com"
  ],
  "total": 2
}
\`\`\`
\`\`\`

---

#### Task 8.3: Create CONTRIBUTING.md

**File:** `CONTRIBUTING.md`
```markdown
# Contributing to BrandKernel Website v3

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Workflow

\`\`\`bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
\`\`\`

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Standards

### TypeScript

- Use TypeScript strict mode
- Define types for all props and functions
- Avoid `any` type
- Use meaningful variable names

### React

- Use functional components
- Extract custom hooks for reusable logic
- Keep components under 250 lines
- Use Server Components by default
- Add `'use client'` only when needed

### Styling

- Use Tailwind CSS utility classes
- Follow existing design system
- Maintain responsive design
- Test on mobile and desktop

### Testing

- Write tests for new features
- Maintain 60%+ coverage
- Test edge cases
- Include E2E tests for user flows

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Testing Guidelines

\`\`\`bash
# Run tests before submitting PR
npm test
npm run test:e2e
npm run lint
npm run type-check
\`\`\`

## Questions?

Open an issue for questions or discussions.
\`\`\`

---

## Phase 3: Advanced Features (Weeks 9-12)

### Week 9: Rate Limiting

#### Task 9.1: Install Upstash Rate Limit

\`\`\`bash
npm install @upstash/ratelimit
\`\`\`

#### Task 9.2: Implement Rate Limiting

**File:** `lib/rate-limit.ts`
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create rate limiter instance
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export async function checkRateLimit(identifier: string) {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

    return {
      success,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open - allow request if rate limiting fails
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }
}
```

**Update:** `app/api/join-waitlist/route.ts`
```typescript
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'anonymous';

  // Check rate limit
  const rateLimitResult = await checkRateLimit(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.reset,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  }

  // ... rest of handler
}
```

---

### Week 10: Monitoring and Analytics

#### Task 10.1: Add Vercel Analytics

\`\`\`bash
npm install @vercel/analytics @vercel/speed-insights
\`\`\`

**Update:** `app/layout.tsx`
```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

#### Task 10.2: Add Web Vitals Tracking

**File:** `app/web-vitals.tsx`
```typescript
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    console.log(metric);

    // Optional: Send to external analytics service
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  });

  return null;
}
```

---

### Week 11: Component Refactoring

#### Task 11.1: Refactor BrandChatbot (363 → <250 lines)

**Split into:**
1. `components/chat/ChatbotCore.tsx` - Business logic
2. `components/chat/ChatbotUI.tsx` - UI presentation
3. `components/chat/ChatbotMessage.tsx` - Message components

#### Task 11.2: Refactor Header (279 → <250 lines)

**Extract:**
1. `components/header/MobileMenu.tsx`
2. `components/header/DesktopNav.tsx`
3. `components/header/NavLink.tsx`

#### Task 11.3: Refactor WaitlistForm (263 → <250 lines)

**Extract:**
1. `hooks/useWaitlistForm.ts` - Form logic
2. `components/forms/EmailInput.tsx` - Reusable input
3. `components/forms/FormStatus.tsx` - Success/error states

---

### Week 12: Final Polish

#### Task 12.1: Add Suspense Boundaries

**Update:** `app/blog/[slug]/page.tsx`
```typescript
import { Suspense } from 'react';

export default function BlogPost({ params }) {
  return (
    <>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent slug={params.slug} />
      </Suspense>

      <Suspense fallback={<div>Loading related posts...</div>}>
        <RelatedPosts slug={params.slug} />
      </Suspense>
    </>
  );
}
```

---

#### Task 12.2: Add Component JSDoc Documentation

**Example:**
```typescript
/**
 * Unified brand chatbot component with multiple display variants
 *
 * @param variant - Display variant: 'default' | 'optimized' | 'consolidated'
 * @param enableAdvancedFeatures - Enable experimental AI features
 * @param position - Screen position: 'bottom-right' | 'bottom-left'
 *
 * @example
 * ```tsx
 * <UnifiedBrandChatbot
 *   variant="optimized"
 *   position="bottom-right"
 * />
 * ```
 */
export function UnifiedBrandChatbot({ ... }) {
  // Implementation
}
```

---

#### Task 12.3: CI/CD Pipeline

**File:** `.github/workflows/test.yml`
```yaml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm test

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Success Criteria Checklist

### Phase 1: Critical Fixes
- [ ] Test coverage ≥60%
- [ ] All API endpoints have 80%+ coverage
- [ ] All utility functions have 70%+ coverage
- [ ] Component tests achieve 60%+ coverage
- [ ] E2E tests cover 5 critical user journeys
- [ ] Error boundaries implemented (root, blog, API)
- [ ] Loading states implemented
- [ ] CI/CD pipeline running tests

### Phase 2: Quality Improvements
- [ ] Chatbot components consolidated (4 → 1)
- [ ] Cookie consent consolidated (2 → 1)
- [ ] All images have descriptive alt text
- [ ] All forms have explicit labels
- [ ] Skip navigation link added
- [ ] Focus styles improved
- [ ] WCAG 2.2 Level AA compliant
- [ ] README.md complete
- [ ] API.md documentation created
- [ ] CONTRIBUTING.md created

### Phase 3: Advanced Features
- [ ] Rate limiting implemented (5 req/hour)
- [ ] Vercel Analytics installed
- [ ] Speed Insights installed
- [ ] Web Vitals tracking implemented
- [ ] BrandChatbot refactored (<250 lines)
- [ ] Header refactored (<250 lines)
- [ ] WaitlistForm refactored (<250 lines)
- [ ] Suspense boundaries added
- [ ] Component JSDoc added
- [ ] CI/CD pipeline complete

---

## Final Grade Projection

| Category | Before | After | Delta |
|----------|--------|-------|-------|
| Testing & QA | 1.0 | 9.0 | +8.0 |
| Accessibility | 7.0 | 9.0 | +2.0 |
| Documentation | 6.0 | 8.5 | +2.5 |
| Code Quality | 7.5 | 9.0 | +1.5 |
| Security | 9.5 | 9.5 | 0.0 |
| **Overall** | **8.0** | **9.2** | **+1.2** |

**Target Grade: A- (9.2/10)** ✅

---

## Timeline Summary

- **Weeks 1-4:** Critical fixes (testing + error handling)
- **Weeks 5-8:** Quality improvements (refactoring + accessibility + docs)
- **Weeks 9-12:** Advanced features (monitoring + optimization)

**Total Duration:** 12 weeks (3 months)
**Accelerated Option:** 8 weeks with dedicated resources

---

**Document Version:** 1.0
**Last Updated:** November 12, 2025
**Status:** Ready for implementation
