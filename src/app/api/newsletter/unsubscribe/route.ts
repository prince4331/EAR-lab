/**
 * Newsletter Unsubscribe API Route
 * POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
 */

import { NextRequest } from 'next/server';
import { newsletterService } from '@/services';
import {
  successResponse,
  errorResponse,
  asyncHandler,
  logRequest,
} from '@/lib/api';
import { z } from 'zod';

const unsubscribeSchema = z.object({
  email: z.string().email(),
});

async function handlePost(request: NextRequest) {
  logRequest(request);

  try {
    const body = await request.json();
    const validation = unsubscribeSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error);
    }

    const result = await newsletterService.unsubscribe(validation.data.email);

    if (!result.success) {
      return errorResponse(new Error(result.message));
    }

    return successResponse(null, result.message);
  } catch (error) {
    return errorResponse(error);
  }
}

export const POST = asyncHandler(handlePost);
