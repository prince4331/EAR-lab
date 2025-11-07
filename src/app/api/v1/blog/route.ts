/**
 * Blog API Route - List Posts
 * GET /api/v1/blog - Get all published blog posts
 */

import { NextRequest } from 'next/server';
import { blogService } from '@/services';
import {
  successResponse,
  errorResponse,
  asyncHandler,
  logRequest,
  paginationSchema,
  validateParams,
} from '@/lib/api';

async function handleGet(request: NextRequest) {
  logRequest(request);

  // Parse query parameters
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const validation = validateParams(searchParams, paginationSchema);

  if (!validation.success) {
    return errorResponse(validation.error);
  }

  const { page, limit, search, sort } = validation.data;
  const offset = (page - 1) * limit;

  // Get published posts
  const result = await blogService.getPublishedPosts({
    search,
    limit,
    offset,
  });

  return successResponse(result.posts, undefined, {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
  });
}

export const GET = asyncHandler(handleGet);
