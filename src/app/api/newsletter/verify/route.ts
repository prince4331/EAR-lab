/**
 * Newsletter Verification API Route
 * GET /api/newsletter/verify - Verify email subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { newsletterService } from '@/services';
import { asyncHandler, logRequest } from '@/lib/api';

async function handleGet(request: NextRequest) {
  logRequest(request);

  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?error=invalid_token`
    );
  }

  const result = await newsletterService.verify(token);

  if (result.success) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?verified=true`
    );
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/subscribe?error=verification_failed`
    );
  }
}

export const GET = asyncHandler(handleGet);
