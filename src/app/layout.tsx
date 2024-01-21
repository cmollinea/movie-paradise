import { createServerSupabaseCli } from '@/helpers/create-server-supabase-cli';
import { NavBarUI } from '@/components/navbar/navbar-ui';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

import './globals.css';

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseCli();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <html lang='en' className='dark'>
      <body className='bg-background antialiased'>
        {/* <NextTopLoader />  */}
        <Toaster />
        <Providers>
          <div className='sticky top-0 z-50'>
            <NavBarUI session={session} />{' '}
          </div>
          <main className='flex flex-col place-content-center items-center h-fit'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
