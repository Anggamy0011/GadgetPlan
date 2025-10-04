import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { identifier, code } = await req.json();
    if (!identifier || !code) return NextResponse.json({ error: 'Identifier and code required' }, { status: 400 });

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.rpc('verify_otp', { p_identifier: identifier, p_code: code });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: !!data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Unknown error' }, { status: 500 });
  }
}

