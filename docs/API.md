# API Documentation

## Base URL

**Development:** `http://localhost:3000/api`
**Production:** `https://www.brandkernel.io/api`

---

## Endpoints

### POST /api/join-waitlist

Add an email to the waitlist and optionally send a welcome email.

**Endpoint:** `POST /api/join-waitlist`

#### Request Body

```json
{
  "email": "user@example.com",
  "source": "website",
  "sendWelcomeEmail": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email address |
| `source` | string | No | Signup source (default: "website") |
| `sendWelcomeEmail` | boolean | No | Send welcome email (default: true) |

#### Response (Success)

```json
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
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Request success status |
| `message` | string | Human-readable message |
| `data.email` | string | Registered email address |
| `data.position` | number | Position in waitlist queue |
| `data.totalSignups` | number | Total waitlist signups |
| `data.emailSent` | boolean | Whether welcome email was sent |

#### Response (Error)

```json
{
  "success": false,
  "error": "Invalid email format"
}
```

or

```json
{
  "success": false,
  "message": "Email already registered"
}
```

#### Status Codes

| Code | Description |
|------|-------------|
| `200` | Success - Email added to waitlist |
| `400` | Bad Request - Invalid email format or missing email |
| `409` | Conflict - Email already registered |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Server Error - Database or email service error |

#### Rate Limiting

- **Limit:** 5 requests per hour per IP address
- **Headers returned:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

#### Example Usage

**cURL:**
```bash
curl -X POST https://www.brandkernel.io/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "source": "website"}'
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('/api/join-waitlist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    source: 'website',
  }),
});

const data = await response.json();

if (data.success) {
  console.log(`Position in waitlist: ${data.data.position}`);
} else {
  console.error(`Error: ${data.error || data.message}`);
}
```

**TypeScript:**
```typescript
interface WaitlistRequest {
  email: string;
  source?: string;
  sendWelcomeEmail?: boolean;
}

interface WaitlistResponse {
  success: boolean;
  message?: string;
  data?: {
    email: string;
    position: number;
    totalSignups: number;
    emailSent: boolean;
  };
  error?: string;
}

async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  const response = await fetch('/api/join-waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return response.json();
}
```

---

### POST /api/revalidate

Revalidate cached content (ISR). This endpoint is triggered by Contentful webhooks when content is updated.

**Endpoint:** `POST /api/revalidate`

**Authentication:** Webhook signature validation (X-Contentful-Signature header)

#### Request Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-Contentful-Signature` | string | Yes | Webhook signature for validation |
| `Content-Type` | string | Yes | Must be `application/json` |

#### Request Body

```json
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
```

#### Response (Success)

```json
{
  "revalidated": true,
  "paths": ["/blog", "/blog/article-slug"],
  "timestamp": "2025-11-12T20:00:00.000Z"
}
```

#### Response (Error)

```json
{
  "revalidated": false,
  "error": "Invalid signature"
}
```

#### Status Codes

| Code | Description |
|------|-------------|
| `200` | Success - Paths revalidated |
| `401` | Unauthorized - Invalid webhook signature |
| `500` | Server Error - Revalidation failed |

#### Paths Revalidated

When a blog post is updated, the following paths are automatically revalidated:
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post page
- `/` - Homepage (if post is featured)

---

### GET /api/final-email-list

Export all waitlist emails (protected endpoint).

**Endpoint:** `GET /api/final-email-list`

**Authentication:** Environment-based (production only)

#### Response (Success)

```json
{
  "emails": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
  ],
  "total": 3,
  "timestamp": "2025-11-12T20:00:00.000Z"
}
```

#### Response (Unauthorized)

```json
{
  "error": "Unauthorized access"
}
```

#### Status Codes

| Code | Description |
|------|-------------|
| `200` | Success - Email list returned |
| `401` | Unauthorized - Missing or invalid credentials |
| `500` | Server Error - Database error |

---

## Database

### Upstash Redis

The API uses **Upstash Redis** for waitlist storage with automatic fallback to in-memory storage.

**Features:**
- Email deduplication (Set operations)
- Position counter for queue management
- Atomic operations for consistency
- Fallback storage when Redis unavailable

**Data Structure:**
```typescript
interface WaitlistEntry {
  email: string;
  timestamp: string;
  source?: string;
  position: number;
}
```

**Redis Keys:**
- `waitlist:emails` - Set of all email addresses
- `waitlist:position` - Counter for position assignment
- `waitlist:{email}` - Individual entry data

---

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_EMAIL` | Email format is invalid |
| `EMAIL_EXISTS` | Email already in waitlist |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `DATABASE_ERROR` | Redis connection or operation failed |
| `EMAIL_SEND_ERROR` | Email service error |
| `INVALID_SIGNATURE` | Webhook signature validation failed |

---

## Email Service

The API uses **Resend** for transactional emails.

### Welcome Email

Automatically sent when a user joins the waitlist (if `sendWelcomeEmail: true`):

**Subject:** "Welcome to BrandKernel - You're on the waitlist!"

**Content:**
- Welcome message
- Waitlist position
- Total signups
- Social links
- Contact information

**From:** `noreply@brandkernel.io`
**Reply-To:** `hello@brandkernel.io`

---

## Rate Limiting

Rate limiting is implemented using **Upstash Redis** with sliding window algorithm.

**Configuration:**
- **Limit:** 5 requests per hour
- **Window:** Sliding 1-hour window
- **Identifier:** IP address (X-Forwarded-For header)
- **Fallback:** If Redis unavailable, allows all requests (fail-open)

**Response Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1699824000
```

---

## Testing

### Test Endpoints (Development Only)

In development mode, you can test the API without rate limiting:

```bash
# Join waitlist
curl -X POST http://localhost:3000/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Trigger revalidation (requires valid signature in production)
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "X-Contentful-Signature: test-signature" \
  -d '{"sys":{"type":"Entry"},"fields":{"slug":{"en-US":"test-post"}}}'
```

### API Tests

Run automated API tests:

```bash
npm test -- tests/api
```

---

## Webhooks

### Contentful Webhook Setup

1. Go to Contentful Settings ’ Webhooks
2. Create new webhook with URL: `https://your-domain.com/api/revalidate`
3. Select triggers: "Entry publish", "Entry unpublish"
4. Add secret key for signature validation
5. Save and test

---

## Security

### Best Practices

-  Input validation on all endpoints
-  Rate limiting to prevent abuse
-  HTTPS enforcement (HSTS)
-  Webhook signature validation
-  Environment variables for secrets
-  CORS headers configured
-  SQL injection prevention (no SQL used)
-  XSS prevention (sanitized inputs)

### Headers

All API responses include security headers:
```
Content-Type: application/json
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=63072000
```

---

## Support

For API support or questions:
- **Email**: developers@brandkernel.io
- **Documentation**: https://docs.brandkernel.io
- **GitHub Issues**: https://github.com/Airmax1986/brandkernel-website-v3/issues

---

**Last Updated:** November 12, 2025
**API Version:** 1.0.0
