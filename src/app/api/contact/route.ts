/**
 * Contact API Route
 * Handles contact form submissions with validation, rate limiting, and email notifications
 */

import { NextRequest } from 'next/server';
import { contactService } from '@/services';
import {
  successResponse,
  errorResponse,
  validateRequest,
  contactFormSchema,
  withRateLimit,
  RateLimitPresets,
  asyncHandler,
  logRequest,
} from '@/lib/api';

/**
 * POST /api/contact
 * Submit contact form
 */
async function handlePost(request: NextRequest) {
  logRequest(request);

  // Validate request body
  const validation = await validateRequest(request, contactFormSchema);
  
  if (!validation.success) {
    return errorResponse(validation.error);
  }

  // Submit contact form using service
  const result = await contactService.submitContact({
    name: validation.data.name,
    email: validation.data.email,
    company: validation.data.company,
    projectDescription: validation.data.projectDescription,
    budgetRange: validation.data.budgetRange,
    timeline: validation.data.timeline,
    fileUrl: validation.data.fileUrl,
  });

  if (!result.success) {
    return errorResponse(
      new Error(result.message),
      'Failed to submit contact form'
    );
  }

  return successResponse(
    { contactId: result.contactId },
    result.message
  );
}

// Apply rate limiting to POST endpoint
export const POST = withRateLimit(
  asyncHandler(handlePost),
  RateLimitPresets.FORM
);