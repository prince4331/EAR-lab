/**
 * Projects API Route - List Projects
 * GET /api/v1/projects - Get all public projects
 */

import { NextRequest } from 'next/server';
import { projectService } from '@/services';
import {
  successResponse,
  errorResponse,
  asyncHandler,
  logRequest,
  paginationSchema,
  validateParams,
} from '@/lib/api';
import { z } from 'zod';

const projectQuerySchema = paginationSchema.extend({
  category: z.enum(['embedded', 'autonomy', 'sensors', 'power']).optional(),
});

async function handleGet(request: NextRequest) {
  logRequest(request);

  // Parse query parameters
  const searchParams = Object.fromEntries(request.nextUrl.searchParams);
  const validation = validateParams(searchParams, projectQuerySchema);

  if (!validation.success) {
    return errorResponse(validation.error);
  }

  const { page, limit, search, category } = validation.data;
  const offset = (page - 1) * limit;

  // Get public projects
  const result = await projectService.getPublicProjects({
    search,
    category,
    limit,
    offset,
  });

  return successResponse(result.projects, undefined, {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit),
  });
}

export const GET = asyncHandler(handleGet);
