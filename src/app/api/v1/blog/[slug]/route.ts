/**
 * Blog API Route - Single Post
 * GET /api/v1/blog/[slug] - Get a single blog post by slug
 */

import { NextRequest } from 'next/server';
import { blogService } from '@/services';
import {
  successResponse,
  notFoundResponse,
  errorResponse,
  asyncHandler,
  logRequest,
} from '@/lib/api';

async function handleGet(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  logRequest(request);

  const post = await blogService.getPostBySlug(params.slug);

  if (!post || post.status !== 'published') {
    return notFoundResponse('Blog post not found');
  }

  // Get related posts
  const relatedPosts = await blogService.getRelatedPosts(post.id, 3);

  return successResponse({
    post,
    relatedPosts,
  });
}

export const GET = asyncHandler(handleGet);
