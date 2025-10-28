# Vercel Postgres Setup Guide

## Why Postgres Instead of Redis?

**Problem with Upstash Redis**: Free tier databases get archived after inactivity, losing all waitlist signups.

**Solution**: Vercel Postgres provides a permanent, free-tier database (256MB) that never gets archived.

---

## Setup Steps

### 1. Create Vercel Postgres Database

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose **Hobby** plan (Free - 256MB)
6. Name it: `brandkernel-waitlist`
7. Select region closest to your users (e.g., `Frankfurt (fra1)` for EU)
8. Click **Create**

### 2. Connect Database to Project

1. In the database dashboard, click **Connect Project**
2. Select your `brandkernel-website-v3` project
3. Select **Production**, **Preview**, and **Development** environments
4. Click **Connect**

This automatically adds these environment variables to your Vercel project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 3. Pull Environment Variables Locally (Optional)

For local development:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local
```

### 4. Install Dependencies

```bash
npm install
```

This will install `@vercel/postgres` which is already added to `package.json`.

### 5. Initialize Database Schema

The database schema will be created automatically on first deployment. The initialization happens in `app/api/join-waitlist/route.ts` on module load.

Alternatively, you can manually run the schema from Vercel Dashboard:

1. Go to **Storage** → Your Postgres database
2. Click **Query** tab
3. Paste contents of `db/schema.sql`
4. Click **Run**

### 6. Deploy to Vercel

```bash
git add .
git commit -m "Migrate waitlist from Redis to Postgres"
git push
```

Vercel will automatically deploy with the new Postgres database connected.

---

## Migration from Redis (If You Have Existing Data)

If you already have signups in Redis and want to preserve them:

### Option A: Manual Export/Import

1. **Export from Redis** (via Upstash Console):
   - Go to Upstash Console
   - Navigate to your Redis database
   - Go to **Data Browser**
   - Export emails manually

2. **Import to Postgres**:
   - Use the migration script: `tsx scripts/migrate-redis-to-postgres.ts`

### Option B: Automatic Migration Script

```bash
# Ensure both Redis and Postgres credentials are in .env.local
tsx scripts/migrate-redis-to-postgres.ts
```

The script will:
- Connect to both Redis and Postgres
- Fetch all emails from Redis
- Migrate them to Postgres (preserving positions)
- Skip duplicates
- Update the position counter

---

## Verifying the Setup

### Check Database in Vercel Dashboard

1. Go to **Storage** → Your Postgres database
2. Click **Query** tab
3. Run: `SELECT * FROM waitlist ORDER BY position DESC LIMIT 10;`
4. You should see your waitlist entries

### Test API Endpoint Locally

```bash
npm run dev

# In another terminal
curl -X POST http://localhost:3000/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "email": "test@example.com",
    "position": 72,
    "totalSignups": 1
  }
}
```

### Test in Production

```bash
curl -X POST https://www.brandkernel.io/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## Database Schema

The database has one main table:

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes** for performance:
- `idx_waitlist_email` - Fast email lookups
- `idx_waitlist_position` - Position ordering
- `idx_waitlist_created_at` - Time-based queries

**Sequence**: `waitlist_position_seq` - Auto-incrementing counter starting at 71

---

## Querying the Database

### Get Total Signups

```sql
SELECT COUNT(*) FROM waitlist;
```

### Get Recent Signups

```sql
SELECT email, position, created_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 10;
```

### Get All Emails (for export)

```sql
SELECT email FROM waitlist ORDER BY position ASC;
```

### Get Signups by Source

```sql
SELECT source, COUNT(*) as count
FROM waitlist
GROUP BY source;
```

### Export All Data as CSV

In Vercel Dashboard → Query tab:
```sql
SELECT * FROM waitlist ORDER BY position ASC;
```

Then click **Download as CSV**.

---

## Maintenance

### No Maintenance Required!

Unlike Redis, Vercel Postgres:
- ✅ Never gets archived due to inactivity
- ✅ Automatic backups included
- ✅ No manual restoration needed
- ✅ Persistent storage
- ✅ 256MB free storage (thousands of emails)

### Monitoring

Check your database usage:
1. Go to Vercel Dashboard → Storage
2. Click on your database
3. View **Usage** tab

You can store ~50,000+ email addresses before hitting the 256MB limit.

---

## Troubleshooting

### "relation does not exist" Error

The table hasn't been created yet. Solution:
1. Deploy the app (triggers automatic initialization)
2. Or manually run `db/schema.sql` in Vercel Query tab

### Connection Errors in Development

Make sure you have environment variables:
```bash
vercel env pull .env.local
```

### Duplicate Emails

The database has a unique constraint on email. The API will return:
```json
{
  "success": false,
  "error": "Email already registered",
  "message": "This email is already on our waitlist"
}
```

### Migration Failed

If migration script fails:
1. Check both Redis and Postgres credentials are in `.env.local`
2. Ensure Postgres database exists and is connected
3. Check Redis isn't already archived (restore it first)

---

## Environment Variables Reference

### Vercel Postgres (Auto-added by Vercel)
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

### Old Redis Variables (Can be removed after migration)
```env
KV_REST_API_URL=
KV_REST_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Email Service (Optional)
```env
RESEND_API_KEY=  # For welcome emails
```

---

## Benefits of This Migration

| Feature | Redis (Free) | Vercel Postgres (Free) |
|---------|--------------|------------------------|
| Storage | 256MB | 256MB |
| Archiving | ❌ Archived after 28 days inactivity | ✅ Never archived |
| Backups | ❌ Manual only | ✅ Automatic |
| Restore | Manual process required | Not needed |
| SQL Queries | Limited | ✅ Full SQL support |
| Export | Complex | ✅ Easy CSV export |
| Persistence | ❌ Can lose data | ✅ Permanent |

---

## Next Steps

1. ✅ Setup complete
2. Deploy to production
3. Test signup form on website
4. Monitor signups in Vercel Dashboard
5. Export emails when needed for campaigns

For questions or issues, check Vercel's Postgres documentation:
https://vercel.com/docs/storage/vercel-postgres
