import { createBrowserClient } from '@supabase/ssr';

/**
 * @details Only use it on client components
 */
export const createClienSupabaseCli = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
};
