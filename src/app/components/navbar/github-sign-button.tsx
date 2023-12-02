'use client';

import { createClienSupabaseCli } from '@/app/helpers/create-client-supabase-cli';
import { Button } from '@nextui-org/react';
import { Github } from 'lucide-react';

export function GitHubSignButton() {
  const supabase = createClienSupabaseCli();

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo:
           'https://movie-paradise-seven.vercel.app/auth/callback'
      }
    });
  };
  return (
    <Button variant='ghost' color='secondary' onClick={handleGitHubSignIn}>
      <Github height={20} width={20} /> Sign In with GitHub
    </Button>
  );
}
