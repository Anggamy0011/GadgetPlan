import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { fullName, identifier } = await req.json();
    if (!fullName || !identifier) return NextResponse.json({ error: 'fullName and identifier required' }, { status: 400 });

    // NOTE: Implement real user creation with Supabase Auth (email link/phone OTP)
    const supabase = createSupabaseServerClient();
    // In real flow, auth.users dibuat oleh Supabase Auth. Di sini hanya stub response.
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Unknown error' }, { status: 500 });
  }
}

