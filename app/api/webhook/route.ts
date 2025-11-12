import { NextRequest, NextResponse } from 'next/server';

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
    articles: string[];
  };
}

/**
 * Validates the Bearer token from the Authorization header
 */
function validateAccessToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  const expectedToken = process.env.WEBHOOK_ACCESS_TOKEN;

  if (!expectedToken) {
    console.error('WEBHOOK_ACCESS_TOKEN not configured in environment variables');
    return false;
  }

  return token === expectedToken;
}

/**
 * Process published articles
 * TODO: Implement your custom logic here (e.g., save to database, trigger notifications, etc.)
 */
async function processPublishedArticles(articles: Article[]): Promise<void> {
  console.log(`Processing ${articles.length} published article(s)...`);

  for (const article of articles) {
    console.log(`Article: "${article.title}" (${article.slug})`);
    console.log(`- ID: ${article.id}`);
    console.log(`- Created: ${article.created_at}`);
    console.log(`- Tags: ${article.tags.join(', ')}`);
    console.log(`- Image: ${article.image_url}`);
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
    // Validate access token
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

    // Log the webhook event
    console.log(`Webhook received: ${payload.event_type} at ${payload.timestamp}`);

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

        // Process the published articles
        await processPublishedArticles(payload.data.articles);

        // Return success response
        return NextResponse.json(
          {
            success: true,
            message: 'Webhook processed successfully',
            processed: {
              count: payload.data.articles.length,
              articles: payload.data.articles.map(a => a.title)
            }
          } as WebhookResponse,
          { status: 200 }
        );

      default:
        console.warn(`Unknown event type: ${payload.event_type}`);
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown event type',
            message: `Event type "${payload.event_type}" is not supported`
          } as WebhookResponse,
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Webhook processing error:', error);

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

    // Handle other errors
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
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Webhook endpoint is active',
      info: {
        supported_events: ['publish_articles'],
        authentication: 'Bearer token required',
        method: 'POST'
      }
    },
    { status: 200 }
  );
}
