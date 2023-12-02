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
          process.env.NODE_ENV === 'development'
            ? 'https://movie-paradise-seven.vercel.app/auth/callback'
            : 'http://localhost:3000/auth/callback'
      }
    });
  };
  return (
    <Button variant='ghost' color='secondary' onClick={handleGitHubSignIn}>
      <Github height={20} width={20} /> Sign In with GitHub
    </Button>
  );
}
