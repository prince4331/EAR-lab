/**
 * API Middleware Utilities
 * Common middleware functions for API routes
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * CORS configuration
 */
export interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

/**
 * Default CORS options
 */
const defaultCorsOptions: CorsOptions = {
  origin: process.env.NEXT_PUBLIC_APP_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * Create CORS middleware
 */
export function withCors(options: CorsOptions = {}) {
  const config = { ...defaultCorsOptions, ...options };

  return (request: NextRequest, response: NextResponse): NextResponse => {
    const origin = request.headers.get('origin') || '';

    // Check if origin is allowed
    let allowedOrigin = '*';
    if (typeof config.origin === 'string') {
      allowedOrigin = config.origin;
    } else if (Array.isArray(config.origin)) {
      if (config.origin.includes(origin)) {
        allowedOrigin = origin;
      }
    } else if (typeof config.origin === 'function') {
      if (config.origin(origin)) {
        allowedOrigin = origin;
      }
    }

    // Set CORS headers
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', allowedOrigin);
    
    if (config.credentials) {
      headers.set('Access-Control-Allow-Credentials', 'true');
    }

    if (config.methods) {
      headers.set('Access-Control-Allow-Methods', config.methods.join(', '));
    }

    if (config.allowedHeaders) {
      headers.set('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
    }

    if (config.exposedHeaders) {
      headers.set('Access-Control-Expose-Headers', config.exposedHeaders.join(', '));
    }

    if (config.maxAge) {
      headers.set('Access-Control-Max-Age', config.maxAge.toString());
    }

    // Handle OPTIONS preflight request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers });
    }

    return NextResponse.next({ headers });
  };
}

/**
 * Security headers middleware
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  const headers = new Headers(response.headers);

  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // Other security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // HSTS (HTTP Strict Transport Security)
  if (process.env.NODE_ENV === 'production') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return NextResponse.next({ headers });
}

/**
 * Request logging middleware
 */
export function logRequest(request: NextRequest): void {
  const { method, url } = request;
  const timestamp = new Date().toISOString();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') || 
              'unknown';

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
}

/**
 * Error handling middleware
 */
export function handleApiError(error: any): NextResponse {
  console.error('API Error:', error);

  // Determine error status code
  const statusCode = error.statusCode || 500;
  
  // Determine error message
  let message = 'An unexpected error occurred';
  if (process.env.NODE_ENV === 'development') {
    message = error.message || message;
  } else if (statusCode < 500) {
    message = error.message || message;
  }

  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
    { status: statusCode }
  );
}

/**
 * Method validation middleware
 */
export function validateMethod(request: NextRequest, allowedMethods: string[]): NextResponse | null {
  if (!allowedMethods.includes(request.method)) {
    return NextResponse.json(
      {
        success: false,
        error: `Method ${request.method} not allowed`,
      },
      {
        status: 405,
        headers: {
          Allow: allowedMethods.join(', '),
        },
      }
    );
  }

  return null;
}

/**
 * Content-Type validation middleware
 */
export function validateContentType(request: NextRequest, expectedType: string = 'application/json'): NextResponse | null {
  const contentType = request.headers.get('content-type');
  
  if (request.method !== 'GET' && request.method !== 'DELETE') {
    if (!contentType || !contentType.includes(expectedType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Content-Type must be ${expectedType}`,
        },
        { status: 415 }
      );
    }
  }

  return null;
}

/**
 * Compose multiple middleware functions
 */
export function composeMiddleware(...middlewares: Array<(request: NextRequest, response?: NextResponse) => NextResponse | null | Promise<NextResponse | null>>) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    for (const middleware of middlewares) {
      const result = await middleware(request);
      if (result) {
        return result;
      }
    }
    return null;
  };
}

/**
 * Async handler wrapper with error handling
 */
export function asyncHandler(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
