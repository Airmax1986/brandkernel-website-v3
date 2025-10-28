# Waitlist Migration: Redis → Vercel Postgres

## Problem Solved

**Before**: Upstash Redis free tier archives databases after inactivity, causing data loss.

**After**: Vercel Postgres provides permanent, free storage (256MB) that never gets archived.

---

## What Changed

### 1. Database Layer (`lib/database.ts`)
- ✅ Replaced `@upstash/redis` with `@vercel/postgres`
- ✅ Converted Redis commands to SQL queries
- ✅ Added automatic table initialization
- ✅ Maintained same API interface (no breaking changes for existing code)

### 2. Database Schema (`db/schema.sql`)
- ✅ Created `waitlist` table with proper indexes
- ✅ Added sequence for position counter (starts at 71)
- ✅ Added analytics view for stats

### 3. API Route (`app/api/join-waitlist/route.ts`)
- ✅ Updated initialization to handle async Postgres setup
- ✅ No other changes needed (same interface)

### 4. Migration Script (`scripts/migrate-redis-to-postgres.ts`)
- ✅ Automatic data migration from Redis to Postgres
- ✅ Preserves all emails and positions
- ✅ Handles duplicates gracefully

### 5. Dependencies (`package.json`)
- ✅ Added: `@vercel/postgres`
- ✅ Removed: `@upstash/redis` (can be removed after migration)

---

## Files Modified

| File | Status | Description |
|------|--------|-------------|
| `lib/database.ts` | ✅ Replaced | New Postgres implementation |
| `lib/database.redis.backup.ts` | ✅ Backup | Original Redis version (safe to delete) |
| `app/api/join-waitlist/route.ts` | ✅ Updated | Async database init |
| `package.json` | ✅ Updated | New dependencies |
| `.env.example` | ✅ Updated | Postgres variables |
| `db/schema.sql` | ✅ New | Database schema |
| `scripts/migrate-redis-to-postgres.ts` | ✅ New | Migration tool |
| `POSTGRES_SETUP.md` | ✅ New | Complete setup guide |

---

## Next Steps for Deployment

### 1. Create Vercel Postgres Database

Go to Vercel Dashboard → Storage → Create → Postgres:
- Name: `brandkernel-waitlist`
- Plan: Hobby (Free)
- Region: Frankfurt (or closest to your users)

### 2. Connect to Your Project

In Vercel:
- Storage → Your database → Connect Project
- Select: `brandkernel-website-v3`
- Environment: Production, Preview, Development

This automatically adds Postgres environment variables to Vercel.

### 3. Deploy Changes

```bash
# Commit changes
git add .
git commit -m "Migrate waitlist from Redis to Vercel Postgres"

# Push to your branch
git push -u origin claude/main-011CUZfZV1sAZ3fMyfNuUnr2
```

### 4. Migrate Existing Data (Optional)

If you have signups in Redis:

```bash
# First, restore Redis database in Upstash if archived
# Then run migration script locally:
vercel env pull .env.local
tsx scripts/migrate-redis-to-postgres.ts
```

### 5. Verify

After deployment:
1. Test signup: https://www.brandkernel.io/waitlist
2. Check data: Vercel Dashboard → Storage → Query
   ```sql
   SELECT * FROM waitlist ORDER BY position DESC LIMIT 10;
   ```

---

## Benefits

| Feature | Redis Free | Postgres Free |
|---------|------------|---------------|
| **Archiving** | ❌ After 28 days | ✅ Never |
| **Data Loss** | ❌ Possible | ✅ Impossible |
| **Backups** | Manual | ✅ Automatic |
| **SQL Queries** | Limited | ✅ Full support |
| **CSV Export** | Complex | ✅ One click |
| **Storage** | 256MB | 256MB |

---

## Testing Checklist

- [ ] Vercel Postgres database created
- [ ] Database connected to project
- [ ] Environment variables synced
- [ ] Code deployed to production
- [ ] Test signup form works
- [ ] Verify data in Vercel Dashboard
- [ ] (Optional) Migrate existing Redis data
- [ ] (Optional) Archive/delete old Redis database

---

## Support

**Setup Guide**: See `POSTGRES_SETUP.md` for detailed instructions.

**Vercel Docs**: https://vercel.com/docs/storage/vercel-postgres

**Questions**: Check Vercel Dashboard → Storage → Documentation

---

## Migration Status

- [x] Code migration complete
- [x] Dependencies updated
- [x] Documentation created
- [ ] Vercel Postgres database created (manual step)
- [ ] Deployed to production (ready to deploy)
- [ ] Data migrated from Redis (if applicable)

**Ready to deploy!** 🚀
