'use client';

import { createClienSupabaseCli } from '@/helpers/create-client-supabase-cli';
import { Button } from '@nextui-org/react';
import { Github } from 'lucide-react';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export function GitHubSignButton() {
  const supabase = createClienSupabaseCli();

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };
  return (
    <Button variant='ghost' color='secondary' onClick={handleGitHubSignIn}>
      <Github height={20} width={20} /> Sign In with GitHub
    </Button>
  );
}