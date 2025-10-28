# Neon Postgres Setup Guide

## Why Neon Postgres Instead of Redis?

**Problem with Upstash Redis**: Free tier databases get archived after inactivity, losing all waitlist signups.

**Solution**: Neon Postgres provides permanent, free-tier database (512MB) that never gets archived.

---

## Setup Steps

### 1. Add Neon Integration to Vercel

You've already started this process! Continue with:

1. In Vercel Dashboard → **Integrations** → **Browse Marketplace**
2. Search for **"Neon"**
3. Click **"Add Integration"**
4. Select your Vercel account/team
5. Select the **brandkernel-website-v3** project
6. Click **"Continue"** to authorize

### 2. Create Neon Database

After adding the integration:

1. You'll be redirected to Neon Console (or go to console.neon.tech)
2. A database will be created automatically for your Vercel project
3. Neon will automatically add `DATABASE_URL` to your Vercel environment variables

**Important**: The database is created in all environments (Production, Preview, Development).

### 3. Initialize Database Schema

The database schema will be created **automatically** on first deployment. The initialization happens in `app/api/join-waitlist/route.ts` when the API is first called.

**Alternatively**, you can manually run the schema:

1. Go to **Neon Console** (console.neon.tech)
2. Select your project
3. Go to **SQL Editor**
4. Paste contents of `db/schema.sql`
5. Click **Run**

### 4. Pull Environment Variables Locally (Optional)

For local development:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Pull environment variables
vercel env pull .env.local
```

This will download `DATABASE_URL` to your local `.env.local` file.

### 5. Deploy to Vercel

The code is already updated for Neon! Just deploy:

```bash
git add .
git commit -m "Migrate waitlist to Neon Postgres"
git push
```

Vercel will automatically deploy with Neon connected.

---

## Migration from Redis (If You Have Existing Data)

If you already have signups in Upstash Redis:

### Option A: Manual Export

1. **Restore Redis** (if archived) in Upstash Console
2. **Export emails** from Upstash Data Browser
3. **Import manually** via Neon SQL Editor

### Option B: Automatic Migration Script

```bash
# Ensure both Redis and Neon credentials are in .env.local
vercel env pull .env.local

# Run migration script
tsx scripts/migrate-redis-to-postgres.ts
```

The script will:
- ✅ Connect to both Redis and Neon
- ✅ Fetch all emails from Redis
- ✅ Migrate them to Neon (preserving positions)
- ✅ Skip duplicates automatically
- ✅ Update the position counter

---

## Verifying the Setup

### Check Database in Neon Console

1. Go to **console.neon.tech**
2. Select your project
3. Go to **SQL Editor**
4. Run:
   ```sql
   SELECT * FROM waitlist ORDER BY position DESC LIMIT 10;
   ```
5. You should see your waitlist entries

### Test API Endpoint

**Locally:**
```bash
npm run dev

# In another terminal:
curl -X POST http://localhost:3000/api/join-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**In Production:**
```bash
curl -X POST https://www.brandkernel.io/api/join-waitlist \
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

---

## Database Schema

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

### In Neon Console SQL Editor

**Get Total Signups:**
```sql
SELECT COUNT(*) FROM waitlist;
```

**Get Recent Signups:**
```sql
SELECT email, position, created_at
FROM waitlist
ORDER BY created_at DESC
LIMIT 10;
```

**Get All Emails (for export):**
```sql
SELECT email FROM waitlist ORDER BY position ASC;
```

**Get Signups by Source:**
```sql
SELECT source, COUNT(*) as count
FROM waitlist
GROUP BY source;
```

**Export as CSV:**
- Run your query in Neon SQL Editor
- Results appear in table format
- Click **"Export"** or copy/paste to spreadsheet

---

## Neon Features & Benefits

### Why Neon?

| Feature | Redis Free | Neon Free |
|---------|------------|-----------|
| **Storage** | 256MB | 512MB (2x more!) |
| **Archiving** | ❌ After 28 days | ✅ Never |
| **Data Loss** | ❌ Possible | ✅ Impossible |
| **Backups** | Manual | ✅ Automatic |
| **Branching** | ❌ No | ✅ Database branching |
| **SQL Support** | Limited | ✅ Full Postgres |
| **Vercel Integration** | Manual | ✅ Native |

### Free Tier Limits

- **Storage**: 512MB (≈100,000+ emails)
- **Compute Hours**: 191.9 hours/month active time
- **Projects**: 1 project
- **Databases**: Unlimited per project
- **Rows**: Unlimited

**You won't hit these limits for a waitlist!**

---

## Monitoring & Maintenance

### View Usage

1. Go to **Neon Console** → Your project
2. Click **"Usage"** tab
3. See storage, compute hours, and data transfer

### Automatic Features

Neon handles these automatically (zero config):
- ✅ **Auto-suspend**: Database sleeps after inactivity (saves compute hours)
- ✅ **Auto-resume**: Wakes up instantly on first query
- ✅ **Backups**: Daily backups included (7-day retention)
- ✅ **Point-in-time restore**: Restore to any point in time

### No Maintenance Needed!

Unlike Redis:
- ✅ Never gets archived
- ✅ No manual restoration needed
- ✅ No data loss risk
- ✅ Set it and forget it

---

## Troubleshooting

### "relation does not exist" Error

**Cause**: Tables haven't been created yet.

**Solution**:
1. Deploy the app (triggers automatic initialization), OR
2. Manually run `db/schema.sql` in Neon SQL Editor

### "DATABASE_URL not found" Error

**Cause**: Environment variable not set.

**Solution**:
```bash
# Pull from Vercel
vercel env pull .env.local

# Or check Neon Console for connection string
```

### Duplicate Email Error

**Expected behavior!** The database has a unique constraint on email.

API returns:
```json
{
  "success": false,
  "error": "Email already registered"
}
```

### Migration Script Fails

**Check**:
1. Both Redis AND Neon credentials in `.env.local`
2. Redis database is restored (not archived)
3. Neon database exists and is connected

---

## Environment Variables

### Neon (Auto-added by Vercel Integration)

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/database?sslmode=require
```

That's it! Just one variable.

### Old Redis Variables (Can Remove After Migration)

```env
# These can be deleted after successful migration
KV_REST_API_URL=
KV_REST_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Accessing Neon Console

**From Vercel Dashboard:**
1. Go to **Storage** tab in your Vercel project
2. Click your Neon database
3. Click **"Open in Neon Console"**

**Direct Link:**
https://console.neon.tech

---

## Next Steps

1. ✅ Neon integration added
2. ✅ Code updated for Neon
3. ✅ Dependencies installed
4. Deploy to production
5. Test waitlist signup
6. (Optional) Migrate Redis data
7. (Optional) Delete old Redis database

---

## Support & Resources

**Neon Documentation**: https://neon.tech/docs

**Vercel + Neon Guide**: https://vercel.com/docs/storage/vercel-postgres/neon-postgres-integration

**Neon Status**: https://neonstatus.com

**Community**: https://discord.gg/neon (Neon Discord)

---

## Quick Reference

**Add Neon Integration**: Vercel Dashboard → Integrations → Add Neon

**SQL Editor**: console.neon.tech → Your Project → SQL Editor

**View Data**: `SELECT * FROM waitlist ORDER BY position DESC;`

**Export Emails**: `SELECT email FROM waitlist ORDER BY position ASC;`

**Check Count**: `SELECT COUNT(*) FROM waitlist;`

**Pull Env Variables**: `vercel env pull .env.local`

**Deploy**: `git push`

---

**Ready to go! 🚀**
