# Vercel Environment Variables Setup

## Problem
The waitlist signup is not working locally because the Redis/KV credentials are stored in Vercel's environment variables, not in your local `.env` files.

## Solution

### Option 1: Pull Environment Variables from Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Pull environment variables:
```bash
vercel env pull .env.development.local
```

This will download all your Vercel environment variables to `.env.development.local`.

### Option 2: Manually Add Credentials

1. Go to your Vercel Dashboard
2. Navigate to your project → Settings → Environment Variables
3. Find these variables:
   - `KV_REST_API_URL` (or `UPSTASH_REDIS_REST_URL`)
   - `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_TOKEN`)

4. Add them to `.env.development.local`:
```bash
KV_REST_API_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
```

### Option 3: Create a New Vercel KV Store (if needed)

1. Go to Vercel Dashboard → Storage
2. Create a new KV Store
3. Connect it to your project
4. Pull the credentials using Option 1 or 2

## Testing the Connection

After setting up the credentials, test with:

```bash
npx tsx test-redis-connection.ts
```

## Current Code Updates Made

✅ Updated `lib/database.ts` to check for both Vercel KV and Upstash variables
✅ Added better error logging to identify connection issues
✅ Updated test script to check for both sets of variables

## Important Notes

- The code now prioritizes Vercel KV variables (`KV_REST_API_*`) over Upstash variables
- If no Redis credentials are found, it falls back to in-memory storage (data won't persist)
- In production on Vercel, the environment variables are automatically available