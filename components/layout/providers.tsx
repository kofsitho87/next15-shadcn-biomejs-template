'use client';

import type React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import ReactQueryProvider from '../providers/ReactQueryProvider';
import { Toaster } from 'sonner';

interface ProvidersProps {
  // session: SessionProviderProps['session'];
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* <SessionProvider session={session}> */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="top-center" />
        {/* </SessionProvider> */}
      </ThemeProvider>
    </>
  );
}
