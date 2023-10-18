'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Github } from 'lucide-react';
import { Button } from '@nextui-org/react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function GithubSignInButton() {
  const supabase = createClientComponentClient({
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_ANON_KEY
  });

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
  };
  return (
    <Button variant='ghost' color='secondary' onClick={handleGitHubSignIn}>
      <Github height={20} width={20} /> Sign In with GitHub
    </Button>
  );
}
export default GithubSignInButton;
