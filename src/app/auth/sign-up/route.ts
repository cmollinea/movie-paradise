import { createRouteSupabaseCli } from '@/helpers/create-route-supabse-cli';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const name = String(formData.get('full_name'));
  const user_name = String(formData.get('user_name'));
  const avatar_url = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user_name}`;

  const supabase = createRouteSupabaseCli();
  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        name,
        avatar_url,
        user_name
      }
    }
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301
  });
}
