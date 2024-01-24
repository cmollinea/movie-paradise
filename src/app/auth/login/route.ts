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

// export async function POST(request: Request) {
//   const requestUrl = new URL(request.url);
//   const formData = await request.formData();
//   const email = String(formData.get('email'));
//   const password = String(formData.get('password'));
//   const supabase = createRouteSupabaseCli();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password
//   });

//   if (!error) {
//     return NextResponse.redirect(requestUrl.origin);
//   }

//   return NextResponse.redirect(requestUrl.origin + '/login?error=true');
// }
