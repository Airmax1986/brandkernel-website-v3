import { neon } from '@neondatabase/serverless';

// Database operations for waitlist using Neon Postgres
export interface WaitlistEntry {
  email: string;
  timestamp: string;
  source?: string;
  position: number;
}

export interface WaitlistStats {
  totalSignups: number;
  timestamp: string;
}

// Get SQL client
function getSQL() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL not found in environment variables');
  }

  return neon(databaseUrl);
}

/**
 * Initialize database and create tables if they don't exist
 */
export async function initializeDatabase(): Promise<void> {
  try {
    const sql = getSQL();

    // Create waitlist table if it doesn't exist
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

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(position)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC)`;

    // Create sequence for position counter (starts at 71 to match existing counter)
    await sql`CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START WITH 71`;

    console.log('✅ Neon Postgres: Database initialized successfully');
  } catch (error) {
    // If error is about objects already existing, that's fine
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log('✅ Neon Postgres: Database tables already exist');
      return;
    }
    console.error('❌ Neon Postgres: Error initializing database:', error);
    throw error;
  }
}

/**
 * Add email to waitlist
 */
export async function addToWaitlist(
  email: string,
  source: string = 'website'
): Promise<{ success: boolean; position: number; totalSignups: number; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const sql = getSQL();

    // Check if email already exists
    const existingEntry = await sql`
      SELECT email, position FROM waitlist WHERE email = ${normalizedEmail}
    `;

    if (existingEntry.length > 0) {
      const existing = existingEntry[0];
      return {
        success: false,
        position: existing.position as number,
        totalSignups: 0,
        error: 'Email already registered'
      };
    }

    // Get next position from sequence
    const positionResult = await sql`SELECT nextval('waitlist_position_seq') as position`;
    const position = positionResult[0].position as number;

    // Insert new waitlist entry
    await sql`
      INSERT INTO waitlist (email, source, position)
      VALUES (${normalizedEmail}, ${source}, ${position})
    `;

    // Get total signups
    const statsResult = await sql`SELECT COUNT(*) as count FROM waitlist`;
    const totalSignups = parseInt(statsResult[0].count as string, 10);

    console.log(`✅ Neon Postgres: Added ${normalizedEmail} to waitlist (Position: ${position})`);

    return {
      success: true,
      position,
      totalSignups
    };
  } catch (error) {
    console.error('❌ Neon Postgres error in addToWaitlist:', error);

    // Check if it's a unique constraint violation
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return {
        success: false,
        position: 0,
        totalSignups: 0,
        error: 'Email already registered'
      };
    }

    throw error;
  }
}

/**
 * Check if email is already in waitlist
 */
export async function isEmailInWaitlist(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const sql = getSQL();
    const result = await sql`
      SELECT email FROM waitlist WHERE email = ${normalizedEmail}
    `;

    return result.length > 0;
  } catch (error) {
    console.error('❌ Neon Postgres error in isEmailInWaitlist:', error);
    throw error;
  }
}

/**
 * Get waitlist statistics
 */
export async function getWaitlistStats(): Promise<WaitlistStats> {
  try {
    const sql = getSQL();
    const result = await sql`
      SELECT
        COUNT(*) as total_signups,
        MAX(created_at) as last_updated
      FROM waitlist
    `;

    const row = result[0];
    const totalSignups = parseInt(row.total_signups as string, 10);
    const timestamp = row.last_updated ? new Date(row.last_updated as string).toISOString() : new Date().toISOString();

    return {
      totalSignups,
      timestamp
    };
  } catch (error) {
    console.error('❌ Neon Postgres error in getWaitlistStats:', error);

    // Return default stats if table doesn't exist yet
    return {
      totalSignups: 0,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Get waitlist entry by email
 */
export async function getWaitlistEntry(email: string): Promise<WaitlistEntry | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const sql = getSQL();
    const result = await sql`
      SELECT email, source, position, created_at
      FROM waitlist
      WHERE email = ${normalizedEmail}
    `;

    if (result.length === 0) {
      return null;
    }

    const row = result[0];
    return {
      email: row.email as string,
      timestamp: new Date(row.created_at as string).toISOString(),
      source: row.source as string,
      position: row.position as number
    };
  } catch (error) {
    console.error('❌ Neon Postgres error in getWaitlistEntry:', error);
    return null;
  }
}

/**
 * Get all emails from the waitlist (for exports)
 */
export async function getAllEmails(): Promise<string[]> {
  try {
    const sql = getSQL();
    const result = await sql`
      SELECT email FROM waitlist ORDER BY position ASC
    `;

    return result.map(row => row.email as string);
  } catch (error) {
    console.error('❌ Neon Postgres error in getAllEmails:', error);
    return [];
  }
}

/**
 * Get all waitlist entries with details (for admin)
 */
export async function getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    const sql = getSQL();
    const result = await sql`
      SELECT email, source, position, created_at
      FROM waitlist
      ORDER BY position ASC
    `;

    return result.map(row => ({
      email: row.email as string,
      timestamp: new Date(row.created_at as string).toISOString(),
      source: row.source as string,
      position: row.position as number
    }));
  } catch (error) {
    console.error('❌ Neon Postgres error in getAllWaitlistEntries:', error);
    return [];
  }
}
