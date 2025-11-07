/**
 * Rate Limiting Middleware
 * Simple in-memory rate limiter for API endpoints
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Max requests per window
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if request should be rate limited
   */
  check(identifier: string, config: RateLimitConfig): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // No entry or expired - create new
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      });

      return {
        allowed: true,
        remaining: config.max - 1,
        resetTime: now + config.windowMs,
      };
    }

    if (entry.count >= config.max) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      allowed: true,
      remaining: config.max - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Clear all entries (for testing)
   */
  clear() {
    this.requests.clear();
  }

  /**
   * Destroy rate limiter
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.requests.clear();
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

/**
 * Get client identifier from request
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  // Include user agent for additional uniqueness
  const userAgent = request.headers.get('user-agent') || 'unknown';

  return `${ip}:${userAgent}`;
}

/**
 * Rate limit middleware factory
 */
export function createRateLimiter(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const identifier = getClientIdentifier(request);
    const result = rateLimiter.check(identifier, config);

    // Add rate limit headers
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', config.max.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    if (!result.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: config.message || 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers,
        }
      );
    }

    return null; // Allow request to proceed
  };
}

/**
 * Common rate limit configurations
 */
export const RateLimitPresets = {
  // Strict rate limit for authentication endpoints
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many authentication attempts. Please try again later.',
  },

  // Standard rate limit for API endpoints
  API: {
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute
    message: 'API rate limit exceeded. Please try again later.',
  },

  // Lenient rate limit for form submissions
  FORM: {
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 submissions per minute
    message: 'Too many form submissions. Please try again later.',
  },

  // Very lenient rate limit for public read operations
  PUBLIC: {
    windowMs: 60 * 1000, // 1 minute
    max: 120, // 120 requests per minute
  },

  // Newsletter subscription rate limit
  NEWSLETTER: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 subscription attempts per hour
    message: 'Too many subscription attempts. Please try again later.',
  },
};

/**
 * Apply rate limiting to a handler function
 */
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const rateLimitResponse = await createRateLimiter(config)(request);
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    return handler(request);
  };
}

export { rateLimiter };
