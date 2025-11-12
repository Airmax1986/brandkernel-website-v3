# Webhook API Setup Guide

This guide explains how to set up and use the webhook API endpoint for receiving events from external services like Outrank.so.

## Overview

The webhook API endpoint allows external services to send real-time notifications about events (e.g., published articles) to your BrandKernel website.

**Endpoint:** `/api/webhook`

**Supported Events:**
- `publish_articles` - Triggered when articles are published

## Setup Instructions

### 1. Configure Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
WEBHOOK_ACCESS_TOKEN=your_secure_random_token_here
```

**Important:** Use a strong, random token. You can generate one using:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### 2. Deploy Your Application

Make sure your application is deployed and publicly accessible via HTTPS. The webhook endpoint will be available at:

```
https://your-domain.com/api/webhook
```

### 3. Configure Outrank.so Webhook Integration

In your Outrank.so dashboard:

1. Navigate to **Integrations** > **Webhooks**
2. Click **"Add Webhook Integration"**
3. Provide the following information:
   - **Integration Name:** `BrandKernel Website` (or any name you prefer)
   - **Webhook Endpoint:** `https://your-domain.com/api/webhook`
   - **Access Token:** The same token you set in `WEBHOOK_ACCESS_TOKEN`

### 4. Test Your Webhook

You can test the webhook endpoint using curl:

```bash
curl -X POST https://your-domain.com/api/webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secure_random_token_here" \
  -d '{
    "event_type": "publish_articles",
    "timestamp": "2023-04-01T12:00:00Z",
    "data": {
      "articles": [
        {
          "id": "test123",
          "title": "Test Article",
          "content_markdown": "This is a test article.",
          "content_html": "<p>This is a test article.</p>",
          "meta_description": "A test article for webhook testing",
          "created_at": "2023-04-01T10:00:00Z",
          "image_url": "https://example.com/test.jpg",
          "slug": "test-article",
          "tags": ["test"]
        }
      ]
    }
  }'
```

Expected response (200 OK):
```json
{
  "success": true,
  "message": "Webhook processed successfully",
  "processed": {
    "count": 1,
    "articles": ["Test Article"]
  }
}
```

## Implementation Details

### Authentication

The webhook uses Bearer token authentication. Every request must include the `Authorization` header:

```
Authorization: Bearer your_secure_random_token_here
```

### Request Format

**Method:** `POST`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Body Structure:**
```json
{
  "event_type": "publish_articles",
  "timestamp": "2023-04-01T12:00:00Z",
  "data": {
    "articles": [
      {
        "id": "string",
        "title": "string",
        "content_markdown": "string",
        "content_html": "string",
        "meta_description": "string",
        "created_at": "string (ISO 8601)",
        "image_url": "string",
        "slug": "string",
        "tags": ["string"]
      }
    ]
  }
}
```

### Response Codes

- `200` - Webhook processed successfully
- `400` - Invalid payload or unsupported event type
- `401` - Invalid or missing access token
- `500` - Internal server error

### Health Check

You can check if the webhook endpoint is active using a GET request:

```bash
curl https://your-domain.com/api/webhook
```

Response:
```json
{
  "success": true,
  "message": "Webhook endpoint is active",
  "info": {
    "supported_events": ["publish_articles"],
    "authentication": "Bearer token required",
    "method": "POST"
  }
}
```

## Customizing Article Processing

The webhook currently logs received articles to the console. To add custom processing logic:

1. Open `/app/api/webhook/route.ts`
2. Find the `processPublishedArticles()` function
3. Add your custom logic:

```typescript
async function processPublishedArticles(articles: Article[]): Promise<void> {
  for (const article of articles) {
    // Example: Save to your database
    await saveArticleToDatabase(article);

    // Example: Trigger site rebuild
    await fetch('https://api.vercel.com/v1/integrations/deploy/...', {
      method: 'POST'
    });

    // Example: Send notification
    await sendTeamNotification(`New article published: ${article.title}`);

    // Add your custom logic here...
  }
}
```

## Monitoring and Debugging

### Check Server Logs

When a webhook is received, the endpoint logs information to the console:

```
Webhook received: publish_articles at 2023-04-01T12:00:00Z
Processing 2 published article(s)...
Article: "How to Implement Webhooks" (how-to-implement-webhooks)
- ID: 123456
- Created: 2023-03-31T10:30:00Z
- Tags: webhooks, integration, api
- Image: https://example.com/images/webhook-article.jpg
---
```

### Common Issues

**401 Unauthorized**
- Verify the access token matches in both your `.env.local` and Outrank.so settings
- Check for extra spaces or incorrect Bearer format

**404 Not Found**
- Ensure your application is deployed and the URL is correct
- Verify the endpoint is `/api/webhook` (not `/webhook`)

**500 Internal Server Error**
- Check your server logs for specific error details
- Verify all required environment variables are set

## Security Best Practices

1. **Use HTTPS Only** - Never expose webhook endpoints over HTTP
2. **Keep Tokens Secret** - Never commit `.env.local` to version control
3. **Rotate Tokens Regularly** - Change your access token periodically
4. **Monitor Failed Requests** - Set up alerts for repeated 401 errors
5. **Rate Limiting** - Consider adding rate limiting for production use

## Platform-Specific Notes

### Vercel
- Webhook endpoints work out of the box
- Set environment variables in Vercel dashboard
- Serverless function timeout: 10 seconds (Hobby), 60 seconds (Pro)

### Other Platforms
- Ensure the `/api/webhook` route is publicly accessible
- Configure environment variables according to platform requirements
- Check platform-specific timeout limits for webhook processing

## Support

If you encounter issues:
1. Check the console logs in your deployment platform
2. Verify the webhook configuration in Outrank.so
3. Test with the curl command provided above
4. Review the error messages in the response

For more information about Outrank.so webhooks, visit: https://www.outrank.so/dashboard/integrations/docs/webhook
