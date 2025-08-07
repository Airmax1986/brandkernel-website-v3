# Vercel Database Setup Guide

This guide explains how to set up the Upstash Redis database for the BrandKernel waitlist functionality on Vercel.

## Prerequisites

- Vercel account with a deployed project
- Vercel CLI installed locally
- Access to your project's Vercel dashboard

## Step 1: Connect to Your Vercel Project

First, link your local project to your Vercel deployment:

```bash
# Navigate to your project directory
cd /path/to/brandkernel-website-v3

# Link to your Vercel project
vercel link

# Follow the prompts to select your team and project
```

## Step 2: Set Up Upstash Redis Database

### Option A: Through Vercel Dashboard (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `brandkernel-website-v3` project
3. Navigate to the "Storage" tab
4. Click "Create Database" → "Upstash Redis"
5. Choose a name for your database (e.g., `brandkernel-waitlist`)
6. Select your preferred region (choose closest to your users)
7. Click "Create"

### Option B: Through Upstash Dashboard

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Note down the REST URL and REST Token
4. Add them to your Vercel project environment variables

## Step 3: Pull Environment Variables

After creating the database, pull the environment variables to your local project:

```bash
# Pull the latest environment variables from Vercel
vercel env pull .env.development.local

# Or manually copy from Vercel dashboard
vercel env ls
```

## Step 4: Verify Environment Variables

Your `.env.development.local` should now contain:

```bash
# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-database-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Optional: Email service
RESEND_API_KEY=your_resend_api_key
```

## Step 5: Test the Implementation

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the waitlist API endpoint:
   ```bash
   # Test adding an email
   curl -X POST http://localhost:3000/api/join-waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","source":"test"}'

   # Test getting stats
   curl http://localhost:3000/api/join-waitlist
   ```

### Production Testing

1. Deploy your changes:
   ```bash
   vercel --prod
   ```

2. Test on your live site by submitting a waitlist form

## Step 6: Monitor Database Usage

### Through Vercel Dashboard

1. Go to your project's "Storage" tab
2. Click on your Redis database
3. View usage metrics, connection logs, and data browser

### Through Upstash Dashboard

1. Go to [Upstash Console](https://console.upstash.com/)
2. Select your database
3. Use the Data Browser to view stored waitlist entries
4. Monitor usage in the Metrics tab

## Database Schema

The waitlist implementation uses the following Redis keys:

```
# Email entries
waitlist:email:{email} -> JSON object with email, timestamp, source, position

# Email set for fast lookups
waitlist:emails -> Redis Set of all emails

# Counter for positions
waitlist:counter -> Integer counter for waitlist positions

# Position mapping
waitlist:position:{position} -> Email address

# Metadata
waitlist:last_updated -> ISO timestamp of last signup
```

## Fallback Behavior

The implementation includes automatic fallback to in-memory storage when Redis is not available:

- ✅ Development works without Redis setup
- ✅ Production gracefully handles Redis connection issues
- ✅ No data loss during temporary outages

## Troubleshooting

### Common Issues

1. **Environment Variables Not Found**
   ```
   Solution: Run `vercel env pull .env.development.local`
   ```

2. **Redis Connection Failed**
   ```
   Check: Verify UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
   Solution: Copy from Vercel dashboard or Upstash console
   ```

3. **Emails Not Being Saved**
   ```
   Check: Console logs for Redis errors
   Solution: Database should fallback to in-memory storage
   ```

### Debug Commands

```bash
# Check environment variables
vercel env ls

# View database in Upstash console
# Go to console.upstash.com → Your Database → Data Browser

# Test API endpoint locally
curl -X POST http://localhost:3000/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"debug@test.com"}'
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env.development.local` to Git
2. **API Rate Limiting**: Consider implementing rate limiting for the waitlist endpoint
3. **Email Validation**: The implementation includes server-side email validation
4. **Error Handling**: Sensitive Redis connection details are not exposed in error messages

## Monitoring & Analytics

The waitlist implementation includes:

- ✅ Console logging for all signups
- ✅ Google Analytics event tracking (if GA is configured)
- ✅ Automatic position assignment
- ✅ Duplicate email prevention
- ✅ Welcome email integration (with Resend)

## Next Steps

1. Set up email automation with Resend (optional)
2. Configure analytics and monitoring
3. Set up automated backups (Upstash handles this automatically)
4. Consider implementing admin dashboard for waitlist management

---

For additional help, refer to:
- [Vercel Storage Documentation](https://vercel.com/docs/storage)
- [Upstash Redis Documentation](https://upstash.com/docs/redis)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)