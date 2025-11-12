import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiter instance using Upstash Redis
 *
 * Configuration:
 * - 5 requests per hour per IP address
 * - Sliding window algorithm for accurate limiting
 * - Analytics enabled for monitoring
 *
 * @see https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

/**
 * Check if a request should be rate limited
 *
 * @param identifier - Unique identifier for the request (usually IP address)
 * @returns Rate limit result with success status and metadata
 *
 * @example
 * ```typescript
 * const result = await checkRateLimit(ipAddress);
 * if (!result.success) {
 *   return Response.json({ error: 'Too many requests' }, { status: 429 });
 * }
 * ```
 */
export async function checkRateLimit(identifier: string) {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

    return {
      success,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);

    // Fail open - allow request if rate limiting fails
    // This prevents Redis issues from blocking all traffic
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
    };
  }
}

/**
 * Get IP address from request headers
 *
 * @param request - Request object
 * @returns IP address or 'anonymous' if not found
 */
export function getClientIP(request: Request): string {
  // Check X-Forwarded-For header (used by proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take first IP if multiple (original client IP)
    return forwarded.split(',')[0].trim();
  }

  // Check X-Real-IP header (alternative header)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  // Fallback to 'anonymous' if no IP found
  return 'anonymous';
}
