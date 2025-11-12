import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

// TypeScript types for the webhook payload
interface Article {
  id: string;
  title: string;
  content_markdown: string;
  content_html: string;
  meta_description: string;
  created_at: string;
  image_url: string;
  slug: string;
  tags: string[];
}

interface WebhookPayload {
  event_type: string;
  timestamp: string;
  data: {
    articles: Article[];
  };
}

interface WebhookResponse {
  success: boolean;
  message: string;
  error?: string;
  processed?: {
    count: number;
  };
}

// Constants
const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ARTICLES_PER_REQUEST = 100;
const MAX_REQUESTS_PER_MINUTE = 60;
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes
const REPLAY_WINDOW_SECONDS = 600; // 10 minutes

// Initialize Redis client (for rate limiting and replay prevention)
// Redis is OPTIONAL - webhook will work without it but with reduced security
// To enable: Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in environment
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } else {
    console.warn('Redis not configured - rate limiting and replay protection disabled');
  }
} catch (error) {
  console.error('Failed to initialize Redis client:', error);
}

/**
 * Sanitize string for logging (prevents log injection)
 */
function sanitizeForLog(input: string): string {
  if (typeof input !== 'string') {
    return '[non-string-value]';
  }
  // Remove newlines, carriage returns, ANSI escape codes, and limit length
  return input
    .replace(/[\n\r]/g, ' ')
    .replace(/\x1b\[[0-9;]*m/g, '')
    .substring(0, 200);
}

/**
 * Validates the Bearer token using constant-time comparison
 * Prevents timing attacks (CWE-208)
 */
function validateAccessToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7).trim(); // Remove "Bearer " prefix

  // Validate token is not empty
  if (!token || token.length === 0) {
    return false;
  }

  const expectedToken = process.env.WEBHOOK_ACCESS_TOKEN;

  if (!expectedToken || expectedToken.length === 0) {
    console.error('WEBHOOK_ACCESS_TOKEN not configured in environment variables');
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  try {
    const tokenBuffer = Buffer.from(token, 'utf-8');
    const expectedBuffer = Buffer.from(expectedToken, 'utf-8');

    // If lengths differ, create same-length buffers to maintain constant time
    if (tokenBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(tokenBuffer, expectedBuffer);
  } catch (error) {
    console.error('Error during token comparison:', error);
    return false;
  }
}

/**
 * Rate limiting check using Redis with timeout
 * Implements sliding window rate limiting
 */
async function checkRateLimit(identifier: string): Promise<boolean> {
  if (!redis) {
    // If Redis is not available, allow the request but log a warning
    console.warn('Redis not available, rate limiting disabled');
    return true;
  }

  try {
    // Add timeout to Redis operations (500ms max)
    const rateLimitPromise = (async () => {
      const key = `webhook:ratelimit:${identifier}`;
      const now = Date.now();
      const windowStart = now - 60000; // 1 minute window

      // Remove old entries
      await redis!.zremrangebyscore(key, 0, windowStart);

      // Count requests in current window
      const requestCount = await redis!.zcard(key);

      if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
        return false;
      }

      // Add current request
      await redis!.zadd(key, { score: now, member: `${now}` });

      // Set expiry on the key
      await redis!.expire(key, 120); // 2 minutes

      return true;
    })();

    const timeoutPromise = new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.warn('Rate limit check timed out, allowing request');
        resolve(true);
      }, 500); // 500ms timeout
    });

    return await Promise.race([rateLimitPromise, timeoutPromise]);
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // On error, allow the request (fail open for availability)
    return true;
  }
}

/**
 * Check for replay attacks using timestamp and Redis with timeout
 */
