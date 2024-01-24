import { SyntheticEvent, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export const useSignIn = () => {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const hanldeSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (form.current) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const formData = new FormData(form.current);
      const email = String(formData.get('email'));
      const password = String(formData.get('password'));
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        router.push('/sign-in?error=1');
        return;
      }
      router.push('/');
    }
  };

  return { hanldeSubmit, form };
};
