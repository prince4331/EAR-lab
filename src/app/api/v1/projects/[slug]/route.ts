/**
 * Projects API Route - Single Project
 * GET /api/v1/projects/[slug] - Get a single project by slug
 */

import { NextRequest } from 'next/server';
import { projectService } from '@/services';
import {
  successResponse,
  notFoundResponse,
  asyncHandler,
  logRequest,
} from '@/lib/api';

async function handleGet(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  logRequest(request);

  const project = await projectService.getProjectBySlug(params.slug);

  if (!project || !project.isPublic) {
    return notFoundResponse('Project not found');
  }

  return successResponse({ project });
}

export const GET = asyncHandler(handleGet);
