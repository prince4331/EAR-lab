/**
 * API Response Utilities
 * Standard response formats and error handling for API routes
 */

import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
}

/**
 * Success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  meta?: ApiResponse['meta']
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      meta,
    },
    { status: 200 }
  );
}

/**
 * Created response (201)
 */
export function createdResponse<T>(
  data: T,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message: message || 'Resource created successfully',
    },
    { status: 201 }
  );
}

/**
 * No content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Bad request error (400)
 */
export function badRequestResponse(
  message: string = 'Bad request',
  errors?: Record<string, string[]>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      errors,
    },
    { status: 400 }
  );
}

/**
 * Unauthorized error (401)
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 401 }
  );
}

/**
 * Forbidden error (403)
 */
export function forbiddenResponse(
  message: string = 'Forbidden'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 403 }
  );
}

/**
 * Not found error (404)
 */
export function notFoundResponse(
  message: string = 'Resource not found'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 404 }
  );
}

/**
 * Conflict error (409)
 */
export function conflictResponse(
  message: string = 'Resource already exists'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 409 }
  );
}

/**
 * Too many requests error (429)
 */
export function tooManyRequestsResponse(
  message: string = 'Too many requests. Please try again later.'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 429 }
  );
}

/**
 * Internal server error (500)
 */
export function serverErrorResponse(
  message: string = 'Internal server error',
  error?: any
): NextResponse<ApiResponse> {
  // Log error for debugging
  if (error) {
    console.error('Server error:', error);
  }

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 500 }
  );
}

/**
 * Service unavailable error (503)
 */
export function serviceUnavailableResponse(
  message: string = 'Service temporarily unavailable'
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 503 }
  );
}

/**
 * Generic error response handler
 */
export function errorResponse(
  error: any,
  defaultMessage: string = 'An error occurred'
): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  // Handle Prisma errors
  if (error.code === 'P2002') {
    return conflictResponse('Resource with this identifier already exists');
  }

  if (error.code === 'P2025') {
    return notFoundResponse('Resource not found');
  }

  // Handle validation errors
  if (error.name === 'ZodError') {
    const errors: Record<string, string[]> = {};
    error.issues?.forEach((issue: any) => {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    });

    return badRequestResponse('Validation failed', errors);
  }

  // Handle custom error codes
  if (error.statusCode) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || defaultMessage,
      },
      { status: error.statusCode }
    );
  }

  // Default to 500
  return serverErrorResponse(defaultMessage);
}
