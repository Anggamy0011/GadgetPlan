import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { identifier } = await req.json();
    if (!identifier) return NextResponse.json({ error: 'Identifier required' }, { status: 400 });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('otp_codes').insert({ identifier, code, expires_at: expiresAt });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // TODO: kirim kode via email/SMS di sini
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Unknown error' }, { status: 500 });
  }
}

