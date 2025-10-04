import { NextRequest, NextResponse } from 'next/server';

// This API route handles OAuth callbacks
export async function GET(request: NextRequest) {
  // For Supabase OAuth, the callback will contain code and state parameters
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error) {
    // Handle error from OAuth provider
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(new URL('/sign-in?error=oauth_error', request.url));
  }

  if (code) {
    // The Supabase client handles the code exchange automatically via browser redirect
    // So we just redirect to the home page after successful authentication
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If neither code nor error, return to sign-in
  return NextResponse.redirect(new URL('/sign-in', request.url));
}