/**
 * Newsletter Subscription API Route
 * Handles newsletter subscriptions with double opt-in
 */

import { NextRequest } from 'next/server';
import { newsletterService } from '@/services';
import {
  successResponse,
  errorResponse,
  validateRequest,
  newsletterSubscribeSchema,
  withRateLimit,
  RateLimitPresets,
  asyncHandler,
  logRequest,
} from '@/lib/api';

/**
 * POST /api/subscribe
 * Subscribe to newsletter
 */
async function handlePost(request: NextRequest) {
  logRequest(request);

  // Validate request body
  const validation = await validateRequest(request, newsletterSubscribeSchema);
  
  if (!validation.success) {
    return errorResponse(validation.error);
  }

  // Subscribe using service
  const result = await newsletterService.subscribe({
    email: validation.data.email,
    name: validation.data.name,
    role: validation.data.role,
    company: validation.data.company,
    source: validation.data.source || 'website',
  });

  if (!result.success) {
    return errorResponse(
      new Error(result.message),
      'Failed to subscribe to newsletter'
    );
  }

  return successResponse(
    { requiresVerification: result.requiresVerification },
    result.message
  );
}

// Apply rate limiting to POST endpoint
export const POST = withRateLimit(
  asyncHandler(handlePost),
  RateLimitPresets.NEWSLETTER
);