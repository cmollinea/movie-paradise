import { createRouteSupabaseCli } from '@/helpers/create-route-supabse-cli';
import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = createRouteSupabaseCli();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    });
    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect('/auth/auth-code-error');
}
