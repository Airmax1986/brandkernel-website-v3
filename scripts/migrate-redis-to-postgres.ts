/**
 * Migration Script: Redis to Vercel Postgres
 *
 * This script migrates waitlist data from Upstash Redis to Vercel Postgres.
 * Run this once after setting up Vercel Postgres to preserve existing signups.
 *
 * Usage:
 *   tsx scripts/migrate-redis-to-postgres.ts
 */

import { Redis } from '@upstash/redis';
import { sql } from '@vercel/postgres';

// Redis connection (old database)
function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.error('❌ Redis credentials not found in environment variables');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error);
    return null;
  }
}

// Types
interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
  position: number;
}

async function migrateData() {
  console.log('🚀 Starting migration from Redis to Postgres...\n');

  // Connect to Redis
  const redis = getRedisClient();
  if (!redis) {
    console.error('❌ Cannot connect to Redis. Make sure Redis credentials are in your .env file.');
    process.exit(1);
  }

  try {
    // Get all emails from Redis
    console.log('📥 Fetching emails from Redis...');
    const emails = await redis.smembers('waitlist:emails') as string[];
    console.log(`   Found ${emails.length} emails in Redis\n`);

    if (emails.length === 0) {
      console.log('✅ No data to migrate. Redis waitlist is empty.');
      return;
    }

    // Get counter from Redis
    const counter = await redis.get('waitlist:counter') as number | null;
    console.log(`📊 Current Redis counter: ${counter || 0}\n`);

    // Initialize Postgres
    console.log('🔧 Ensuring Postgres tables exist...');
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        source VARCHAR(100) DEFAULT 'website',
        position INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)`;
    await sql`CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START WITH 71`;
    console.log('✅ Postgres tables ready\n');

    // Check if Postgres already has data
    const existingCount = await sql`SELECT COUNT(*) as count FROM waitlist`;
    const existingRows = parseInt(existingCount.rows[0].count as string, 10);

    if (existingRows > 0) {
      console.log(`⚠️  Postgres already has ${existingRows} entries.`);
      console.log('   Migration will skip duplicate emails.\n');
    }

    // Migrate each email
    console.log('🔄 Migrating emails to Postgres...');
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const email of emails) {
      try {
        // Get full entry from Redis
        const entryData = await redis.get(`waitlist:email:${email}`) as string | null;
        let entry: WaitlistEntry;

        if (entryData) {
          entry = JSON.parse(entryData);
        } else {
          // If no detailed entry, create a basic one
          entry = {
            email,
            timestamp: new Date().toISOString(),
            source: 'website',
            position: counter || 71
          };
        }

        // Insert into Postgres
        await sql`
          INSERT INTO waitlist (email, source, position, created_at)
          VALUES (
            ${entry.email},
            ${entry.source || 'website'},
            ${entry.position},
            ${entry.timestamp}
          )
          ON CONFLICT (email) DO NOTHING
        `;

        successCount++;
        console.log(`   ✓ Migrated: ${email} (Position: ${entry.position})`);
      } catch (error) {
        if (error instanceof Error && error.message.includes('duplicate key')) {
          skipCount++;
          console.log(`   → Skipped: ${email} (already exists)`);
        } else {
          errorCount++;
          console.error(`   ✗ Error migrating ${email}:`, error);
        }
      }
    }

    // Update sequence to match current counter
    if (counter && counter > 71) {
      await sql`SELECT setval('waitlist_position_seq', ${counter})`;
      console.log(`\n✅ Updated Postgres sequence to ${counter}`);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Successfully migrated: ${successCount}`);
    console.log(`→  Skipped (duplicates):  ${skipCount}`);
    console.log(`❌ Errors:                ${errorCount}`);
    console.log(`📊 Total in Redis:        ${emails.length}`);
    console.log('='.repeat(50));

    // Verify Postgres data
    const finalCount = await sql`SELECT COUNT(*) as count FROM waitlist`;
    const finalRows = parseInt(finalCount.rows[0].count as string, 10);
    console.log(`\n✅ Final Postgres count: ${finalRows} entries`);

    console.log('\n🎉 Migration complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Verify data in Vercel Dashboard → Storage → Postgres');
    console.log('   2. Update Vercel environment variables (if needed)');
    console.log('   3. Deploy the updated application');
    console.log('   4. You can now archive or delete the Redis database\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