async function checkReplayAttack(timestamp: string, fingerprint: string): Promise<boolean> {
  // Validate timestamp format (ISO 8601)
  const webhookTime = new Date(timestamp);
  if (isNaN(webhookTime.getTime())) {
    return false; // Invalid timestamp format
  }

  // Check if timestamp is within acceptable window
  const now = Date.now();
  const timeDiff = Math.abs(now - webhookTime.getTime());

  if (timeDiff > TIMESTAMP_TOLERANCE_MS) {
    console.warn(`Webhook timestamp outside tolerance window: ${timeDiff}ms`);
    return false;
  }

  // Check if this exact request has been seen before (using Redis)
  if (!redis) {
    // If Redis is not available, only check timestamp
    console.warn('Redis not available, replay protection limited to timestamp validation');
    return true;
  }

  try {
    // Add timeout to Redis operations (500ms max)
    const replayCheckPromise = (async () => {
      const key = `webhook:replay:${fingerprint}`;
      const exists = await redis!.get(key);

      if (exists) {
        console.warn(`Replay attack detected: ${sanitizeForLog(fingerprint)}`);
        return false; // Request has been seen before
      }

      // Store fingerprint to prevent replay
      await redis!.setex(key, REPLAY_WINDOW_SECONDS, '1');
      return true;
    })();

    const timeoutPromise = new Promise<boolean>((resolve) => {
      setTimeout(() => {
        console.warn('Replay check timed out, allowing request');
        resolve(true);
      }, 500); // 500ms timeout
    });

    return await Promise.race([replayCheckPromise, timeoutPromise]);
  } catch (error) {
    console.error('Replay check failed:', error);
    // On error, allow the request (fail open for availability)
    return true;
  }
}

/**
 * Runtime validation of article structure
 */
function validateArticle(article: any): article is Article {
  return (
    typeof article === 'object' &&
    article !== null &&
    typeof article.id === 'string' &&
    typeof article.title === 'string' &&
    typeof article.content_markdown === 'string' &&
    typeof article.content_html === 'string' &&
    typeof article.meta_description === 'string' &&
    typeof article.created_at === 'string' &&
    typeof article.image_url === 'string' &&
    typeof article.slug === 'string' &&
    Array.isArray(article.tags) &&
    article.tags.every((tag: any) => typeof tag === 'string')
  );
}

/**
 * Process published articles
 * TODO: Implement your custom logic here (e.g., save to database, trigger notifications, etc.)
 */
async function processPublishedArticles(articles: Article[]): Promise<void> {
  console.log(`Processing ${articles.length} published article(s)...`);

  for (const article of articles) {
    // Sanitize all user input before logging
    console.log(`Article: "${sanitizeForLog(article.title)}" (${sanitizeForLog(article.slug)})`);
    console.log(`- ID: ${sanitizeForLog(article.id)}`);
    console.log(`- Created: ${sanitizeForLog(article.created_at)}`);
    console.log(`- Tags: ${article.tags.map(t => sanitizeForLog(t)).join(', ')}`);
    console.log('---');

    // TODO: Add your custom processing logic here
    // Examples:
    // - Save to your database
    // - Send notifications to your team
    // - Trigger a site rebuild
    // - Update search index
    // - Post to social media
    // - etc.
  }
}

/**
 * POST /api/webhook
 * Receives webhook events from Outrank.so
 */
