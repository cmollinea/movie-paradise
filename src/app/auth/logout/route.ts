import { createRouteSupabaseCli } from '@/app/helpers/create-route-supabse-cli';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteSupabaseCli();
  await supabase.auth.signOut();

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301
  });
}
