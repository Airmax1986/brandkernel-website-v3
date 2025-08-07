import { Redis } from '@upstash/redis';

// Initialize Redis connection
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!redis) {
    // Check if Redis environment variables are available
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      console.warn('Upstash Redis environment variables not found. Using fallback storage.');
      return null;
    }
    
    try {
      redis = new Redis({
        url,
        token,
      });
    } catch (error) {
      console.error('Failed to initialize Redis connection:', error);
      return null;
    }
  }
  
  return redis;
}

// Fallback in-memory storage when Redis is not available
let fallbackStorage: Set<string> = new Set();
let fallbackFinalList: Set<string> = new Set();
let fallbackCounter = 71; // Starting count to match display counter

// Database operations for waitlist
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

/**
 * Add email to waitlist
 */
export async function addToWaitlist(
  email: string, 
  source: string = 'website'
): Promise<{ success: boolean; position: number; totalSignups: number; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const timestamp = new Date().toISOString();
  
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      // Check if email already exists
      const existingEntry = await redisClient.get(`waitlist:email:${normalizedEmail}`);
      if (existingEntry) {
        return {
          success: false,
          position: 0,
          totalSignups: 0,
          error: 'Email already registered'
        };
      }
      
      // Initialize counter if it doesn't exist
      let currentCount = await redisClient.get('waitlist:counter');
      if (currentCount === null) {
        await redisClient.set('waitlist:counter', 71);
        currentCount = 71;
      }
      
      // Increment counter
      const position = await redisClient.incr('waitlist:counter');
      
      // Create waitlist entry
      const entry: WaitlistEntry = {
        email: normalizedEmail,
        timestamp,
        source,
        position
      };
      
      // Store the entry
      await redisClient.set(`waitlist:email:${normalizedEmail}`, JSON.stringify(entry));
      await redisClient.sadd('waitlist:emails', normalizedEmail);
      await redisClient.sadd('final_email_list', normalizedEmail);
      await redisClient.set(`waitlist:position:${position}`, normalizedEmail);
      
      // Update last signup timestamp
      await redisClient.set('waitlist:last_updated', timestamp);
      
      console.log(`Redis: Added ${normalizedEmail} to waitlist (Position: ${position})`);
      
      return {
        success: true,
        position,
        totalSignups: position
      };
      
    } catch (error) {
      console.error('Redis error in addToWaitlist:', error);
      // Fall back to in-memory storage
    }
  }
  
  // Fallback to in-memory storage
  if (fallbackStorage.has(normalizedEmail)) {
    return {
      success: false,
      position: 0,
      totalSignups: fallbackStorage.size,
      error: 'Email already registered'
    };
  }
  
  fallbackStorage.add(normalizedEmail);
  fallbackFinalList.add(normalizedEmail);
  fallbackCounter++;
  const position = fallbackCounter;
  
  console.log(`Fallback: Added ${normalizedEmail} to waitlist (Position: ${position})`);
  
  return {
    success: true,
    position,
    totalSignups: position // Use consistent counter
  };
}

/**
 * Check if email is already in waitlist
 */
export async function isEmailInWaitlist(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      const exists = await redisClient.get(`waitlist:email:${normalizedEmail}`);
      return !!exists;
    } catch (error) {
      console.error('Redis error in isEmailInWaitlist:', error);
      // Fall back to in-memory storage
    }
  }
  
  // Fallback to in-memory storage
  return fallbackStorage.has(normalizedEmail);
}

/**
 * Get waitlist statistics
 */
export async function getWaitlistStats(): Promise<WaitlistStats> {
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      const totalSignups = await redisClient.get('waitlist:counter') || 0;
      const lastUpdated = await redisClient.get('waitlist:last_updated') || new Date().toISOString();
      
      return {
        totalSignups: Number(totalSignups),
        timestamp: String(lastUpdated)
      };
    } catch (error) {
      console.error('Redis error in getWaitlistStats:', error);
      // Fall back to in-memory storage
    }
  }
  
  // Fallback to in-memory storage
  return {
    totalSignups: Math.max(fallbackCounter, fallbackStorage.size), // Use consistent counter
    timestamp: new Date().toISOString()
  };
}

/**
 * Get waitlist entry by email
 */
export async function getWaitlistEntry(email: string): Promise<WaitlistEntry | null> {
  const normalizedEmail = email.toLowerCase().trim();
  
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      const entryData = await redisClient.get(`waitlist:email:${normalizedEmail}`);
      if (entryData && typeof entryData === 'string') {
        return JSON.parse(entryData) as WaitlistEntry;
      }
    } catch (error) {
      console.error('Redis error in getWaitlistEntry:', error);
    }
  }
  
  // Fallback: return null if not in fallback storage
  if (!fallbackStorage.has(normalizedEmail)) {
    return null;
  }
  
  return {
    email: normalizedEmail,
    timestamp: new Date().toISOString(),
    source: 'website',
    position: fallbackCounter
  };
}

/**
 * Initialize Redis with starting counter if needed
 */
export async function initializeDatabase(): Promise<void> {
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      const currentCounter = await redisClient.get('waitlist:counter');
      if (currentCounter === null || currentCounter === undefined) {
        await redisClient.set('waitlist:counter', 71);
        console.log('Redis: Initialized waitlist counter to 71');
      }
    } catch (error) {
      console.error('Redis error in initializeDatabase:', error);
    }
  } else {
    console.log('Redis not available - using fallback storage with counter starting at 71');
  }
}

/**
 * Get all emails from the final email list
 */
export async function getFinalEmailList(): Promise<string[]> {
  const redisClient = getRedis();
  
  if (redisClient) {
    try {
      const emails = await redisClient.smembers('final_email_list');
      return emails || [];
    } catch (error) {
      console.error('Redis error in getFinalEmailList:', error);
      // Fall back to in-memory storage
    }
  }
  
  // Fallback to in-memory storage
  return Array.from(fallbackFinalList);
}