export async function POST(request: NextRequest) {
  try {
    // Check payload size before parsing
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payload too large',
          message: `Payload size exceeds ${MAX_PAYLOAD_SIZE} bytes`
        } as WebhookResponse,
        { status: 413 }
      );
    }

    // Validate access token (constant-time comparison)
    if (!validateAccessToken(request)) {
      console.warn('Webhook request rejected: Invalid or missing access token');
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid access token',
          message: 'Unauthorized: Invalid or missing Bearer token'
        } as WebhookResponse,
        { status: 401 }
      );
    }

    // Rate limiting check (using IP or token as identifier)
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const rateLimitOk = await checkRateLimit(clientIp);
    if (!rateLimitOk) {
      console.warn(`Rate limit exceeded for ${sanitizeForLog(clientIp)}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.'
        } as WebhookResponse,
        { status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      );
    }

    // Parse the webhook payload
    const payload: WebhookPayload = await request.json();

    // Validate required fields
    if (!payload.event_type || !payload.timestamp || !payload.data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payload structure',
          message: 'Missing required fields: event_type, timestamp, or data'
        } as WebhookResponse,
        { status: 400 }
      );
    }

    // Create fingerprint for replay detection (hash of critical fields)
    const fingerprintData = JSON.stringify({
      event_type: payload.event_type,
      timestamp: payload.timestamp,
      // Include a subset of data to create unique fingerprint
      article_ids: payload.data.articles?.map(a => a?.id).slice(0, 10)
    });
    const fingerprint = crypto.createHash('sha256').update(fingerprintData).digest('hex');

    // Check for replay attacks
    const replayCheckOk = await checkReplayAttack(payload.timestamp, fingerprint);
    if (!replayCheckOk) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid timestamp or replay detected',
          message: 'Request timestamp is invalid or request has already been processed'
        } as WebhookResponse,
        { status: 400 }
      );
    }

    // Log the webhook event (sanitized)
    console.log(`Webhook received: ${sanitizeForLog(payload.event_type)} at ${sanitizeForLog(payload.timestamp)}`);

    // Handle different event types
    switch (payload.event_type) {
      case 'publish_articles':
        if (!payload.data.articles || !Array.isArray(payload.data.articles)) {
          return NextResponse.json(
            {
              success: false,
              error: 'Invalid articles data',
              message: 'Expected articles array in payload data'
            } as WebhookResponse,
            { status: 400 }
          );
        }

        // Check array bounds
        if (payload.data.articles.length === 0) {
          return NextResponse.json(
            {
              success: false,
              error: 'Empty articles array',
              message: 'Articles array cannot be empty'
            } as WebhookResponse,
            { status: 400 }
          );
        }

        if (payload.data.articles.length > MAX_ARTICLES_PER_REQUEST) {
          return NextResponse.json(
            {
              success: false,
              error: 'Too many articles',
              message: `Maximum ${MAX_ARTICLES_PER_REQUEST} articles per request`
            } as WebhookResponse,
            { status: 400 }
          );
        }

        // Runtime validation of each article
        for (let i = 0; i < payload.data.articles.length; i++) {
          if (!validateArticle(payload.data.articles[i])) {
            return NextResponse.json(
              {
                success: false,
                error: 'Invalid article structure',
                message: `Article at index ${i} has invalid structure or types`
              } as WebhookResponse,
              { status: 400 }
            );
          }
        }

        // Process the published articles
        await processPublishedArticles(payload.data.articles);

        // Return success response (minimal information disclosure)
        return NextResponse.json(
          {
            success: true,
            message: 'Webhook processed successfully',
            processed: {
              count: payload.data.articles.length
            }
          } as WebhookResponse,
          {
            status: 200,
            headers: {
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY'
            }
          }
        );

      default:
        console.warn(`Unknown event type: ${sanitizeForLog(payload.event_type)}`);
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown event type',
            message: 'Event type is not supported'
          } as WebhookResponse,
          { status: 400 }
        );
    }

  } catch (error) {
    // Log sanitized error (not full stack trace)
    if (error instanceof Error) {
      console.error('Webhook processing error:', sanitizeForLog(error.message));
    } else {
      console.error('Webhook processing error: Unknown error type');
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON payload',
          message: 'Failed to parse webhook payload'
        } as WebhookResponse,
        { status: 400 }
      );
    }

    // Handle other errors (minimal information disclosure)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while processing the webhook'
      } as WebhookResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhook
 * Health check endpoint (requires authentication)
 */
export async function GET(request: NextRequest) {
  // Require authentication for health check too
  if (!validateAccessToken(request)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required'
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Webhook endpoint is active',
      info: {
        supported_events: ['publish_articles'],
        max_articles_per_request: MAX_ARTICLES_PER_REQUEST,
        rate_limit: `${MAX_REQUESTS_PER_MINUTE} requests per minute`,
        timestamp_tolerance: `${TIMESTAMP_TOLERANCE_MS / 1000} seconds`
      }
    },
    {
      status: 200,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    }
  );
}
